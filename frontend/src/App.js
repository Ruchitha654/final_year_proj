import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import LiveHeatmap from "./LiveHeatmap";
import axios from "axios";

function App() {
  const [detected, setDetected] = useState([]);
  const audioRef = useRef(null);
  const previousDetectedRef = useRef([]); // Track previously detected animals

  useEffect(() => {
    const fetchDetection = async () => {
      try {
        const res = await axios.get("http://localhost:5000/detect");
        const newDetected = res.data.detected || [];

        const prevDetected = previousDetectedRef.current;

        // Find truly new animals not seen before
        const newAnimals = newDetected.filter(
          (animal) => !prevDetected.includes(animal)
        );

        if (newAnimals.length > 0) {
          // Update state and ref
          setDetected((prev) => [...prev, ...newAnimals]);
          previousDetectedRef.current = [...prevDetected, ...newAnimals];

          // Play notification sound
          if (audioRef.current) {
            audioRef.current.play().catch((e) => {
              console.warn("🔇 Autoplay blocked. User interaction may be required.");
            });
          }
        }
      } catch (err) {
        console.error("❌ Detection error:", err);
      }
    };

    fetchDetection(); // initial fetch
    const interval = setInterval(fetchDetection, 10000); // fetch every 10 seconds

    return () => clearInterval(interval);
  }, []); // only run once on mount

  return (
    <div>
      {/* Alert sound */}
      <audio ref={audioRef} src="/sound.wav" preload="auto" />

      <header className="app-header">
        Wild Animal Intrusion Detection and Prevention System
      </header>

      <div className="app">
        <div className="sidebar glass slide-in-left">
          <ul>
            <li>User Profile</li>
            <li>System Status</li>
            <li>Settings</li>
            <li>Help</li>
            <li>Contacts</li>
          </ul>
        </div>

        <div className="main glass fade-in">
          <div className="section">
            <h3>Live Intrusion Alerts</h3>
            {detected.length > 0 ? (
              <>
                <div className="alert-box danger">⚠ Animal Detected</div>
                <div className="detected-name" style={{ fontWeight: "bold" }}>
                  {detected.map((animal, index) => (
                    <div key={index}>🔸 {animal}</div>
                  ))}
                </div>
              </>
            ) : (
              <div className="alert-box">🔄 Detecting...</div>
            )}
          </div>

          <div className="section live-risk-container">
            <div className="live-feed">
              <h3>Live Camera Feed</h3>
              <div className="alert-box">Video Stream</div>
              <div style={{ position: "relative" }}>
                <div className="live-badge">LIVE</div>
                <video
                  className="video-box"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                >
                  <source src="http://localhost:5000/video" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="risk-prediction">
              <h3>Risk Prediction</h3>
              <div className="alert-box">Heat Map</div>
              <LiveHeatmap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

