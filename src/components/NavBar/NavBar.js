import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useState(0);
  let location = useLocation();
  useEffect(() => {
    location.pathname === "/" ? setValue(0) : setValue(1)
  }, [value])

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
        <Tab
          label="Home"
          index={0}
          component={Link}
          to={"/"} />
        <Tab
          label="Favorites"
          index={1}
          component={Link}
          to={"/favorite"}
        />
      </Tabs>
    </AppBar >
  );
};

export default NavBar;
