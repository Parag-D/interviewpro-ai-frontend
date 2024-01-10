import { useState } from "react";
import { Document, Page } from "react-pdf";

function PreviewPDF({ file }: { file: File }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      <Page
        key={`page_1`}
        pageNumber={1}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        height={200}
        width={200}
      />
    </Document>
  );
}

export default PreviewPDF;
