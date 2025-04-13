import PieChart, { Connector, Export, Format, Label, Legend, Series, Tooltip } from "devextreme-react/pie-chart";
import React from "react";
import { DataGridContainer } from "../../styles/DataTables";

function customizeTooltip(arg) {
  return {
    text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
  };
}
const DoughnutChart = ({
  dataSource = [],
  title = "",
  exportEnable = false,
  labelVisible = true,
  colorPalette = ["#ba0c2f", "rgb(0,97,0)"],
  width = "100vh",
  margin = "1rem",
  argumentField = "region",
}) => {
  const colors = dataSource.map((mov) => {
    return mov.colors;
  });
  return (
    <div style={{ width, margin }}>
      <DataGridContainer className="dx-viewport">
        {title && (
          <div
            style={{ fontSize: "2.2rem", fontWeight: 400, margin: "1.5rem ", flex: "1 0 auto", textAlign: "center" }}
          >
            {title}
          </div>
        )}
        <PieChart
          id="pie"
          type="doughnut"
          palette={colors || colorPalette}
          paletteExtensionMode="blend"
          dataSource={dataSource}
        >
          <Series argumentField={argumentField}>
            <Label visible={labelVisible} format="millions">
              <Connector visible={true} />
            </Label>
          </Series>
          <Export enabled={exportEnable} />
          <Legend margin={0} horizontalAlignment="right" verticalAlignment="top" />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
            <Format type="millions" />
          </Tooltip>
        </PieChart>
      </DataGridContainer>
    </div>
  );
};
export default DoughnutChart;
