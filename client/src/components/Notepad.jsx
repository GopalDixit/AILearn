// // App.js

// import React, { useState, useEffect } from "react";
// import { FaFileDownload } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";

// function Notepad() {
//   const [text, setText] = useState("");
//   const [fileName, setFileName] = useState("note");
//   const [saveCounter, setSaveCounter] = useState(0);
//   const [savedFiles, setSavedFiles] = useState([]);
//   const [textAreaContent, setTextAreaContent] = useState("");

//   // Load saved notes from local storage when the component mounts
//   useEffect(() => {
//     const files = Object.keys(localStorage).filter((key) =>
//       key.endsWith(".txt")
//     );
//     setSavedFiles(files);
//     const savedNote = localStorage.getItem("note");
//     if (savedNote) {
//       setText(savedNote);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleSave = () => {
//     const newFileName = window.prompt("Enter file name:", fileName) || fileName;
//     localStorage.setItem(`${newFileName}.txt`, text);
//     setSaveCounter(saveCounter + 1);
//     setFileName(newFileName);
//     setSavedFiles([...savedFiles, `${newFileName}.txt`]);
//     console.log("Note saved:", text);
//     alert("Note saved successfully!");
//   };

//   const handleDownload = (fileName) => {
//     const fileContent = localStorage.getItem(fileName);
//     const element = document.createElement("a");
//     const file = new Blob([fileContent], { type: "text/plain" });
//     element.href = URL.createObjectURL(file);
//     element.download = fileName;
//     document.body.appendChild(element); // Required for this to work in FireFox
//     element.click();
//   };
//   const handleDelete = (fileName) => {
//     let f = confirm("Are You Sure  want to delete this file ");
//     if (f) {
//       localStorage.removeItem(fileName);
//       setSavedFiles(savedFiles.filter((file) => file !== fileName));
//     }
//   };
//   const handleAddTextArea = () => {
//     let f = confirm("First Save file other wise your content is losted ");
//     if (f) {
//       setText("");
//     }
//   };

//   return (
//     <div className="notepad">
//       <div className="sidebar">
//         <h2 className="titleh1">Your WorkSpace</h2>
//         <button className="NewFile" onClick={handleAddTextArea}>
//           <FaPlus /> <p>New File</p>
//         </button>

//         {savedFiles.map((fileName, index) => (
//           <div key={index} className="saved-file">
//             <span>{fileName}</span>
//             <button className="icons" onClick={() => handleDownload(fileName)}>
//               <FaFileDownload size={24} fill="#fff" />
//             </button>
//             <button className="icons" onClick={() => handleDelete(fileName)}>
//               <MdDelete size={30} fill="red" />
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="main-content">
//         <textarea
//           value={text}
//           onChange={handleChange}
//           placeholder="Write something..."
//           className="text-area input-textarea "
//         />
//         <button onClick={handleSave} className="save-btn">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Notepad;

import React, { useState, useEffect } from "react";
import { FaFileDownload, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

function Notepad() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("note");
  const [saveCounter, setSaveCounter] = useState(0);
  const [savedFiles, setSavedFiles] = useState([]);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    const files = Object.keys(localStorage).filter((key) =>
      key.endsWith(".txt")
    );
    setSavedFiles(files);
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setText(savedNote);
    }
  }, []);

  useEffect(() => {
    if (selectedFile !== "") {
      setText(localStorage.getItem(selectedFile));
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleUpper = () => {
    setText(text.toUpperCase());
  };

  const handleLower = () => {
    setText(text.toLowerCase());
  };

  const handleCap = () => {
    setText(text.replace(/\b\w/g, (char) => char.toUpperCase()));
  };

  const handleExtra = () => {
    setText(text.replace(/\s+/g, " ").trim());
  };
  const handleSave = () => {
    const newFileName = window.prompt("Enter file name:", fileName) || fileName;
    localStorage.setItem(`${newFileName}.txt`, text);
    setSaveCounter(saveCounter + 1);
    setFileName(newFileName);
    setSavedFiles([...savedFiles, `${newFileName}.txt`]);
    setEditMode(false);
    console.log("Note saved:", text);
    alert("Note saved successfully!");
    setText("");
  };

  const handleUpdate = () => {
    localStorage.setItem(selectedFile, text);
    setEditMode(false);
    console.log("Note updated:", text);
    alert("Note updated successfully!");
  };

  const handleDownload = (fileName) => {
    const fileContent = localStorage.getItem(fileName);
    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleDelete = (fileName) => {
    let f = window.confirm("Are you sure you want to delete this file?");
    if (f) {
      localStorage.removeItem(fileName);
      setSavedFiles(savedFiles.filter((file) => file !== fileName));
    }
  };

  const handleEdit = (fileName) => {
    setSelectedFile(fileName);

    setEditMode(true);
  };

  const handleAddTextArea = () => {
    let f = window.confirm(
      "First save the file otherwise your content will be lost."
    );
    if (f) {
      setText("");
      setEditMode(false);
    }
  };
  const handleFileClick = (fileName) => {
    const fileContent = localStorage.getItem(fileName);
    if (fileContent) {
      // setSelectedFile(fileName);
      setText(fileContent);
    } else {
      console.error("File not found:", fileName);
      alert("File not found. Please select another file.");
    }
  };
  return (
    <div className="notepad">
      <div className="sidebar">
        <h2 className="titleh1">
          <span className="username">&lt;{user.name}&gt;</span> Space
        </h2>
        <button className="NewFile" onClick={handleAddTextArea}>
          <FaPlus /> <p>New File</p>
        </button>

        {savedFiles.map((fileName, index) => (
          <div key={index} className="saved-file">
            <span
              className="fileName"
              onClick={() => handleFileClick(fileName)}
            >
              {fileName}
            </span>
            <button className="icons" onClick={() => handleDownload(fileName)}>
              <FaFileDownload size={24} fill="#fff" />
            </button>
            <button className="icons" onClick={() => handleEdit(fileName)}>
              <FaEdit size={24} fill="#fff" />
            </button>
            <button className="icons" onClick={() => handleDelete(fileName)}>
              <MdDelete size={30} fill="red" />
            </button>
          </div>
        ))}
      </div>
      <div className="main-content">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Write something..."
          className="text-area input-textarea "
          // readOnly={!editMode}
        />
        {editMode ? (
          <button onClick={handleUpdate} className="save-btn">
            Update
          </button>
        ) : (
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        )}

        <div className="btncontainer">
          <button onClick={handleUpper} type="button" class="save-btn">
            UpperCase
          </button>
          <button onClick={handleLower} type="button" class="save-btn">
            LowerCase
          </button>
          <button onClick={handleCap} type="button" class="save-btn">
            Capitalize
          </button>
          <button onClick={handleExtra} type="button" class="save-btn">
            RemoveExtraSpaces
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notepad;
