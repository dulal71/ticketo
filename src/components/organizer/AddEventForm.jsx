"use client";

import React, { useState } from "react";
import { 
  Input, 
  Select, 
  Label,
  ListBox,
  Button, 
} from "@heroui/react";
import { 
  FiCalendar, 
  FiMapPin, 
  FiDollarSign, 
  FiUsers, 
  FiPlusCircle 
} from "react-icons/fi";

import { addEvent } from "@/lib/action/addEvent";
import { LuArrowUpToLine } from "react-icons/lu";

export default function AddEventForm({organization}) {
  const [bannerImage,setBannerImage]=useState("")
   const [imageError, setImageError] = useState("");
   const [isUploading, setIsUploading] = useState("");
  const [formData, setFormData] = useState({
title: "",
    category: "tech", 
    location: "",
    date: "",
    ticketPrice: "",
    seats: "",
    status: "pending",
  });
  
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
   setBannerImage(data.data.url)
    setImageError('')
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, bannerImage: e.target.files[0] }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const eventData ={
      ...formData,
     organization_id:organization._id,
      bannerImage
    }
    const res = await addEvent(eventData)
if(res.insertedId){
  alert('Add Event Successfully')
}else{
  alert('something went wrong try again')
}
  };

  // Dark Premium Theme Classes 
 
  const textInputClass = "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
  const triggerClasses = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none data-[focused=true]:border-zinc-600";
  const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";
  const listItemClasses = "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none data-[focused=true]:bg-zinc-800";

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
        
        {/* Form Header block */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Create New Event</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Fill in the details below to host your event.
          </p>

          {/* Event Status Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
            Initial Status: <span className="font-medium bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-900/50 text-amber-500 capitalize">{formData.status}</span>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-zinc-400 font-medium text-sm">Event Title</Label>
            <Input
              required
              name="title"
              placeholder="e.g., Tech Innovators Summit 2026"
              value={formData.title}
              onChange={handleInputChange}
              className={textInputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        <div className="flex flex-col gap-1 w-full">
            <Label className="text-zinc-400 font-medium text-sm">category</Label>
            <Input
              required
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleInputChange}
              className={textInputClass}
            />
          </div>
          

            {/* Date */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Event Date & Time</Label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                <Input
                  required
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`${textInputClass} pl-10 [color-scheme:dark]`}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1 w-full">
            <Label className="text-zinc-400 font-medium text-sm">Location</Label>
            <div className="relative flex items-center">
              <FiMapPin className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
              <Input
                required
                name="location"
                placeholder="e.g., Grand Ballroom, New York or Virtual"
                value={formData.location}
                onChange={handleInputChange}
                className={`${textInputClass} pl-10`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Price */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Ticket Price</Label>
              <div className="relative flex items-center">
                <FiDollarSign className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                <Input
                  required
                  type="number"
                  name="ticketPrice"
                  placeholder="0.00"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className={`${textInputClass} pl-10 pr-12`}
                />
                <span className="absolute right-3 text-zinc-600 text-xs font-medium pointer-events-none select-none z-10">
                  USD
                </span>
              </div>
            </div>

            {/* Total Seats */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Total Seats / Capacity</Label>
              <div className="relative flex items-center">
                <FiUsers className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                <Input
                  required
                  type="number"
                  name="seats"
                  placeholder="e.g., 150"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className={`${textInputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Banner Image Upload */}
          <div className="flex flex-col gap-1 w-full">
                            <span className="text-zinc-400 font-medium text-sm">Event Image</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-60 h-14 border border-dashed border-zinc-700 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleImageUpload} 
                                        className="hidden" 
                                    />
                                    {bannerImage ? (
                                        <img src={bannerImage} alt="Logo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <LuArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
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

          <p className="text-xs text-zinc-500 italic pt-2">
            * Newly created events are automatically set to pending status until admin approval.
          </p>

          {/* Form Actions / Submit Button */}
          <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800 w-full">
            <Button 
              type="submit" 
              className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11 flex items-center gap-2"
            >
              Submit Event
              <FiPlusCircle size={16} />
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}