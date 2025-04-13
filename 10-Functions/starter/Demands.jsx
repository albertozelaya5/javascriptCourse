import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { Column } from 'devextreme-react/cjs/data-grid';

import { TableDataGrid } from '../../../../components/dev-extreme/TableDataGrid';
import { NewModalConfirm } from '../../../../components/modals/NewModalConfirm';
import { Spinner } from '../../../../components/spinner/Spinner';
import { useScreensPermissions } from '../../../../hooks/useScreensPermissions';
import { useTimeout } from '../../../../hooks/useTimeout';
import {
  ContainerMain,
  HeaderMain,
  MainButton,
  MainTitle,
} from '../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../styles/DataTables';
import {
  addNotification,
  askToken,
  clearToken,
  setOptionSelectedId,
  setRowSelectedForModal,
} from '../../../../ui';
import { setCustomerSelected } from '../../../bank/customers/features/customerSlice';
import { ModalAdd } from './components/modals/ModalAdd';
import { ModalDetail } from './components/modals/ModalDetail';
import { ModalEdit } from './components/modals/ModalEdit';
import {
  useDeleteDemandsApiMutation,
  useLazyGetDemandsApiQuery,
} from './features/demandsApi';

export const Demands = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [shouldDeleteParent, setShouldDeleteParent] = useState(false);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const {
    screen,
    getScreenFiltered,
    getPermissionFilterd,
    hasReadPermissions,
  } = useScreensPermissions();
  const { isVisible } = useTimeout();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    rowSelectedForModal: demandSelectForModal,
    filterColumns,
    currentPage,
    rowSelectedPerPage,
    searchParamsForPagination,
    tokenIsSuccess: demandTokenSuccess,
  } = useSelector(state => state.ui);

  //APIs
  const [getDemands, { isLoading, data }] = useLazyGetDemandsApiQuery();
  const [
    deleteDemands,
    {
      isLoading: isLoadingDelete,
      isSuccess,
      isError: isErrorDelete,
      error: errorDelete,
    },
  ] = useDeleteDemandsApiMutation();

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (demandTokenSuccess && demandSelectForModal && shouldDeleteParent) {
      onDeleteDemand();
      dispatch(clearToken());
    }
  }, [demandTokenSuccess, demandSelectForModal, shouldDeleteParent]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addNotification({
          message: ['Demanda eliminada correctamente'],
          type: 'success',
        })
      );
      setOpenModalConfirm(false);
    }
  }, [isSuccess]);

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  useEffect(() => {
    if (searchParamsForPagination) {
      getDemands({
        page: currentPage,
        size: rowSelectedPerPage,
        ...searchParamsForPagination,
      });
    } else {
      getDemands({ page: currentPage, size: rowSelectedPerPage });
    }
  }, [currentPage, rowSelectedPerPage, searchParamsForPagination]);

  const onDetail = row => {
    dispatch(setRowSelectedForModal(row));
    setOpenModalDetail(true);
  };

  const handleNew = () => {
    setOpenModalAdd(true);
  };

  const handleUpdate = row => {
    dispatch(setRowSelectedForModal(row));
    setOpenModalEdit(true);
  };

  const onDeleteDemand = () => {
    deleteDemands({
      demandId: {
        demandId: demandSelectForModal?.demandId,
      },
    });
  };

  const onConfirmDelete = () => {
    dispatch(askToken());
    setShouldDeleteParent(true);
    setOpenModalConfirm(false);
  };

  const handleConfirmDelete = row => {
    dispatch(setRowSelectedForModal(row));
    setOpenModalConfirm(true);
  };

  if (screen === undefined || !hasReadPermissions)
    return <Navigate to="/403" />;

  return (
    <ContainerMain>
      {isLoadingDelete || isVisible || isLoading ? <Spinner /> : null}

      <HeaderMain>
        <MainTitle>Demandas</MainTitle>

        {getPermissionFilterd('writing') ? (
          <MainButton onClick={handleNew}>+ Nuevo</MainButton>
        ) : null}
      </HeaderMain>

      <TableDataGrid
        //
        title="Listado de demandas"
        data={data?.data}
        showPagination={false}
        metadata={data?.metadata}
        useCustomPagination={true}
        showSearchInputPagination={true}
        showFilterBuilder={false}
      >
        <Column
          caption="#"
          showInColumnChooser={false}
          width="70"
          cellRender={data => <span>{data?.rowIndex + 1}</span>}
        />

        <Column
          //
          dataField="demandCode"
          caption="Cod. Demanda"
        />

        <Column
          //
          dataField="demandTypeDescription"
          caption="Tipo Demanda"
        />
        <Column
          //
          dataField="currency"
          caption="Moneda"
        />
        <Column
          //
          dataField="demandFile"
          caption="Archivo Demanda"
        />
        <Column
          //
          dataField="demandAmount"
          caption="Monto Demanda"
        />

        <Column
          //
          dataField="codeCore"
          caption="Código Core"
          defaultVisible={false}
        />
        <Column
          //
          dataField="clientName"
          caption="Nombre del Cliente"
          defaultVisible={false}
        />

        <Column
          //
          dataField="lawyerFullName"
          caption="Nombre Abogado"
        />

        <Column
          //
          dataField="demandStatusDescription"
          caption="Estado"
        />
        <Column
          //
          dataField="courtName"
          caption="Nombre Juzgado"
        />
        <Column
          //
          dataField="demandPresentationDate"
          caption="Fecha Presentación"
        />
        <Column
          //
          dataField="demandDueDate"
          caption="Fecha Vencimiento"
          defaultVisible={false}
        />
        <Column
          //
          dataField="productJson"
          caption="Producto JSON"
        />
        <Column
          //
          dataField="demandRecoveredValue"
          caption="Valor Recuperado"
        />
        <Column
          //
          dataField="isActive"
          caption="Activo"
        />
        <Column
          //
          dataField="warrantyId"
          caption="Garantía"
        />

        <Column
          showInColumnChooser={false}
          caption="Acciones"
          width={'140'}
          cellRender={(data, index) => (
            <div style={{ display: 'flex' }}>
              {getPermissionFilterd('writing') ? (
                <ButtonActionsEdit
                  title="Editar"
                  onClick={() => handleUpdate(data?.data)}
                >
                  <AiOutlineEdit />
                </ButtonActionsEdit>
              ) : null}
              {getPermissionFilterd('delete') && (
                <ButtonActionsEdit
                  className="error"
                  title="Eliminar"
                  onClick={() => {
                    handleConfirmDelete(data?.data);
                    dispatch(setOptionSelectedId(index));
                  }}
                >
                  <AiOutlineDelete />
                </ButtonActionsEdit>
              )}
              {getPermissionFilterd('reading') ? (
                <ButtonActionsEdit
                  title="Ver"
                  onClick={() => onDetail(data?.data)}
                >
                  <AiOutlineEye />
                </ButtonActionsEdit>
              ) : null}
            </div>
          )}
        />
      </TableDataGrid>

      {openModalAdd && <ModalAdd onClose={onCloseModalAdd} />}
      {/* {setRowSelectedForModal && openModalEdit && (
        <ModalEdit
          onClose={() => {
            setOpenModalEdit(false);
            dispatch(setRowSelectedForModal(null));
          }}
        />
      )} */}

      {demandSelectForModal && openModalConfirm && (
        <NewModalConfirm
          onClose={() => {
            setOpenModalConfirm(false);
            dispatch(setRowSelectedForModal(null));
          }}
          primaryButtonHandleClick={onConfirmDelete}
          isLoading={isErrorDelete}
          description={`Se eliminara el tiempo de cuenta N.º ${demandSelectForModal?.demandId}`}
        />
      )}
      {demandSelectForModal && openModalDetail && (
        <ModalDetail
          onClose={() => {
            setOpenModalDetail(false);
            dispatch(setRowSelectedForModal(null));
            dispatch(setCustomerSelected(null));
          }}
          onClick={() => onDetail(data?.data)}
        />
      )}
    </ContainerMain>
  );
};
