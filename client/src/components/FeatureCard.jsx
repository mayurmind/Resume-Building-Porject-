
function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="feature-card">
      <div className="feature-icon-wrapper">
        {Icon && <Icon size={24} />}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
