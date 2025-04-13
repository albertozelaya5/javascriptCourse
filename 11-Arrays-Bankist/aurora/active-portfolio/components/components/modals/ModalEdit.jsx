import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { FormsContainer } from "../../../../../../components/containers/FormsContainer";
import { Input, InputNumber, NewSelect } from "../../../../../../components/forms";
import { Modal } from "../../../../../../components/modals/NewModal";
import { useScreensPermissions } from "../../../../../../hooks/useScreensPermissions";
import { addNotification } from "../../../../../../ui";
import {
  useGetCountriesQuery,
  useGetCurrenciesQuery,
  useGetPaymentsTypesQuery,
  useUpdateMasterPaymentParametersSchemaMutation,
} from "../../features/paymentParametersApi";
import { updatePaymentParametersInputValidationScheme } from "../../validations";

export const ModalEdit = ({ onClose }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { rowSelectedForModal } = useSelector((state) => state.ui);
  const { getScreenFiltered } = useScreensPermissions();

  //APIs
  const { data: currencies } = useGetCurrenciesQuery();
  const { data: countries } = useGetCountriesQuery();
  const { data: payments } = useGetPaymentsTypesQuery();
  const [updatePaymentParameters, { isError, isLoading, error, isSuccess }] =
    useUpdateMasterPaymentParametersSchemaMutation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updatePaymentParametersInputValidationScheme) });

  const receivingTerritoryId = watch("receivingTerritoryId");
  const currencyOptionsByCountry =
    countries?.data.find((currency) => currency.countryId == receivingTerritoryId)?.currencies || [];

  useEffect(() => {
    getScreenFiltered(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isError) {
      const message = error?.data?.errors || "Error al actualizar el parámetro de pago";
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
          message: ["Registro de parámetro de pago actualizado correctamente"],
          type: "success",
        })
      );
      onClose();
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    data.id = rowSelectedForModal?.id || data.id;
    data.transactionFee = data?.transactionFee.replace(/,/g, "");
    data.bankFee = data?.bankFee.replace(/,/g, "");
    data.variableFee = data?.variableFee ? String(data.variableFee).replace("%", "") : data.variableFee;
    data.bankVariableFee = data?.bankVariableFee ? String(data.bankVariableFee).replace("%", "") : data.bankVariableFee;
    updatePaymentParameters({ paymentParameters: { ...data } });
  };

  const buttonDisabled = Object.entries(errors).length === 0 ? false : true;

  return (
    <Modal
      title={`Editar`}
      subTitle={`Parámetro de pago #${rowSelectedForModal?.id}`}
      onClose={onClose}
      primaryButtonText="Actualizar"
      secondaryButtonText="Cerrar"
      primaryButtonHandleClick={handleSubmit(onSubmit)}
      primaryButtonDisabled={buttonDisabled}
      isLoading={isLoading}
    >
      <FormsContainer>
        <form autoComplete="off">
          <NewSelect
            scrollWhenOpen
            control={control}
            name="receivingTerritoryId"
            label="Territorio Receptor"
            options={countries?.data || []}
            optionLabel="countryNameLocal"
            optionValue="countryId"
            defaultValue={rowSelectedForModal?.receivingTerritoryId}
            errors={errors}
            isSearchable
          />
          <Input
            defaultValue={rowSelectedForModal?.receivingChannelId}
            name="receivingChannelId"
            label="Canal Receptor"
            control={control}
            errors={errors}
          />

          <NewSelect
            scrollWhenOpen
            name="recipientCurrencyId"
            label="Moneda"
            options={currencyOptionsByCountry}
            optionLabel="alphabeticCode"
            optionValue="id"
            defaultValue={rowSelectedForModal?.recipientCurrencyId}
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
            defaultValue={rowSelectedForModal?.settlementCurrencyId}
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
            defaultValue={rowSelectedForModal?.paymentTypeId}
            optionValue="paymentTypesId"
            control={control}
            errors={errors}
            isSearchable
          />
          <InputNumber
            name="transactionFee"
            label="Comisión Mastercard"
            defaultValue={rowSelectedForModal?.transactionFee}
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
            defaultValue={rowSelectedForModal?.bankFee}
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
            defaultValue={rowSelectedForModal?.variableFee}
            control={control}
            errors={errors}
            thousandSeparator=","
            decimalSeparator="."
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
          <InputNumber
            name="bankVariableFee"
            label="FX Banhcafe"
            defaultValue={rowSelectedForModal?.bankVariableFee}
            control={control}
            errors={errors}
            thousandSeparator=","
            decimalSeparator="."
            allowLeadingZeros={false}
            decimalScale={4}
            optional
          />
        </form>
      </FormsContainer>
    </Modal>
  );
};
