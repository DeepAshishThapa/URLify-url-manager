import { apiClient } from "@/lib/apiClient"

export function signup(data:{
    username: string,
    email: string,
    password: string
}){
    return apiClient ("/api/signup",{
        method: "POST",
        body: JSON.stringify(data)
    })


}