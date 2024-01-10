"use client";

import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import PreviewPDF from "./preview-pdf";
import { cn } from "@/lib/utils";
import { UploadCloudIcon } from "lucide-react";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

interface Props {
  onDrop: (acceptedFiles: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
}

function Dropzone(props: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (props.onDrop) props.onDrop(acceptedFiles);
    },
    [props]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: props.multiple || false,
    maxSize: props.maxSize || 5 * 1024 * 1024,
    accept: props.accept || {
      "image/*": [],
    },
  });

  return (
    <div className="grid grid-cols-2 mt-5">
      <div
        {...getRootProps()}
        className={cn(
          acceptedFiles.length > 0 ? "col-span-1" : "col-span-2",
          "rounded-xl border-2 border-dashed grid place-content-center py-32"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>
            <p>Drop the file here ...</p>
          </div>
        ) : (
          <div>
            <UploadCloudIcon className="w-14 h-14 mx-auto" />
            <p>
              Drag &apos;n&apos; drop the file here, or click to select file
            </p>
          </div>
        )}
      </div>

      {fileRejections?.at(0) &&
        fileRejections?.at(0)?.errors.at(0)?.code === "file-too-large" && (
          <div className="text-center text-red-400 col-span-2 -mt-14">
            <p>File is too large, it must be less than 5MB</p>
          </div>
        )}

      <div>
        {acceptedFiles.length > 0 && (
          <div className="rounded-xl border-2 grid place-content-center py-10 max-w-[90%] mx-auto">
            <PreviewPDF file={acceptedFiles[0]} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
