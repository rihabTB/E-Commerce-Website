import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FEEDBACK_STORAGE_KEY = "websiteFeedbacks";

export default function Feedbacks() {
  const entries = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || "[]");

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content" style={{ padding: "24px" }}>
        <h1>Client Feedbacks</h1>
        {entries.length === 0 ? (
          <p>No feedback media available yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ background: "#fff", borderRadius: "12px", padding: "14px" }}>
                <h3 style={{ marginTop: 0 }}>{entry.title}</h3>
                {entry.type === "video" ? (
                  <video controls style={{ width: "100%", borderRadius: "8px" }}>
                    <source src={entry.mediaUrl} />
                  </video>
                ) : (
                  <img src={entry.mediaUrl} alt={entry.title} style={{ width: "100%", borderRadius: "8px" }} />
                )}
                {entry.note && <p>{entry.note}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <h3>Not done yet</h3>
      <Footer />
    </div>
  );
}