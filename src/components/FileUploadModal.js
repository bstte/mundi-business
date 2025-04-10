import React from "react";
import Modal from "react-modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Set Modal root element
Modal.setAppElement("#root");

const FileUploadModal = ({
  isOpen,
  onClose,
  onFileUpload,
  fileData,
  currentStep,
  setCurrentStep,
  fileName,
  handleImport,
  navigateonvisualization,
  loading,
  progress,
}) => {
  const detectDataType = (value) => {
    const val = String(value).trim();

    if (!isNaN(Number(val)) && val !== "") {
      return "Number";
    } else if (!isNaN(Date.parse(val))) {
      return val.includes(":") ? "DateTime" : "Date";
    } else if (["true", "false"].includes(val.toLowerCase())) {
      return "Boolean";
    }
    return "Text";
  };

  const handleNavigate = (value) => {
    navigateonvisualization(value);
    // alert("hi")
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Upload File"
      style={{
        content: {
          width: "95%",
          height: "88vh",
          margin: "auto",
          borderRadius: "10px",
          padding: "0",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          marginTop: "50px",
          zIndex: 100,
        },
      }}
    >
      {/* Header */}

      {/* Main Content */}
      {/* Step 1: File Selection */}
      {currentStep === 1 && (
        <>
          <div
            className="ss_popup_upload"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              background: "#fff",
              padding: "15px",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              zIndex: "1000",
            }}
          >
            <h4>Add new data</h4>
            <h3>Upload spreadsheet</h3>

            <button
              onClick={onClose}
              style={{
                fontSize: "20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "absolute",
                right: "15px",
                top: "10px",
              }}
            >
              ✖
            </button>
          </div>
          <div
            className="ss_upload_docu_content"
            style={{ flex: 1, padding: "70px 20px 70px", overflowY: "auto" }}
          >
            <div className="ss_div flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".csv, .xlsx, .xls"
                  onChange={onFileUpload}
                />
                <div className="text-center text-gray-600">
                  📁 Click to upload CSV or Excel file
                </div>
              </label>
            </div>
          </div>
        </>
      )}

      {/* Step 2: File Preview */}
      {currentStep === 2 && (
        <>
          <div
            className="ss_popup_upload"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              background: "#fff",
              padding: "15px",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              zIndex: "1000",
            }}
          >
            <h4>Create new File Upload dataset</h4>
            <h3>Preview</h3>
            {loading && (
              <div style={{ margin: "20px auto", textAlign: "center" }}>
                <div
                  className="spinner"
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "5px solid #ddd",
                    borderTop: "5px solid #007bff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "10px auto",
                  }}
                ></div>
                <p>Uploading... {progress}%</p>
                <div
                  style={{
                    width: "80%",
                    margin: "auto",
                    height: "10px",
                    background: "#ddd",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#007bff",
                      borderRadius: "5px",
                    }}
                  ></div>
                </div>
              </div>
            )}
            <button
              onClick={onClose}
              style={{
                fontSize: "20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "absolute",
                right: "15px",
                top: "10px",
              }}
            >
              ✖
            </button>
          </div>
          {/* Dynamic File Info */}
          <div
            style={{ marginLeft: 20, marginTop: 10 }}
            className="ss_excl_head_secc"
          >
            <h4>Review column headers and data types then import</h4>
            <p>
              Some cells might have format errors or missing information. Please
              adjust and import – or you can fix later in Domo.
            </p>

            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <div>
                <p>
                  <strong>File:</strong>
                </p>
                <p>{fileName || "No file selected"}</p>
              </div>

              <div style={{ marginLeft: 20 }}>
                <p>
                  <strong>Size:</strong>{" "}
                </p>
                <p>
                  {fileData.length - 1} rows x{" "}
                  {fileData[0] ? Object.keys(fileData[0]).length : 0} columns
                </p>
              </div>

              <div style={{ marginLeft: 20 }}>
                <p>
                  <strong>Encoding:</strong>
                </p>
                <p>Auto-detect: ISO-8859-1</p>
              </div>
            </div>
          </div>
          <div
            className="border rounded p-2 ss_file_table_privw"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            <table className="w-full border-collapse border border-gray-300">
              <thead
                style={{
                  position: "sticky",
                  top: "0",
                  background: "#fff",
                  zIndex: "10",
                }}
              >
                <tr className="bg-gray-100 ss_ex_tbl_para">
                  <th className="border p-2">#</th> {/* Row number column */}
                  {Object.keys(fileData[0] || {}).map((key) => {
                    const firstValue = fileData[0]?.[key] || "";
                    return (
                      <th key={key} className="border p-2">
                        {key} <p>({detectDataType(firstValue)})</p>
                      </th>
                    );
                  })}
                </tr>

                <tr>
                  <td
                    colSpan={Object.keys(fileData[0] || {}).length + 1}
                    className="border p-1"
                    style={{ backgroundColor: "green", height: "3px" }}
                  ></td>
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{index + 1}</td>{" "}
                    {/* Display row number */}
                    {Object.entries(row).map(([key, cell], idx) => (
                      <td key={idx} className="border p-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <div
            className="ss_popup_upload"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              background: "#fff",
              padding: "15px",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              zIndex: "1000",
            }}
          >
            <h3>{fileName}</h3>

            <button
              onClick={onClose}
              style={{
                fontSize: "20px",
                border: "none",
                background: "none",
                cursor: "pointer",
                position: "absolute",
                right: "15px",
                top: "10px",
              }}
            >
              ✖
            </button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                maxWidth: "400px",
              }}
            >
              <h2>Congratulations!</h2>
              <p>Your data is now available .</p>
              <p>Start visualizing your data in Analyzer</p>
              <button
                onClick={() => handleNavigate(fileData)}
                style={{
                  marginTop: "20px",
                  padding: "10px 15px",
                  border: "none",
                  background: "#007bff",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Start Visualizing
              </button>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div
        className="ss_btm_btn"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "#fff",
          padding: "15px",
          gap: "15px",
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid #ddd",
          zIndex: "1000",
        }}
      >
        {currentStep === 2 && (
          <button
            className="btn btn-success w-full ss_import_btn"
            onClick={() => handleImport(fileData)}
          >
            Import
          </button>
        )}

        {currentStep > 1 && (
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            ⬅ Back
          </button>
        )}
        {currentStep === 3 && (
          <button className="btn btn-primary w-full" onClick={onClose}>
            Done
          </button>
        )}
      </div>
    </Modal>
  );
};

export default FileUploadModal;
