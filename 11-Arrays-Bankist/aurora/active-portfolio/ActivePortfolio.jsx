import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { Column, MasterDetail } from "devextreme-react/cjs/data-grid";

import { TableDataGrid } from "../../../../components/dev-extreme/TableDataGrid";
import { Spinner } from "../../../../components/spinner/Spinner";
import { useScreensPermissions } from "../../../../hooks/useScreensPermissions";
import { useTimeout } from "../../../../hooks/useTimeout";
import { ContainerMain, HeaderMain, MainTitle } from "../../../../styles/ContainerMain";
import { Expandable } from "./components/Expandable";
import { useLazyGetPortfolioQuery } from "./features/portfolioApi";

export const ActivePortfolio = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);

  const { screen, getScreenFiltered, getPermissionFilterd, hasReadPermissions } = useScreensPermissions();
  const { isVisible } = useTimeout();
  const { pathname } = useLocation();
  const {
    rowSelectedForModal: demandSelectForModal,
    filterColumns,
    currentPage,
    rowSelectedPerPage,
    searchParamsForPagination,
    tokenIsSuccess: demandTokenSuccess,
  } = useSelector((state) => state.ui);

  //APIs
  const [getPortfolio, { isLoading, data }] = useLazyGetPortfolioQuery();

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (searchParamsForPagination) {
      getPortfolio({ page: currentPage, size: rowSelectedPerPage, ...searchParamsForPagination });
    } else {
      getPortfolio({ page: currentPage, size: rowSelectedPerPage });
    }
  }, [currentPage, rowSelectedPerPage, searchParamsForPagination]);

  if (screen === undefined || !hasReadPermissions) return <Navigate to="/403" />;

  return (
    <ContainerMain>
      {isVisible || isLoading ? <Spinner /> : null}

      <HeaderMain>
        <MainTitle>Cartera Activa</MainTitle>
      </HeaderMain>

      <TableDataGrid
        //
        title="Listado de carteras activas"
        data={data?.data}
        showPagination={false}
        metadata={data?.metadata}
        useCustomPagination={true}
        showSearchInputPagination={true}
        showFilterBuilder={false}
      >
        <MasterDetail enabled={true} component={(data) => <Expandable data={data?.data?.data} />} />

        <Column
          caption="#"
          showInColumnChooser={false}
          width="70"
          cellRender={(data) => <span>{data?.rowIndex + 1}</span>}
        />

        <Column
          //
          dataField="customerNumber"
          caption="Número de Cliente"
        />
        <Column
          //
          dataField="customerName"
          caption="Nombre Cliente"
        />
        <Column
          //
          dataField="accountNumber"
          caption="Número de Cuenta"
        />
        <Column
          //
          dataField="customerId"
          caption="Identificación-1"
        />
        <Column
          //
          dataField="originalAmmount"
          caption="Monto Original"
        />
        <Column
          //
          dataField="daysLate"
          caption="Días de Mora"
        />
        <Column
          //
          dataField="principalDue"
          caption="Principal Adeudado"
        />
        <Column
          //
          dataField="calculationValue"
          caption="Valor para Cálculo"
        />
        <Column
          //
          dataField="reserveCalculation"
          caption="Cálculo de Reserva"
        />
      </TableDataGrid>
    </ContainerMain>
  );
};
