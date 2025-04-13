import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Input, InputNumber, NewSelect } from "../../../../../../components/forms";
import { Modal } from "../../../../../../components/modals/NewModal";
import { getValidationErrors } from "../../../../../../helpers/generals";
import { useScreensPermissions } from "../../../../../../hooks/useScreensPermissions";
import { addNotification } from "../../../../../../ui";

import { FormsContainer } from "../../../../../../components/containers/FormsContainer";
import {
  useCreatePaymentParametersMutation,
  useGetCountriesQuery,
  useGetCurrenciesQuery,
  useGetPaymentsTypesQuery,
} from "../../features/paymentParametersApi";
import { accountPaymentParametersInputValidationScheme } from "../../validations";

export const ModalAdd = ({ onClose }) => {
  const dispatch = useDispatch();
  const { getScreenFiltered } = useScreensPermissions();
  const { pathname } = useLocation();

  //APIs
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: countries } = useGetCountriesQuery();
  const { data: payments } = useGetPaymentsTypesQuery();
  const [createUriScheme, { data: resp, isError, error, isLoading, isSuccess }] = useCreatePaymentParametersMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountPaymentParametersInputValidationScheme),
  });

  const receivingTerritoryId = watch("receivingTerritoryId");
  const currencyOptionsByCountry =
    countries?.data.find((currency) => currency.countryId == receivingTerritoryId)?.currencies || [];

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isError) {
      let message = ["Error al crear el parametro de pago"];

      if (error?.data?.errors) {
        message = error?.data?.errors;
      }

      if (error?.data?.validationErrors && Object.keys(error?.data?.validationErrors)?.length > 0) {
        message = getValidationErrors(error?.data?.validationErrors, "Error al crear el parametro de pago");
      }

      dispatch(
        addNotification({
          message,
          type: "error",
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addNotification({
          message: ["Parámetro de pago creado correctamente"],
          type: "success",
        })
      );
      onClose();
    }
  }, [isSuccess]);

  const convert = (value) => {
    if (value === "double") {
      value = parseFloat(value);
    } else if (value === "bool") {
      value = convertBool(value || false);
    }
  };

  const onSubmit = (data) => {
    data.bankFee = data?.bankFee.replace(/,/g, "");
    data.transactionFee = data?.transactionFee.replace(/,/g, "");
    convert(data.bankFee);
    convert(data.transactionFee);
    data.variableFee = data?.variableFee ? String(data.variableFee).replace("%", "") : data.variableFee;
    data.bankVariableFee = data?.bankVariableFee ? String(data.bankVariableFee).replace("%", "") : data.bankVariableFee;

    createUriScheme({
      paymentParameters: {
        ...data,
      },
    });
  };

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title="Nueva"
      subTitle="Parámetros de Pago"
      onClose={onClose}
      primaryButtonText="Guardar"
      secondaryButtonText="Cerrar"
      primaryButtonHandleClick={handleSubmit(onSubmit)}
      primaryButtonDisabled={buttonDisabled}
      isLoading={isLoading}
    >
      <FormsContainer>
        <form autoComplete="off">
          <NewSelect
            scrollWhenOpen
            name="receivingTerritoryId"
            label="Territorio Receptor"
            options={countries?.data || []}
            optionLabel="countryNameLocal"
            optionValue="countryId"
            control={control}
            errors={errors}
            isSearchable
          />
          <Input name="receivingChannelId" label="Canal Receptor" control={control} errors={errors} optional />

          <NewSelect
            scrollWhenOpen
            name="recipientCurrencyId"
            label="Moneda"
            options={currencyOptionsByCountry}
            optionLabel="alphabeticCode"
            optionValue="id"
            control={control}
            errors={errors}
            isSearchable
          />
          <NewSelect
            scrollWhenOpen
            name="settlementCurrencyId"
            label="Moneda de Liquidación"
            options={currencies?.data || []}
            optionLabel="currencyDescriptionEng"
            optionValue="currencyId"
            control={control}
            errors={errors}
            isSearchable
          />
          <NewSelect
            scrollWhenOpen
            name="paymentTypeId"
            label="Tipo de pago"
            options={payments?.data || []}
            optionLabel="descriptionLocal"
            optionValue="paymentTypesId"
            control={control}
            errors={errors}
            isSearchable
          />
          <InputNumber
            name="transactionFee"
            label="Comisión Mastercard"
            control={control}
            errors={errors}
            thousandSeparator=","
            decimalSeparator="."
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
          <InputNumber
            name="bankFee"
            label="Comision Banhcafe"
            control={control}
            errors={errors}
            thousandSeparator=","
            decimalSeparator="."
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
          <InputNumber
            name="variableFee"
            label="FX Mastercard"
            control={control}
            errors={errors}
            prefix="%"
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
          <InputNumber
            name="bankVariableFee"
            label="FX Banhcafe"
            control={control}
            errors={errors}
            prefix="%"
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
        </form>
      </FormsContainer>
    </Modal>
  );
};
