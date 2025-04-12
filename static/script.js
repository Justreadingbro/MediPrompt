document.addEventListener("DOMContentLoaded", () => {
  const socket = io('http://localhost:5000');
  const form = document.getElementById("reportForm");
  const reportOutput = document.getElementById("reportOutput");
  const copyBtn = document.getElementById("copyReport");
  const exportBtn = document.getElementById("exportPDF");

  // Log socket connection confirmation
  socket.on('connect', () => {
    console.log("Socket connected with id:", socket.id);
  });

  // Listen for incoming report tokens
  socket.on('report_token', (msg) => {
    // If this is the first token, clear the "Generating report..." message
    if (reportOutput.innerHTML.includes("Generating report...")) {
      reportOutput.innerHTML = "";
    }
    reportOutput.innerHTML += msg.data.replace(/\n/g, "<br>") + " ";
  });

  // Listen for the complete event
  socket.on('report_complete', (msg) => {
    console.log("Report complete:", msg.data);
  });

  // Listen for errors
  socket.on('report_error', (msg) => {
    console.error("Error:", msg.error);
    reportOutput.innerHTML += `<p class="error">Error: ${msg.error}</p>`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // Immediately show a message so the user knows the process has started.
    reportOutput.innerHTML = "<p>Generating report...</p>";
    const patientInfo = document.getElementById("patientInfo").value;
    const includeLab = document.getElementById("includeLab").checked;
    // Emit the generate event with patient data
    socket.emit('generate_report', { patient_info: patientInfo, include_lab: includeLab });
  });

  // Copy report to clipboard
  copyBtn.addEventListener("click", async () => {
    const reportText = reportOutput.innerText;
    if (reportText) {
      try {
        await navigator.clipboard.writeText(reportText);
        alert("Report copied to clipboard!");
      } catch (error) {
        alert("Failed to copy the report.");
        console.error("Copy error:", error);
      }
    }
  });

  // Export report to a PDF using jsPDF.
  exportBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const reportText = reportOutput.innerText;
    const lines = doc.splitTextToSize(reportText, 180);
    doc.text(lines, 10, 10);
    doc.save("diagnostic_report.pdf");
  });
});
