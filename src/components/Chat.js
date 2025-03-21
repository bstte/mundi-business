import React, { useState, useRef, useEffect } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import services from "../API/ApiService";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const [fileResult, setFileResult] = useState('');

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() && !selectedFile) return;

    if (selectedFile) {
      // File Upload
      try {
        const response = await services.ApiService.uploadFile(selectedFile);
        setFileResult(response.data.table || response.data.error || "No table returned");

        setMessages((prev) => [
          ...prev,
          { text: `📂 File uploaded: ${selectedFile.name}`, sender: "user" },
          { text: response.data.table || "File uploaded successfully", sender: "bot" },
        ]);
      } catch (error) {
        console.error("File upload error:", error);
        setMessages((prev) => [...prev, { text: "File upload failed", sender: "bot" }]);
      }
      setSelectedFile(null);
    } else {
      // Normal Message Send
      const userMessage = { text: message, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await services.ApiService.chatWithDeepSeek(message);
        const botMessage = { text: response.data.response, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("DeepSeek API Error:", error);
        setMessages((prev) => [...prev, { text: "Error getting response", sender: "bot" }]);
      }
    }

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">GPT-2 AI Chat</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === "user" ? "You" : "GPT-2"}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input with File Upload Icon */}
      <div className="input-container">
        <textarea
          className="text-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={2}
        />

        {/* Upload Icon */}
        <label className="upload-icon">
          <FaPaperclip size={20} />
          <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} hidden />
        </label>

        {/* Send Button */}
        <button className="send-button" onClick={sendMessage}>
          <FaPaperPlane size={18} />
        </button>
      </div>

      {/* Show Selected File Name */}
      {selectedFile && <div className="file-selected">Selected File: {selectedFile.name}</div>}
      {fileResult && <div className="file-result" dangerouslySetInnerHTML={{ __html: fileResult }} />}

    </div>
  );
};

export default Chat;
