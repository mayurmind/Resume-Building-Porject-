import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsOfService() {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="container" style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)" }}>
        <h1 style={{ marginBottom: "20px", color: "var(--color-primary)" }}>Terms of Service</h1>
        <p style={{ marginBottom: "15px", color: "var(--color-text-muted)" }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>1. Acceptance of Terms</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          By accessing and using ResumeForge, you accept and agree to be bound by the terms and provision of this agreement. 
          In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>2. Description of Service</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          ResumeForge provides users with access to a rich collection of resources, including resume building tools, templates, and formatting capabilities. 
          You understand and agree that the service is provided "AS-IS" and that ResumeForge assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
        </p>

        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>3. User Account, Password, and Security</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          You are responsible for maintaining the confidentiality of the password and account, and are fully responsible for all activities that occur under your password or account. 
          You agree to immediately notify ResumeForge of any unauthorized use of your password or account or any other breach of security.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default TermsOfService;
