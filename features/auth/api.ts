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

export function verification(data:{
    email:string,
    code: string
}){
    return apiClient ("/api/verify-code",{
        method: "POST",
        body: JSON.stringify(data)
    })
}