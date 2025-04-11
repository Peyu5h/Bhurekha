"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "~/components/ui/button";
import { FileText, Upload, X, Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";

interface DocumentUploadProps {
  title: string;
  description: string;
  required?: boolean;
  onUploadComplete: () => void;
}

const DocumentUpload = ({
  title,
  description,
  required = false,
  onUploadComplete,
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;

      setFile(selectedFile);
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onUploadComplete();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    },
    [onUploadComplete],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <div className="relative rounded-lg border p-4">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
            isDragActive
              ? "border-primary/50 bg-primary/5"
              : "border-muted-foreground/25 hover:bg-muted/50",
          )}
        >
          <input {...getInputProps()} />
          <Upload
            className={cn(
              "h-6 w-6 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground",
            )}
          />
          <p className="mt-2 text-sm font-medium">
            {isDragActive
              ? "Drop your file here"
              : "Click to upload or drag & drop"}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">PDF up to 5MB</p>
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-muted-foreground text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {isUploading && (
                <div className="mt-2 w-48">
                  <Progress value={uploadProgress} className="h-1" />
                </div>
              )}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        {required && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              uploadProgress === 100
                ? "bg-green-50 text-green-600"
                : "bg-yellow-50 text-yellow-600",
            )}
          >
            {uploadProgress === 100 ? (
              <>
                <Check className="h-3 w-3" /> Uploaded
              </>
            ) : (
              "Required"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
