import { Column } from "devextreme-react/cjs/data-grid";
import { useSelector } from "react-redux";
import { TableDataGrid } from "../../../../../components/dev-extreme/TableDataGrid";
import { Modal } from "../../../../../components/modals/NewModal";
import { getCurrencyNoSymbol } from "../../../../../helpers/currencyFormat";
import { HeaderMain, MainTitle } from "../../../../../styles/ContainerMain";

export const DetailContainer = ({ onClose }) => {
  const { rowSelectedForModal: selectionModal } = useSelector((state) => state.ui);
  const [{ demandId }] = selectionModal;

  return (
    <Modal
      title={`Detalles de la demanda`}
      subTitle={`Demanda #${demandId}`}
      onClose={onClose}
      secondaryButtonText="Cerrar"
    >
      <div style={{ width: "80vw" }}>
        <HeaderMain>
          <MainTitle>Listado de detalles</MainTitle>
        </HeaderMain>
        <TableDataGrid
          data={selectionModal}
          showPagination={true}
          showColumnChooser={false}
          showFilterBuilder={false}
          showFilterRow={false}
          showHeaderFilter={false}
        >
          <Column
            //
            dataField="demandActionDescription"
            caption="Descripción de la Acción de Demanda"
            width={300}
          />
          <Column
            //
            dataField="lawyerFullName"
            caption="Nombre del Abogado"
          />
          <Column
            //
            dataField="demandTypeDescription"
            caption="Descripción Tipo de Demanda"
          />
          <Column
            //
            dataField="demandAmount"
            caption="Monto"
            cellRender={(mov) => getCurrencyNoSymbol(mov?.key?.demandAmount)}
          />
          <Column
            //
            dataField="demandPresentationDate"
            caption="Fecha Presentación"
            defaultVisible={false}
          />
        </TableDataGrid>
      </div>
    </Modal>
  );
};
