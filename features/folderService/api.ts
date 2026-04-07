import { apiClient } from "@/lib/apiClient"

const BASE = "/api/folder"

//  GET ALL
export async function getAllFolders() {
  return apiClient(BASE)
}

//  CREATE
export async function createFolder(name: string) {
  return apiClient(BASE, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
}

//  UPDATE
export async function updateFolder(id: string, name: string) {
  return apiClient(`${BASE}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  })
}

//  DELETE
export async function deleteFolder(id: string) {
  return apiClient(`${BASE}/${id}`, {
    method: "DELETE",
  })
}

//  GET A FOLDER
export async function getFolderById(id: string) {
  return apiClient(`${BASE}/${id}`)
}