"use client";

import { useState } from "react";
import { Button, InputGroup, Link } from "@heroui/react";
import { TextField, Label, Input } from "react-aria-components";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaCloudUploadAlt, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPhone, FaUser } from "react-icons/fa";
import Image from "next/image";
import { uploadUserImage } from "@/lib/action/uploadProfileImage";
import { toast } from "react-toastify";
import Loading from "./Loading";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    password: "", confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
    setIsLoading(true);

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!userImageUrl) newErrors.logo = "Profile image is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = "Passwords do not match!";
    if (!role) newErrors.role = "Please select a role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { error: authError } = await authClient.signUp.email({
        ...formData,
        status: "pending",
        role,
        plan,
        image: userImageUrl,
      });

      if (authError) {
        toast.error(authError.message || "Registration failed!");
      } else {
        toast.success("Account created successfully!");
        router.push(redirectTo);
      }
    } catch {
      toast.error("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const groupStyle = "flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-red-500 transition-colors";
  const inputStyle = "w-full bg-transparent py-2.5 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400";
  const labelStyle = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

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
          <div className="flex flex-col items-center border-b pb-6">
            <label className="w-20 h-20 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center cursor-pointer hover:border-red-400 overflow-hidden">
              <input type="file" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
              {userImageUrl
                ? <Image src={userImageUrl} width={80} height={80} alt="profile" className="rounded-full w-full h-full object-cover" />
                : <FaCloudUploadAlt size={24} className="text-zinc-400" />
              }
            </label>
            {errors.logo && <p className="text-red-500 text-xs mt-2">{errors.logo}</p>}
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <TextField className="flex flex-col gap-1.5">
              <Label className={labelStyle}>Full Name</Label>
              <InputGroup className={groupStyle}>
                <FaUser className="text-zinc-400 pointer-events-none shrink-0" size={13} />
                <Input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </InputGroup>
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </TextField>

            <TextField className="flex flex-col gap-1.5">
              <Label className={labelStyle}>Email</Label>
              <InputGroup className={groupStyle}>
                <FaEnvelope className="text-zinc-400 pointer-events-none shrink-0" size={13} />
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </InputGroup>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </TextField>

          </div>

          {/* Phone & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <TextField className="flex flex-col gap-1.5">
              <Label className={labelStyle}>Phone</Label>
              <InputGroup className={groupStyle}>
                <FaPhone className="text-zinc-400 pointer-events-none shrink-0" size={13} />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </InputGroup>
              {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </TextField>

            <div className="flex flex-col gap-2">
              <label className={labelStyle}>Choose Role</label>
              <div className="flex gap-2">
                {["Attendee", "Organizer"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRole(item)}
                    className={`px-6 py-2 w-full rounded-lg border text-sm font-medium transition-all ${
                      role === item
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-zinc-200 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <TextField className="flex flex-col gap-1.5">
              <Label className={labelStyle}>Password</Label>
              <InputGroup className={groupStyle}>
                <FaLock className="text-zinc-400 pointer-events-none shrink-0" size={13} />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-zinc-400 hover:text-zinc-600 transition shrink-0">
                  {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                </button>
              </InputGroup>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </TextField>

            <TextField className="flex flex-col gap-1.5">
              <Label className={labelStyle}>Confirm Password</Label>
              <InputGroup className={groupStyle}>
                <FaLock className="text-zinc-400 pointer-events-none shrink-0" size={13} />
                <Input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-zinc-400 hover:text-zinc-600 transition shrink-0">
                  {showConfirmPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
                </button>
              </InputGroup>
              {errors.confirm_password && <p className="text-xs text-red-500">{errors.confirm_password}</p>}
            </TextField>

          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center">
              <Loading />
            </div>
          )}

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
