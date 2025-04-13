import * as yup from "yup";

export const accountPaymentParametersInputValidationScheme = yup.object().shape({
  receivingTerritoryId: yup.string().required("El Territorio Receptor es requerido"),
  settlementCurrencyId: yup.string().required("La Moneda de Liquidación es requerida"),
  paymentTypeId: yup.string().required("El Tipo de pago es requerido"),
  transactionFee: yup.string(),
  variableFee: yup.string(),
  bankFee: yup.string(),
  receivingChannelId: yup.string().required("El Canal Receptor es requerido"),
  recipientCurrencyId: yup.string().required("La Moneda es requerida"),
});

export const updatePaymentParametersInputValidationScheme = yup.object().shape({
  //Iformacion general
  receivingTerritoryId: yup.string().required("El Territorio Receptor es requerido"),
  settlementCurrencyId: yup.string().required("La Moneda de Liquidación es requerida"),
  paymentTypeId: yup.string().required("El Tipo de pago es requerido"),
  transactionFee: yup.string(),
  variableFee: yup.string(),
  bankFee: yup.string(),
  receivingChannelId: yup.string().required("El Canal Receptor es requerido"),
  recipientCurrencyId: yup.string().required("La Moneda es requerida"),
});
