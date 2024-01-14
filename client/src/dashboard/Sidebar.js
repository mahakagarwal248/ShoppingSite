import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setModalStep, showModal } from '../actions/Common';

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeBtn, setActiveBtn] = useState(location?.state || '');
  const handleBtnClick = (btn) => {
    setActiveBtn(btn);
  };

  const handleContactClick = () => {
    dispatch(showModal(true));
    dispatch(setModalStep(5));
  };
  useEffect(() => {
    if (activeBtn) {
      navigate(`/dashboard/${activeBtn === 'overview' ? '' : activeBtn}`, { state: activeBtn });
    }
  }, [activeBtn, navigate]);
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        Shopping Site
      </div>
      <button
        className={activeBtn === 'overview' ? 'sidebar-btn sidebar-btn-active' : 'sidebar-btn'}
        onClick={() => handleBtnClick('overview')}>
        Overview
      </button>
      <button
        className={activeBtn === 'products' ? 'sidebar-btn sidebar-btn-active' : 'sidebar-btn'}
        onClick={() => handleBtnClick('products')}>
        Products
      </button>
      <button
        className={activeBtn === 'add-product' ? 'sidebar-btn sidebar-btn-active' : 'sidebar-btn'}
        onClick={() => handleBtnClick('add-product')}>
        Add Products
      </button>
      <button
        className={activeBtn === 'profile' ? 'sidebar-btn sidebar-btn-active' : 'sidebar-btn'}
        onClick={() => handleBtnClick('profile')}>
        View Profile
      </button>
      <button className="sidebar-btn" onClick={handleContactClick}>
        Contact Us
      </button>
    </div>
  );
}

export default Sidebar;
