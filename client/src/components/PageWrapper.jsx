import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
};

export default PageWrapper;
