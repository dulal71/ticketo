'use client';

import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    TextArea, 
    Label, 
    Input, 
    FieldError, 
    Button 
} from '@heroui/react';

// React Icons
import { FiUploadCloud, FiMail, FiGlobe, FiBriefcase, FiEdit2 } from 'react-icons/fi';
import Image from 'next/image';
import { addOrganization } from '@/lib/action/addOrganization';

// Layout Shared Style Constants
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const textAreaClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

const OrganizationForm = ({ organizer, initialOrganization }) => {
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState(initialOrganization?.logo || '');
    const [isUploading, setIsUploading] = useState(false);
    // Control view if organization already exists
    const [isEditing, setIsEditing] = useState(!initialOrganization);

    // Client-side Imgbb Upload Handler
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
            
            if (data.success) {
                setLogoUrl(data.data.url);
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during image upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const organizationName = formData.get('organizationName');
        const website = formData.get('website');
        const organizerEmail = formData.get('organizerEmail');
        const description = formData.get('description');

        // Validation checks
        const newErrors = {};
        if (!organizationName) newErrors.organizationName = "Organization name is required";
        if (!website) newErrors.website = "Website link is required";
        if (!organizerEmail) newErrors.organizerEmail = "Organizer email is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const organizationData = {
            organizerName: organizer.name,
            organizer_id: organizer.id,
            organizationName,
            website,
            organizerEmail,
            status: initialOrganization?.status || 'Pending', 
            description,
            logo: logoUrl
        };

        const res = await addOrganization(organizationData);
        if (res.insertedId) {
            alert("Form submitted successfully!");
            setIsEditing(false);
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            
            {/* Header Block */}
            <div className="border-b border-zinc-800 pb-6 mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-white">Organization Management</h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Set up and manage your company profile corporate presence.
                </p>
            </div>

            {/* IF ORGANIZATION EXISTS AND NOT IN EDIT MODE */}
            {!isEditing && initialOrganization ? (
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                            {initialOrganization.logo ? (
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                                    <Image src={initialOrganization.logo} alt="Org Logo" fill className="object-cover" />
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

                        {/* Status Badge */}
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
                                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                                    {initialOrganization.description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Edit Trigger Button */}
                    <div className="flex justify-end pt-6 mt-6 border-t border-zinc-800">
                        <Button 
                            onClick={() => setIsEditing(true)}
                            className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800 font-medium rounded-lg px-5 h-10 flex items-center gap-2 transition-all"
                        >
                            <FiEdit2 size={14} />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            ) : (
                /* SHOW REGISTRATION / EDIT FORM */
                <div className="bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                    <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">
                        <Fieldset className="space-y-6 w-full">
                            <legend className="text-lg font-medium text-zinc-300 border-b border-zinc-900 w-full pb-2 mb-2">
                                {initialOrganization ? "Modify Profile Details" : "Organization Profile Setup"}
                            </legend>

                            {/* ROW 1: Organization Name + Website */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField name="organizationName" defaultValue={initialOrganization?.organizationName || ""} isInvalid={!!errors.organizationName} className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Organization Name</Label>
                                    <Input placeholder="e.g. Creative Agency" className={textInputClass} />
                                    {errors.organizationName && <FieldError className="text-xs text-danger mt-1">{errors.organizationName}</FieldError>}
                                </TextField>

                                <TextField name="website" defaultValue={initialOrganization?.website || ""} isInvalid={!!errors.website} className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Website URL</Label>
                                    <div className="relative flex items-center">
                                        <span className="absolute left-3 text-zinc-600 text-sm font-medium select-none pointer-events-none border-r border-zinc-800 pr-2">
                                            https://
                                        </span>
                                        <Input placeholder="www.domain.com" className={`${textInputClass} pl-20`} />
                                    </div>
                                    {errors.website && <FieldError className="text-xs text-danger mt-1">{errors.website}</FieldError>}
                                </TextField>
                            </div>

                            {/* ROW 2: Organizer Email + Logo Upload Inline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <TextField name="organizerEmail" defaultValue={initialOrganization?.organizerEmail || ""} type="email" isInvalid={!!errors.organizerEmail} className="flex flex-col gap-1 w-full">
                                    <Label className="text-zinc-400 font-medium text-sm">Organizer Email</Label>
                                    <div className="relative flex items-center">
                                        <FiMail size={16} className="absolute left-3 text-zinc-600 pointer-events-none z-10" />
                                        <Input placeholder="admin@org.com" className={`${textInputClass} pl-10`} />
                                    </div>
                                    {errors.organizerEmail && <FieldError className="text-xs text-danger mt-1">{errors.organizerEmail}</FieldError>}
                                </TextField>

                                {/* Image Upload Component */}
                                <div className="flex flex-col gap-1 w-full">
                                    <span className="text-zinc-400 font-medium text-sm">Organization Logo</span>
                                    <div className="flex items-center gap-4 mt-1">
                                        <label className="w-14 h-14 border border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                            <input 
                                                type="file" 
                                                accept="image/png, image/jpeg" 
                                                onChange={handleLogoUpload} 
                                                className="hidden" 
                                            />
                                            {logoUrl ? (
                                                <Image width={56} height={56} src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <FiUploadCloud size={18} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                                            )}
                                        </label>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-zinc-300">
                                                {isUploading ? 'Uploading file...' : 'Upload logo'}
                                            </span>
                                            <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                            {errors.logo && <span className="text-xs text-danger mt-1">{errors.logo}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 3: Description TextArea */}
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-zinc-400 font-medium text-sm">Description</Label>
                                <TextArea
                                    name="description"
                                    defaultValue={initialOrganization?.description || ""}
                                    placeholder="Describe the organization's goals and vision..."
                                    rows={4}
                                    className={textAreaClass}
                                />
                            </div>
                        </Fieldset>

                        {/* Form Actions Buttons */}
                        <div className="flex justify-end gap-3 pt-5 border-t border-zinc-900 w-full">
                            {initialOrganization && (
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-transparent text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-900 font-medium rounded-lg px-5 h-11 transition-all"
                                >
                                    Cancel
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 transition-colors h-11"
                            >
                                {initialOrganization ? "Save Changes" : "Submit Information"}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default OrganizationForm;