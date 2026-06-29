"use client";

import { useState } from "react";
import { Button,  Link } from "@heroui/react";
import { FaEnvelope,  FaPhone, FaUser } from "react-icons/fa";
import { uploadUserImage } from "@/lib/action/uploadProfileImage";
import { toast } from "react-toastify";
import ImageUploader from "@/components/auth/ImageUploader";
import TextInput from "@/components/auth/TextInput";
import RoleSelector from "@/components/auth/RoleSelector";
import PasswordField from "@/components/auth/PasswordField";
import useSignup from "@/lib/hooks/useSignup";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    password: "", confirm_password: "",
  });
  const {signup,isLoading}=useSignup()
  const [errors, setErrors] = useState({});
const [role, setRole] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const redirectTo = "/";
  const plan = role === "Organizer" ? "organization_free" : "attendee_free";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      return;
    }
    setIsUploading(true);
    try {
      const imageUrl = await uploadUserImage(file);
      setUserImageUrl(imageUrl);
      toast.success("Image uploaded successfully");
      setErrors(prev => ({ ...prev, logo: "" }));
    } catch {
      setErrors(prev => ({ ...prev, logo: "Network error during upload" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
   const errors=validateSignup({
    formData,
    role,
    userImageUrl})

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
     return;
    }

    await signup({
        formData,
    role,
    plan,
    userImageUrl,
    redirectTo,
    })
  };

return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full md:max-w-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 rounded-xl">

        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">

          {/* Profile Image Upload */}
          <ImageUploader userImageUrl={userImageUrl} isUploading={isUploading} error={errors.logo} handleImageUpload={handleImageUpload}></ImageUploader>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

          {/* Phone & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
           <TextInput
               label="Phone"
  name="phone"
  type="tel"
  placeholder="+1 234 567 890"
  value={formData.phone}
  onChange={handleChange}
  error={errors.phone}
  icon={
    <FaPhone
      className="text-zinc-400 pointer-events-none shrink-0"
      size={13}
    />
                }
              />
            {/* Role Selector */}
             <RoleSelector role={role} setRole={setRole} error={errors.role}></RoleSelector>
         </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <PasswordField
    label="Password"
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    onChange={handleChange}
    error={errors.password}
  />

  <PasswordField
    label="Confirm Password"
    name="confirm_password"
    placeholder="Repeat your password"
    value={formData.confirm_password}
    onChange={handleChange}
    error={errors.confirm_password}
  />
          </div>
          {/* Submit */}
          <Button
            type="submit"
            color="primary"
            className="w-full bg-gradient-to-tr from-pink-500 to-indigo-500 font-semibold rounded-xl text-sm h-12 text-white"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Sign Up
          </Button>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link href={`/signin?redirect=${redirectTo}`} className="font-medium cursor-pointer text-sm text-blue-600 dark:text-blue-400">
              Sign in instead
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
