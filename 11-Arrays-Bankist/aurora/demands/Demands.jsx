import { Column } from 'devextreme-react/cjs/data-grid';
import { useEffect, useState } from 'react';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineProduct,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { TableDataGrid } from '../../../../components/dev-extreme/TableDataGrid';
import { NewModalConfirm } from '../../../../components/modals/NewModalConfirm';
import { Spinner } from '../../../../components/spinner/Spinner';
import { useScreensPermissions } from '../../../../hooks/useScreensPermissions';
import { useTimeout } from '../../../../hooks/useTimeout';
import { useValidations } from '../../../../hooks/useValidations';
import {
  ContainerMain,
  HeaderMain,
  MainButton,
  MainTitle,
} from '../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../styles/DataTables';
import {
  askToken,
  clearToken,
  setOptionSelectedId,
  setRowSelectedForModal,
} from '../../../../ui';
import { setCustomerSelected } from '../../../bank/customers/features/customerSlice';
import { ModalAdd } from './components/modals/demands/ModalAdd';
import { ModalEdit } from './components/modals/demands/ModalEdit';
import { TableActions } from './components/tables/TableActions';
import { TableJson } from './components/tables/TableJson';
import {
  useDeleteDemandMutation,
  useLazyGetDemandsQuery,
  useLazyGetDetailByIdQuery,
} from './features/demandsApi';

export const Demands = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [jsonView, setJsonView] = useState(false);
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
  const [getDemands, { isFetching: isLoading, data }] =
    useLazyGetDemandsQuery();
  const [
    deleteDemands,
    {
      isLoading: isLoadingDelete,
      isSuccess,
      isError: isErrorDelete,
      error: errorDelete,
    },
  ] = useDeleteDemandMutation();

  const [
    getDetail,
    { data: detail, error: errorActions, isLoading: isLoadingActions },
  ] = useLazyGetDetailByIdQuery();

  const successCallback = () => {
    setOpenModalConfirm(false);
  };

  //Delete
  useValidations(null, errorActions);
  useValidations(
    null,
    errorDelete,
    true,
    isSuccess,
    'Demanda eliminada correctamente',
    successCallback
  );

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

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

  useEffect(() => {
    if (demandTokenSuccess && demandSelectForModal && shouldDeleteParent) {
      onDeleteDemand();
      dispatch(clearToken());
    }
  }, [demandTokenSuccess, demandSelectForModal, shouldDeleteParent]);

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const onDetail = row => {
    getDetail({ id: row?.demandId });
  };

  const handleNew = () => {
    setOpenModalAdd(true);
  };

  const handleUpdate = row => {
    dispatch(setRowSelectedForModal(row));
    setOpenModalEdit(true);
  };

  const openJson = row => {
    dispatch(setRowSelectedForModal(row));
    setJsonView(true);
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

  const paginationInputs = [
    {
      name: 'demandId',
      label: 'Id de la Demanda',
      editable: true,
    },
    {
      name: 'codeCore',
      label: 'Código Core',
      editable: true,
    },
    {
      name: 'clientName',
      label: 'Nombre del Cliente',
      editable: true,
    },
  ];

  if (screen === undefined || !hasReadPermissions)
    return <Navigate to="/403" />;

  return (
    <ContainerMain>
      {isVisible || isLoadingDelete || isLoadingActions ? <Spinner /> : null}

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
        paginationInputs={paginationInputs}
        isLoading={isLoading}
        useCustomLoading
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
          defaultVisible={false}
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
          dataField="warrantyDescription"
          caption="Garantía"
        />
        <Column
          showInColumnChooser={false}
          caption="Productos"
          width={'100'}
          cellRender={(data, index) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {getPermissionFilterd('reading') ? (
                <ButtonActionsEdit
                  title="Ver"
                  onClick={() => openJson(data?.data)}
                >
                  <AiOutlineProduct />
                </ButtonActionsEdit>
              ) : null}
            </div>
          )}
        />
        <Column
          showInColumnChooser={false}
          caption="Acciones"
          width={'140'}
          useColumChooserPosition={false}
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

      {openModalAdd && (
        <ModalAdd
          dataDemands={data?.data?.productJson}
          onClose={onCloseModalAdd}
        />
      )}
      {setRowSelectedForModal && openModalEdit && (
        <ModalEdit
          onClose={() => {
            setOpenModalEdit(false);
            dispatch(setRowSelectedForModal(null));
          }}
        />
      )}
      {demandSelectForModal && openModalConfirm && (
        <NewModalConfirm
          onClose={() => {
            setOpenModalConfirm(false);
            dispatch(setRowSelectedForModal(null));
          }}
          primaryButtonHandleClick={onConfirmDelete}
          isLoading={isErrorDelete}
          description={`Tambien se eliminaran las actuaciones de la demanda N.º ${demandSelectForModal?.demandId}`}
        />
      )}

      {demandSelectForModal && openModalDetail && (
        <ModalDetail
          onClose={() => {
            setOpenModalDetail(false);
            dispatch(setRowSelectedForModal(null));
            dispatch(setCustomerSelected(null));
          }}
          dataDetail={data?.data}
        />
      )}

      {demandSelectForModal && jsonView && (
        <TableJson
          onClose={() => {
            setJsonView(false);
            dispatch(setRowSelectedForModal(null));
            dispatch(setCustomerSelected(null));
          }}
          onClick={() => onDetail(data?.data)}
        />
      )}

      {detail?.data && <TableActions data={detail?.data} />}
    </ContainerMain>
  );
};
