export  const validateLogin=(formData)=>{
const newErrors = {};
   
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
   return newErrors;
}