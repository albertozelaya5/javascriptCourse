import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { FormsContainer } from '../../../../../../../components/containers/FormsContainer';
import {
  Input,
  InputDate,
  NewCheckbox,
} from '../../../../../../../components/forms';
import { Modal } from '../../../../../../../components/modals/NewModal';
import { ButtonSpinner } from '../../../../../../../components/spinner/ButtonSpinner';
import { getValidationErrors } from '../../../../../../../helpers/generals';
import { addNotification } from '../../../../../../../ui';
import { useUpdateActionsMutation } from '../../../features/demandsApi';
import { actionInputValidationScheme } from '../../../validations';

export const ModalEdit = ({
  onClose,
  demandId,
  actionSelected: rowSelectedForModal,
}) => {
  const dispatch = useDispatch();
  // const { rowSelectedForModal } = useSelector((state) => state.ui);

  //APIs
  const [updateAction, { isSuccess, isError, error, isLoading }] =
    useUpdateActionsMutation();

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
    resolver: yupResolver(actionInputValidationScheme),
  });

  useEffect(() => {
    if (isError) {
      let message = ['Error al actualizar la acción'];

      if (error?.data?.errors) {
        message = error?.data?.errors;
      }

      if (
        error?.data?.validationErrors &&
        Object.keys(error?.data?.validationErrors)?.length > 0
      ) {
        message = getValidationErrors(
          error?.data?.validationErrors,
          'Error al actualizar la acción'
        );
      }

      dispatch(
        addNotification({
          message,
          type: 'error',
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addNotification({
          message: ['Acción actualizada correctamente'],
          type: 'success',
        })
      );
      onClose();
    }
  }, [isSuccess]);

  const onSubmit = data => {
    data.demandId = demandId;
    data.demandActionId ||= rowSelectedForModal?.demandActionId;
    updateAction({
      demandActions: {
        ...data,
      },
    });
  };

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title={`Editar`}
      subTitle={`Acción #${rowSelectedForModal?.demandActionId}`}
      onClose={onClose}
      primaryButtonText="Actualizar"
      secondaryButtonText="Cerrar"
      primaryButtonHandleClick={handleSubmit(onSubmit)}
      primaryButtonDisabled={buttonDisabled}
      isLoading={isLoading}
    >
      <FormsContainer>
        {isLoading ? (
          <ButtonSpinner color="secondary" />
        ) : (
          <form autoComplete="off">
            <Input
              //
              name="demandActionDescription"
              defaultValue={rowSelectedForModal?.demandActionDescription}
              label="Descripción de la Acción de Demanda"
              control={control}
              errors={errors}
              optional
            />
            <InputDate
              control={control}
              name="demandActionDate"
              defaultValue={rowSelectedForModal?.demandActionDate}
              watch={watch}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              errorMessage="La fecha de la acción de demanda es requerida"
              label="Fecha de la Acción de Demanda"
              dateFormat="dd/MM/yyyy"
            />
            <NewCheckbox
              register={register}
              defaultValue={rowSelectedForModal?.isActive}
              name="isActive"
              label="Activo"
            />
          </form>
        )}
      </FormsContainer>
    </Modal>
  );
};
