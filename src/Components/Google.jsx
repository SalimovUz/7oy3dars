import React, { useState } from "react";
import axios from "axios";
import ScienceIcon from "@mui/icons-material/Science";
import AppsIcon from "@mui/icons-material/Apps";
import {
  FaMicrophoneAlt,
  FaSearch,
  FaCamera,
  FaEllipsisV,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaEnvelope,
  FaHdd,
  FaTelegram,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";
import google from "../../public/Images/google.png";
import Modal from "./Modal.jsx"; 

const Google = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [apps, setApps] = useState([
    { id: 1, name: "Youtube", icon: <FaYoutube /> },
    { id: 2, name: "Telegram", icon: <FaTelegram /> },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleSearch = async () => {
    const apiKey = "your-api-key";
    const queryUrl = `https://serper.dev/api-key?apiKey=${apiKey}`;
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${queryUrl}`;

    try {
      const response = await axios.post(proxyUrl, { query });
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddApp = () => {
    if (apps.length < 10) {
      setCurrentApp({ id: null, name: "", url: "", icon: "" });
      setModalType("add");
      setShowModal(true);
    } else {
      alert("You have reached the maximum limit of 10 apps.");
    }

  };

  const handleEditApp = (app) => {
    setCurrentApp(app);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteApp = (app) => {
    setCurrentApp(app);
    setModalType("delete");
    setShowModal(true);
  };

  const handleSaveApp = (app) => {
    if (modalType === "add") {
      setApps([
        ...apps,
        { ...app, id: apps.length + 1, icon: getIconByUrl(app.url) },
      ]);
    } else if (modalType === "edit") {
      setApps(
        apps.map((a) =>
          a.id === app.id ? { ...app, icon: getIconByUrl(app.url) } : a
        )
      );
    }
    setShowModal(false);
  };

  const handleConfirmDeleteApp = (app) => {
    setApps(apps.filter((a) => a.id !== app.id));
    setShowModal(false);
  };

  const getIconByUrl = (url) => {
    if (url.includes("telegram")) {
      return <FaTelegram />;
    } else if (url.includes("facebook")) {
      return <FaFacebook />;
    } else if (url.includes("twitter")) {
      return <FaTwitter />;
    } else {
      const firstLetter = url.charAt(0).toUpperCase();
      return <span>{firstLetter}</span>;
    }
  };

  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="top justify-end flex gap-4">
          <a href="mailto:salimovtolqin5@gmail.com">Gmail</a>
          <a href="#">Images</a>
          <ScienceIcon />
          <AppsIcon />
        </div>

        <div className="google mx-auto items-center mt-[10%]">
          <img
            className="w-68 h-24 mx-auto mb-4"
            src={google}
            alt="Google Logo"
          />

          <div className="search flex mx-auto items-center">
            <label className="bg-white w-2/5 py-2 px-5 flex mx-auto items-center gap-4 rounded-full">
              <FaSearch />
              <input
                className="bg-none outline-none w-full"
                type="text"
                placeholder="Search Google or type a URL"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <div className="flex justify-end gap-4">
                <FaMicrophoneAlt className="justify-end flex" />
                <FaCamera className="justify-end flex" />
              </div>
            </label>
          </div>
          <div className="apps mt-6 mx-auto w-2/5">
            <div className="app-icons flex gap-6 flex-wrap mt-4">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="app-item p-2 relative w-[16%] h-20 bg-white rounded-full text-center hover:bg-gray-100"
                >
                  <div className="app-icon text-4xl mb-1 mx-auto justify-center flex">
                    {app.icon}
                  </div>
                  <div className="app-name">{app.name}</div>
                  <div className="app-options absolute top-2 right-2 opacity-1 group-hover:opacity-1 transition-opacity duration-300">
                    <FaEllipsisV
                      className="cursor-pointer"
                      onClick={() => handleEditApp(app)}
                    />
                    <div className="options-menu hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                      <button
                        className="flex items-center p-2 w-full text-left hover:bg-gray-800"
                        onClick={() => handleEditApp(app)}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        className="flex items-center p-2 w-full text-left hover:bg-gray-100"
                        onClick={() => handleDeleteApp(app)}
                      >
                        <FaTrashAlt className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {apps.length < 10 && (
                <button
                  className="flex items-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleAddApp}
                >
                  <FaPlus className="mr-2" /> Add App
                </button>
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <Modal
            type={modalType}
            app={currentApp}
            onSave={handleSaveApp}
            onDelete={handleConfirmDeleteApp}
            onClose={() => setShowModal(false)}
          />
        )}

        {results.length > 0 && (
          <div className="results mt-4">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  {result.title}
                </a>
                <p>{result.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Google;
