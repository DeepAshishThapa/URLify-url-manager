"use client"

import { useParams, useRouter } from "next/navigation"
import { getFolderById } from "@/features/folderService/api"
import { useState, useEffect } from "react"

import Popup from "@/components/Popup"
import { finalizeLayoutVaryPath } from "next/dist/client/components/segment-cache/vary-path"
import { Card, CardContent } from "@/components/ui/card"

import { getLinksByFolder } from "@/features/linkService/api"

type Folder = {
    _id: string,
    name: string

}

type Link = {
    _id: string
    url: string
    description: string
    userId: string
    folderId: string
    createdAt: string
    updatedAt: string
}



function page() {
    const router = useRouter()
    const params = useParams()

    const [selectedFolder, setselectedFolder] = useState<null | Folder>(null)
    const [FolderLinks, setFolderLinks] = useState<Link[]>([])
    const [loading, setLoading] = useState(true)

    const folderId = params.folderId as string

    useEffect(() => {
        if (!folderId) return
        const fetchfolder = async () => {
            try {
                const res = await getFolderById(folderId)
                const res2 = await getLinksByFolder(folderId)

                setselectedFolder(res.data)
                setFolderLinks(res2.data)
            }
            catch (error) {
                console.log(error)
                router.push("/home")

            } finally {
                setLoading(false)
            }

        }
        fetchfolder()



    }, [folderId])

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace("www.", "")
        } catch {
            return url
        }
    }

    return (
        <div>
            {loading ?
                (<div>...Loading</div>) :
                (
                    <div>
                        <p className="font-semibold text-2xl">{selectedFolder?.name}</p>
                        <Popup selectedFolder={selectedFolder} />

                        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                            {FolderLinks.map((link) => (
                                <Card
                                    key={link._id}
                                    className="group h-56 cursor-pointer rounded-xl border bg-background transition hover:shadow-lg w-full max-w-md"
                                    onClick={() => window.open(link.url, "_blank")}
                                    tabIndex={0}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && window.open(link.url, "_blank")
                                    }
                                >
                                    <CardContent className="flex h-full flex-col justify-between p-4">
                                        <div className="flex items-center gap-3 mt-5">
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${getDomain(
                                                    link.url
                                                )}&sz=64`}
                                                alt="favicon"
                                                className="h-6 w-6 rounded"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/link.svg"
                                                }}
                                            />

                                            <div className="flex min-w-0 flex-col">
                                                <p className="truncate text-sm font-semibold">
                                                    {getDomain(link.url)}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {link.url}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            {link.description ? (
                                                <p className="line-clamp-3 text-sm text-muted-foreground">
                                                    {link.description}
                                                </p>
                                            ) : (
                                                <p className="italic text-sm text-muted-foreground opacity-60">
                                                    No description
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-3 text-right">
                                            <span className="text-xs font-medium text-primary group-hover:underline">
                                                Open link →
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                            ))}
                        </div>
                    </div>

                )


            }


        </div>



    )
}

export default page