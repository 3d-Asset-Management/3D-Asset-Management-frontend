import './Button.css';
function Buttons({ button_name, iconLeft, iconRight, IconNameLeft, IconNameRight, onClick }) {
    return (
        <>
          <button className="btn" onClick={onClick} >
            {iconLeft && IconNameLeft && <IconNameLeft className="btn-icons" />}
           <span>{button_name}</span>
            {iconRight && IconNameRight && <IconNameRight className="btn-icons" />}
          </button>      
        </>
    );
}
export default Buttons;