"use client";

import TanstackProviders from "@/providers/TanstackProviders";

export const Wrapper = ({ children }) => {
  return <TanstackProviders>{children}</TanstackProviders>;
};
