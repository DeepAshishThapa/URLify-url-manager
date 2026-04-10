"use client"

import { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Plus, Trash2, Pencil, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

//  IMPORT SERVICE
import { 
  getAllFolders,
  createFolder,
  updateFolder,
  deleteFolder
 } from "@/features/folderService/api"

type Folder = {
  _id: string
  name: string
  userId: string
}

type ActiveView =
  | { type: "all" }
  | { type: "unsaved" }   // ✅ added
  | { type: "folder"; folderId: string }

export default function Menubar() {
  const { data: session } = useSession()
  const userId = session?.user?._id

  const router = useRouter()

  const [folders, setFolders] = useState<Folder[]>([])
  const [activeView, setActiveView] = useState<ActiveView>({ type: "all" })

  const [addingFolder, setAddingFolder] = useState(false)
  const [folderName, setFolderName] = useState("")

  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  // -------------------- FETCH --------------------
  useEffect(() => {
    if (!userId) return

    const fetchFolders = async () => {
      try {
        const data = await getAllFolders()
        setFolders(data.folders)
      } catch (error) {
        console.log("Failed to load folders", error)
      }
    }

    fetchFolders()
  }, [userId])

  // -------------------- ADD --------------------
  async function handleAddFolder() {
    const name = folderName.trim()
    if (!name) return

    try {
      const data = await createFolder(name)

      setFolders((prev) => [...prev, data.folder])
      setFolderName("")
      setAddingFolder(false)
    } catch (error) {
      console.log("Add failed", error)
    }
  }

  // -------------------- RENAME --------------------
  async function saveRename() {
    if (!editingFolderId) return

    const name = editingName.trim()
    if (!name) return

    try {
      await updateFolder(editingFolderId, name)

      setFolders((prev) =>
        prev.map((f) =>
          f._id === editingFolderId ? { ...f, name } : f
        )
      )

      setEditingFolderId(null)
      setEditingName("")
    } catch (error) {
      console.log("Rename failed", error)
    }
  }

  // -------------------- DELETE --------------------
  async function handleDeleteFolder(id: string) {
    try {
      await deleteFolder(id)

      setFolders((prev) => prev.filter((f) => f._id !== id))

      if (activeView.type === "folder" && activeView.folderId === id) {
        setActiveView({ type: "all" })
        router.push("/home")
      }
    } catch (error) {
      console.log("Delete failed", error)
    }
  }

  function startRename(folder: Folder) {
    setEditingFolderId(folder._id)
    setEditingName(folder.name)
  }

  function cancelRename() {
    setEditingFolderId(null)
    setEditingName("")
  }

  // -------------------- UI --------------------
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:cursor-pointer">
          <Menu className="w-5 h-5 ml-2" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Folders</SheetTitle>
        </SheetHeader>

        {/* ALL */}
        <div className="mt-6 space-y-2">
          <Button
            variant={activeView.type === "all" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setActiveView({ type: "all" })
              router.push("/home")
            }}
          >
            All
          </Button>

          <Button
            variant={activeView.type === "unsaved" ? "secondary" : "ghost"}  // ✅ highlight added
            className="w-full justify-start"
            onClick={() => {
              setActiveView({ type: "unsaved" }) // ✅ set active
              router.push("/folders/unsaved")
            }}
          >
            Unsaved
          </Button>
        </div>

        {/* USER FOLDERS */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-medium">Your folders</p>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAddingFolder((v) => !v)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {addingFolder && (
            <div className="flex gap-2 mb-3">
              <Input
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name..."
              />
              <Button onClick={handleAddFolder}>Add</Button>
            </div>
          )}

          <div className="space-y-1">
            {folders.map((folder) => {
              const isEditing = editingFolderId === folder._id

              return (
                <div key={folder._id} className="flex items-center gap-1">
                  <Button
                    className="flex-1 justify-start"
                    variant={
                      activeView.type === "folder" &&
                      activeView.folderId === folder._id
                        ? "secondary"
                        : "ghost"
                    }
                    onClick={() => {
                      setActiveView({ type: "folder", folderId: folder._id })
                      router.push(`/folders/${folder._id}`)
                    }}
                  >
                    {isEditing ? (
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      folder.name
                    )}
                  </Button>

                  {isEditing ? (
                    <>
                      <Button size="icon" onClick={saveRename}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="icon" onClick={cancelRename}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="icon" onClick={() => startRename(folder)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    onClick={() => handleDeleteFolder(folder._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}