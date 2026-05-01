import { apiClient } from "@/lib/apiClient";

type CreateLinkPayload = {
  url: string
  description?: string
  folderId?: string | null
}

const BASE= "/api/link"

// Get All
export async function getAllLinks(){
    return apiClient(BASE)

}

// Create
export async function createLink({url, description, folderId}:CreateLinkPayload){
    return apiClient(BASE, {
        method: "POST",
        body: JSON.stringify({url, description, folderId})
    })

}

//get links by folder
export async function getLinksByFolder (folderId:string) {
     return apiClient(`${BASE}?folderId=${folderId}`)
}

export async function deleteLink(id:string){
    return apiClient(`${BASE}/${id}`, {
         method: "DELETE",
    }


    )
}