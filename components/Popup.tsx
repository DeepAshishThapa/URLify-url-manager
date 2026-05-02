"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Alert, AlertTitle } from "@/components/ui/alert";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addlinkSchema } from "@/schemas/addlinkSchema";
import { createLink } from "@/features/linkService/api";
import { getAllFolders } from "@/features/folderService/api";

type AddLinkFormData = z.infer<typeof addlinkSchema>;

type Folder = {
  _id: string;
  name: string;
};

type Link = {
  _id: string;
  url: string;
  description: string;
  userId: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
};

type PopupProps = {
  selectedFolder?: Folder | null;
  isAllPage?: boolean;
  onLinkCreated?: (newLink: Link) => void;
};

function Popup({ selectedFolder, isAllPage = false, onLinkCreated }: PopupProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);

  const defaultFolderValue = useMemo(() => {
    if (isAllPage) return "unsaved";
    if (selectedFolder?._id) return selectedFolder._id;
    return "unsaved";
  }, [isAllPage, selectedFolder]);

  const form = useForm<AddLinkFormData>({
    resolver: zodResolver(addlinkSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      url: "",
      description: "",
      folderId: defaultFolderValue,
    },
  });

  const { isSubmitting } = form.formState;

  const fetchFolders = async () => {
    try {
      setIsLoadingFolders(true);
      const response = await getAllFolders();
      setFolders(response?.folders || []);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
      setFolders([]);
    } finally {
      setIsLoadingFolders(false);
    }
  };

  useEffect(() => {
    if (open) {
      setStatus(null);
      fetchFolders();

      form.reset({
        url: "",
        description: "",
        folderId: defaultFolderValue,
      });
    }
  }, [open, defaultFolderValue, form]);

  const onSubmit = async (data: AddLinkFormData) => {
    try {
      const payload = {
        url: data.url.trim(),
        description: data.description?.trim() || "",
        folderId:
          data.folderId === "unsaved" || !data.folderId
            ? null
            : data.folderId,
      };

      const response = await createLink(payload);

      const newLink = response?.data || response?.link || response;

      if (newLink && onLinkCreated) {
        onLinkCreated(newLink);
      }

      setStatus("success");

      form.reset({
        url: "",
        description: "",
        folderId: defaultFolderValue,
      });
    } catch (error) {
      console.error("Failed to create link:", error);
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
          <DialogDescription>
            Add a new link and choose which folder it belongs to.
          </DialogDescription>
        </DialogHeader>

        {status && (
          <Alert
            variant={status === "error" ? "destructive" : "default"}
            className="mb-4"
          >
            <AlertTitle>
              {status === "success"
                ? "Link added successfully"
                : "Failed to add link"}
            </AlertTitle>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? "unsaved"}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            isLoadingFolders ? "Loading folders..." : "Select folder"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="unsaved">Unsaved</SelectItem>

                        {folders.map((folder) => (
                          <SelectItem key={folder._id} value={folder._id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Link"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;