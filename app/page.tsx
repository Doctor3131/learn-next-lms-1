"use client"

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  async function Signout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
          toast.success("Signout Successfuly")
        },
        onError: (error) => {
          toast.error(error.error.message)
        }
      },
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500">Hello World</h1>
      <ThemeToggle />

      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button onClick={Signout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
