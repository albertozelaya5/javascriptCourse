import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Input,
  InputDate,
  InputNumber,
  MultiSelect,
  NewCheckbox,
  NewSelect,
} from '../../../../../../../components/forms';
import { Modal } from '../../../../../../../components/modals/NewModal';
import { getValidationErrors } from '../../../../../../../helpers/generals';
import { useScreensPermissions } from '../../../../../../../hooks/useScreensPermissions';
import { FormContainerGrid } from '../../../../../../../styles/FormModals';
import { addNotification } from '../../../../../../../ui';
import { setCustomerSelected } from '../../../../../../bank/customers/features/customerSlice';
import { useGetCourtsQuery } from '../../../../../demand-control-catalogue/courts/features/courtsApi';
import { useGetDemandStatusQuery } from '../../../../../demand-control-catalogue/demand-status/features/demandStatusApi';
import { useGetDemandTypeQuery } from '../../../../../demand-control-catalogue/demand-type/features/demandTypeApi';
import {
  useCreateDemandMutation,
  useGetDemandLawyerQuery,
  useGetSelectionWarrantiesQuery,
  useLazyGetJsonQuery,
} from '../../../features/demandsApi';
import { demandsInputValidationScheme } from '../../../validations';
import { ModalClient } from './ModalClient';

export const ModalAdd = ({ onClose, dataDemands }) => {
  const [openModalClient, setOpenModalClient] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const dispatch = useDispatch();
  const { getScreenFiltered } = useScreensPermissions();
  const { pathname } = useLocation();

  //APIs
  const { data: demandTypes, error } = useGetDemandTypeQuery();
  const { data: lawyerTypes } = useGetDemandLawyerQuery();
  const { data: statusTypes } = useGetDemandStatusQuery();
  const { data: courtsTypes } = useGetCourtsQuery();
  const { data: warrantyTypes } = useGetSelectionWarrantiesQuery();
  const [getJson, { data: JsonTypes, isLoading: isLoadingJson }] =
    useLazyGetJsonQuery();
  const [createDemand, { data: resp, isError, isLoading, isSuccess }] =
    useCreateDemandMutation();

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    watch,
    formState: { errors, submitCount },
  } = useForm({
    resolver: yupResolver(demandsInputValidationScheme),
  });

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isError) {
      let message = ['Error al crear demanda'];

      if (error?.data?.errors) {
        message = error?.data?.errors;
      }

      if (
        error?.data?.validationErrors &&
        Object.keys(error?.data?.validationErrors)?.length > 0
      ) {
        message = getValidationErrors(
          error?.data?.validationErrors,
          'Error al crear demanda'
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
          message: ['Demanda creada correctamente'],
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
    //Mutation
    getJson({ id: selectedCustomerId });
  };

  const onSubmit = data => {
    data.demandRecoveredValue && data.demandRecoveredValue.replace(/,/g, '');
    createDemand({
      demands: {
        ...data,
        demandAmount:
          data.demandAmount && Number(data.demandAmount.replace(/,/g, '')),
        demandRecoveredValue:
          data.demandRecoveredValue &&
          Number(data.demandRecoveredValue.replace(/,/g, '')),
      },
    });
  };

  const currencies = [
    {
      currencytDescription: 'HNL',
    },
    {
      currencytDescription: 'USD',
    },
  ];

  const jsonFilter =
    JsonTypes?.data?.loans.map(currency => {
      return {
        ...currency,
        productDescription: `PRESTAMOS: ${currency.loanAccount} - ${currency.currency}`,
        productNumber: currency.loanAccount,
        productTypeId: 3,
      };
    }) || [];

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title="Nuevo"
      subTitle="Demanda"
      onClose={onClose}
      primaryButtonText="Guardar"
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
              optionLabel="demandTypeDescription"
              optionValue="demandTypeId"
              errors={errors}
              isSearchable
            />
            <Input
              //
              name="demandFile"
              label="Expediente de la demanda"
              control={control}
              errors={errors}
              optional
            />
            <InputNumber
              name="demandAmount"
              label="Monto de la demanda"
              control={control}
              errors={errors}
              thousandSeparator=","
              decimalSeparator="."
              allowLeadingZeros={false}
              decimalScale={2}
              optional
            />
            <NewSelect
              control={control}
              name="currency"
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
              optionLabel="demandStatusDescription"
              optionValue="demandStatusId"
              errors={errors}
              isSearchable
            />
            <NewSelect
              control={control}
              name="courtId"
              label="Corte"
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
              label="Fecha de vencimiento"
              dateFormat="dd/MM/yyyy"
            />
            <InputNumber
              name="demandRecoveredValue"
              label="Valor recuperado de la demanda"
              control={control}
              errors={errors}
              thousandSeparator=","
              decimalSeparator="."
              allowLeadingZeros={false}
              decimalScale={2}
              optional
            />
            <NewSelect
              control={control}
              name="warranty"
              label="Garantía"
              options={warrantyTypes?.data || []}
              optionLabel="warrantyDescription"
              optionValue="warrantyId"
              errors={errors}
              isSearchable
            />
            <NewCheckbox register={register} name="isActive" label="Activo" />
          </FormContainerGrid>
          <MultiSelect
            control={control}
            name="productJson"
            label="Productos de la demanda"
            options={jsonFilter}
            optionLabel="description"
            optionValue="productTypeId"
            optionDescription={'productDescription'}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
            submitCount={submitCount}
            loading={isLoadingJson}
            isSearchable
            multiple
            scrollWhenOpen
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
