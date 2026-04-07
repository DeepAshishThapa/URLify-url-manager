const BASE_URL = ""

export async function apiClient(
    url: string,
    options?: RequestInit
) {
    const res = await fetch(`${BASE_URL}${url}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    })

    const data = await res.json()

    if (!res.ok){
        throw new Error (data.message || "Something went wrong")
    }

    return data

}