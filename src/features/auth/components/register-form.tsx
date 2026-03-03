"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"

const registerSchema = z.object({
    email: z.email("Please Enter a Valid Email Address"),
    password: z.string().min(1, "Password is Required"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't Match",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {

    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (values: RegisterFormValues) => {
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    router.push("/");
                    toast.success("Registration Success")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )
    }

    const signInGithub = async () => {
        await authClient.signIn.social({
            provider: "github",
        }, {
            onSuccess: () => {
                router.push("/");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        });
    };

    const signInGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        }, {
            onSuccess: () => {
                router.push("/");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        });
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Create Your Account to Get Started</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                    variant={"outline"}
                                    className="w-full"
                                    type="button"
                                    onClick={signInGoogle}
                                    disabled={isPending}
                                    >
                                    <Image alt="Google" src={"/images/google.svg"} width={20} height={20}/>
                                        Continue With Google
                                    </Button>
                                    <Button
                                    variant={"outline"}
                                    className="w-full"
                                    type="button"
                                    onClick={signInGithub}
                                    disabled={isPending}
                                    >
                                        <Image alt="Github" src={"/images/github.svg"} width={20} height={20}/>
                                        Continue With Github
                                    </Button>
                                </div>
                                <div className="grid gap-6">
                                    <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="email"
                                                placeholder="johndoe@example.com"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="password"
                                                placeholder="••••••"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                type="password"
                                                placeholder="••••••"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        Register
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already Have an Account ?{" "}
                                    <Link href={"/login"} className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}