"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { sendEmail } from "@/lib/api/sendEmil";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signup = async ({
    formData,
    role,
    plan,
    userImageUrl,
    redirectTo,
  }) => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        ...formData,
        status: "pending",
        role,
        plan,
        image: userImageUrl,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return false;
      }

      await sendEmail({
        email: formData.email,
        name: formData.name,
      });

      toast.success("Account created successfully!");

      router.push(redirectTo);

      return true;
    } catch {
      toast.error("An unexpected network error occurred.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
  };
}