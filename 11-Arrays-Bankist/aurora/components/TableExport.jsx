import { Export } from "devextreme-react/cjs/data-grid";
import { Workbook } from "exceljs";
import saveAs from "file-saver";

export const TableExport = ({ enabled = true, allowExportSelectedData = true }) => {
  return (
    <Export
      enabled={enabled}
      allowExportSelectedData={allowExportSelectedData}
      onExporting={(e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Main sheet");

        exportDataGrid({
          component: e.component,
          worksheet: worksheet,
          customizeCell: function (options) {
            options.excelCell.font = { name: "Arial", size: 12 };
            options.excelCell.alignment = { horizontal: "left" };
          },
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx");
          });
        });

        e.cancel = true; // Evita la exportación por defecto de DevExtreme
      }}
    />
  );
};
