// Display the generated logs

import React from "react";

const LogList = ({ logs, downloadLogsAsPDF }) => {
  return (
    <div style={{ marginLeft: "20px" }}>
      <h2>Generated Logs</h2>
      <ul>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <li
              key={index}
              style={{ listStyleType: log.startsWith("Day") ? "disc" : "none" }}
            >
              {log.startsWith("Day") ? <strong>{log}</strong> : log}
            </li>
          ))
        ) : (
          <li>No logs generated yet.</li>
        )}
      </ul>
      {logs.length > 0 && (
        <button className="download-button" onClick={downloadLogsAsPDF}>
          Download Logs as PDF
        </button>
      )}
    </div>
  );
};

export default LogList;
