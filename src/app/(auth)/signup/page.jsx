"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, RadioGroup, Radio } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole, ArrowUpToLine } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
    // Form fields States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Attendee"); 
const plan = role === 'Organizer'?'organization_free':'attendee_free'
    // User Image States
    const [userImageUrl, setUserImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const redirectTo = "/dashboard"; 

    const toggleVisibility = () => setIsVisible(!isVisible);

   // upload user image
    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setImageError("File size exceeds 5MB");
                return;
            }
            setIsUploading(true);
        setImageError("");
        const formData = new FormData();
        formData.append('image', file);
            try{
                const IMGBB_API_KEY=process.env. NEXT_PUBLIC_IMAGE_API_KEY
const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,{
method:"POST",
body:formData
})
const data = await res.json()
console.log(data);
if(data.success){
    setUserImageUrl(data.data.url)
    setError('')
}else{
     setImageError("Upload failed. Try again.");
}
            }catch(err){
setImageError("Network error during image upload");
            }finally{
 setIsUploading(false);
            }
        }
           
    };

    // sign up
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
 console.log({ name, email, password, userImageUrl, role });
            const {data , error: authError}=await authClient.signUp.email({
              name, email, password, image: userImageUrl, role ,plan 
            })
           if(authError){
            setError(authError.message || "Something went wrong during signup.");
           }else{
            setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
              setUserImageUrl("")
              console.log(data);
           }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* Name Field */}
                    <TextField isRequired name="name" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>
                    
                    {/* User Profile Image Upload */}
                     <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Company Logo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleImageUpload} 
                                        className="hidden" 
                                    />
                                    {userImageUrl ? (
                                        <img src={userImageUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-300">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {imageError && <span className="text-xs text-danger mt-1">{imageError}</span>}
                                </div>
                            </div>
                        </div>
                   
                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {/* Select Role (HeroUI Standard Radio Component) */}
                    {/* select role */}
                        <div className="flex flex-col gap-4">
 <Label className="text-sm font-medium">
    Select Your Role
  </Label>
<RadioGroup defaultValue="Attendee" name="role" onChange={(value)=> setRole(value)} orientation="horizontal">
        <Radio value="Attendee">
          <Radio.Control className="w-5 h-5 rounded-full border border-gray-400">
            <Radio.Indicator />
          </Radio.Control >
          <Radio.Content>
            <Label>Attendee</Label>
           </Radio.Content>
        </Radio>
        <Radio value="Organizer">
          <Radio.Control className="w-5 h-5 rounded-full border border-gray-400">
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Organizer</Label>
           </Radio.Content>
        </Radio>
        </RadioGroup>
        </div>
                    {/* Dynamic Status Badges */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full bg-gradient-to-tr from-pink-500 to-indigo-500 font-semibold rounded-xl text-sm h-12  text-white transition-colors"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign Up
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href={`/signin?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
                            Sign in instead
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}