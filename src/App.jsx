import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("2024-05-20");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    // setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/${date}`)
      .then((res) => setEvents(res.data))
      .catch((err) => setEvents([]));
    // .finally(() => setLoading(false));
  }, [date]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#f3f6fb,#e7eaf0 100%)",
      }}
    >
      <h1>Event Viewer</h1>
      <span
        style={{
          marginLeft: "1rem",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        Choose any date between 20, 21 and 22
      </span>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      {
        // loading ? (
        //   <div style={{ margin: "2rem" }}>
        //     <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        //       <circle
        //         cx="24"
        //         cy="24"
        //         r="20"
        //         stroke="#7faaff"
        //         strokeWidth="4"
        //         opacity="0.25"
        //       />
        //       <path
        //         d="M44 24c0-11.046-8.954-20-20-20"
        //         stroke="#3076ff"
        //         strokeWidth="4"
        //         strokeLinecap="round"
        //       />
        //     </svg>
        //   </div>
        // ) :
        <table
          style={{
            marginTop: "2rem",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            minWidth: "340px",
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
                <td colSpan="3" style={{ textAlign: "center", color: "#999" }}>
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
      }
    </div>
  );
}

const thStyle = {
  background: "#f3f6fb",
  padding: "8px 14px",
  borderBottom: "1px solid #e7eaf0",
};

const tdStyle = {
  padding: "7px 14px",
  borderBottom: "1px solid #e7eaf0",
};

export default App;
