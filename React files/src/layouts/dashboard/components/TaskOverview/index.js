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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Chart.js components
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

function taskOverview() {
  // Define the data for the pie chart
  const chartData = {
    labels: ["In Progress", "Pending", "Completed"],
    datasets: [
      {
        label: "Task Status",
        
        data: [10, 7, 3], // Example data; replace with dynamic values
        backgroundColor: ["Red", "Blue", "#32CD32"],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((sum, data) => sum + data, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`; // Show percentage with 1 decimal point
        },
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 18,
        },
        display: true,
      },
    },
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h5" fontWeight="medium">
          Task Overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              Task progress status
            </MDTypography>{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={3} textAlign="center">
        {/* Add the Pie Chart */}
        <Pie 
          data={chartData} 
          options={options}
          plugins={[ChartDataLabels]} 
        />
      </MDBox>
    </Card>
  );
}

export default taskOverview;
