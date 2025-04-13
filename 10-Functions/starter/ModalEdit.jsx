import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { parseDate } from 'devextreme/localization';
import {
  Input,
  InputDate,
  MultiSelect,
  NewCheckbox,
  NewSelect,
} from '../../../../../../../components/forms';
import { Modal } from '../../../../../../../components/modals/NewModal';
import { getValidationErrors } from '../../../../../../../helpers/generals';
import { FormContainerGrid } from '../../../../../../../styles/FormModals';
import { addNotification } from '../../../../../../../ui';
import { setCustomerSelected } from '../../../../../../bank/customers/features/customerSlice';
import { useGetCourtsQuery } from '../../../../../demand-control-catalogue/courts/features/courtsApi';
import { useGetDemandStatusQuery } from '../../../../../demand-control-catalogue/demand-status/features/demandStatusApi';
import { useGetDemandTypeQuery } from '../../../../../demand-control-catalogue/demand-type/features/demandTypeApi';
import {
  useGetDemandLawyerQuery,
  useGetSelectionWarrantiesQuery,
  useUpdateDemandMutation,
} from '../../../features/demandsApi';
import { demandsInputValidationScheme } from '../../../validations';
import { ModalClient } from './ModalClient';

export const ModalEdit = ({ onClose }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { rowSelectedForModal } = useSelector(state => state.ui);
  const [openModalClient, setOpenModalClient] = useState(false);
  const dispatch = useDispatch();

  //APIs
  const { data: demandTypes } = useGetDemandTypeQuery();
  const { data: lawyerTypes } = useGetDemandLawyerQuery();
  const { data: statusTypes } = useGetDemandStatusQuery();
  const { data: warrantyTypes } = useGetSelectionWarrantiesQuery();
  const { data: courtsTypes } = useGetCourtsQuery();
  const [getJson, { data: JsonTypes, isLoading: isLoadingJson }] =
    useLazyGetJsonQuery();
  const [updatePayment, { isError, error, isLoading, isSuccess }] =
    useUpdateDemandMutation();

  const {
    watch,
    control,
    register,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm({
    defaultValues: {
      taxCode: rowSelectedForModal?.taxCode,
      paymentConceptCode: rowSelectedForModal?.paymentConceptCode,
    },
    resolver: yupResolver(demandsInputValidationScheme),
  });

  useEffect(() => {
    if (isError) {
      let message = ['Error al actualizar el pago'];

      if (error?.data?.errors) {
        message = error?.data?.errors;
      }

      if (
        error?.data?.validationErrors &&
        Object.keys(error?.data?.validationErrors)?.length > 0
      ) {
        message = getValidationErrors(
          error?.data?.validationErrors,
          'Error al actualizar el pago'
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
          message: ['Pago actualizado correctamente'],
          type: 'success',
        })
      );
      onClose();
    }
  }, [isSuccess]);

  const onSubmitButtonSearch = () => {
    setOpenModalClient(true);
  };

  const handleSelectCustomer = product => {
    setValue('codeCore', `${product?.customerId}`);
    clearErrors('codeCore');
    setOpenModalClient(false);
    setSelectedCustomerId(product?.customerId);
    getJson({ id: selectedCustomerId });
  };

  const onSubmit = data => {
    data.demandId ||= rowSelectedForModal?.demandId;
    data.demandRecoveredValue && data.demandRecoveredValue.replace(/,/g, '');
    data.productNumber;
    updatePayment({
      demands: {
        ...data,
        demandAmount:
          data.demandAmount && Number(data.demandAmount.replace(/,/g, '')),
        demandRecoveredValue: Number(data.demandRecoveredValue),
      },
    });
    console.log(data);
  };

  const currencies = [
    {
      // id: 1, //*En caso ocupase id
      currencytDescription: 'HNL',
    },
    {
      currencytDescription: 'USD',
    },
  ];
  useMemo(
    () => setSelectedCustomerId(rowSelectedForModal?.codeCore),
    [isLoading]
  );

  const jsonFilter = JsonTypes?.data?.loans.map(currency => {
    return (
      {
        ...currency,
        productNumber: `PRESTAMOS: ${currency.loanAccount} - ${currency.currency}`,
      } || []
    );
  });

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title={`Editar`}
      subTitle={`Demanda #${rowSelectedForModal?.demandId}`}
      onClose={onClose}
      primaryButtonText="Actualizar"
      secondaryButtonText="Cerrar"
      primaryButtonHandleClick={handleSubmit(onSubmit)}
      primaryButtonDisabled={buttonDisabled}
      isLoading={isLoading}
    >
      <div style={{ width: '70vw' }}>
        <form autoComplete="off">
          <FormContainerGrid>
            <Input
              //
              name="demandCode"
              defaultValue={rowSelectedForModal?.isLoadingJsondemandCode}
              label="Código de la Demanda"
              control={control}
              errors={errors}
              optional
            />
            <NewSelect
              control={control}
              name="demandTypeId"
              label="Tipo de demanda"
              options={demandTypes?.data || []}
              defaultValue={rowSelectedForModal?.demandTypeId}
              optionLabel="demandTypeDescription"
              optionValue="demandTypeId"
              errors={errors}
              isSearchable
            />
            <Input
              //
              name="demandFile"
              defaultValue={rowSelectedForModal?.demandFile}
              label="Expediente de la demanda"
              control={control}
              errors={errors}
              optional
            />
            <Input
              //
              name="demandAmount"
              defaultValue={rowSelectedForModal?.demandAmount}
              label="Monto de la demanda"
              control={control}
              errors={errors}
              optional
            />
            <NewSelect
              control={control}
              name="currency"
              defaultValue={rowSelectedForModal?.currency}
              label="Moneda"
              options={currencies || []}
              optionLabel="currencytDescription"
              optionValue="currencytDescription"
              errors={errors}
            />
            <Input
              //
              rows={1}
              name="codeCore"
              label="Cliente"
              control={control}
              errors={errors}
              defaultValue={rowSelectedForModal?.codeCore}
              onSubmitButtonAction={onSubmitButtonSearch}
              hasButtonAction
              optional
              disabled={true}
            />
            <NewSelect
              control={control}
              name="lawyerId"
              label="Abogado"
              options={lawyerTypes?.data || []}
              defaultValue={rowSelectedForModal?.lawyerId || ''}
              optionLabel="lawyerFullName"
              optionValue="lawyerId"
              errors={errors}
              isSearchable
            />
            <NewSelect
              control={control}
              name="demandStatusId"
              label="Estado de la Demanda"
              options={statusTypes?.data || []}
              defaultValue={rowSelectedForModal?.demandStatusId}
              optionLabel="demandStatusDescription"
              optionValue="demandStatusId"
              errors={errors}
              isSearchable
            />
            <NewSelect
              control={control}
              name="courtId"
              label="Corte"
              defaultValue={rowSelectedForModal?.courtId}
              options={courtsTypes?.data || []}
              optionLabel="courtName"
              optionValue="courtId"
              errors={errors}
              isSearchable
            />
            <InputDate
              control={control}
              name="demandPresentationDate"
              watch={watch}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              errorMessage="La fecha de presentación de la demanda es requerida"
              defaultValue={parseDate(
                rowSelectedForModal?.demandPresentationDate
              )}
              label="Fecha de presentación de la demanda"
              dateFormat="dd/MM/yyyy"
            />
            <InputDate
              control={control}
              name="demandDueDate"
              watch={watch}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              errorMessage="La fecha de vencimiento es requerida"
              defaultValue={parseDate(rowSelectedForModal?.demandDueDate)}
              label="Fecha de vencimiento"
              dateFormat="dd/MM/yyyy"
            />
            <Input
              //
              name="demandRecoveredValue"
              defaultValue={rowSelectedForModal?.demandRecoveredValue}
              label="Valor recuperado de la demanda"
              control={control}
              errors={errors}
              optional
            />

            <NewSelect
              control={control}
              name="warranty"
              defaultValue={rowSelectedForModal?.warrantyId}
              label="Garantía"
              options={warrantyTypes?.data || []}
              optionLabel="warrantyDescription"
              optionValue="warrantyId"
              errors={errors}
              isSearchable
            />
            <NewCheckbox
              register={register}
              defaultValue={rowSelectedForModal?.isActive}
              name="isActive"
              label="Activo"
            />
          </FormContainerGrid>

          <MultiSelect
            control={control}
            name="productJson"
            defaultValue={jsonFilter || []}
            label="Productos de la demanda"
            options={jsonFilter || []}
            optionLabel="description"
            optionValue="id"
            optionDescription={'productNumber' || ''}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
            submitCount={submitCount}
            isSearchable
            multiple
          />
        </form>
      </div>

      {openModalClient && (
        <ModalClient
          onClose={() => {
            setOpenModalClient(false);
            dispatch(setCustomerSelected(null));
          }}
          handleSelectCustomer={handleSelectCustomer}
        />
      )}
    </Modal>
  );
};
