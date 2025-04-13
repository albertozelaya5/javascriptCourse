import { creditsCollectionsApi } from '../../../services/creditsCollectionsApi';

const demands = '/api/lawsuits/demands';
const lawyer = '/api/lawsuits/lawyers?LawyerId=10';
const details = '/api/lawsuits/movementsdetails';
const actions = '/api/lawsuits/demandactions';
const warranties = '/UtilitiesCore/Warrantys';

export const demandsApi = creditsCollectionsApi.injectEndpoints({
  endpoints: builder => ({
    //Demands
    getDemands: builder.query({
      query: params => {
        return {
          url: demands,
          method: 'GET',
          params,
        };
      },
      providesTags: ['MasterDemands'],
    }),
    createDemand: builder.mutation({
      query: body => {
        return {
          url: demands,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MasterDemands'],
    }),
    updateDemand: builder.mutation({
      query: body => {
        return {
          url: demands,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['MasterDemands'],
    }),
    deleteDemand: builder.mutation({
      query: body => {
        return {
          url: demands,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['MasterDemands'],
    }),

    //Actions
    getDetailById: builder.query({
      query: ({ id }) => {
        return {
          url: `/api/lawsuits/demands/${id}/demandactions`,
          method: 'GET',
        };
      },
      providesTags: ['MasterDemandsActions'],
    }),
    createActions: builder.mutation({
      query: body => {
        return {
          url: actions,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),
    updateActions: builder.mutation({
      query: body => {
        return {
          url: actions,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),
    deleteAction: builder.mutation({
      query: body => {
        return {
          url: actions,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),

    //Demands detail
    createMovement: builder.mutation({
      query: body => {
        return {
          url: details,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),
    updateMovement: builder.mutation({
      query: body => {
        return {
          url: details,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),
    deleteMovement: builder.mutation({
      query: body => {
        return {
          url: details,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['MasterDemandsActions'],
    }),

    //*Selects
    getDemandLawyer: builder.query({
      query: () => {
        return {
          url: lawyer,
          method: 'GET',
        };
      },
    }),
    getSelectionWarranties: builder.query({
      query: params => {
        return {
          url: warranties,
          method: 'GET',
          params,
        };
      },
    }),

    getJson: builder.query({
      query: ({ id }) => {
        return {
          url: `/products/customer/${id}?productTypes=creditCards,loans`,
          method: 'GET',
        };
      },
      providesTags: ['MasterDemands'],
    }),
  }),
});

export const {
  //Demands
  useLazyGetDemandsQuery,
  useCreateDemandMutation,
  useUpdateDemandMutation,
  useDeleteDemandMutation,

  //Actions
  useLazyGetDetailByIdQuery,
  useGetDetailByIdQuery,
  useCreateActionsMutation,
  useUpdateActionsMutation,
  useDeleteActionMutation,

  //Details
  useCreateMovementMutation,
  useUpdateMovementMutation,
  useDeleteMovementMutation,

  //Selects
  useGetDemandLawyerQuery,
  useGetSelectionWarrantiesQuery,
  useLazyGetJsonQuery,
} = demandsApi;
