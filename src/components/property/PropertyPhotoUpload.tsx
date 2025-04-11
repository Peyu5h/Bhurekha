"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Image as ImageIcon,
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "~/lib/utils";

interface PropertyPhotoUploadProps {
  onPhotoUploaded: (photos: File[]) => void;
  maxPhotos?: number;
}

const PropertyPhotoUpload = ({
  onPhotoUploaded,
  maxPhotos = 8,
}: PropertyPhotoUploadProps) => {
  const [photos, setPhotos] = useState<Array<{ file: File; preview: string }>>(
    [],
  );
  const [currentPreview, setCurrentPreview] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPhotos = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
      setPhotos(updatedPhotos);
      onPhotoUploaded(updatedPhotos.map((p) => p.file));
    },
    [photos, maxPhotos, onPhotoUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5242880, // 5MB
  });

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotoUploaded(updatedPhotos.map((p) => p.file));
    if (currentPreview === index) {
      setCurrentPreview(null);
    }
  };

  const nextPreview = () => {
    if (currentPreview === null || currentPreview === photos.length - 1) {
      setCurrentPreview(0);
    } else {
      setCurrentPreview(currentPreview + 1);
    }
  };

  const prevPreview = () => {
    if (currentPreview === null || currentPreview === 0) {
      setCurrentPreview(photos.length - 1);
    } else {
      setCurrentPreview(currentPreview - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
          isDragActive
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:bg-muted/50",
        )}
      >
        <input {...getInputProps()} />
        <Upload
          className={cn(
            "h-8 w-8 transition-colors",
            isDragActive ? "text-primary" : "text-muted-foreground",
          )}
        />
        <p className="mt-2 text-sm font-medium">
          {isDragActive
            ? "Drop your photos here"
            : "Drag & drop photos here, or click to select"}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          Maximum {maxPhotos} photos, up to 5MB each
        </p>
      </div>

      {photos.length > 0 && (
        <>
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            {currentPreview !== null ? (
              <>
                <img
                  src={photos[currentPreview].preview}
                  alt={`Preview ${currentPreview + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => removePhoto(currentPreview)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute right-3 bottom-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                    onClick={prevPreview}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 h-8 w-8 rounded-full backdrop-blur-sm"
                    onClick={nextPreview}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-background/80 absolute bottom-3 left-3 rounded-md px-2 py-1 backdrop-blur-sm">
                  <p className="text-xs">
                    {currentPreview + 1} of {photos.length}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="text-muted-foreground/50 mx-auto h-8 w-8" />
                  <p className="text-muted-foreground mt-2 text-sm">
                    Select a photo to preview
                  </p>
                </div>
              </div>
            )}
          </div>

          <ScrollArea className="h-24">
            <div className="flex gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={cn(
                    "group hover:ring-primary/50 relative aspect-square h-24 cursor-pointer overflow-hidden rounded-md border transition-all hover:ring-2",
                    currentPreview === index && "ring-primary ring-2",
                  )}
                  onClick={() => setCurrentPreview(index)}
                >
                  <img
                    src={photo.preview}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="bg-background/80 absolute inset-0 hidden items-center justify-center backdrop-blur-[2px] group-hover:flex">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default PropertyPhotoUpload;
