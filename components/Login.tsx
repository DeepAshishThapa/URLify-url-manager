"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/schemas/signInSchema"

import { z } from "zod"
import {useSession,signIn} from "next-auth/react"
import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Inputs = z.infer<typeof signInSchema>

function Login() {
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [message, setMessage] = useState("")

    const router = useRouter()
    const { data: session } = useSession()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(signInSchema)
    })

    // ✅ Auto redirect if already logged in
    useEffect(() => {
        if (session) {
            router.push("/home")
        }
    }, [session, router])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.identifier,
                password: data.password,
            })

            if (result?.error) {
                setStatus("error")
                setMessage(result.error)
                return
            }

            setStatus("success")

            setTimeout(() => {
                router.push("/home")
            }, 1200)

        } catch (error: any) {
            setStatus("error")
            setMessage("Something went wrong")
        }
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your credentials to login
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status && (
                    <Alert
                        variant={status === "error" ? "destructive" : "default"}
                        className="mb-4"
                    >
                        <AlertTitle>
                            {status === "success" ? "Login successful" : message}
                        </AlertTitle>
                        <AlertDescription>
                            {status === "success" && "Redirecting you to home..."}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">

                        {/* Identifier */}
                        <div className="grid gap-2">
                            <Label htmlFor="identifier">Email </Label>
                            <Input
                                id="identifier"
                                type="text"
                                placeholder="Enter email"
                                {...register("identifier")}
                            />
                            {errors.identifier && (
                                <p className="text-sm text-red-500">
                                    {errors.identifier.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                    </div>

                    <CardFooter className="flex-col gap-2 mt-10">
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default Login
