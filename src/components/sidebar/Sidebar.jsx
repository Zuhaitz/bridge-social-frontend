import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";

import "./Sidebar.scss";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="sidebar rightbar">
      <div className="rightbar__search">
        <img src={searchIcon} alt="search icon" className="rightbar__icon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          className="rightbar__input"
        />
        <button className="rightbar__searchEmpty">
          <p>x</p>
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
