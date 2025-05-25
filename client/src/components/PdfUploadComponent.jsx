import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "./PdfUploadComponent.css";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";

// Set the workerSrc to the correct path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUploadComponent = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState("");
  const [showFullPdf, setShowFullPdf] = useState(false);

  // Admin credentials
  const adminUsername = "manmohan";
  const adminPassword = "123";

  useEffect(() => {
    // Retrieve PDF files from local storage on component mount
    const savedFiles = JSON.parse(localStorage.getItem("uploadedPdfs") || "[]");
    setFiles(savedFiles);
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      const newFile = { name: file.name, url: fileURL };
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);
      localStorage.setItem("uploadedPdfs", JSON.stringify(updatedFiles));
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setShowFullPdf(true);
  };

  const handleDelete = (fileToDelete) => {
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");
    if (username === adminUsername && password === adminPassword) {
      const updatedFiles = files.filter((file) => file !== fileToDelete);
      setFiles(updatedFiles);
      localStorage.setItem("uploadedPdfs", JSON.stringify(updatedFiles));
      // If the deleted file is the currently selected file, reset the selection
      if (selectedFile === fileToDelete) {
        setSelectedFile(null);
        setShowFullPdf(false);
      }
      setError(""); // Clear error message if any
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="pdf-upload-component">
      <h1>Upload and View PDFs</h1>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      {error && <div className="error">{error}</div>}
      <div className="pdf-list">
        {files.map((file, index) => (
          <div className="pdf-icon" key={index}>
            <FaFilePdf size={50} onClick={() => handleFileClick(file)} />
            <FaTrashAlt
              size={20}
              className="delete-icon"
              onClick={() => handleDelete(file)}
            />
            <p onClick={() => handleFileClick(file)}>{file.name}</p>
          </div>
        ))}
      </div>
      {showFullPdf && selectedFile && (
        <div className="pdf-viewer">
          <Document
            file={selectedFile.url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => setError(error.message)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfUploadComponent;
