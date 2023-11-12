"use client";
import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if(value && fileType !== "pdf") {
    return (
        <div className="relative h-20 w-20">
            <Image 
                src={value}
                fill
                alt="value"
                className="rounded-full"
            />

            <button 
            type="button"
            onClick={()=> onChange("")} className="bg-rose-500 p-1 text-white rounded-full absolute top-0 right-0 shadow-sm">
                <X  className="h-4 w-4" />
            </button>
        </div>
    )
  }
 

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
