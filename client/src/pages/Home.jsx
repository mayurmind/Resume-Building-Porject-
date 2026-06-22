import { ArrowRight, Layout, Download, Eye, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import ResumeMockup from "../components/ResumeMockup";
import Footer from "../components/Footer";

function Home() {
  const features = [
    {
      title: "Professional Templates",
      description: "Choose from modern, industry-approved resume designs built to secure interviews.",
      icon: Layout,
    },
    {
      title: "Instant PDF Export",
      description: "Download polished PDF versions of your resume at any time with one click.",
      icon: Download,
    },
    {
      title: "Live Resume Preview",
      description: "Edit information and see visual layout adjustments instantly in real-time.",
      icon: Eye,
    },
    {
      title: "Save Multiple Resumes",
      description: "Manage different career profiles tailored for different job applications.",
      icon: Layers,
    },
  ];

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="logo-dot"></span>
            Over 50,000+ Resumes Created
          </div>
          <h1>Build Your Professional Resume</h1>
          <p>
            Create beautiful resumes with modern templates and export them as PDF in minutes. Designed to beat the ATS systems and impress hiring managers.
          </p>
          <div className="hero-buttons">
            <a href="/editor" className="btn-primary">
              Start Building
              <ArrowRight size={18} />
            </a>
            <a href="/templates" className="btn-secondary">
              Explore Templates
            </a>
          </div>
        </div>

        {/* Right side 3D preview mockup */}
        <ResumeMockup />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2>Designed for Career Success</h2>
          <p>
            Unlock the power of our intuitive tools to build a stand-out CV in a fraction of the time.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;