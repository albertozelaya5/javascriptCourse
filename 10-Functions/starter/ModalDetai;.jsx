// ModalDetail padre
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Column, MasterDetail } from 'devextreme-react/cjs/data-grid';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { TableDataGrid } from '../../../../../../components/dev-extreme/TableDataGrid';
import { Modal } from '../../../../../../components/modals/NewModal';
import { NewModalConfirm } from '../../../../../../components/modals/NewModalConfirm';
import { Spinner } from '../../../../../../components/spinner/Spinner';
import { useScreensPermissions } from '../../../../../../hooks/useScreensPermissions';
import { useTimeout } from '../../../../../../hooks/useTimeout';
import {
  HeaderMain,
  MainButton,
  MainTitle,
} from '../../../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../../../styles/DataTables';
import {
  addNotification,
  askToken,
  clearToken,
  setOptionSelectedId,
  setRowSelectedForModal,
} from '../../../../../../ui';
import {
  useDeleteActionsApiMutation,
  useGetDetailQuery,
} from '../../features/demandsApi';
import { Branches } from './tables/Branches';
import { ModalAdd } from './tables/ModalAdd';
import { ModalEdit } from './tables/ModalEdit';

export const ModalDetail = ({ onClose }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [actionOpenConfirm, setActionOpenConfirm] = useState(false);
  const {
    screen,
    getScreenFiltered,
    getPermissionFilterd,
    hasReadPermissions,
  } = useScreensPermissions();
  const { pathname } = useLocation();
  const { isVisible: actionVisible } = useTimeout();
  const dispatch = useDispatch();
  const {
    rowSelectedForModal: selectionModal,
    tokenIsSuccess: tokenSuccess,
    rowSelectedPerPage,
    searchParamsForPagination,
    currentPage,
  } = useSelector(state => state.ui);

  //APIs
  const { data, error, isLoading, isError } = useGetDetailQuery(
    { id: selectionModal?.demandId },
    { skip: !selectionModal?.demandId }
  );
  const actions = useMemo(() => data?.data[0]?.demandActions, [data]);

  const [
    deleteAction,
    {
      isLoading: isLoadingActionDelete,
      isSuccess: isActionSuccess,
      isError: isErrorActionDelete,
      error: errorDelete,
    },
  ] = useDeleteActionsApiMutation();

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (tokenSuccess && selectionModal) {
      onActionDelete();
      dispatch(clearToken());
    }
  }, [tokenSuccess, selectionModal]);

  useEffect(() => {
    if (isActionSuccess) {
      dispatch(
        addNotification({
          message: ['Acción eliminada correctamente'],
          type: 'success',
        })
      );
      setActionOpenConfirm(false);
    }
  }, [isActionSuccess]);

  const onCloseModalAdd = () => {
    setOpenModalAdd(false);
  };

  const handleUpdate = row => {
    dispatch(setRowSelectedForModal(row));
    setOpenModalEdit(true);
  };

  const handleNew = () => {
    setOpenModalAdd(true);
  };

  const onActionDelete = () => {
    if (selectionModal?.demandActionId) {
      deleteAction({
        demandActionId: { demandActionId: selectionModal.demandActionId },
      });
    }
  };

  const onActionConfirm = () => {
    dispatch(askToken());
    setActionOpenConfirm(false);
  };

  const handleConfirmDelete = row => {
    dispatch(setRowSelectedForModal(row));
    setActionOpenConfirm(true);
  };

  const onCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  return (
    <Modal
      title={`Acciones de Demanda`}
      subTitle={`Demanda #${selectionModal?.demandId}`}
      onClose={onClose}
      secondaryButtonText="Cerrar"
    >
      {isLoadingActionDelete || actionVisible ? <Spinner /> : null}

      <div style={{ width: '80vw' }}>
        <HeaderMain>
          <MainTitle>Listado de acciones</MainTitle>

          {getPermissionFilterd('writing') ? (
            <MainButton onClick={handleNew}>+ Nuevo</MainButton>
          ) : null}
        </HeaderMain>
        <TableDataGrid
          data={actions}
          showPagination={true}
          metadata={actions?.metadata}
          useCustomPagination={false}
          showSearchInputPagination={true}
          showFilterBuilder={false}
        >
          {/* Expandable */}
          <MasterDetail
            enabled={true}
            component={data => <Branches data={data?.data} />}
          />

          <Column
            dataField="demandActionId"
            defaultVisible={false}
            caption="ID de la Acción de Demanda Original"
          />
          <Column
            dataField="demandActionDescription"
            caption="Descripción de la Acción"
          />
          <Column
            dataField="demandActionDate"
            defaultVisible={false}
            caption="Fecha de la Acción"
          />
          <Column dataField="isActive" caption="Activo" />
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
                      dispatch(setOptionSelectedId(index));
                    }}
                  >
                    <AiOutlineDelete />
                  </ButtonActionsEdit>
                )}
              </div>
            )}
          />
        </TableDataGrid>
        {openModalAdd && <ModalAdd onClose={onCloseModalAdd} />}
        {setRowSelectedForModal && openModalEdit && (
          <ModalEdit onClose={onCloseModalEdit} />
        )}
        {selectionModal && actionOpenConfirm && (
          <NewModalConfirm
            onClose={() => {
              setActionOpenConfirm(false);
              // dispatch(setRowSelectedForModal(null));
            }}
            primaryButtonHandleClick={onActionConfirm}
            isLoading={isErrorActionDelete}
            description={`Se eliminara la acción N.º ${selectionModal?.demandActionId}`}
          />
        )}
      </div>
    </Modal>
  );
};
