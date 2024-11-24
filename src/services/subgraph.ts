import { createApi } from "@reduxjs/toolkit/query/react";
// import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

import { subgraphUrl } from "@/utils/constants";

// import { Address } from 'wagmi';
// import { Token } from '@/models/Token';
// import { Pair } from '@/models/Pair';
// import {
//   AddressString,
//   DetailVolumeProps,
//   PareDetailProps,
// } from '@/utils/types';

// const transformToken = (token: Token): Token => {
//   return {
//     ...token,
//     img: '/images/$eCLIPSE.svg',
//     decimals: Number(token.decimals),
//   };
// };

export const subgraphApi = createApi({
  reducerPath: "subgraph",
  baseQuery: graphqlRequestBaseQuery({
    url: subgraphUrl,
  }),
  endpoints: () => ({
    // getTokens: builder.query<Token[], void>({
    //   query: () => ({
    //     document: gql`
    //       query GetTokens {
    //         tokens {
    //           address: id
    //           name
    //           symbol
    //           decimals
    //         }
    //       }
    //     `,
    //   }),
    //   transformResponse: (response: { tokens: Token[] }) =>
    //     response.tokens.map(transformToken),
    // }),
  }),
});

// export const {
// useGetTokensQuery,
// useGetPairDetailQuery,
// useGetVolumePairQuery,
// useGetPoolsQuery,
// useGetUserPoolsQuery,
// useGetTodaysVolumeQuery,
// } = subgraphApi;
