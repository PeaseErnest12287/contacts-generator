import React from "react";

const LogDisplay = ({ logs }) => {
    return (
        <div>
            <h2>📊 Process Logs</h2>
            <div style={{ background: "#eee", padding: "10px", height: "200px", overflowY: "scroll" }}>
                {logs.map((log, index) => (
                    <p key={index}>➡️ {log}</p>
                ))}
            </div>
        </div>
    );
};

export default LogDisplay;
