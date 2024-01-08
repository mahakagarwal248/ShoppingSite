import Sidebar from './Sidebar';
import Summary from './pages/Summary';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Summary />
    </div>
  );
}

export default Dashboard;
