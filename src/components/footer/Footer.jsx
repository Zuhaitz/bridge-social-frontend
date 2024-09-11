import "./Footer.scss";

const Footer = () => {
  return (
    <div className="foot">
      <p className="foot__legal">
        Made for <span className="foot__highlight">The Bridge</span>
      </p>

      <p className="foot__credits">
        Made by{" "}
        <a
          href="https://github.com/Zuhaitz"
          target="_blank"
          className="foot__link"
        >
          Zuhaitz
        </a>
      </p>
    </div>
  );
};

export default Footer;
