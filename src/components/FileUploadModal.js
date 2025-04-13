"use client";
import Modal from "react-modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRef } from "react";

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
  };

  // Common styles
  const styles = {
    modalContent: {
      width: "95%",
      height: "88vh",
      margin: "auto",
      borderRadius: "12px",
      padding: "0",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginTop: "50px",
      zIndex: 100,
      border: "1px solid #eaeaea",
      overflow: "hidden",
    },
    header: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      background: "#fff",
      padding: "20px 25px",
      alignItems: "center",
      borderBottom: "1px solid #eaeaea",
      zIndex: "1000",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
    },
    headerTitle: {
      fontSize: "14px",
      color: "#666",
      margin: "0 0 5px 0",
      fontWeight: "500",
    },
    headerSubtitle: {
      fontSize: "20px",
      color: "#333",
      margin: "0",
      fontWeight: "600",
    },
    closeButton: {
      fontSize: "18px",
      border: "none",
      background: "none",
      cursor: "pointer",
      position: "absolute",
      right: "20px",
      top: "20px",
      color: "#666",
      transition: "color 0.2s ease",
      padding: "5px",
      borderRadius: "4px",
    },
    content: {
      flex: 1,
      padding: "90px 25px 80px",
      overflowY: "auto",
    },
    footer: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      background: "#fff",
      padding: "15px 25px",
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      borderTop: "1px solid #eaeaea",
      zIndex: "1000",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    primaryButton: {
      backgroundColor: "#0070f3",
      color: "white",
      minWidth: "120px",
    },
    secondaryButton: {
      backgroundColor: "#f5f5f5",
      color: "#333",
      border: "1px solid #ddd",
    },
    uploadBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "2px dashed #ddd",
      padding: "40px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "#fafafa",
      transition: "all 0.2s ease",
      maxWidth: "500px",
      margin: "40px auto",
    },
    uploadText: {
      color: "#666",
      fontSize: "16px",
      marginTop: "15px",
    },
    uploadIcon: {
      fontSize: "48px",
      color: "#0070f3",
      marginBottom: "15px",
    },
    fileInfoSection: {
      marginBottom: "25px",
    },
    fileInfoTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "10px",
    },
    fileInfoDesc: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "20px",
    },
    fileInfoGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "30px",
      marginBottom: "20px",
    },
    fileInfoItem: {
      minWidth: "150px",
    },
    fileInfoLabel: {
      fontSize: "13px",
      color: "#666",
      marginBottom: "5px",
      fontWeight: "500",
    },
    fileInfoValue: {
      fontSize: "14px",
      color: "#333",
    },
    tableContainer: {
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      maxHeight: "400px",
      overflowY: "auto",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    },
    tableHeader: {
      position: "sticky",
      top: "0",
      background: "#fff",
      zIndex: "10",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    tableHeaderCell: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "2px solid #0070f3",
      color: "#333",
      fontWeight: "600",
    },
    tableDataType: {
      fontSize: "12px",
      color: "#666",
      fontWeight: "normal",
      marginTop: "3px",
    },
    tableCell: {
      padding: "10px 15px",
      borderBottom: "1px solid #eaeaea",
      color: "#444",
    },
    tableRowNumber: {
      backgroundColor: "#f9f9f9",
      color: "#888",
      fontWeight: "500",
      width: "50px",
      textAlign: "center",
    },
    successContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 200px)",
      width: "100%",
    },
    successCard: {
      background: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
      textAlign: "center",
      maxWidth: "450px",
    },
    successTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "15px",
    },
    successText: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "10px",
    },
    visualizeButton: {
      marginTop: "25px",
      padding: "12px 25px",
      border: "none",
      background: "#0070f3",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "500",
      transition: "background 0.2s ease",
    },
    loadingContainer: {
      margin: "30px auto",
      textAlign: "center",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #0070f3",
      borderRadius: "50%",
      margin: "15px auto",
      animation: "spin 1s linear infinite",
    },
    progressText: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "10px",
    },
    progressBar: {
      width: "80%",
      margin: "auto",
      height: "8px",
      background: "#eaeaea",
      borderRadius: "4px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "#0070f3",
      borderRadius: "4px",
      transition: "width 0.3s ease",
    },
  };

  const fileInputRef = useRef();

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Upload File"
      style={{
        content: styles.modalContent,
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
      }}
    >
      {/* Step 1: File Selection */}
      {currentStep === 1 && (
        <>
          <div style={styles.header}>
            <h4 style={styles.headerTitle}>Add new data</h4>
            <h3 style={styles.headerSubtitle}>Upload spreadsheet</h3>
            <button onClick={onClose} style={styles.closeButton}>
              ✖
            </button>
          </div>

          <div style={styles.content}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".csv, .xlsx, .xls"
              onChange={onFileUpload}
            />

            <div style={styles.uploadBox} onClick={handleDivClick}>
              <div style={styles.uploadIcon}>📁</div>
              <div style={styles.uploadText}>
                Click to upload CSV or Excel file
              </div>
              <div
                style={{ fontSize: "13px", color: "#888", marginTop: "10px" }}
              >
                Supported formats: .csv, .xlsx, .xls
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 2: File Preview */}
      {currentStep === 2 && (
        <>
          <div style={styles.header}>
            <h4 style={styles.headerTitle}>Create new File Upload dataset</h4>
            <h3 style={styles.headerSubtitle}>Preview</h3>
            <button onClick={onClose} style={styles.closeButton}>
              ✖
            </button>
          </div>

          <div style={styles.content}>
            {loading ? (
              <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.progressText}>Uploading... {progress}%</p>
                <div style={styles.progressBar}>
                  <div
                    style={{ ...styles.progressFill, width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                <div style={styles.fileInfoSection}>
                  <h4 style={styles.fileInfoTitle}>
                    Review column headers and data types then import
                  </h4>
                  <p style={styles.fileInfoDesc}>
                    Some cells might have format errors or missing information.
                    Please adjust and import – or you can fix later in Domo.
                  </p>

                  <div style={styles.fileInfoGrid}>
                    <div style={styles.fileInfoItem}>
                      <p style={styles.fileInfoLabel}>File:</p>
                      <p style={styles.fileInfoValue}>
                        {fileName || "No file selected"}
                      </p>
                    </div>

                    <div style={styles.fileInfoItem}>
                      <p style={styles.fileInfoLabel}>Size:</p>
                      <p style={styles.fileInfoValue}>
                        {fileData.length - 1} rows x{" "}
                        {fileData[0] ? Object.keys(fileData[0]).length : 0}{" "}
                        columns
                      </p>
                    </div>

                    <div style={styles.fileInfoItem}>
                      <p style={styles.fileInfoLabel}>Encoding:</p>
                      <p style={styles.fileInfoValue}>
                        Auto-detect: ISO-8859-1
                      </p>
                    </div>
                  </div>
                </div>

                <div style={styles.tableContainer}>
                  <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                      <tr>
                        <th
                          style={{
                            ...styles.tableHeaderCell,
                            ...styles.tableRowNumber,
                          }}
                        >
                          #
                        </th>
                        {Object.keys(fileData[0] || {}).map((key) => {
                          const firstValue = fileData[0]?.[key] || "";
                          return (
                            <th key={key} style={styles.tableHeaderCell}>
                              {key}
                              <div style={styles.tableDataType}>
                                ({detectDataType(firstValue)})
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {fileData.map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#fff" : "#fafafa",
                          }}
                        >
                          <td
                            style={{
                              ...styles.tableCell,
                              ...styles.tableRowNumber,
                            }}
                          >
                            {index + 1}
                          </td>
                          {Object.entries(row).map(([key, cell], idx) => (
                            <td key={idx} style={styles.tableCell}>
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
          </div>
        </>
      )}

      {/* Step 3: Success */}
      {currentStep === 3 && (
        <>
          <div style={styles.header}>
            <h3 style={styles.headerSubtitle}>{fileName}</h3>
            <button onClick={onClose} style={styles.closeButton}>
              ✖
            </button>
          </div>

          <div style={styles.successContainer}>
            <div style={styles.successCard}>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>🎉</div>
              <h2 style={styles.successTitle}>Congratulations!</h2>
              <p style={styles.successText}>Your data is now available.</p>
              <p style={styles.successText}>
                Start visualizing your data in Analyzer
              </p>
              <button
                onClick={() => handleNavigate(fileData)}
                style={styles.visualizeButton}
                onMouseOver={(e) => (e.target.style.background = "#0058cc")}
                onMouseOut={(e) => (e.target.style.background = "#0070f3")}
              >
                Start Visualizing
              </button>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        {currentStep === 2 && (
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={() => handleImport(fileData)}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0058cc")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0070f3")}
          >
            Import
          </button>
        )}

        {currentStep > 1 && (
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={() => setCurrentStep(currentStep - 1)}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#eaeaea")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
          >
            ⬅ Back
          </button>
        )}

        {currentStep === 3 && (
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={onClose}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0058cc")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0070f3")}
          >
            Done
          </button>
        )}
      </div>

      {/* Add keyframe animation for spinner */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `,
        }}
      />
    </Modal>
  );
};

export default FileUploadModal;
