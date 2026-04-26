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
