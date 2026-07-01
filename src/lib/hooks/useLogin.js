"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { sendEmail } from "@/lib/api/sendEmil";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const login = async ({
    name,
    email,
    password,
    redirectTo
   
  }) => {
    setIsLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
                email ,
                password
               
            });


      if (authError) {
        toast.error(authError.message || "Registration failed!");
        return false;
      }
      toast.success("Account created successfully!");
     router.push(redirectTo);

      return true;
    } catch (error) {
        console.log(error);
      toast.error("An unexpected network error occurred.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}