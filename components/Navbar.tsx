"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Menubar from "./Menubar" 
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Navbar() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const authStatus = status === "authenticated"
  const userName = session?.user?.name ?? ""

  const handleLogout = async () => {
      await signOut({ redirect: false })  // don't auto redirect
  router.replace("/")  
  router.refresh()               
  }

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b">

      {/* LEFT */}
      <div className="flex items-center gap-5">
        <div className="font-semibold text-lg hidden sm:block">
          URLify
        </div>

        {authStatus && <Menubar />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {authStatus && (
          <div className="flex gap-2 items-center">
            <User size={18} />
            <span className="font-medium">{userName}</span>
          </div>
        )}

        {!authStatus ? (
          <Button asChild size="lg" className="hover:cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" className="hover:cursor-pointer">
                Logout
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to logout?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to log in again to access your account.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Yes, logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

      </div>
    </nav>
  )
}