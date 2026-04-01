"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
// import Menubar from "./Menubar"
import { User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
// import Popup from "./Popup"

import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: session, status } = useSession()

  const authStatus = status === "authenticated"
  const userName = session?.user?.name ?? ""

  const hideAddLinkRoutes = ["/login", "/signup"]
  const showAddLink = !hideAddLinkRoutes.includes(pathname)

  const authcomps = [
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Signup", path: "/signup", active: !authStatus },
    { name: "Logout", path: "/", active: authStatus }
  ]

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/"
    })
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b">
      
      <div className="flex items-center gap-5">
        {/* {authStatus && (
          <>
            <Menubar />
            {showAddLink && <Popup />}
          </>
        )} */}
      </div>

      <div className="flex items-center gap-5">
        
        {userName && (
          <div className="flex gap-2 items-center">
            <User />
            <div className="font-bold">{userName}</div>
          </div>
        )}

        {authcomps
          .filter((i) => i.active)
          .map((i) =>
            i.name === "Logout" ? (
              <Button key={i.name} onClick={handleLogout} size="lg">
                {i.name}
              </Button>
            ) : (
              <Button key={i.name} size="lg" asChild>
                <Link href={i.path}>{i.name}</Link>
              </Button>
            )
          )}
      </div>
    </nav>
  )
}