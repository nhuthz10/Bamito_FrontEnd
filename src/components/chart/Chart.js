import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

import "./chart.scss";

function Chart({ chartData, xLabels }) {
  return (
    <div>
      <BarChart
        width={1000}
        height={550}
        series={[{ data: chartData, id: "revenueId" }]}
        xAxis={[{ data: xLabels, scaleType: "band", categoryGapRatio: 0.5 }]}
      />
    </div>
  );
}

export default Chart;
