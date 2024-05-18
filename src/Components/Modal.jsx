import React, { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaTelegram,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import "../App.css";

const Modal = ({ type, app, onSave, onDelete, onClose, bgColor }) => {
  const [name, setName] = useState(app.name || ""); 
  const [url, setUrl] = useState(app.url || ""); 
  const [icon, setIcon] = useState(getIconFromUrl(url)); 

  const inputRef = useRef(null); 

  useEffect(() => {
    setIcon(getIconFromUrl(url));
  }, [url]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }
  }, []);

  function getIconFromUrl(url) {
    if (url.includes("telegram")) {
      return <FaTelegram />;
    } else if (url.includes("instagram")) {
      return <FaInstagram />;
    } else if (url.includes("linkedin")) {
      return <FaLinkedin />;
    } else if (url.includes("facebook")) {
      return <FaFacebook />;
    } else if (url.includes("pinterest")) {
      return <FaPinterest />;
    } else {
      const firstLetter = url.charAt(0).toUpperCase();
      return <div className="text-4xl">{firstLetter}</div>;
    }
  }

  const handleSave = () => {
    onSave({ ...app, name, url, icon });
  };
   const handleDelete = () => {
     onDelete(app); 
   };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg relative w-96">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {type === "edit" ? "Edit App" : "Add App"}
        </h2>
        <input
          type="text"
          placeholder="App Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="App URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <div className="flex items-center mb-4">
          <span className="mr-2">Icon:</span>
          <div className="text-xl text-gray-600">{icon}</div>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleSave}
          >
            {type === "edit" ? "Save Changes" : "Add App"}
          </button>
          {type === "edit" && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
