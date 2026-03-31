"use client"
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '@/schemas/SignupSchema'
import { signup } from '@/features/auth/api'


type Inputs = z.infer<typeof SignupSchema>


function Signup() {
    const router = useRouter()

    const [status, setStatus] = useState<"error" | "success" | null>(null)

    const [message, setMessage] = useState("")


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },

    } = useForm<Inputs>({
        resolver: zodResolver(SignupSchema)
    })

    const onSubmit = async (data: Inputs) => {
        try {
            setStatus(null)
            setMessage("")

            // Create user in your DB
             await signup(data)
            setStatus("success")

            setTimeout(() => {
                router.replace(`/verify/${data.email}`);


            }, 1200);


        } catch (error: any) {
            console.log(error.message)
            setStatus("error")
            setMessage(error.message)
        }

    }


    return (
        <>
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Create a new account</CardTitle>


                </CardHeader>
                <CardContent>
                    {status && (
                        <Alert
                            variant={status === "error" ? "destructive" : "default"}
                            className="mb-4"
                        >
                            <AlertTitle>
                                {status === "success" ? "Signup successful" : message}
                            </AlertTitle>
                            <AlertDescription>
                                {status === "success" && "Redirecting you to home..."}
                            </AlertDescription>
                        </Alert>

                    )


                    }
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"

                                    placeholder="name"
                                    required
                                    {...register("username")}
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input id="password" type="password" required
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            {/* <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmpassword">Confirm Password</Label>

                                </div>
                                <Input id="confirmpassword" type="password" required />
                            </div> */}
                        </div>
                        <CardFooter className="flex-col gap-2 mt-10">
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Signup"}
                            </Button>

                        </CardFooter>
                    </form>
                </CardContent>

            </Card>



        </>
    )
}

export default Signup
