export  const validateSignup=({formData, role, userImageUrl})=>{
const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!userImageUrl) newErrors.logo = "Profile image is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = "Passwords do not match!";
    if (!role) newErrors.role = "Please select a role";
  return newErrors;
}