"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Menubar from "./Menubar" 

export default function Navbar() {
  const { data: session, status } = useSession()

  const authStatus = status === "authenticated"
  const userName = session?.user?.name ?? ""

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b">

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <div className="font-semibold text-lg">URLify</div>

        {/*  SHOW MENUBAR ONLY WHEN LOGGED IN */}
        {authStatus && <Menubar />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* USER INFO */}
        {authStatus && (
          <div className="flex gap-2 items-center">
            <User size={18} />
            <span className="font-medium">{userName}</span>
          </div>
        )}

        {/* AUTH BUTTON */}
        {!authStatus ? (
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <Button onClick={handleLogout} size="lg">
            Logout
          </Button>
        )}

      </div>
    </nav>
  )
}