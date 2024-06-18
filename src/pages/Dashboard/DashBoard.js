// Desc: Dashboard page
import CardContainer from '../../components/CardContainer/CardContainer';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
function Dashboard() {
  return (
    <div className='dashboard__box'>
       <Navbar />
      <CardContainer/>
    </div>
  );
}
export default Dashboard;