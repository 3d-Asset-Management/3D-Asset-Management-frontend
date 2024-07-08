import './Button.css';
function Buttons({ button_name, iconLeft, iconRight, IconNameLeft, IconNameRight, onClick ,disabled}) {
    return (
        <>
          <button className={`btn ${disabled ? 'disabled-cursor' : ''}`} onClick={onClick}  disabled={disabled} >
            {iconLeft && IconNameLeft && <IconNameLeft className="btn-icons" />}
           <span>{button_name}</span>
            {iconRight && IconNameRight && <IconNameRight className="btn-icons" />}
          </button>      
        </>
    );
}
export default Buttons;