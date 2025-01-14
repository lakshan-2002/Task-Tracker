/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useMemo } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import LogoutIcon from "@mui/icons-material/Logout";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  // Determine text color based on sidenav state
  const textColor = useMemo(() => {
    if (transparentSidenav || (whiteSidenav && !darkMode)) return "dark";
    if (whiteSidenav && darkMode) return "inherit";
    return "white";
  }, [transparentSidenav, whiteSidenav, darkMode]);

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    const handleMiniSidenav = () => {
      const isSmallScreen = window.innerWidth < 1200;
      setMiniSidenav(dispatch, isSmallScreen);
      setTransparentSidenav(dispatch, !isSmallScreen && transparentSidenav);
      setWhiteSidenav(dispatch, !isSmallScreen && whiteSidenav);
    };

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    if (type === "collapse") {
      return href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route} style={{ textDecoration: "none" }}>
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
          />
        </NavLink>
      );
    }

    if (type === "title") {
      return (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    }

    if (type === "divider") {
      return (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return null;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>
        {renderRoutes}
        <NavLink to="/create-task" style={{ textDecoration: "none" }}>
          <SidenavCollapse
            name="Create Tasks"
            icon={<Icon>add_task</Icon>}
            active={"create-task" === collapseName}
          />
        </NavLink>
        {/* Added All Tasks Route */}
        <NavLink to="/tasks" style={{ textDecoration: "none" }}>
          <SidenavCollapse
            name="All Tasks"
            icon={<Icon>task</Icon>} /* Add an appropriate icon for All Tasks */
            active={"tasks" === collapseName}
          />
        </NavLink>
        <NavLink to= "/inprogress-tasks" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="In Progress Tasks"
            icon={<Icon>sync</Icon>}
            active={"inprogress-tasks" === collapseName}
          />
        </NavLink>
        <NavLink to= "/pending-tasks" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="Pending Tasks"
            icon={<Icon>pending_actions</Icon>}
            active={"pending-tasks" === collapseName}
          />
        </NavLink>
        <NavLink to= "/completed-tasks" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="Completed Tasks"
            icon={<Icon>task_alt</Icon>}
            active={"completed-tasks" === collapseName}
          />
        </NavLink>
        <NavLink to= "/notifications" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="Notifications"
            icon={<Icon>notifications</Icon>}
            active={"notifications" === collapseName}
          />
        </NavLink>
        <NavLink to= "/profile" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="Profile"
            icon={<Icon>person</Icon>}
            active={"profile" === collapseName}
          />
        </NavLink>
        <NavLink to= "/logout" style={{textDecoration: "none"}}>
          <SidenavCollapse
            name="Logout"
            icon={<LogoutIcon />}
            active={"logout" === collapseName}
          />
        </NavLink>
      </List>
      {/* <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          href="https://www.creative-tim.com/product/material-dashboard-pro-react"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          color={sidenavColor}
          fullWidth
        >
          Upgrade to Pro
        </MDButton>
      </MDBox> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
