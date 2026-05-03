// 'use client'

// import { Button } from '@/components/ui/button';

// import {
//     Form,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';

// import { Input } from '@/components/ui/input';
// import { toast } from "sonner"


// import { useParams, useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// import { verifySchema } from '@/schemas/verifySchema';
// import { verification } from "@/features/auth/api";


// export default function VerifyAccount() {
//     const router = useRouter();
//     const params = useParams<{ email: string }>();
//     const form = useForm<z.infer<typeof verifySchema>>({
//         resolver: zodResolver(verifySchema),
//     });

//     const onSubmit = async (data: z.infer<typeof verifySchema>) => {
//         try {
//             const response = await verification({
//                 email: params.email, 
//                 code: data.code,
//             });


//             //  SUCCESS TOAST
//             toast.success(response.message);

//             router.replace('/');

//         } catch (error: any) {
//             // ERROR TOAST
//             toast.error(
//                 error.message ?? 'Verification failed. Please try again.'
//             );
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
//             <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
//                 <div className="text-center text-black dark:text-white">
//                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//                         Verify Your Account
//                     </h1>
//                     <p className="mb-4">
//                         Enter the verification code sent to your email
//                     </p>
//                 </div>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

//                         <FormField
//                             name="code"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Verification Code</FormLabel>
//                                     <Input {...field} />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <Button type="submit">Verify</Button>

//                     </form>
//                 </Form>
//             </div>
//         </div>
//     );
// }



export default function VerifyAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>This verification page is currently disabled.</p>
    </div>
  )
}