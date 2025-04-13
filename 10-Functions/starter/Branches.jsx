// Branches hija
import { Column } from 'devextreme-react/cjs/data-grid';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import {} from 'react';
import { useLocation } from 'react-router-dom';
import { TableDataGrid } from '../../../../../../../components/dev-extreme/TableDataGrid';
import { NewModalConfirm } from '../../../../../../../components/modals/NewModalConfirm';
import { Spinner } from '../../../../../../../components/spinner/Spinner';
import { useScreensPermissions } from '../../../../../../../hooks/useScreensPermissions';
import { useTimeout } from '../../../../../../../hooks/useTimeout';
import {
  HeaderMain,
  MainButton,
  MainTitle,
} from '../../../../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../../../../styles/DataTables';
import { addNotification } from '../../../../../../../ui';
import { ModalAdd } from './Modals/components/ModalAdd';
import { ModalEdit } from './Modals/components/ModalEdit';
import {
  useDeleteMovementsApiMutation,
  useGetMovementDetailsQuery,
} from './Modals/featuresApi';

export const Branches = ({ data }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [actionOpenConfirm, setEventOpenConfirm] = useState(false);
  const [dataModalDetails, setDataModalDetails] = useState(null);

  const { getScreenFiltered, getPermissionFilterd } = useScreensPermissions();
  const { pathname } = useLocation();
  const { isVisible: eventVisible } = useTimeout();

  console.log(
    'Branches.jsx -> #30 -> dataModalDetails ~',
    JSON.stringify(dataModalDetails, null, 2)
  );

  const dispatch = useDispatch();
  const { searchParamsForPagination } = useSelector(state => state.ui);

  //APIs
  const {
    rowSelectedForModal,
    rowSelectedForModal: selectionModal,
    tokenIsSuccess,
  } = useSelector(state => state.ui);

  const [
    deleteMovement,
    {
      isLoading: isLoadingEventDelete,
      isSuccess: isEventSuccess,
      isError: isErrorEventDelete,
      error: errorDelete,
    },
  ] = useDeleteMovementsApiMutation();

  const { data: dataDetail, isLoading: isLodaingDetail } =
    useGetMovementDetailsQuery();

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    // console.log(dataModalDetails);
    if (tokenIsSuccess && dataModalDetails) {
      onEventDelete();
      dispatch(clearToken());
    }
  }, [tokenIsSuccess, dataModalDetails]);

  useEffect(() => {
    if (isEventSuccess) {
      dispatch(
        addNotification({
          message: ['Detalle eliminado correctamente'],
          type: 'success',
        })
      );
      setEventOpenConfirm(false);
    }
  }, [isEventSuccess]);

  const movementDetails = useMemo(() => {
    if (!data || !data.key?.movementsDetails) return [];
    return data.key.movementsDetails;
  }, [data]);

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleUpdate = row => {
    setDataModalDetails(row);
    setOpenModalEdit(true);
  };

  const handleConfirmDelete = row => {
    setDataModalDetails(row);
    setEventOpenConfirm(true);
  };

  const onCloseModalConfirm = () => {
    setEventOpenConfirm(false);
    // setDataModalDetails(null);
  };

  const onCloseModalEdit = () => {
    setOpenModalEdit(false);
    // setDataModalDetails(null);
  };

  const handleNew = () => {
    setOpenModalAdd(true);
  };

  const onEventDelete = data => {
    // console.log(data);
    deleteMovement({
      movementDetailId: {
        movementDetailId: dataModalDetails?.movementDetailId,
      },
    });
  };

  const onConfirm = () => {
    setEventOpenConfirm(false);
    console.log(dataModalDetails);
    // dispatch(askToken());
  };

  return (
    <>
      {isLoadingEventDelete || eventVisible ? <Spinner /> : null}

      <HeaderMain>
        <MainTitle>Listado de detalles</MainTitle>

        {getPermissionFilterd('writing') ? (
          <MainButton onClick={handleNew}>+ Nuevo</MainButton>
        ) : null}
      </HeaderMain>

      <TableDataGrid
        data={movementDetails}
        showPagination={true}
        showColumnChooser={false}
        showFilterBuilder={false}
        showGroupPanel={false}
        showFilterRow={false}
        showSearchInputPagination={true}
      >
        <Column
          caption="#"
          showInColumnChooser={false}
          width="70"
          cellRender={data => <span>{data?.rowIndex + 1}</span>}
        />
        <Column
          //
          dataField="movementDetailId"
          caption="ID de Detalle de Movimiento"
          defaultVisible={false}
        />
        <Column
          //
          dataField="movementDetailDescription"
          caption="Descripción del Movimiento"
        />
        <Column
          //
          dataField="movementDetailAmount"
          caption="Monto"
        />
        <Column
          //
          dataField="movementDate"
          caption="Fecha de Movimiento"
          dataType="date"
          defaultVisible={false}
        />
        <Column
          //
          dataField="isActive"
          caption="Está Activo"
        />
        <Column
          //
          dataField="movementType"
          caption="Tipo de Movimiento"
        />
        <Column
          //
          dataField="demandActionId"
          caption="ID de Acción de Demanda"
          defaultVisible={false}
        />

        <Column
          showInColumnChooser={false}
          caption="Acciones"
          width={'100'}
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
                  }}
                >
                  <AiOutlineDelete />
                </ButtonActionsEdit>
              )}
            </div>
          )}
        />
      </TableDataGrid>

      {openModalAdd && <ModalAdd onClose={onCloseModalAdd} data={data} />}
      {dataModalDetails && openModalEdit && (
        <ModalEdit
          data={dataModalDetails}
          onClose={() => {
            setOpenModalEdit(false);
            setDataModalDetails(null);
          }}
        />
      )}
      {dataModalDetails && actionOpenConfirm && (
        <NewModalConfirm
          data={dataModalDetails}
          onClose={onCloseModalConfirm}
          primaryButtonHandleClick={onConfirm}
          isLoading={isErrorEventDelete}
          description={`Se eliminara el detalle N.º ${dataModalDetails.movementDetailId}`}
        />
      )}
    </>
  );
};
