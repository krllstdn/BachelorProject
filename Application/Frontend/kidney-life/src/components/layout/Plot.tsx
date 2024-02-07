// PlotComponent.tsx

import React from "react";
import Plot from "react-plotly.js";

interface PlotProps {
  xValues: number[];
  yValues: number[];
}

const PlotComponent: React.FC<PlotProps> = ({ xValues, yValues }) => {
  return (
    <div className="survivalCurve w-7/12 h-5/6 mt-24 rounded-md bg-secondaryLight">
      <Plot
        style={{ width: "100%", height: 600 }}
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
            line: { color: "031d44" },
          },
        ]}
        layout={{
          autosize: true,
          hoverlabel: {
            bgcolor: "rgba(3, 29, 68, .9)",
          },
          title: "Survival Function",
          plot_bgcolor: "rgba(255, 255, 255, 0.00)",
          paper_bgcolor: "rgba(255, 255, 255, 0.0)",
          xaxis: { title: "Time (Days)" },
          yaxis: { title: "Survival Probability" },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default PlotComponent;
