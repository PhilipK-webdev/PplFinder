import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="static" color="transparent"
      style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <NavLink
          to="/"
        >
          <Tab label="Home" index={0} />
        </NavLink>
        <NavLink
          to="/favorite"
        >
          <Tab label="Favorites" index={1} />
        </NavLink>
      </Tabs>
    </AppBar >
  );
};

export default NavBar;
