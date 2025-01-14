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

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// // @mui material components
// import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
//   return (
//     <Card>
//       <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
//         <MDBox
//           variant="gradient"
//           bgColor={color}
//           color={color === "light" ? "dark" : "white"}
//           coloredShadow={color}
//           borderRadius="xl"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           width="4rem"
//           height="4rem"
//           mt={-3}
//         >
//           <Icon fontSize="medium" color="inherit">
//             {icon}
//           </Icon>
//         </MDBox>
//         <MDBox textAlign="right" lineHeight={1.25}>
//           <MDTypography variant="button" fontWeight="light" color="text">
//             {title}
//           </MDTypography>
//           <MDTypography variant="h4">{count}</MDTypography>
//         </MDBox>
//       </MDBox>
//       <Divider />
//       <MDBox pb={2} px={2}>
//         <MDTypography component="p" variant="button" color="text" display="flex">
//           <MDTypography
//             component="span"
//             variant="button"
//             fontWeight="bold"
//             color={percentage.color}
//           >
//             {percentage.amount}
//           </MDTypography>
//           &nbsp;{percentage.label}
//         </MDTypography>
//       </MDBox>
//     </Card>
//   );
// }

// // Setting default values for the props of ComplexStatisticsCard
// ComplexStatisticsCard.defaultProps = {
//   color: "info",
//   percentage: {
//     color: "success",
//     text: "",
//     label: "",
//   },
// };

// // Typechecking props for the ComplexStatisticsCard
// ComplexStatisticsCard.propTypes = {
//   color: PropTypes.oneOf([
//     "primary",
//     "secondary",
//     "info",
//     "success",
//     "warning",
//     "error",
//     "light",
//     "dark",
//   ]),
//   title: PropTypes.string.isRequired,
//   count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   percentage: PropTypes.shape({
//     color: PropTypes.oneOf([
//       "primary",
//       "secondary",
//       "info",
//       "success",
//       "warning",
//       "error",
//       "dark",
//       "white",
//     ]),
//     amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     label: PropTypes.string,
//   }),
//   icon: PropTypes.node.isRequired,
// };

// export default ComplexStatisticsCard;
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComplexStatisticsCard({ color, title, titleColor, titleFontSize, count, countColor, percentage }) {
  return (
    <Card>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="bold" align="left" sx={{ color: titleColor, fontSize: titleFontSize }}>
          {title}
        </MDTypography>
        <MDTypography variant="h3" fontWeight="bold" align="left" sx={{ color: countColor }}>
          {count}
        </MDTypography>
        <MDTypography variant="button" color={percentage.color} fontWeight="bold" align="left">
          {percentage.amount}{" "}
          <MDTypography variant="caption" fontWeight="regular" color="text">
            {percentage.label}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  titleColor: "textPrimary",
  titleFontSize: "1.25rem",
  countColor: "textPrimary",
  percentage: {
    color: "success",
    amount: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  countColor: PropTypes.string,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
    ]).isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ComplexStatisticsCard;
