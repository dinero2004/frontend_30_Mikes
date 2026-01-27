"use client"
import { Button } from "@/components/ui/button/button"
import { Grid, GridItem } from "@/components/ui/grid/grid"
import { Input } from "@/components/ui/input/input"
import { Text } from "@/components/ui/text/text"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Login schema
const loginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  })

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("login", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: "/", // redirect target
      })

      // 🧪 DEBUG (remove later)
      console.log("SIGN IN RESULT:", result)

      if (result?.error) {
        toast.error("Invalid credentials")
        return
      }

      toast.success("Welcome back")

      router.replace(result?.url ?? "/")
    } catch (error) {
      console.error("LOGIN ERROR:", error)
      toast.error("Login failed")
    }
  }

  return (
    <form
      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
      className="min-h-svh flex items-center justify-center bg-black"
    >
      <Grid>
        <GridItem
          span={{ lg: 5, md: 7, sm: 12 }}
          offset={{ lg: 3.5, md: 2.5, sm: 0 }}
          className="
            flex flex-col gap-6
            bg-gray-900/90 backdrop-blur-md
            p-10 rounded-xl
            border border-white/10
            shadow-2xl
          "
        >
          {/* Title */}
          <Text className="text-center text-2xl font-bold tracking-wide text-[#DFAF44]">
            Operator Login
          </Text>

          {/* Username */}
          <Input
            {...loginForm.register("username")}
            id="username"
            label="Username"
            placeholder="Enter your username"
            error={loginForm.formState.errors.username?.message}
          />

          {/* Password */}
          <Input
            {...loginForm.register("password")}
            id="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            error={loginForm.formState.errors.password?.message}
          />

          {/* Button */}
          <Button
            label="Login"
            type="submit"
            textVariant="label-small"
            className="w-full mt-2"
          />
        </GridItem>
      </Grid>
    </form>
  )
}
