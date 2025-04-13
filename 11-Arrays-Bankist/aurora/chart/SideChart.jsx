import { Chart, CommonSeriesSettings, Export, Format, Label, Legend, Series } from "devextreme-react/chart";
import React from "react";
import { DataGridContainer } from "../../styles/DataTables";

const SideChart = ({
  title = "",
  dataSource = [],
  series = [],
  enableExport = false,
  chartType = "bar",
  color = "#ba0c2f",
  barWidth = "100",
  width,
  state = "totales",
  margin = "1rem 0",
  onPointClick = () => {},
}) => {
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
        <Chart id="chart" dataSource={dataSource} onPointClick={onPointClick} onp>
          <CommonSeriesSettings
            argumentField="state"
            type={chartType}
            hoverMode="allArgumentPoints"
            selectionMode="allArgumentPoints"
          >
            <Label visible={true}>
              <Format type="fixedPoint" precision={0} />
            </Label>
          </CommonSeriesSettings>
          {series.map((serie, index) => (
            <Series
              color={serie.colors || color}
              key={index}
              argumentField="state"
              valueField={serie.valueField}
              name={serie.description}
              barWidth={barWidth}
            />
          ))}
          <Legend verticalAlignment="bottom" horizontalAlignment="center" />
          <Export enabled={enableExport} />
        </Chart>
      </DataGridContainer>
    </div>
  );
};

export default SideChart;
