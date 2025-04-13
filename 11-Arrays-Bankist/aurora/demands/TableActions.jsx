import {
  Column,
  MasterDetail,
  Summary,
  TotalItem,
} from 'devextreme-react/cjs/data-grid';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { TableDataGrid } from '../../../../../../components/dev-extreme/TableDataGrid';
import { ModalOTP } from '../../../../../../components/modals/ModalOTP';
import { NewModalConfirm } from '../../../../../../components/modals/NewModalConfirm';
import { getCurrencyNoSymbol } from '../../../../../../helpers/currencyFormat';
import { useValidations } from '../../../../../../hooks/useValidations';
import { HeaderMain, MainTitle } from '../../../../../../styles/ContainerMain';
import { ButtonActionsEdit } from '../../../../../../styles/DataTables';
import { clearToken } from '../../../../../../ui';
import { useDeleteActionMutation } from '../../features/demandsApi';
import { ModalAdd } from '../modals/actions/ModalAdd';
import { ModalEdit } from '../modals/actions/ModalEdit';
import { TableDetails } from './TableDetails';

export const TableActions = ({ data }) => {
  const actions = useMemo(() => data[0]?.demandActions, [data]);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [actionOpenConfirm, setActionOpenConfirm] = useState(false);
  const [actionIdDelete, setActionIdDelete] = useState('');
  const [actionSelected, setActionSelected] = useState(null);
  const [openModalOtp, setOpenModalOtp] = useState(false);

  const dispatch = useDispatch();
  const { tokenIsSuccess: tokenSuccess } = useSelector(state => state.ui);

  //APIs
  const [deleteAction, { isLoading, isSuccess, isError, error }] =
    useDeleteActionMutation();

  useValidations(
    null,
    error,
    true,
    isSuccess,
    'Acción eliminada correctamente'
  );

  useEffect(() => {
    if (tokenSuccess && actionSelected && actionIdDelete === 'delete-action') {
      deleteAction({
        demandActionId: { demandActionId: actionSelected?.demandActionId },
      });

      dispatch(clearToken());
      setActionSelected(null);
      setActionIdDelete('');
    }
  }, [tokenSuccess, actionSelected, dispatch]);

  const handleUpdate = row => {
    // dispatch(setRowSelectedForModal(row));
    setActionSelected(row);
    setOpenModalEdit(true);
  };

  const onActionConfirm = () => {
    // dispatch(askToken());
    setOpenModalOtp(true);
  };

  const handleConfirmDelete = row => {
    setActionIdDelete('delete-action');
    setActionSelected(row);
    setActionOpenConfirm(true);
  };

  const buttons = [
    {
      permission: true, // true/false
      titleButton: 'Nueva',
      className: 'edit',
      iconName: 'AiOutlinePlus',
      colorSpinner: 'edit',
      onClick: () => setOpenModalAdd(true),
      isLoading: false,
    },
  ];

  return (
    <div>
      <HeaderMain>
        <MainTitle>Listado de acciones</MainTitle>
      </HeaderMain>

      <TableDataGrid
        data={actions}
        showPagination={true}
        metadata={actions?.metadata}
        useCustomPagination={false}
        showSearchInputPagination={true}
        useColumChooserPosition={false}
        showFilterBuilder={false}
        buttons={buttons}
      >
        {/* Expandable */}
        <MasterDetail
          enabled={true}
          render={data => <TableDetails data={data?.data} />}
        />
        <Column
          dataField="demandActionId"
          defaultVisible={false}
          caption="ID de la Acción de Demanda Original"
        />
        <Column
          dataField="demandActionDescription"
          caption="Descripción de la Acción"
          width={400}
        />
        <Column
          dataField="demandActionDate"
          defaultVisible={false}
          caption="Fecha de la Acción"
        />
        <Column dataField="isActive" caption="Activo" />
        <Column
          //
          dataField="subTotalGastos"
          caption="SubTotal de Gastos"
          alignment="left"
        />
        <Column
          dataField="subTotalPagos"
          caption="SubTotal de Pagos"
          alignment="left"
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

        <Summary>
          {/* <TotalItem column="branches" summaryType="count" /> */}
          <TotalItem
            column="subTotalGastos"
            summaryType="sum"
            // customizeText={(data) => `Gastos Total: ${getCurrencyNoSymbol(data?.value)}`}
          />
          <TotalItem
            //
            column="subTotalPagos"
            summaryType="sum"
            // customizeText={(data) => `Pagos Total: ${getCurrencyNoSymbol(data?.value)}`}
          />
        </Summary>
      </TableDataGrid>

      {openModalAdd && (
        <ModalAdd
          onClose={() => setOpenModalAdd(false)}
          demandId={data[0]?.demandId}
        />
      )}
      {actionSelected && openModalEdit && (
        <ModalEdit
          onClose={() => {
            setOpenModalEdit(false);
            setActionSelected(null);
          }}
          demandId={data[0]?.demandId}
          actionSelected={actionSelected}
        />
      )}
      {actionSelected && actionOpenConfirm && (
        <NewModalConfirm
          onClose={() => setActionOpenConfirm(false)}
          primaryButtonHandleClick={onActionConfirm}
          isLoading={isLoading}
          description={`Se eliminara la acción N.º ${actionSelected?.demandActionId}`}
        />
      )}
      {openModalOtp && <ModalOTP onClose={() => setOpenModalOtp(false)} />}
    </div>
  );
};
//*Agregar Summary