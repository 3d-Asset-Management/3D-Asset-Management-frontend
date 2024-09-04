import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { SiGriddotai } from "react-icons/si";
import './BackendURLInput.css'

function BackendURLInput({ setBackendUrl, setIsUrlConfirmed }) {
  const [url, setUrl] = useState(""); 
  const [responseStatus, setResponseStatus] = useState(null);

  const confirmUrl = async () => {
    if(!url.length){
        return;
    }
    try {
      const response = await fetch(`${url}/backend_url`);
      const data = await response.json();
  
      if (data === 'Successfully-connected') {
        localStorage.setItem('sharedData', JSON.stringify(url));
        setBackendUrl(url);
        setResponseStatus("success");
        setTimeout(()=>{
            setIsUrlConfirmed(true);
        },3000)
      } else {
        setResponseStatus("error");
      }
    } catch (error) {
      setResponseStatus("error");
    }
  };

  return (
    <div className="url-container-box">
    <motion.div
      className="url-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar__logo">
                <SiGriddotai />
                <h3>3D Assets</h3>
            </div>
      <h2>Connect to Your Backend</h2>
  
      <motion.input
        type="text"
        placeholder="Enter your backend URL"
        className="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)} 
        whileFocus={{ scale: 1.05, borderColor: "#1e90ff" }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        onClick={confirmUrl}
        className="connect-btn"
        whileHover={{ scale: 1.1, backgroundColor: "#1e90ff" }}
        whileTap={{ scale: 0.95 }}
      >
        {responseStatus==="success" ? "Redirecting...":"Connect"}
      </motion.button>
      {responseStatus === "success" && (
        <motion.div
          className="status-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AiOutlineCheckCircle size={30} color="#28a745" />
        </motion.div>
      )}
      {responseStatus === "error" && (
        <motion.div
          className="status-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AiOutlineCloseCircle size={30} color="#dc3545" />
        </motion.div>
      )}
    </motion.div>
    </div>
  );
}

export default BackendURLInput;
