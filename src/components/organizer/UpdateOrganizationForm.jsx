
'use client';

import React, { useState } from 'react';
import { Form, Fieldset, TextField, Label, Input, FieldError, Button, TextArea } from '@heroui/react';
import { FiUploadCloud, FiMail, FiGlobe, FiBriefcase, FiEdit2 } from 'react-icons/fi';
import Image from 'next/image';
import { addOrganization } from '@/lib/action/addOrganization'; // আপনার আপডেট অ্যাকশন থাকলে সেটি এখানে ব্যবহার করতে পারেন
import { useRouter } from 'next/navigation';

const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

const UpdateOrganizationForm = ({ organizer, initialOrganization }) => {
   const router = useRouter()
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(initialOrganization?.logo || '');
    const [isUploading, setIsUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
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
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Image upload failed" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const organizationData = {
            organizerName: organizer?.name,
            organizer_id: organizer?.id,
            organizationName: formData.get('organizationName'),
            website: formData.get('website'),
            organizerEmail: formData.get('organizerEmail'),
            status: initialOrganization?.status || 'Pending',
            description: formData.get('description'),
            logo: logoUrl
        };

        const res = await addOrganization(organizationData);
        if (res) {
            alert("Profile updated successfully!");
            setIsEditing(false);
           router.refresh();
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-3xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <div className="border-b border-zinc-800 pb-6 mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Organization Management</h1>
                <p className="text-zinc-400 text-sm mt-1">Set up and manage your company corporate presence.</p>
            </div>

          {/* profile */}
            {!isEditing ? (
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                            {logoUrl ? (
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                                    <Image src={logoUrl} alt="Org Logo" fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500">
                                    <FiBriefcase size={24} />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-zinc-200">{initialOrganization.organizationName}</h3>
                                <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                                    <FiGlobe size={14} className="text-zinc-600" />
                                    <a href={`https://${initialOrganization.website}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-zinc-300">
                                        {initialOrganization.website}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <span className={`text-xs font-medium px-2.5 py-1 rounded border ${
                            initialOrganization.status === 'Pending' 
                                ? 'text-amber-500 bg-amber-950/20 border-amber-900/50' 
                                : initialOrganization.status === 'Rejected' 
                                ? 'text-red-500 bg-red-950/20 border-red-900/50' 
                                : 'text-emerald-500 bg-emerald-950/20 border-emerald-900/50'
                        }`}>
                            {initialOrganization.status}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-medium text-zinc-500 block uppercase tracking-wider">Organizer Contact</span>
                            <span className="text-sm text-zinc-300 flex items-center gap-2 mt-1">
                                <FiMail className="text-zinc-600" /> {initialOrganization.organizerEmail}
                            </span>
                        </div>

                        {initialOrganization.description && (
                            <div>
                                <span className="text-xs font-medium text-zinc-500 block uppercase tracking-wider">About Organization</span>
                                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{initialOrganization.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-6 mt-6 border-t border-zinc-800">
                        <Button onClick={() => setIsEditing(true)} className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800 font-medium rounded-lg px-5 h-10 flex items-center gap-2 transition-all">
                            <FiEdit2 size={14} /> Edit Profile
                        </Button>
                    </div>
                </div>
            ) : 
            
      // edit mode      
            (
 
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                    <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                        <Fieldset className="space-y-6 w-full">
                            <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">Modify Profile Details</legend>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField name="organizationName" defaultValue={initialOrganization?.organizationName} className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Organization Name</Label>
                                    <Input className={textInputClass} required />
                                </TextField>

                                <TextField name="website" defaultValue={initialOrganization?.website} className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-3 text-zinc-600 text-sm font-medium border-r border-zinc-800 pr-2 select-none pointer-events-none">https://</span>
                                        <Input className={`${textInputClass} pl-20`} required />
                                    </div>
                                </TextField>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <TextField name="organizerEmail" defaultValue={initialOrganization?.organizerEmail} type="email" className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Organizer Email</Label>
                                    <div className="relative flex items-center">
                                        <FiMail size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                        <Input className={`${textInputClass} pl-10`} required />
                                    </div>
                                </TextField>

                                <div className="flex flex-col gap-1 w-full">
                                    <span className="text-zinc-400 font-medium text-sm">Organization Logo</span>
                                    <div className="flex items-center gap-4 mt-1">
                                        <label className="w-14 h-14 border border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                            <input type="file" accept="image/png, image/jpeg" onChange={handleLogoUpload} className="hidden" />
                                            {logoUrl ? <Image width={56} height={56} src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" /> : <FiUploadCloud size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />}
                                        </label>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-zinc-300">{isUploading ? 'Uploading file...' : 'Change logo'}</span>
                                            <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Description</Label>
                                <TextArea name="description" defaultValue={initialOrganization?.description} rows={4} className={textAreaClass} />
                            </div>
                        </Fieldset>

                        <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                            <Button type="button" onClick={() => setIsEditing(false)} className="bg-transparent text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900 font-medium rounded-lg px-5 h-11 transition-all">
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting} className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11">
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default UpdateOrganizationForm;