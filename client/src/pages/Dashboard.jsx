import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeCard from "../components/ResumeCard";
import Footer from "../components/Footer";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import API from "../services/api";
import { Plus, FolderOpen } from "lucide-react";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [resumeToDeleteId, setResumeToDeleteId] = useState(null);

  const fetchResumes = useCallback(async () => {
    try {
      const response = await API.get("/resume");
      setResumes(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching resumes:", err);
      setError("Failed to fetch resumes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchResumes();
    });
  }, [fetchResumes]);

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDuplicate = async (id) => {
    try {
      setLoading(true);
      // 1. Fetch details of target resume
      const response = await API.get(`/resume/${id}`);
      const target = response.data;

      // 2. Prepare cloned payload
      const clonedPayload = {
        title: `${target.title} (Copy)`,
        template: target.template,
        personalInfo: target.personalInfo,
        education: target.education,
        skills: target.skills,
        experience: target.experience,
        projects: target.projects
      };

      // 3. Post to create endpoint
      await API.post("/resume/create", clonedPayload);
      
      fetchResumes();
      toast.success("Resume duplicated successfully");
    } catch (err) {
      console.error("Error duplicating resume:", err);
      toast.error("Error duplicating resume: " + (err.response?.data?.error || err.message));
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setResumeToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!resumeToDeleteId) return;
    try {
      await API.delete(`/resume/${resumeToDeleteId}`);
      toast.success("Resume deleted successfully");
      fetchResumes();
    } catch (err) {
      console.error("Error deleting resume:", err);
      toast.error("Error deleting resume: " + (err.response?.data?.error || err.message));
    } finally {
      setIsDeleteModalOpen(false);
      setResumeToDeleteId(null);
    }
  };

  const handleDownload = (id) => {
    navigate(`/preview/${id}`);
  };

  const handleCreate = () => {
    navigate("/templates");
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        {/* Top Header Section */}
        <section className="dashboard-header">
          <div className="dashboard-greeting-area">
            <h1>Welcome back 👋</h1>
            <p>Manage and create your professional resumes.</p>
          </div>
          <button className="create-resume-btn" onClick={handleCreate}>
            <Plus size={18} />
            <span>Create New Resume</span>
          </button>
        </section>

        {/* Resumes Grid / Empty State / Loading */}
        <section className="dashboard-content">
          {loading ? (
            <Loader text="Loading resumes..." />
          ) : error ? (
            <div className="dashboard-empty-state">
              <h2>Error</h2>
              <p>{error}</p>
              <button className="empty-create-btn" onClick={fetchResumes}>
                Retry
              </button>
            </div>
          ) : resumes.length === 0 ? (
            <div className="dashboard-empty-state">
              <div className="empty-icon-wrapper">
                <FolderOpen size={48} />
              </div>
              <h2>No resumes created yet</h2>
              <p>Get started by creating a new resume using one of our recruiter-approved templates.</p>
              <button className="empty-create-btn" onClick={handleCreate}>
                <Plus size={16} /> Create Resume
              </button>
            </div>
          ) : (
            <div className="resumes-grid">
              {resumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  id={resume._id}
                  name={resume.title}
                  title={resume.title}
                  template={resume.template}
                  createdDate={resume.createdAt}
                  updatedDate={resume.updatedAt || resume.lastUpdated}
                  lastUpdated={new Date(resume.lastUpdated || resume.updatedAt).toLocaleDateString()}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDeleteClick}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setResumeToDeleteId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Dashboard;
