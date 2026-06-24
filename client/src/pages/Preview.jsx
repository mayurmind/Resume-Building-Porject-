import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumePreview from "../components/ResumePreview";
import Footer from "../components/Footer";
import API from "../services/api";
import Loader from "../components/Loader";
import ExportPDF from "../components/ExportPDF";
import { Edit } from "lucide-react";

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchResumeDetails = async () => {
      try {
        const response = await API.get(`/resume/${id}`);
        if (!active) return;
        const fetchedResume = response.data;
        
        const formattedData = {
          title: fetchedResume.title || "Untitled Resume",
          template: fetchedResume.template || "modern",
          personal: {
            name: fetchedResume.personalInfo?.name || "",
            email: fetchedResume.personalInfo?.email || "",
            phone: fetchedResume.personalInfo?.phone || "",
            location: fetchedResume.personalInfo?.location || "",
            linkedin: fetchedResume.personalInfo?.linkedin || "",
            portfolio: fetchedResume.personalInfo?.portfolio || ""
          },
          summary: fetchedResume.summary || "",
          education: fetchedResume.education || [],
          skills: fetchedResume.skills || [],
          experience: fetchedResume.experience || [],
          projects: fetchedResume.projects || []
        };
        
        setResumeData(formattedData);
      } catch (err) {
        console.error("Error fetching resume details:", err);
        setError("Failed to load resume. It might not exist or you don't have permission.");
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) {
      fetchResumeDetails();
    } else {
      setLoading(false);
      setError("No resume ID provided.");
    }
    
    return () => { active = false; };
  }, [id]);

  return (
    <div className="preview-page" style={{ paddingTop: "80px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div style={{ padding: "40px 8% 20px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>{resumeData?.title || "Resume Preview"}</h1>
          <p style={{ color: "var(--color-text-muted)" }}>Preview your resume and export as PDF.</p>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {!error && (
            <>
              <button 
                className="btn-secondary" 
                onClick={() => navigate(`/editor/${id}`)}
              >
                <Edit size={16} /> Edit
              </button>
              <ExportPDF />
            </>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "20px 8% 80px", width: "100%" }}>
        {loading ? (
          <Loader fullScreen={false} text="Loading resume..." />
        ) : error ? (
          <div style={{ textAlign: "center", padding: "100px 20px", color: "var(--color-accent)" }}>
            <h2>{error}</h2>
            <button className="btn-primary" style={{ marginTop: "20px", margin: "20px auto 0" }} onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div style={{ transform: "scale(1)", transformOrigin: "top center" }}>
            <ResumePreview data={resumeData} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Preview;
