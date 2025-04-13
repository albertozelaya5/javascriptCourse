import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { FormsContainer } from '../../../../../../../components/containers/FormsContainer';
import {
  Input,
  InputDate,
  InputNumber,
  NewCheckbox,
  NewSelect,
} from '../../../../../../../components/forms';
import { Modal } from '../../../../../../../components/modals/NewModal';
import { addNotification } from '../../../../../../../ui';
import { useUpdateMovementMutation } from '../../../features/demandsApi';
import { detailsInputValidationScheme } from '../../../validations';

export const ModalEdit = ({
  onClose,
  demandActionId,
  optionSelected: rowSelectedForModal,
}) => {
  const dispatch = useDispatch();

  console.log(
    'ModalEdit.jsx -> #16 -> rowSelectedForModal ~',
    JSON.stringify(rowSelectedForModal, null, 2)
  );
  // const { rowSelectedForModal } = useSelector((state) => state.ui);
  //APIs
  const [updateDetails, { isSuccess, error, isLoading, isError }] =
    useUpdateMovementMutation();

  const {
    watch,
    control,
    register,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      movementDetailAmount: rowSelectedForModal?.movementDetailAmount,
    },
    resolver: yupResolver(detailsInputValidationScheme),
  });

  useEffect(() => {
    if (isError) {
      const message = error?.data?.errors || 'Error al actualizar el detalle';
      dispatch(
        addNotification({
          message,
          type: 'error',
        })
      );
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addNotification({
          message: ['Detalle actualizado correctamente'],
          type: 'success',
        })
      );
      onClose();
    }
  }, [isSuccess, dispatch]);

  const onSubmit = data => {
    data.movementDetailId ||= rowSelectedForModal?.movementDetailId;
    data.movementDetailAmount &&= Number(
      data.movementDetailAmount.replace(/,/g, '')
    );
    data.demandActionId ||= demandActionId;

    updateDetails({
      movementsDetails: {
        ...data,
      },
    });
  };

  const movementTypes = [
    {
      movementDescription: 'Gasto',
    },
    {
      movementDescription: 'Pago',
    },
  ];

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title={`Editar`}
      subTitle={`Detalle #${rowSelectedForModal?.movementDetailId}`}
      onClose={onClose}
      primaryButtonText="Actualizar"
      secondaryButtonText="Cerrar"
      primaryButtonHandleClick={handleSubmit(onSubmit)}
      primaryButtonDisabled={buttonDisabled}
      isLoading={isLoading}
    >
      <FormsContainer>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Input
            //
            name="movementDetailDescription"
            defaultValue={rowSelectedForModal?.movementDetailDescription}
            label="Descripción de Detalle de Movimiento"
            control={control}
            errors={errors}
            optional
          />
          <InputNumber
            name="movementDetailAmount"
            defaultValue={rowSelectedForModal?.movementDetailAmount}
            label="Monto de Detalle de Movimiento"
            control={control}
            errors={errors}
            thousandSeparator=","
            decimalSeparator="."
            allowLeadingZeros={false}
            decimalScale={2}
            optional
          />
          <InputDate
            control={control}
            name="movementDate"
            defaultValue={rowSelectedForModal?.movementDate}
            watch={watch}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
            errorMessage="La fecha de movimiento es requerida"
            label="Fecha de Movimiento"
            dateFormat="dd/MM/yyyy"
          />
          <NewSelect
            control={control}
            name="movementType"
            defaultValue={rowSelectedForModal?.movementType}
            label="Tipo de Movimiento"
            options={movementTypes || []}
            optionLabel="movementDescription"
            optionValue="movementDescription"
            errors={errors}
          />
          <NewCheckbox
            register={register}
            name="isActive"
            defaultValue={rowSelectedForModal?.isActive}
            label="Activo"
          />
        </form>
      </FormsContainer>
    </Modal>
  );
};
