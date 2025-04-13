"use client"

import { useState, useEffect } from "react"
import {toast} from 'sonner'
import { Pie, Bar, Line, Doughnut, Radar, PolarArea, Scatter } from "react-chartjs-2"
import "./DataVisualization.css"
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
  RadialLinearScale,
  Filler,
  ScatterController,
} from "chart.js"
import { useLocation } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { BarChart, LineChart, PieChart, ActivitySquare, RadarIcon, Circle, ScatterChart } from "lucide-react"
import services from "../../API/ApiService"
const { ApiService } = services

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
  ScatterController,
)

const DataVisualization = () => {
  const location = useLocation()
  const { fileData } = location.state || { fileData: [] }
  const [activeTab, setActiveTab] = useState("visualize")
  const [chartType, setChartType] = useState("bar")
  const [xAxis, setXAxis] = useState(null)
  const [yAxes, setYAxes] = useState([]) // Array for multiple y-axes
  const [pieName, setPieName] = useState(null)
  const [pieValue, setPieValue] = useState(null)
  const [isColumnOpen, setIsColumnOpen] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [theme, setTheme] = useState("light")

  const [insights, setInsights] = useState("")
  const [loading, setLoading] = useState(false)

  const [customQuestion, setCustomQuestion] = useState("")
  const [customInsightResult, setCustomInsightResult] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customLoading, setCustomLoading] = useState(false)

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Apply theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  if (!fileData || fileData.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Data Available</h2>
        <p>Please upload a file or select a dataset to visualize</p>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    )
  }

  const headings = Object.keys(fileData[0])

  const handleDragStart = (e, column) => {
    e.dataTransfer.setData("text/plain", column)
    setIsDragging(true)
    setDraggedItem(column)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedItem(null)
  }

  const handleDrop = (e, axis) => {
    e.preventDefault()
    const column = e.dataTransfer.getData("text/plain")
    if (axis === "x") {
      setXAxis(column)
    } else if (axis === "y") {
      // Add to y-axes array if not already present
      if (!yAxes.includes(column)) {
        setYAxes([...yAxes, column])
      }
    }
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleRemoveYAxis = (axisToRemove) => {
    setYAxes(yAxes.filter((axis) => axis !== axisToRemove))
  }

  const handlePieDrop = (e, type) => {
    e.preventDefault()
    const column = e.dataTransfer.getData("text/plain")
    if (chartType === "pie" || chartType === "doughnut" || chartType === "polarArea") {
      type === "name" ? setPieName(column) : setPieValue(column)
    } else {
      type === "x" ? setXAxis(column) : handleDrop(e, "y")
    }
    setIsDragging(false)
  }

  // Generate colors for chart datasets
  const getChartColors = (index, alpha = 1) => {
    const colors = [
      `rgba(255, 99, 132, ${alpha})`, // Red
      `rgba(54, 162, 235, ${alpha})`, // Blue
      `rgba(255, 206, 86, ${alpha})`, // Yellow
      `rgba(75, 192, 192, ${alpha})`, // Teal
      `rgba(153, 102, 255, ${alpha})`, // Purple
      `rgba(255, 159, 64, ${alpha})`, // Orange
      `rgba(76, 175, 80, ${alpha})`, // Green
      `rgba(233, 30, 99, ${alpha})`, // Pink
      `rgba(3, 169, 244, ${alpha})`, // Light Blue
      `rgba(121, 85, 72, ${alpha})`, // Brown
    ]
    return colors[index % colors.length]
  }

  // Prepare chart data based on chart type
  const prepareChartData = () => {
    if (!xAxis || yAxes.length === 0) return null

    const labels = [...new Set(fileData.map((row) => String(row[xAxis])))]

    // For scatter plot, we need special handling
    if (chartType === "scatter") {
      if (yAxes.length < 1) return null

      return {
        datasets: yAxes.map((yAxis, index) => {
          return {
            label: yAxis,
            data: fileData.map((row) => ({
              x: Number.parseFloat(row[xAxis]) || 0,
              y: Number.parseFloat(row[yAxis]) || 0,
            })),
            backgroundColor: getChartColors(index, 0.7),
            borderColor: getChartColors(index),
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        }),
      }
    }

    // For radar chart
    if (chartType === "radar") {
      return {
        labels,
        datasets: yAxes.map((yAxis, index) => {
          return {
            label: yAxis,
            data: labels.map((label) => {
              const matchingRow = fileData.find((row) => String(row[xAxis]) === label)
              return matchingRow ? Number.parseFloat(matchingRow[yAxis]) || 0 : 0
            }),
            backgroundColor: getChartColors(index, 0.2),
            borderColor: getChartColors(index),
            borderWidth: 2,
            pointBackgroundColor: getChartColors(index),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: getChartColors(index),
          }
        }),
      }
    }

    // For standard charts (bar, line)
    return {
      labels,
      datasets: yAxes.map((yAxis, index) => {
        const color = getChartColors(index)
        return {
          label: yAxis,
          data: labels.map((label) => {
            const matchingRow = fileData.find((row) => String(row[xAxis]) === label)
            return matchingRow ? Number.parseFloat(matchingRow[yAxis]) || 0 : 0
          }),
          backgroundColor: chartType === "line" ? getChartColors(index, 0.2) : color,
          borderColor: color,
          borderWidth: 2,
          tension: 0.4,
          fill: chartType === "line",
          pointRadius: chartType === "line" ? 3 : 0,
        }
      }),
    }
  }

  // Prepare pie/doughnut/polarArea chart data
  const preparePieData = () => {
    if (!pieName || !pieValue) return null

    const dataMap = new Map()
    let totalRows = 0

    fileData.forEach((row) => {
      const key = row[pieName]
      const value = Number.parseFloat(row[pieValue]) || 0

      if (dataMap.has(key)) {
        dataMap.set(key, {
          count: dataMap.get(key).count + 1,
          value: dataMap.get(key).value + value,
        })
      } else {
        dataMap.set(key, { count: 1, value })
      }
      totalRows++
    })

    // Sort dataMap by value (descending)
    const sortedData = [...dataMap.entries()].sort((a, b) => b[1].value - a[1].value)

    // Limit to top 10 for better visualization
    const topData = sortedData.slice(0, 10)

    // Generate colors
    const backgroundColors = topData.map((_, index) => getChartColors(index))

    return {
      labels: topData.map(([key]) => key),
      datasets: [
        {
          data: topData.map(([_, item]) => item.value),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) => color.replace(/, \d+\.\d+\)/, ", 1)")),
          borderWidth: 1,
        },
      ],
      totalRows,
      dataMap: new Map(topData),
      highestLabel: topData[0]?.[0] || "",
      highestValue: topData[0]?.[1]?.value || 0,
    }
  }

  const chartData = prepareChartData()
  const pieData = preparePieData()

  const handleGetInsights = async () => {
    setActiveTab("insight")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        alert("User token not found. Please log in again.")
        return
      }

      const payload = { data: fileData }
      const response = await ApiService.getInsights(token, payload)

      setInsights(response.data) // Save insights in state
      toast.success("Insights received!")
    } catch (error) {
      console.error("Error fetching insights:", error)
      alert("Failed to fetch insights.")
    } finally {
      setLoading(false)
    }
  }

  const handleCustomInsight = async () => {
    if (!customQuestion.trim()) {
      alert("Please enter a question.")
      return
    }

    setCustomLoading(true)
    setCustomInsightResult("")

    try {
      const token = localStorage.getItem("token")
      const payload = {
        question: customQuestion,
        data: fileData,
      }

      const response = await ApiService.getCustomInsights(token, payload)
      setCustomInsightResult(response?.data || "No insights found.")
      setActiveTab("custom-insight")
    } catch (error) {
      console.error("Custom insight error:", error)
      alert("Failed to fetch custom insight.")
    } finally {
      setCustomLoading(false)
    }
  }

  // Chart options for better rendering
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
        titleColor: theme === "dark" ? "#fff" : "#000",
        bodyColor: theme === "dark" ? "#fff" : "#000",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
      },
    },
    scales:
      chartType !== "pie" && chartType !== "doughnut" && chartType !== "polarArea" && chartType !== "radar"
        ? {
            x: {
              grid: {
                color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: theme === "dark" ? "#ccc" : "#666",
              },
            },
            y: {
              grid: {
                color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: theme === "dark" ? "#ccc" : "#666",
              },
            },
          }
        : undefined,
  }

  // Render the appropriate chart based on type
  const renderChart = () => {
    if (["pie", "doughnut", "polarArea"].includes(chartType)) {
      if (!pieData) return <p className="chart-placeholder">Select Name and Value to generate chart</p>

      const chartProps = {
        data: pieData,
        options: chartOptions,
        height: 300,
      }

      if (chartType === "doughnut") return <Doughnut {...chartProps} />
      if (chartType === "polarArea") return <PolarArea {...chartProps} />
      return <Pie {...chartProps} />
    } else {
      if (!chartData) return <p className="chart-placeholder">Select X and Y axes to generate chart</p>

      const chartProps = {
        data: chartData,
        options: chartOptions,
        height: 300,
      }

      if (chartType === "bar") return <Bar {...chartProps} />
      if (chartType === "line") return <Line {...chartProps} />
      if (chartType === "radar") return <Radar {...chartProps} />
      if (chartType === "scatter") return <Scatter {...chartProps} />

      return <Bar {...chartProps} />
    }
  }

  // Chart type definitions
  const chartTypes = [
    { type: "bar", icon: <BarChart size={24} />, label: "Bar" },
    { type: "line", icon: <LineChart size={24} />, label: "Line" },
    { type: "pie", icon: <PieChart size={24} />, label: "Pie" },
    { type: "doughnut", icon: <Circle size={24} />, label: "Doughnut" },
    { type: "radar", icon: <RadarIcon size={24} />, label: "Radar" },
    { type: "polarArea", icon: <ActivitySquare size={24} />, label: "Polar Area" },
    { type: "scatter", icon: <ScatterChart size={24} />, label: "Scatter" },
  ]

  return (
    <div className={`data-visualization ${theme}`}>
      <header className="app-header">
        <div className="header-left">
          <h2>Data Analyzer</h2>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="header-center">
          <button onClick={() => setActiveTab("data")} className={`tab-button ${activeTab === "data" ? "active" : ""}`}>
            Data
          </button>
          <button
            onClick={() => setActiveTab("visualize")}
            className={`tab-button ${activeTab === "visualize" ? "active" : ""}`}
          >
            Visualize
          </button>
        </div>

        <div className="header-right">
          <button onClick={handleGetInsights} disabled={loading} className="insight-button">
            {loading ? "Loading..." : "Get Insights"}
          </button>
          <button onClick={() => setShowCustomInput(!showCustomInput)} className="custom-insight-button">
            Custom Insight
          </button>
          <button onClick={() => window.history.back()} className="close-button" aria-label="Close">
            ✕
          </button>
        </div>
      </header>

      {showCustomInput && (
        <div className="custom-input-container">
          <input
            type="text"
            placeholder="Enter your question (e.g. Which month had highest sales?)"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            className="custom-question-input"
          />
          <button onClick={handleCustomInsight} disabled={customLoading} className="ask-button">
            {customLoading ? (
              <div className="loading-indicator">
                <div className="spinners" />
                <span>Processing...</span>
              </div>
            ) : (
              "Ask"
            )}
          </button>
        </div>
      )}

      {activeTab === "visualize" ? (
        <div className="visualization-container">
          {/* Columns Section */}
          <div className={`columns-panel ${isColumnOpen ? "open" : "closed"}`}>
            <h3 onClick={() => setIsColumnOpen(!isColumnOpen)} className="panel-header">
              Columns {isColumnOpen ? "▲" : "▼"}
            </h3>
            <div className="columns-list">
              {isColumnOpen &&
                headings.map((heading, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, heading)}
                    onDragEnd={handleDragEnd}
                    className={`column-item ${draggedItem === heading ? "dragging" : ""}`}
                  >
                    {heading}
                  </div>
                ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-panel">
            {/* Chart Controls */}
            <div className="chart-controls">
              {["pie", "doughnut", "polarArea"].includes(chartType) ? (
                <div className="pie-controls">
                  <div className="control-group">
                    <label>Category:</label>
                    <div
                      onDrop={(e) => handlePieDrop(e, "name")}
                      onDragOver={handleDragOver}
                      className={`drop-zone ${isDragging ? "active" : ""}`}
                    >
                      {pieName ? pieName : "Drag Category here"}
                    </div>
                  </div>
                  <div className="control-group">
                    <label>Value:</label>
                    <div
                      onDrop={(e) => handlePieDrop(e, "value")}
                      onDragOver={handleDragOver}
                      className={`drop-zone ${isDragging ? "active" : ""}`}
                    >
                      {pieValue ? pieValue : "Drag Value here"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="axis-controls">
                  <div className="control-group">
                    <label>X-Axis:</label>
                    <div
                      onDrop={(e) => handleDrop(e, "x")}
                      onDragOver={handleDragOver}
                      className={`drop-zone ${isDragging ? "active" : ""}`}
                    >
                      {xAxis ? xAxis : "Drag X-Axis here"}
                    </div>
                  </div>
                  <div className="control-group y-axis-control">
                    <label>Y-Axes:</label>
                    <div
                      onDrop={(e) => handleDrop(e, "y")}
                      onDragOver={handleDragOver}
                      className={`drop-zone multi-drop ${isDragging ? "active" : ""}`}
                    >
                      {yAxes.length > 0 ? (
                        <div className="selected-axes">
                          {yAxes.map((axis, index) => (
                            <div
                              key={index}
                              className="selected-axis"
                              style={{
                                backgroundColor: `${getChartColors(index, 0.2)}`,
                                borderColor: getChartColors(index),
                              }}
                            >
                              <span>{axis}</span>
                              <button
                                onClick={() => handleRemoveYAxis(axis)}
                                className="remove-axis"
                                aria-label={`Remove ${axis}`}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        "Drag Y-Axes here (multiple allowed)"
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chart Display */}
            <div className="chart-container">{renderChart()}</div>
          </div>

          {/* Chart Type Section */}
          <div className="chart-types-panel">
            <h3 className="panel-header">Chart Type</h3>
            <div className="chart-types-grid">
              {chartTypes.map((chart) => (
                <div
                  key={chart.type}
                  onClick={() => {
                    setChartType(chart.type)
                    // Reset axes when switching chart types
                    if (["pie", "doughnut", "polarArea"].includes(chart.type)) {
                      setYAxes([])
                    } else if (["pie", "doughnut", "polarArea"].includes(chartType)) {
                      setPieName(null)
                      setPieValue(null)
                    }
                  }}
                  className={`chart-type-item ${chartType === chart.type ? "active" : ""}`}
                >
                  <div className="chart-icon">{chart.icon}</div>
                  <span className="chart-label">{chart.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === "insight" ? (
        <div className="insights-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner large" />
              <p className="loading-message">Analyzing your data...</p>
            </div>
          ) : (
            <div
              className="insight-content"
              dangerouslySetInnerHTML={{
                __html: insights.insights
                  ?.replace(/```html/g, "")
                  .replace(/```/g, "")
                  .trim(),
              }}
            />
          )}
        </div>
      ) : activeTab === "custom-insight" ? (
        <div className="custom-insights-container">
          {customLoading ? (
            <div className="loading-state">
              <div className="spinner large" />
              <p className="loading-message">Processing your question...</p>
            </div>
          ) : customInsightResult.chart?.type ? (
            <div className="custom-chart-container">
              {customInsightResult.chart.type === "bar" && (
                <Bar
                  data={{
                    labels: customInsightResult.chart.x,
                    datasets: [
                      {
                        label: "Value",
                        data: customInsightResult.chart.y,
                        backgroundColor: getChartColors(0),
                      },
                    ],
                  }}
                  options={chartOptions}
                  height={300}
                />
              )}
              {customInsightResult.chart.type === "pie" && (
                <Pie
                  data={{
                    labels: customInsightResult.chart.x,
                    datasets: [
                      {
                        data: customInsightResult.chart.y,
                        backgroundColor: customInsightResult.chart.x.map((_, i) => getChartColors(i)),
                      },
                    ],
                  }}
                  options={chartOptions}
                  height={300}
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
                        borderColor: getChartColors(0),
                        backgroundColor: getChartColors(0, 0.2),
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                  height={300}
                />
              )}
            </div>
          ) : (
            <div className="custom-insight-text">
              <div
                className="insight-content"
                dangerouslySetInnerHTML={{
                  __html: customInsightResult.response
                    ?.replace(/```html|```/g, "")
                    .replace(/^Final HTML Block:\s*/i, "")
                    .replace(/<!DOCTYPE html>.*?<body>/is, "")
                    .replace(/<\/body>.*<\/html>/is, "")
                    .trim(),
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="data-table-container">
          <h3 className="table-title">Data Table</h3>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "even" : "odd"}>
                    {headings.map((heading, colIndex) => (
                      <td key={colIndex}>{row[heading]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataVisualization
