import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border px-4 py-1 text-sm text-muted-foreground">
          Simple link management app
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Save, organize, and manage your links with URLify.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          URLify helps you store important links, group them into folders,
          keep unsaved links separate, and access everything from one clean dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>

          
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-20 sm:grid-cols-3">
        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">Save Links</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add URLs with descriptions so you never lose useful resources.
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">Organize Folders</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Group links by topic, project, course, or anything you want.
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">Manage Easily</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Rename folders, delete links, and keep unsaved links separate.
          </p>
        </div>
      </section>
    </main>
  )
}