import "./Navbar.scss";

const Navbar = () => {
  return (
    <section className="navbar sidebar">
      <p className="navbar__title">
        So<span className="text__color">cia</span>l Net
        <span className="text__color">work</span>
      </p>
      <div className="navbar__links">
        <a href="/" className="navbar__link">
          Home
        </a>
        <a href="/profile" className="navbar__link">
          Profile
        </a>
      </div>

      <button className="navbar__button">Create post</button>
    </section>
  );
};

export default Navbar;
