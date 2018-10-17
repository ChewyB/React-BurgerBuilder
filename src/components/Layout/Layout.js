import React from "react";
import classes from "./Layout.module.css";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
//import Aux from "../../hoc/Aux";

const layout = props => (
  <>
    <Toolbar/>
    <SideDrawer></SideDrawer>
    <main className={classes.Content}>
      {props.children}
    </main>
  </>
);

export default layout;