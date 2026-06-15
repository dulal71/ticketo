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
  FiTag, 
  FiDollarSign, 
  FiUsers, 
  FiImage, 
  FiPlusCircle 
} from "react-icons/fi";

export default function AddEventForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    ticketPrice: "",
    seats: "",
    bannerImage: null,
    status: "pending",
  });

  const categories = [
    { label: "Music", value: "music" },
    { label: "Tech", value: "tech" },
    { label: "Sports", value: "sports" },
    { label: "Arts", value: "arts" },
    { label: "Business", value: "business" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, bannerImage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Event Data:", formData);
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
              isRequired
              name="title"
              placeholder="e.g., Tech Innovators Summit 2026"
              value={formData.title}
              onChange={handleInputChange}
              className={textInputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Select */}
            <Select 
              className="w-full" 
              placeholder="Select a category"
              isRequired
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0];
                setFormData(prev => ({ ...prev, category: selectedValue }));
              }}
            >
              <Label className="text-zinc-400 font-medium text-sm mb-1 block">Category</Label>
              <Select.Trigger className={triggerClasses} startContent={<FiTag className="text-zinc-600 mr-1" />}>
                <Select.Value className="text-white placeholder:text-zinc-600" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  {categories.map((cat) => (
                    <ListBox.Item id={cat.value} textValue={cat.label} key={cat.value} className={listItemClasses}>
                      {cat.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Date */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Event Date & Time</Label>
              <div className="relative flex items-center">
                <FiCalendar className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                <Input
                  isRequired
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
                isRequired
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
                  isRequired
                  type="number"
                  name="ticketPrice"
                  placeholder="0.00"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className={`${textInputClass} pl-10 pr-12`}
                  endContent={<span className="absolute right-3 text-zinc-600 text-xs">USD</span>}
                />
              </div>
            </div>

            {/* Total Seats */}
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-zinc-400 font-medium text-sm">Total Seats / Capacity</Label>
              <div className="relative flex items-center">
                <FiUsers className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                <Input
                  isRequired
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
          <div className="flex flex-col gap-2 w-full">
            <Label className="text-zinc-400 font-medium text-sm">
              Banner Image <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed rounded-xl cursor-pointer border-zinc-800 hover:border-zinc-600 bg-[#1c1c1e]/50 hover:bg-[#242426]/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiImage className="w-8 h-8 text-zinc-600 mb-2" />
                  <p className="text-sm text-zinc-400">
                    {formData.bannerImage ? formData.bannerImage.name : "Click to upload event banner"}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  required
                  onChange={handleFileChange} 
                />
              </label>
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