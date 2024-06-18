import './Notification.css'
import imgs from '../../abc.png'
export  function NotificationBox() {
   return (
        <div className="notifiaction"> 
               <img src={imgs} alt="abc" />
        </div>
   )
}

export default function Notification() {
     return (
          <div className='notifiaction_container'> 
               <NotificationBox/>
               <NotificationBox/>
               <NotificationBox />  
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
             <NotificationBox/>
          </div>
     )
  }