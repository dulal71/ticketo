// components/organizer/CreateOrganizationForm.js
'use client';

import React, { useState } from 'react';
import { Form, Fieldset, TextField, Label, Input, FieldError, Button, TextArea } from '@heroui/react';
import { FiUploadCloud, FiMail } from 'react-icons/fi';
import Image from 'next/image';
import { addOrganization } from '@/lib/action/addOrganization';

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

const CreateOrganizationForm = ({ organizer }) => {
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB" }));
            return;
        }

        setIsUploading(true);
        setErrors(prev => ({ ...prev, logo: null }));
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_API_KEY;
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.success) setLogoUrl(data.data.url);
            else setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during image upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        const organizationName = formData.get('organizationName');
        const website = formData.get('website');
        const organizerEmail = formData.get('organizerEmail');
        const description = formData.get('description');

        const newErrors = {};
        if (!organizationName) newErrors.organizationName = "Organization name is required";
        if (!website) newErrors.website = "Website link is required";
        if (!organizerEmail) newErrors.organizerEmail = "Organizer email is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        const organizationData = {
            organizerName: organizer?.name,
            organizer_id: organizer?.id,
            organizationName,
            website,
            organizerEmail,
            status: 'Pending', 
            description,
            logo: logoUrl
        };

        const res = await addOrganization(organizationData);
        if (res?.insertedId) {
            alert("Organization created successfully!");
            window.location.reload(); // ডাটা রিফ্রেশ করে প্রোফাইল ভিউতে যাওয়ার জন্য
        } else {
            alert("Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-3xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <div className="border-b border-zinc-800 pb-6 mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Organization Setup</h1>
                <p className="text-zinc-400 text-sm mt-1">Create your corporate profile presence to host events.</p>
            </div>

            <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                    <Fieldset className="space-y-6 w-full">
                        <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">New Profile Details</legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField name="organizationName" isInvalid={!!errors.organizationName} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Organization Name</Label>
                                <Input placeholder="e.g. Creative Agency" className={textInputClass} required />
                                {errors.organizationName && <FieldError className="text-xs text-danger mt-1">{errors.organizationName}</FieldError>}
                            </TextField>

                            <TextField name="website" isInvalid={!!errors.website} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 text-zinc-600 text-sm font-medium border-r border-zinc-800 pr-2 select-none pointer-events-none">https://</span>
                                    <Input placeholder="www.domain.com" className={`${textInputClass} pl-20`} required />
                                </div>
                                {errors.website && <FieldError className="text-xs text-danger mt-1">{errors.website}</FieldError>}
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <TextField name="organizerEmail" type="email" isInvalid={!!errors.organizerEmail} className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Organizer Email</Label>
                                <div className="relative flex items-center">
                                    <FiMail size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                    <Input placeholder="admin@org.com" className={`${textInputClass} pl-10`} required />
                                </div>
                                {errors.organizerEmail && <FieldError className="text-xs text-danger mt-1">{errors.organizerEmail}</FieldError>}
                            </TextField>

                            <div className="flex flex-col gap-1 w-full">
                                <span className="text-zinc-400 font-medium text-sm">Organization Logo</span>
                                <div className="flex items-center gap-4 mt-1">
                                    <label className="w-14 h-14 border border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                        <input type="file" accept="image/png, image/jpeg" onChange={handleLogoUpload} className="hidden" />
                                        {logoUrl ? <Image width={56} height={56} src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" /> : <FiUploadCloud size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />}
                                    </label>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-zinc-300">{isUploading ? 'Uploading file...' : 'Upload logo'}</span>
                                        <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                        {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-400 font-medium text-sm">Description</Label>
                            <TextArea name="description" placeholder="Describe the organization's goals and vision..." rows={4} className={textAreaClass} />
                        </div>
                    </Fieldset>

                    <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                        <Button type="submit" isLoading={isSubmitting} className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11">
                            Create Profile
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateOrganizationForm;