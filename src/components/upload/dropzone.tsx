"use client";

import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import PreviewPDF from "./preview-pdf";
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
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="rounded-xl border-2 border-dashed grid place-content-center py-32 max-w-[90%] mx-auto my-20">
            <p>Drop the file here ...</p>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed grid place-content-center py-32 max-w-[90%] mx-auto my-20">
            <p>
              Drag &apos;n&apos; drop the file here, or click to select file
            </p>
          </div>
        )}
      </div>

      <div className="text-center text-red-400">
        {fileRejections?.at(0) &&
          fileRejections?.at(0)?.errors.at(0)?.code === "file-too-large" && (
            <p>File is too large, it must be less than 5MB</p>
          )}
      </div>

      <div>
        {acceptedFiles.length > 0 && (
          <div className="rounded-xl border-2 border-dashed grid place-content-center py-10 max-w-[90%] mx-auto my-20">
            <PreviewPDF file={acceptedFiles[0]} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dropzone;
