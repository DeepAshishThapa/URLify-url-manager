const BASE_URL = ""

export async function apiClient(
    url: string,
    options?: RequestInit
) {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    })

    const data = await res.json()

    if (!res.ok){
        throw new Error (data || "Something went wrong")
    }

    return data

}