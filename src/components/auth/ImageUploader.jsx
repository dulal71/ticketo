import Image from 'next/image';
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ImageUploader = ({handleImageUpload,
    userImageUrl,
    isUploading,
    error

}) => {
    return (
        <div className="flex flex-col items-center border-b pb-6">
                    <label className="w-20 h-20 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center cursor-pointer hover:border-red-400 overflow-hidden">
                      <input type="file"
                       className="hidden"
                        onChange={handleImageUpload} 
                        disabled={isUploading} />
                      {userImageUrl
                        ? <Image src={userImageUrl}
                         width={80} 
                         height={80} 
                         alt="profile" 
                         className="rounded-full w-full h-full object-cover" />
                        : <FaCloudUploadAlt size={24} className="text-zinc-400" />
                      }
                    </label>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                  </div>
    );
};

export default ImageUploader;