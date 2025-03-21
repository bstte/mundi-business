import React, { useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
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
    const [hoveredIndex, setHoveredIndex] = useState(null);

    if (!fileData || fileData.length === 0) {
        return <h2 style={{ textAlign: "center", marginTop: "20px" }}>No Data Available</h2>;
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

    const truncateText = (text, maxLength = 20) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const chartData = xAxis && yAxis ? {
        labels: [...new Set(fileData.map(row => String(row[xAxis])))], // Ensuring unique x-values
        datasets: [{
            label: yAxis,
            data: fileData.map(row => {
                const val = parseFloat(row[yAxis]);
                return isNaN(val) ? null : val; // Keep NaN values as null instead of filtering
            }),
            backgroundColor: "#36A2EB",
            borderColor: "#007BFF",
            borderWidth: 1,
            tension: 0.4, // Smoother lines
            fill: false,
        }],
    } : null;
    

    const pieData = pieName && pieValue ? (() => {
        const dataMap = new Map();
        let totalRows = 0;

        fileData.forEach(row => {
            const key = row[pieName];
            const value = parseFloat(row[pieValue]) || 0;

            if (dataMap.has(key)) {
                dataMap.set(key, {
                    count: dataMap.get(key).count + 1,
                    value: dataMap.get(key).value + value
                });
            } else {
                dataMap.set(key, { count: 1, value });
            }
            totalRows++;
        });

        // Sort dataMap by value (descending)
        const sortedData = [...dataMap.entries()].sort((a, b) => b[1].count - a[1].count);

        return {
            labels: sortedData.map(([key]) => key),
            datasets: [{
                data: sortedData.map(([_, item]) => item.value),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#BA68C8"],
            }],
            totalRows,
            dataMap: new Map(sortedData),
            highestLabel: sortedData[0]?.[0] || "",
            highestValue: sortedData[0]?.[1]?.count || 0
        };
    })() : null;



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
                <div>
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
                </div>
                <button
                    onClick={() => window.history.back()}
                    style={{ color: "black", background: "none", padding: "5px 10px", border: "none", cursor: "pointer" }}
                >
                    X
                </button>
            </header>
            {activeTab === "visualize" ? (
                <div style={{ display: "flex", marginTop: "20px" }}>
                    {/* Columns Section */}
                    <div style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}>
                        <h3 onClick={() => setIsColumnOpen(!isColumnOpen)} style={{ cursor: "pointer" }}>Columns {isColumnOpen ? "▲" : "▼"}</h3>
                        {isColumnOpen && headings.map((heading, index) => (
                            <div key={index} draggable onDragStart={(e) => handleDragStart(e, heading)}
                                style={{ cursor: "grab", padding: "5px", border: "1px solid #ccc", margin: "5px" }}>
                                {heading}
                            </div>
                        ))}
                    </div>

                    {/* Chart Section */}
                    <div style={{ width: "60%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {(chartType === 'bar' || chartType === 'line') && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                borderBottom: "1px solid #ccc",
                                paddingBottom: "10px",
                                gap: "20px"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>X-Axis:</label>
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
                                            backgroundColor: "#f9f9f9"
                                        }}
                                    >
                                        {xAxis ? xAxis : "Drag X-Axis here"}
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Y-Axis:</label>
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
                                            backgroundColor: "#f9f9f9"
                                        }}
                                    >
                                        {yAxis ? yAxis : "Drag Y-Axis here"}
                                    </div>
                                </div>
                            </div>
                        )}


                        {chartType === 'pie' && (
                            <>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    borderBottom: "1px solid black",
                                    paddingBottom: "10px",
                                    gap: "10px"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Pie Name:</label>
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
                                                    backgroundColor: "#f9f9f9"
                                                }}
                                            >
                                                {pieName ? pieName : "Drag Pie Name here"}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>Pie Value:</label>
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
                                                    backgroundColor: "#f9f9f9"
                                                }}
                                            >
                                                {pieValue ? pieValue : "Drag Pie Value here"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {pieData && (
                                    <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
                                        <div style={{ width: "30%", textAlign: "left", padding: "10px" }}>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <h6 style={{ fontSize: 20, marginRight: 20, marginBottom: 50 }}>{pieData.totalRows - 1}</h6> <p>Count Of {pieValue}</p>
                                            </div>

                                            <ul style={{
                                                listStyleType: "none",
                                                padding: 0,
                                                maxHeight: "500px", // Adjust height as needed
                                                overflowY: "auto",
                                                border: "1px solid #ccc" // Optional: to make it visually clear
                                            }}>
                                                {pieData.labels.map((label, index) => (
                                                    <li key={index}
                                                        onMouseEnter={() => setHoveredIndex(index)}
                                                        onMouseLeave={() => setHoveredIndex(null)}
                                                        style={{ padding: "5px", cursor: "pointer", borderTop: "1px solid #ccc", justifyContent: "space-between", display: "flex" }}>
                                                        <h6>{label ? (label.length > 10 ? label.substring(0, 20) + "..." : label) : "N/A"}:</h6>
                                                        <strong>{pieData.dataMap.get(label).count}</strong>
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>

                                        <div style={{ width: "40%", alignItems: "center", justifyContent: "center", display: "flex", marginLeft: 40 }}>
                                            <Pie data={pieData} />
                                        </div>
                                    </div>
                                )}

                            </>
                        )}

                        <div style={{ width: "100%", marginTop: "20px" }}>
                            {chartData ? (
                                chartType === "bar" ? <Bar data={chartData} /> :
                                    chartType === "line" ? <Line data={chartData} /> :
                                        null
                            ) : <p>Select X and Y axis to generate chart</p>}
                        </div>
                    </div>

                    {/* Chart Type Section */}
                    <div style={{ width: "10%", padding: "10px", borderLeft: "1px solid #ccc" }}>
                        <h3>Chart Type</h3>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {[ 
                    { type: "bar", icon: <FcBarChart size={40} />, label: "Bar" },
                    { type: "line", icon: <FcLineChart size={40} />, label: "Line" },
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
                        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                            {chart.icon}
                        </div>
                        <span style={{ marginTop: "5px", fontSize: "14px", textAlign: "center" }}>
                            {chart.label}
                        </span>
                    </div>
                ))}
            </div>
                    </div>

                </div>
            ) :
                <>
                    <div style={{ margin: "20px", overflowX: "auto" }}>
                        <h3>Data Table</h3>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: "#36A2EB", color: "white" }}>
                                    {headings.map((heading, index) => (
                                        <th key={index} style={{ padding: "10px", border: "1px solid #ccc" }}>{heading}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fileData.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex} style={{ background: rowIndex % 2 === 0 ? "#f9f9f9" : "white" }}>
                                        {headings.map((heading, colIndex) => (
                                            <td key={colIndex} style={{ padding: "10px", border: "1px solid #ccc" }}>{row[heading]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    );
};

export default DataVisualization;
