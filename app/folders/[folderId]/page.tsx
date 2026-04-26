"use client"

import { useParams,useRouter } from "next/navigation"
import { getFolderById } from "@/features/folderService/api"
import { useState, useEffect } from "react"

import Popup from "@/components/Popup"

type Folder = {
    _id: string,
    name: string

}


function page() {
    const router = useRouter()
    const params = useParams()

    const [selectedFolder, setselectedFolder] = useState<null | Folder>(null)
    const folderId = params.folderId as string

    useEffect(() => {
        if (!folderId) return
        const fetchfolder = async () => {
            try {
                const res = await getFolderById(folderId)
                setselectedFolder(res.data)
            }
            catch (error) {
                console.log(error)
                router.push("/home")

            }

        }
        fetchfolder()



    }, [folderId])
    return (
        <div>

           <div className="mb-2">{selectedFolder?.name}</div> 
             <Popup selectedFolder={selectedFolder} />

        </div>



    )
}

export default page