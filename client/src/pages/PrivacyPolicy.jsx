import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="container" style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)" }}>
        <h1 style={{ marginBottom: "20px", color: "var(--color-primary)" }}>Privacy Policy</h1>
        <p style={{ marginBottom: "15px", color: "var(--color-text-muted)" }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>1. Information We Collect</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          We collect information that you provide directly to us when you create an account, build a resume, or communicate with us. 
          This may include your name, email address, phone number, employment history, education details, and any other information you choose to include in your resume.
        </p>

        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>2. How We Use Your Information</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          We use the information we collect to provide, maintain, and improve our services, to process your requests, and to communicate with you.
          Your resume data is strictly used for the purpose of generating your resume documents and is never sold to third parties.
        </p>

        <h2 style={{ marginTop: "30px", marginBottom: "15px" }}>3. Data Security</h2>
        <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
          We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          However, no data transmission over the internet or information storage technology can be guaranteed to be 100% secure.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
