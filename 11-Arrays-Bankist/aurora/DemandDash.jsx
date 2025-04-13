import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import { Column } from "devextreme-react/cjs/data-grid";
import { AiOutlineProduct } from "react-icons/ai";
import { DateByRange } from "../../../../components/dev-extreme/DateRangeBox";
import DoughnutChart from "../../../../components/dev-extreme/DoughnutChart";
import SideChart, { arraySeries } from "../../../../components/dev-extreme/SideChart";
import { TableDataGrid } from "../../../../components/dev-extreme/TableDataGrid";
import { Spinner } from "../../../../components/spinner/Spinner";
import { useScreensPermissions } from "../../../../hooks/useScreensPermissions";
import { useTimeout } from "../../../../hooks/useTimeout";
import { ContainerMain, HeaderMain, MainTitle } from "../../../../styles/ContainerMain";
import { ButtonActionsEdit, DataTableContainer } from "../../../../styles/DataTables";
import { ContainerCalendar } from "../../../../styles/FormModals";
import { setRowSelectedForModal } from "../../../../ui";
import { setCustomerSelected } from "../../../bank/customers/features/customerSlice";
import { DetailContainer } from "./components/DetailContainer";
import {
  useLazyGetBranchLawQuery,
  useLazyGetDemandsByStatusQuery,
  useLazyGetMonitorDemandsQuery,
  useLazyGetTotalByAmountQuery,
} from "./features/demandsDashsApi";
import { convertDateString, getDateRange } from "./helpers/dateFormats";

export const DemandsDash = () => {
  const [savedDate, setSavedDate] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [currenDate, previusMonth] = getDateRange();

  const { theme } = useSelector((state) => state.auth);

  const { currentPage, rowSelectedPerPage, searchParamsForPagination } = useSelector((state) => state.ui);

  const { screen, getScreenFiltered, hasReadPermissions, getPermissionFilterd } = useScreensPermissions();
  const { isVisible } = useTimeout();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  //APIs
  const [getTotalByAmount, { data: infoAm }] = useLazyGetTotalByAmountQuery();
  const [getDemandStatus, { data: statusData }] = useLazyGetDemandsByStatusQuery();
  const [getMonitor, { data: dataTrack, isFetching: isLoadingDataTrack }] = useLazyGetMonitorDemandsQuery();
  const [getBranchLaw, { data: branchData, isFetching: isLoadingBranch }] = useLazyGetBranchLawQuery();

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  const statusSource = statusData?.data.map((val) => {
    const validStatusKey = val.status.toLowerCase().replace(/[^a-z0-9]/g, "_");
    return {
      ...val,
      description: val.status,
      [validStatusKey]: val.cantidad,
      valueField: validStatusKey,
      state: "Totales",
    };
  });

  useEffect(() => {
    getTotalByAmount();
    getDemandStatus();
    getBranchLaw();
  }, []);

  useEffect(() => {
    if (searchParamsForPagination) {
      getMonitor({ page: currentPage, size: rowSelectedPerPage, ...searchParamsForPagination, ...savedDate });
    } else {
      getMonitor({ page: currentPage, size: rowSelectedPerPage, ...savedDate });
    }
  }, [currentPage, rowSelectedPerPage, searchParamsForPagination]);

  const handleDateChange = (range) => {
    const [startDate, endDate] = range;
    const dateRange = { startDate: convertDateString(startDate), endDate: convertDateString(endDate) };

    getTotalByAmount(dateRange);
    getDemandStatus(dateRange);
    getMonitor(dateRange);
    getBranchLaw(dateRange);
    setSavedDate(dateRange);
  };

  const conditionColor = (e) => {
    if (e.rowType === "data") {
      switch (e.key.priority.trim()) {
        case "Baja":
          e.rowElement.style.backgroundColor = theme === "dark" ? "#1A4D2E" : e.key.colors;
          break;
        case "Media":
          e.rowElement.style.backgroundColor = theme === "dark" ? "#a35a00" : e.key.colors;
          break;
        case "Alta":
          e.rowElement.style.backgroundColor = theme === "dark" ? "#2e040d" : e.key.colors;
          break;
        case "Media Alta":
          e.rowElement.style.backgroundColor = theme === "dark" ? "#6b5314" : e.key.colors;
          break;

        default:
          e.rowElement.style.backgroundColor = e.key.colors;
          break;
      }
    }
  };

  const branchSeries = branchData?.data.map((val) => {
    return { ...val, region: val.nameBranch, val: val.totalDemandas };
  });

  const openDetail = (row) => {
    dispatch(setRowSelectedForModal(row));
    setDetailView(true);
  };

  if (screen === undefined || !hasReadPermissions) return <Navigate to="/403" />;

  return (
    <ContainerMain>
      {isVisible ? <Spinner /> : null}

      <HeaderMain>
        <MainTitle>Dashboard de Demandas</MainTitle>
      </HeaderMain>

      <DataTableContainer style={{ marginBottom: "2rem" }}>
        <h3 style={{ margin: "2rem 2rem" }}>Buscar Por Fecha</h3>

        <ContainerCalendar>
          <DateByRange
            initialRange={[previusMonth, currenDate]}
            onDateChange={handleDateChange}
            startDateText="Fecha de inicio"
            endDateText="Fecha de fin"
          />
        </ContainerCalendar>
      </DataTableContainer>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: window.innerWidth < 1300 ? "wrap" : "nowrap",
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", flexWrap: window.innerWidth < 1400 ? "wrap" : "nowrap" }}>
            <div style={{ width: "100%", marginLeft: "10px" }}>
              {infoAm && infoAm?.data[0] && (
                <SideChart
                  title="Demandado y Recuperado por mes"
                  dataSource={infoAm?.data}
                  series={arraySeries(infoAm?.data)}
                  chartType="bar"
                />
              )}
            </div>
            <div style={{ width: "100%", marginLeft: "10px" }}>
              {statusData && statusData?.data[0] && (
                <SideChart
                  title="Cantidad de Demandas por Estado"
                  dataSource={statusSource}
                  series={statusSource}
                  chartType="bar"
                  rotated={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {branchData && <DoughnutChart dataSource={branchSeries} title="Cantidad de Demandas por Agencia" />}

      {dataTrack && dataTrack?.data[0] && (
        <TableDataGrid
          //
          title="Monitoreo de Demandados"
          data={dataTrack?.data}
          showPagination={false}
          metadata={dataTrack?.metadata}
          useCustomPagination={true}
          showSearchInputPagination={true}
          showFilterBuilder={false}
          isLoading={isLoadingDataTrack}
          useCustomLoading
          onRowPrepared={(e) => {
            conditionColor(e);
          }}
          onPageIndexChanged={(pageIndex) => {
            dispatch({ type: "SET_CURRENT_PAGE", payload: pageIndex });
          }}
          onPageSizeChanged={(pageSize) => {
            dispatch({ type: "SET_ROW_SELECTED_PER_PAGE", payload: pageSize });
          }}
        >
          <Column
            showInColumnChooser={false}
            caption="Productos"
            width={"100"}
            cellRender={(data) => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {getPermissionFilterd("reading") ? (
                  <ButtonActionsEdit
                    title="Ver"
                    onClick={() => {
                      openDetail(data?.data?.detailsDemand);
                    }}
                  >
                    <AiOutlineProduct />
                  </ButtonActionsEdit>
                ) : null}
              </div>
            )}
          />
          <Column
            caption="#"
            showInColumnChooser={false}
            width="70"
            cellRender={(data) => <span>{data?.rowIndex + 1}</span>}
          />
          <Column
            //
            dataField="clientName"
            caption="Nombre del Cliente"
          />
          <Column
            //
            dataField="codeCore"
            caption="Código Cliente"
          />
          <Column
            //
            dataField="demandId"
            caption="Id de la Demanda"
          />
          <Column
            //
            dataField="latestAction"
            caption="Última Acción"
          />
          <Column
            //
            dataField="daysLastAction"
            caption="Días desde la Última Acción"
          />
          <Column
            //
            dataField="priority"
            caption="Prioridad"
          />
        </TableDataGrid>
      )}

      {detailView && (
        <DetailContainer
          onClose={() => {
            setDetailView(false);
            dispatch(setRowSelectedForModal(null));
            dispatch(setCustomerSelected(null));
          }}
          data={dataTrack?.data}
          onClick={() => {
            dataTrack?.data;
          }}
        />
      )}
    </ContainerMain>
  );
};

export const GrafContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1rem;
  flex-wrap: wrap;

  margin: 0;
  padding: 0;
`;
