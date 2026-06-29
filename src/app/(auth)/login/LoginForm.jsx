"use client";

import { useState } from "react";
import { Card, Button, Link} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import TextInput from "@/components/auth/TextInput";
import { FaEnvelope, FaUser } from "react-icons/fa";
import PasswordField from "@/components/auth/PasswordField";
import useLogin from "@/lib/hooks/useLogin";
import { validateLogin } from "@/lib/utils/validateLogin";


const LoginForm = () => {
  
     const searchParams=useSearchParams()
    const redirectTo=searchParams.get("redirect") || "/"
  const  {login,isLoading,}=useLogin()
    // Form fields
 const [formData, setFormData] = useState({
    name: "", email: "",password: "",
  });
   
const [errors, setErrors] = useState({});
   
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
     setErrors(prev => ({...prev, [name]: "",}));
};
    const handleSignin = async (e) => {
        e.preventDefault();
const validationErrors=validateLogin(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
     return;
    }

const success= await login({
    name:formData.name,
        email: formData.email,
         password: formData.password,
    redirectTo,
   
    })
    if(success){
        setErrors({})
    }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Welcome back</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your credentials to access your account</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignin} className="flex flex-col gap-5">
                {/* Name */}
                <div className="grid grid-cols-1  gap-3">
            <TextInput 
            label="Full Name"
           name='name'
            type='text'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon={
               <FaUser
      className="text-zinc-400 pointer-events-none shrink-0"
      size={13}
    /> 
            }
            ></TextInput>

            <TextInput
              label="Email"
               name="email"
               type="email"
             placeholder="you@example.com"
             value={formData.email}
              onChange={handleChange}
             error={errors.email}
           icon={
              <FaEnvelope
                  className="text-zinc-400 pointer-events-none shrink-0"
                    size={13}
                        />
                         }
                        />
            </div>

                    {/* Password Field */}
                    <PasswordField
                 label="Password"
                 name="password"
                 placeholder="Enter Password"
                 value={formData.password}
                 onChange={handleChange}
                 error={errors.password}
                      />
{/* Action Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold rounded-xl text-sm h-12"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        New to HireLoop?{" "}
                        <Link href={`/signup?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Create an account
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
};

export default LoginForm;