import "./Overlay.scss";

const Overlay = ({ setVariable }) => {
  const onClick = (event) => {
    event.preventDefault();
    if (!setVariable) return;
    setVariable(false);
  };

  return <div onClick={onClick} className="overlay"></div>;
};

export default Overlay;
