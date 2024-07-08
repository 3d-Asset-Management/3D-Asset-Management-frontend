// Desc: Dashboard page
import CardContainer from '../../components/CardContainer/CardContainer';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import useFetchData from '../../Hooks/useFetchData';
import Loader from '../../components/Loader/Loader';
import './Dashboard.css';
function Dashboard() {
   const baseURL = process.env.REACT_APP_MASTER_URL_BACKEND
   const initialUrl=`${baseURL}/getallitems`;
   const searchUrl = `${baseURL}/search`;
   const { data, loading,setLoading, setQuery } = useFetchData(initialUrl, searchUrl);
  return (
    <>
    {loading && <Loader/>}
    <div className='dashboard__container'>
          <div className='dashboard__box'>
            <Navbar />
            <CardContainer
             data={data}
             setLoading={setLoading}
             setQuery={setQuery}
            />
          </div>
          <Footer />
    </div>
    </>
  );
}
export default Dashboard;