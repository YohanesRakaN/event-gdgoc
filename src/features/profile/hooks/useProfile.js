"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "../api/profileFetchers";

export const useGetProfileById = (id) => {
  return useQuery({
    queryKey: ["detail", id],
    queryFn: () => getProfileById(id),
    enabled: !!id,
  });
};
