import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import crossIcon from "../../assets/icons/cross-small.svg";

import "./Sidebar.scss";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const onCleanSearch = () => {
    setSearch("");
  };

  return (
    <section className="sidebar rightbar">
      <div className="rightbar__search">
        <img src={searchIcon} alt="search icon" className="rightbar__icon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          spellCheck="false"
          onChange={({ target }) => setSearch(target.value)}
          tabIndex={-1}
          className="rightbar__input"
        />
        <button
          onClick={onCleanSearch}
          className={`rightbar__cleanSearch ${
            search && "rightbar__cleanSearch--visible"
          }`}
        >
          <img src={crossIcon} alt="clean search icon" />
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
