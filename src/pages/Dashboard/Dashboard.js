import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import FileUploadModal from "../../components/FileUploadModal"; // Import Modal Component
import "./Dashboard.css";
import ApiService from '../../API/ApiService';
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState("Vibrant");
  const activeTab="Vibrant";
  const user = useSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);  // Loading State
  const [progress, setProgress] = useState(0);   // Progress State
  // Handle File Upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    setFileName(file.name);

    reader.onload = (e) => {
      const data = e.target.result;
      let workbook, parsedData;

      if (file.name.endsWith(".csv")) {
        // Parse CSV file
        const csvData = data.split("\n").map((row) => row.split(","));
        const headers = csvData[0];
        parsedData = csvData.slice(1).map((row) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index];
            return acc;
          }, {})
        );
      } else {
        // Parse Excel file
        workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(sheet);
      }

      setFileData(parsedData);
      setCurrentStep(2);
    };

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleImport = async (importedData) => {
    try {
        const token = localStorage.getItem("token");

        if (!user || !user._id) {
            console.error("User ID not found");
            return;
        }

        const excelData = {
            userId: user._id, 
            data: importedData 
        };

      setLoading(true);  // Start loading
      setProgress(10);   // Initial progress

console.log(excelData)
      let progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);

    const response = await ApiService.ApiService.excel_data(token, excelData);
    setProgress(100);
    clearInterval(progressInterval); // Stop interval when API responds
     // Complete progress
        toast.success("Data imported successfully!");
        setLoading(false);
        setCurrentStep(3); // Move to next step
        console.log("Excel data response:", response);
    } catch (error) {
        console.error("Error importing data:", error);
    }
};

const navigateonvisualization=(fileData)=>{
  navigate("/data-visualization", { state: { fileData } })
}

  return (
    <>
      <div className={`ss_dashboard_mn_sec ss_main_sec_${activeTab}`}>
        <Header user={user} />
        <div className="ss_dash_main_sec">
          <div className="ss_dash_side_bar">
            <Sidebar user={user} />
          </div>
          <div className="ss_content">
            <section className="ss_dash_hed">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <h2>Dashboard</h2>
                  </div>
                  <div className="col-lg-3">
                    <div className="header-search">
                      <input type="search" className="form-control" placeholder="What are you looking for?" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="ss_dash_graph_sec">
              <div className="container">
                {activeTab === "Vibrant" && (
                  <div className="row ss_Vibrant">
                    <div className="col-lg-6">
                      <div className="ss_dash_graph_div">
                        <h3>Email Campaign Performance</h3>
                        <p className="text-gray-500 text-center">Open Rates</p>
                        <div className="ss_dash_graph_div_last">
                          <span>42%</span>
                          <span>+5%</span>
                        </div>
                      </div>
                    </div>

                    {/* Upload File Button */}
                    <div className="col-lg-6">
                      <div className="ss_dash_graph_div">
                        <h3>Connect Your Data</h3>
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                          Upload File
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentStep(1);
          setFileData([]);
          setFileName("");
        }}
        onFileUpload={handleFileUpload}
        fileData={fileData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        fileName={fileName}
        handleImport={handleImport}  
        navigateonvisualization={navigateonvisualization}
        loading={loading}
        progress={progress}

      />
    </>
  );
};

export default Dashboard;
