import { useEffect, useState } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";

function App() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("2024-05-20");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/${date}`)
      .then((res) => setEvents(res.data))
      .catch((err) => setEvents([]))
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #121212, #1e1e1e 100%)",
        color: "#ddd",
      }}
    >
      <h1>Event Viewer</h1>
      <span
        style={{
          marginLeft: "1rem",
          display: "inline-block",
          verticalAlign: "middle",
          color: "#aaa",
        }}
      >
        Choose any date between 20, 21 and 22
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <ReactDatePicker
          selected={parseISO(date)}
          onChange={(d) => setDate(format(d, "yyyy-MM-dd"))}
          dateFormat="yyyy-MM-dd"
          popperPlacement="bottom"
          showPopperArrow={false}
          calendarClassName="dark-picker"
          style={{
            borderRadius: "6px",
            border: "1px solid #444",
            padding: "0.5rem",
            background: "#222",
            color: "#ddd",
            width: "10px",
            fontSize: "1rem",
          }}
        />
      </div>
      {loading ? (
        <div style={{ margin: "2rem" }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#7faaff"
              strokeWidth="4"
              opacity="0.25"
            />
            <path
              d="M44 24c0-11.046-8.954-20-20-20"
              stroke="#3076ff"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <>
          <table
            style={{
              marginTop: "2rem",
              borderCollapse: "collapse",
              background: "#222",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
              minWidth: "340px",
              color: "#ddd",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "center", color: "#777" }}
                  >
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((ev) => (
                  <tr key={ev.id}>
                    <td style={tdStyle}>{ev.id}</td>
                    <td style={tdStyle}>{ev.name}</td>
                    <td style={tdStyle}>{ev.eventDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "1rem" }}>
            <a
              href="https://github.com/vignesh-ponraj/event-manager-backend"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#7faaff",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Backend repo
            </a>
            |
            <a
              href="https://github.com/vignesh-ponraj/event-manager-frontend"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#7faaff",
                textDecoration: "none",
                marginLeft: "1rem",
              }}
            >
              Frontend repo
            </a>
          </div>
        </>
      )}
    </div>
  );
}

const thStyle = {
  background: "#333",
  padding: "8px 14px",
  borderBottom: "1px solid #444",
  color: "#ccc",
};

const tdStyle = {
  padding: "7px 14px",
  borderBottom: "1px solid #444",
  color: "#ddd",
};

export default App;
