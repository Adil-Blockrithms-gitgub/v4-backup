"use client";

import { ApiProvider as RTKApiProvider } from "@reduxjs/toolkit/query/react";

import { subgraphApi } from "@/services/subgraph";

const ApiProvider = ({ children }: { children: React.ReactNode }) => (
  <RTKApiProvider api={subgraphApi}>{children}</RTKApiProvider>
);

export default ApiProvider;
