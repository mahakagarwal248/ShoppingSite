import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        Shopping Site
      </div>
      <button className="sidebar-btn" onClick={() => navigate('/dashboard')}>
        Overview
      </button>
      <button className="sidebar-btn" onClick={() => navigate('/dashboard/products')}>
        Products
      </button>
      <button className="sidebar-btn" onClick={() => navigate('/dashboard/add-product')}>
        Add Products
      </button>
      <button className="sidebar-btn" onClick={() => navigate('/dashboard/profile')}>
        View Profile
      </button>
      <button className="sidebar-btn">Contact Us</button>
    </div>
  );
}

export default Sidebar;
