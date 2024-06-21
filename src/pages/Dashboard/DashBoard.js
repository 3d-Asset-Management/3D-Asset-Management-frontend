// Desc: Dashboard page
import CardContainer from '../../components/CardContainer/CardContainer';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
function Dashboard() {
  return (
    <div className='dashboard__container'>
          <div className='dashboard__box'>
            <Navbar />
            <CardContainer/>
          </div>
          <Footer />
    </div>
  );
}
export default Dashboard;