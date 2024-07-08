import './PannelRight.css';
import Button from '../../Button/Button';
import { IoMdDownload } from "react-icons/io";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import { useParams } from 'react-router-dom';

export default function PannelRight({autoRotate, setAutoRotate, wireframe, setWireframe, axes, setAxes, grid, setGrid,handleDownloadClick}) {
    const { data } = useParams(); 
    return (
        <>
           <div className="Modal__Pannel__right">
              <h3 className='modal__header1'>Properties</h3>
              <div className='modal_controls_box'>
                 <div className='modal__controls'>
                        <div className='modal__controls__container'>
                                <div className='modal__controls__box__item modal__controls__box__item--1'>
                                  <h4>Model Controls</h4>
                                </div>
                                <div className='modal__controls__box__item'>
                                    <label>Auto-Rotate</label>
                                    <label className='toggle__icon' onClick={()=> setAutoRotate(!autoRotate)}>{autoRotate?<BsToggleOn/>:<BsToggleOff/>}</label>    
                                </div>
                                <div className='modal__controls__box__item'>
                                    <label>Wireframe</label> 
                                    <label className='toggle__icon' onClick={()=> setWireframe(!wireframe)}>{wireframe?<BsToggleOn/>:<BsToggleOff/>}</label>
                                </div>
                                <div className='modal__controls__box__item'>
                                    <label>Axes</label>
                                    <label className='toggle__icon' onClick={()=> setAxes(!axes)}>{axes?<BsToggleOn/>:<BsToggleOff />}</label>    
                                </div>
                                <div className='modal__controls__box__item'>
                                    <label>Grid</label>
                                    <label className='toggle__icon' onClick={()=> setGrid(!grid)}>{grid?<BsToggleOn/>:<BsToggleOff />}</label>
                                </div>   
                        </div>
                 </div>
                 <div className='modal__properties'>
                            <div className='modal__controls__container'>
                                     <div className='modal__controls__box__item modal__controls__box__item--1'>
                                      <h4>Model Properties</h4>
                                    </div>
                                    <div className='modal__controls__box__item'>
                                        <label>File Name</label>
                                        <label>{data}</label>
                                    </div>
                                    <div className='modal__controls__box__item'>
                                        <label>File Type</label>
                                        <label>obj</label>
                                    </div>
                                    <div className='modal__controls__box__item'>
                                        <label>File Size</label>
                                        <label>5MB</label>
                                        
                                    </div>   
                                    <div className='modal__controls__box__item'>
                                        <label>Date of creation</label>
                                        <label>June 5, 2024</label> 
                                    </div>   
                            </div>
                 </div>
              </div>
              <div className='modal__footer_box'>
                    <Button button_name={"Download Model"} iconLeft={'true'} IconNameLeft={ IoMdDownload} onClick={handleDownloadClick} className='modalDownloadbtn'/>
              </div>  
           </div>
        </>
    )
}