import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import "./DataVisualization.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { useLocation } from "react-router-dom";
import { FcLineChart } from "react-icons/fc";
import { FcPieChart } from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import services from "../../API/ApiService";
const { ApiService } = services;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const DataVisualization = () => {
  const location = useLocation();
  const { fileData } = location.state || { fileData: [] };
  const [activeTab, setActiveTab] = useState("visualize");
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);
  const [pieName, setPieName] = useState(null);
  const [pieValue, setPieValue] = useState(null);
  const [isColumnOpen, setIsColumnOpen] = useState(true);

  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const [customQuestion, setCustomQuestion] = useState("");
  const [customInsightResult, setCustomInsightResult] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);

  if (!fileData || fileData.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        No Data Available
      </h2>
    );
  }

  const headings = Object.keys(fileData[0]);

  const handleDragStart = (e, column) => {
    e.dataTransfer.setData("text/plain", column);
  };

  const handleDrop = (e, axis) => {
    const column = e.dataTransfer.getData("text/plain");
    if (axis === "x") {
      setXAxis(column);
    } else if (axis === "y") {
      setYAxis(column);
    }
  };

  const handlePieDrop = (e, type) => {
    const column = e.dataTransfer.getData("text/plain");
    if (chartType === "pie") {
      type === "name" ? setPieName(column) : setPieValue(column);
    } else {
      type === "x" ? setXAxis(column) : setYAxis(column);
    }
  };

  // const truncateText = (text, maxLength = 20) => {
  //     return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  // };

  const chartData =
    xAxis && yAxis
      ? {
          labels: [...new Set(fileData.map((row) => String(row[xAxis])))], // Ensuring unique x-values
          datasets: [
            {
              label: yAxis,
              data: fileData.map((row) => {
                const val = parseFloat(row[yAxis]);
                return isNaN(val) ? null : val; // Keep NaN values as null instead of filtering
              }),
              backgroundColor: "#36A2EB",
              borderColor: "#007BFF",
              borderWidth: 1,
              tension: 0.4, // Smoother lines
              fill: false,
            },
          ],
        }
      : null;

  const pieData =
    pieName && pieValue
      ? (() => {
          const dataMap = new Map();
          let totalRows = 0;

          fileData.forEach((row) => {
            const key = row[pieName];
            const value = parseFloat(row[pieValue]) || 0;

            if (dataMap.has(key)) {
              dataMap.set(key, {
                count: dataMap.get(key).count + 1,
                value: dataMap.get(key).value + value,
              });
            } else {
              dataMap.set(key, { count: 1, value });
            }
            totalRows++;
          });

          // Sort dataMap by value (descending)
          const sortedData = [...dataMap.entries()].sort(
            (a, b) => b[1].count - a[1].count
          );

          return {
            labels: sortedData.map(([key]) => key),
            datasets: [
              {
                data: sortedData.map(([_, item]) => item.value),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4CAF50",
                  "#BA68C8",
                ],
              },
            ],
            totalRows,
            dataMap: new Map(sortedData),
            highestLabel: sortedData[0]?.[0] || "",
            highestValue: sortedData[0]?.[1]?.count || 0,
          };
        })()
      : null;

  const handleGetInsights = async () => {
    setActiveTab("insight");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User token not found. Please log in again.");
        return;
      }

      const payload = { data: fileData };
      const response = await ApiService.getInsights(token, payload);

      console.log("Insights:", response.data);
      setInsights(response.data); // Save insights in state
      alert("Insights received!.");
    } catch (error) {
      console.error("Error fetching insights:", error);
      alert("Failed to fetch insights.");
    } finally {
      setLoading(false);
    }
  };

  const handleCustomInsight = async () => {
    if (!customQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    setCustomLoading(true);
    setCustomInsightResult("");

    try {
      const token = localStorage.getItem("token");
      const payload = {
        question: customQuestion,
        data: fileData,
      };

      const response = await ApiService.getCustomInsights(token, payload);
      setCustomInsightResult(response?.data || "No insights found.");
      setActiveTab("custom-insight");
    } catch (error) {
      console.error("Custom insight error:", error);
      alert("Failed to fetch custom insight.");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "100px", textAlign: "center" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
          borderBottom: "2px solid #ccc",
          zIndex: 1000,
        }}
      >
        <h2 style={{ margin: 0 }}>Analyzer</h2>
        <div className="ss_data_visu_btn">
          <button
            onClick={() => setActiveTab("data")}
            style={{
              marginRight: "10px",
              padding: "8px 15px",
              border: "none",
              background: activeTab === "data" ? "#36A2EB" : "#ccc",
              color: "white",
              cursor: "pointer",
            }}
          >
            Data
          </button>
          <button
            onClick={() => setActiveTab("visualize")}
            style={{
              padding: "8px 15px",
              border: "none",
              background: activeTab === "visualize" ? "#36A2EB" : "#ccc",
              color: "white",
              cursor: "pointer",
            }}
          >
            Visualize
          </button>

          <button
            onClick={handleGetInsights}
            disabled={loading}
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Get Insights
          </button>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Custom Insight
          </button>
        </div>
        <button
          onClick={() => window.history.back()}
          style={{
            color: "black",
            background: "none",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          X
        </button>
      </header>

      {showCustomInput && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Enter your question (e.g. Which month had highest sales?)"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            style={{
              width: "60%",
              padding: "10px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
            <button
              onClick={handleCustomInsight}
              disabled={customLoading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#673AB7",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {
                customLoading ? (
                  <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                    <div className="spinners" />
                    <div>Processing...</div>
                  </div>
                ) : "Ask"
              }
            </button>
        </div>
      )}

      {activeTab === "visualize" ? (
        <div style={{ display: "flex", marginTop: "20px" }}>
          {/* Columns Section */}
          <div
            style={{
              width: "20%",
              padding: "10px",
              borderRight: "1px solid #ccc",
            }}
          >
            <h3
              onClick={() => setIsColumnOpen(!isColumnOpen)}
              style={{ cursor: "pointer" }}
            >
              Columns {isColumnOpen ? "▲" : "▼"}
            </h3>
            <div className="ss_column_data_btn">
              {isColumnOpen &&
                headings.map((heading, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, heading)}
                    style={{
                      cursor: "grab",
                      padding: "5px",
                      border: "1px solid #ccc",
                      margin: "5px",
                    }}
                  >
                    {heading}
                  </div>
                ))}
            </div>
          </div>

          {/* Chart Section */}
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {(chartType === "bar" || chartType === "line") && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    X-Axis:
                  </label>
                  <div
                    onDrop={(e) => handleDrop(e, "x")}
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                      width: "180px",
                      height: "40px",
                      border: "2px dashed #aaa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {xAxis ? xAxis : "Drag X-Axis here"}
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                    Y-Axis:
                  </label>
                  <div
                    onDrop={(e) => handleDrop(e, "y")}
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                      width: "180px",
                      height: "40px",
                      border: "2px dashed #aaa",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {yAxis ? yAxis : "Drag Y-Axis here"}
                  </div>
                </div>
              </div>
            )}

            {chartType === "pie" && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid black",
                    paddingBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <label
                        style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Pie Name:
                      </label>
                      <div
                        onDrop={(e) => handlePieDrop(e, "name")}
                        onDragOver={(e) => e.preventDefault()}
                        style={{
                          width: "180px",
                          height: "50px",
                          border: "2px dashed #aaa",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {pieName ? pieName : "Drag Pie Name here"}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <label
                        style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                      >
                        Pie Value:
                      </label>
                      <div
                        onDrop={(e) => handlePieDrop(e, "value")}
                        onDragOver={(e) => e.preventDefault()}
                        style={{
                          width: "180px",
                          height: "50px",
                          border: "2px dashed #aaa",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                        }}
                      >
                        {pieValue ? pieValue : "Drag Pie Value here"}
                      </div>
                    </div>
                  </div>
                </div>

                {pieData && (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "30%",
                        textAlign: "left",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <h6
                          style={{
                            fontSize: 20,
                            marginRight: 20,
                            marginBottom: 50,
                          }}
                        >
                          {pieData.totalRows - 1}
                        </h6>{" "}
                        <p>Count Of {pieValue}</p>
                      </div>

                      <ul
                        style={{
                          listStyleType: "none",
                          padding: 0,
                          maxHeight: "500px", // Adjust height as needed
                          overflowY: "auto",
                          border: "1px solid #ccc", // Optional: to make it visually clear
                        }}
                      >
                        {pieData.labels.map((label, index) => (
                          <li
                            key={index}
                            style={{
                              padding: "5px",
                              cursor: "pointer",
                              borderTop: "1px solid #ccc",
                              justifyContent: "space-between",
                              display: "flex",
                            }}
                          >
                            <h6>
                              {label
                                ? label.length > 10
                                  ? label.substring(0, 20) + "..."
                                  : label
                                : "N/A"}
                              :
                            </h6>
                            <strong>{pieData.dataMap.get(label).count}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      style={{
                        width: "40%",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        marginLeft: 40,
                      }}
                    >
                      <Pie data={pieData} />
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={{ width: "100%", marginTop: "20px" }}>
              {chartData ? (
                chartType === "bar" ? (
                  <Bar data={chartData} />
                ) : chartType === "line" ? (
                  <Line data={chartData} />
                ) : null
              ) : (
                <p>Select X and Y axis to generate chart</p>
              )}
            </div>
          </div>

          {/* Chart Type Section */}
          <div
            style={{
              width: "20%",
              padding: "10px",
              borderLeft: "1px solid #ccc",
            }}
          >
            <h3>Chart Type</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {[
                { type: "bar", icon: <FcBarChart size={40} />, label: "Bar" },
                {
                  type: "line",
                  icon: <FcLineChart size={40} />,
                  label: "Line",
                },
                { type: "pie", icon: <FcPieChart size={40} />, label: "Pie" },
              ].map((chart) => (
                <div
                  key={chart.type}
                  onClick={() => setChartType(chart.type)}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    margin: "5px 0",
                    padding: "10px",
                    // border: chartType === chart.type ? "2px solid #36A2EB" : "1px solid #ccc",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {chart.icon}
                  </div>
                  <span
                    style={{
                      marginTop: "5px",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {chart.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "insight" ? (
        // ✅ Insight Section
        <div style={{ padding: "20px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "150px",
              justifyContent: "center",
            }}
          >
            <div className="spinner" />
            <p style={{ marginTop: "10px", fontWeight: "500", color: "#555" }}>
              Getting insights...
            </p>
          </div>
        ) : (
          <div
            className="insight-html-content"
            dangerouslySetInnerHTML={{
              __html: insights.insights
                ?.replace(/```html/g, "")
                .replace(/```/g, "")
                .trim(),
            }}
          />
        )}
      </div>      
      ) : 
      activeTab === "custom-insight" ? (
        <div style={{ padding: "20px" }}>
        {customLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "150px",
              justifyContent: "center",
            }}
          >
            <div className="spinner" />
            <p style={{ marginTop: "10px", fontWeight: "500", color: "#555" }}>
              Getting Custom insights...
            </p>
          </div>
        ) : customInsightResult.chart?.type ? (
          // ✅ Render Chart
          <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
            {customInsightResult.chart.type === "bar" && (
              <Bar
                data={{
                  labels: customInsightResult.chart.x,
                  datasets: [
                    {
                      label: "Value",
                      data: customInsightResult.chart.y,
                      backgroundColor: "#36A2EB",
                    },
                  ],
                }}
              />
            )}
            {customInsightResult.chart.type === "pie" && (
              <Pie
                data={{
                  labels: customInsightResult.chart.x,
                  datasets: [
                    {
                      data: customInsightResult.chart.y,
                      backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                      ],
                    },
                  ],
                }}
              />
            )}
            {customInsightResult.chart.type === "line" && (
              <Line
                data={{
                  labels: customInsightResult.chart.x,
                  datasets: [
                    {
                      label: "Value",
                      data: customInsightResult.chart.y,
                      borderColor: "#36A2EB",
                      fill: false,
                    },
                  ],
                }}
              />
            )}
          </div>
        ) : (
          // ✅ Render HTML Response (with table styling)
          <div style={{ overflowX: "auto" }}>
            <style>
              {`
                .insight-html-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                  font-size: 14px;
                }
                .insight-html-content th, .insight-html-content td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
                .insight-html-content th {
                  background-color: #f2f2f2;
                  font-weight: bold;
                }
                .insight-html-content h3 {
                  margin-top: 16px;
                  font-size: 18px;
                  color: #333;
                }
                .insight-html-content p {
                  margin: 8px 0;
                  font-size: 15px;
                  color: #444;
                }
                .insight-html-content ul {
                  padding-left: 20px;
                }
                .insight-html-content li {
                  margin-bottom: 6px;
                }
              `}
            </style>
    
            <div
              className="insight-html-content"
              dangerouslySetInnerHTML={{
                __html: customInsightResult.response
                  ?.replace(/```html|```/g, "") // remove markdown
                  .replace(/^Final HTML Block:\s*/i, "") // remove prefix
                  .replace(/<!DOCTYPE html>.*?<body>/is, "") // remove html/head/body start
                  .replace(/<\/body>.*<\/html>/is, "") // remove closing html
                  .trim(),
              }}
            />
          </div>
        )}
      </div>
      )       
      :
      (
        <>
          <div style={{ margin: "20px", overflowX: "auto" }} className="">
            <h3>Data Table</h3>
            <div className="ss_data_table_main">
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ background: "#36A2EB", color: "white" }}>
                    {headings.map((heading, index) => (
                      <th
                        key={index}
                        style={{ padding: "10px", border: "1px solid #ccc" }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.slice(1).map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      style={{
                        background: rowIndex % 2 === 0 ? "#f9f9f9" : "white",
                      }}
                    >
                      {headings.map((heading, colIndex) => (
                        <td
                          key={colIndex}
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          {row[heading]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataVisualization;
