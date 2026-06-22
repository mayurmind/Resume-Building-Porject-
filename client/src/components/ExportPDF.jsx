import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Download, Loader2 } from "lucide-react";

function ExportPDF() {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview element not found!");
      return;
    }

    setIsExporting(true);
    try {
      // Configure html2canvas to capture premium print layouts correctly
      const canvas = await html2canvas(element, {
        scale: 2.5, // High resolution scaling
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff" // Maintain standard sheet white background
      });

      const imgData = canvas.toDataURL("image/png");
      
      // Calculate A4 dimensions (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      const width = pdfWidth;
      const height = pdfWidth / ratio;

      // Draw onto the PDF page
      pdf.addImage(imgData, "PNG", 0, 0, width, height > pdfHeight ? pdfHeight : height);
      
      pdf.save("ResumeForge_Resume.pdf");
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error generating PDF: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      className="ctrl-btn export" 
      onClick={handleDownload} 
      disabled={isExporting} 
      title="Download PDF"
    >
      {isExporting ? <Loader2 size={16} style={{ animation: "spin 2s linear infinite" }} /> : <Download size={16} />}
      <span>{isExporting ? "Downloading..." : "Download PDF"}</span>
    </button>
  );
}

export default ExportPDF;
