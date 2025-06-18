import React from "react";
import "./App.css";
import LiveHeatmap from "./LiveHeatmap";

function App() {
  return (
    <div>
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
            <div className="alert-box danger">⚠ Animal Detected </div>
            <div className="detected-name"> Bear</div>
          </div>

          {/* Container for live feed and heatmap side by side */}
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
                  style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                >
                  <source src="/vedios/vedio1.mp4" type="video/mp4" />
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
