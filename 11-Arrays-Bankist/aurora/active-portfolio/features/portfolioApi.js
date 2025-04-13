import { reportsApi } from "../../../services/reportsApi";

const portfolio = `/backOffice/MIA/WalletReport?userName=BANHCAFE\\mambhc&fecha=2023-01-31&agencia=40&banco=01,02&moneda=LPS&saldoCapital=P,N`;

export const portfolioApi = reportsApi.injectEndpoints({
  endpoints: (builder) => ({
    //backOffice
    getPortfolio: builder.query({
      query: () => {
        return {
          url: portfolio,
          method: "GET",
        };
      },
      providesTags: ["DemandLedger"],
    }),

    createPortfolio: builder.mutation({
      query: (body) => {
        return {
          url: portfolio,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["DemandLedger"],
    }),

    updatePortfolio: builder.mutation({
      query: (body) => {
        return {
          url: apiUrl,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["DemandLedger"],
    }),

    deletePortfolio: builder.mutation({
      query: (body) => {
        return {
          url: portfolio,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["DemandLedger"],
    }),
  }),
});

export const {
  //
  useLazyGetPortfolioQuery,
} = portfolioApi;
