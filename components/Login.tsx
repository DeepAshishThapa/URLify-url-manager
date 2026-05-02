"use client"

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home")
    }
  }, [status, router])

  const handleGoogleLogin = async () => {
    setLoading(true)
    await signIn("google", {
      callbackUrl: "/home",
      redirect: true,
    })
  }

  if (status === "loading" || status === "authenticated") {
    return <p className="p-6 text-white">Checking session...</p>
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Continue with Google to access your account
        </p>
      </div>

      <Button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full h-12 text-sm font-medium bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-3 rounded-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />

        {loading ? "Redirecting..." : "Continue with Google"}
      </Button>
    </div>
  )
}