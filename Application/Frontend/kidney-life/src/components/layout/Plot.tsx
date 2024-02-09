// PlotComponent.tsx

import React from "react";
import Plot from "react-plotly.js";

interface PlotProps {
  xValues: number[];
  yValues: number[];
}

const PlotComponent: React.FC<PlotProps> = ({ xValues, yValues }) => {
  return (
    <div
      className="survivalCurve w-7/12 h-5/6 mt-5 md:mt-4 rounded-md 
               bg-secondaryLight md:justify-center md:flex-grow 
                md:mr-4 md:ml-4 lg:mr-5 lg:ml-5 xl:mt-6 2xl:ml-9 
                2xl:mr-9 2xl:mt-7 3xl:ml-20 3xl:mr-20 4xl:ml-20 
                4xl:mr-20 5xl:ml-52 5xl:mr-52"
    >
      <div className="relative h-0" style={{ paddingBottom: "75%" }}>
        <Plot
          style={{ position: "absolute", width: "100%", height: "100%" }}
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
    </div>
  );
};

export default PlotComponent;
