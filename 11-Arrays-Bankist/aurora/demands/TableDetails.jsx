import { Column } from 'devextreme-react/cjs/data-grid';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { TableDataGrid } from '../../../../../../components/dev-extreme/TableDataGrid';
import { ModalOTP } from '../../../../../../components/modals/ModalOTP';
import { NewModalConfirm } from '../../../../../../components/modals/NewModalConfirm';
import { useValidations } from '../../../../../../hooks/useValidations';
import {
  HeaderMain,
  MainButton,
  MainTitle,
} from '../../../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../../../styles/DataTables';
import { clearToken } from '../../../../../../ui';
import { useDeleteMovementMutation } from '../../features/demandsApi';
import { ModalAdd } from '../modals/details/ModalAdd';
import { ModalEdit } from '../modals/details/ModalEdit';

export const TableDetails = ({ data }) => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [detailIdDelete, setDetailIdDelete] = useState('');
  const [optionSelected, setOptionSelected] = useState(null);
  const [openModalOtp, setOpenModalOtp] = useState(false);

  const dispatch = useDispatch();
  const { tokenIsSuccess } = useSelector(state => state.ui);

  // APIs
  const [deleteMovement, { isLoading, isSuccess, error }] =
    useDeleteMovementMutation();

  useValidations(
    null,
    error,
    true,
    isSuccess,
    'Detalle eliminado correctamente'
  );

  useEffect(() => {
    if (
      tokenIsSuccess &&
      optionSelected &&
      detailIdDelete === 'delete-detail'
    ) {
      deleteMovement({
        movementDetailId: {
          movementDetailId: optionSelected?.movementDetailId,
        },
      });
      dispatch(clearToken());
      setOptionSelected(null);
      setDetailIdDelete('');
    }
  }, [tokenIsSuccess, optionSelected, dispatch]);

  const handleUpdate = row => {
    setOptionSelected(row);
    setOpenModalEdit(true);
  };

  const handleConfirmDelete = row => {
    setDetailIdDelete('delete-detail');
    setOptionSelected(row);
    setOpenModalConfirm(true);
  };

  const handleNew = () => {
    setOpenModalAdd(true);
  };

  const onDelete = () => {
    setOpenModalOtp(true);
  };

  return (
    <>
      <HeaderMain>
        <MainTitle>Listado de detalles</MainTitle>

        <MainButton onClick={handleNew}>+ Nuevo</MainButton>
      </HeaderMain>

      <TableDataGrid
        data={data?.movementsDetails}
        showPagination={true}
        showSearchInputPagination={true}
        showColumnChooser={true}
        showFilterBuilder={false}
        showGroupPanel={false}
        showFilterRow={false}
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
          dataField="currency"
          caption="Moneda"
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
          cellRender={data => (
            <div style={{ display: 'flex' }}>
              <ButtonActionsEdit
                title="Editar"
                onClick={() => handleUpdate(data?.data)}
              >
                <AiOutlineEdit />
              </ButtonActionsEdit>

              <ButtonActionsEdit
                className="error"
                title="Eliminar"
                onClick={() => {
                  handleConfirmDelete(data?.data);
                }}
              >
                <AiOutlineDelete />
              </ButtonActionsEdit>
            </div>
          )}
        />
      </TableDataGrid>

      {openModalAdd && (
        <ModalAdd
          onClose={() => setOpenModalAdd(false)}
          data={data}
          demandActionId={data?.demandActionId}
        />
      )}
      {optionSelected && openModalEdit && (
        <ModalEdit
          onClose={() => {
            setOpenModalEdit(false);
            setOptionSelected(null);
          }}
          demandActionId={data?.demandActionId}
          optionSelected={optionSelected}
        />
      )}
      {optionSelected && openModalConfirm && (
        <NewModalConfirm
          onClose={() => {
            setOpenModalConfirm(false);
          }}
          primaryButtonHandleClick={onDelete}
          isLoading={isLoading}
          description={`Se eliminara el detalle N.º ${optionSelected.movementDetailId}`}
        />
      )}
      {openModalOtp && <ModalOTP onClose={() => setOpenModalOtp(false)} />}
    </>
  );
};
//*Agregar useValidations 31 y currency lin 99