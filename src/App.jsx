import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("2024-05-20");

  useEffect(() => {
    if (!date) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/${date}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Event Viewer</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="3">No events found</td>
            </tr>
          ) : (
            events.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>{ev.name}</td>
                <td>{ev.eventDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
