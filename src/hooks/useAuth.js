"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // --- FETCH SESSION & USER
  const { data: session, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: 1000 * 60 * 5, // 5 menit
  });

  const user = session?.user ?? null;

  // --- LISTEN REALTIME AUTH CHANGES
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        queryClient.setQueryData(["session"], newSession);
      },
    );
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [queryClient]);

  // --- AUTO REDIRECT LOGIC
  useEffect(() => {
    if (isLoading) return;

    const authPages = ["/login", "/register"];
    const isAuthPage = authPages.includes(pathname);

    if (!user && !isAuthPage) {
      router.replace("/login");
    } else if (user && isAuthPage) {
      router.replace("/home");
    }
  }, [user, isLoading, pathname, router]);

  // --- LOGIN MUTATION
  const loginMutation = useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase.auth.signInWithPassword(params);
      if (error) throw error;
      return data.session;
    },
    onSuccess: (session) => {
      if (session) {
        queryClient.setQueryData(["session"], session);
        console.log("Login success:", session.user.email);
      }
      router.replace("/home");
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
      // Anda bisa mengganti alert ini dengan console.log jika tidak ingin ada popup
      alert("Login gagal: " + err.message);
    },
  });

  // --- REGISTER MUTATION
  const registerMutation = useMutation({
    mutationFn: async ({ full_name, email, password }) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name },
        },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      console.log("Registrasi berhasil");
      router.replace("/login");
    },
    onError: (err) => {
      console.error("Registration failed:", err.message);
      alert("Registrasi gagal: " + err.message);
    },
  });

  // --- LOGOUT MUTATION
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["session"] });
      console.log("✅ Logout berhasil");
      router.replace("/login");
    },
    onError: (err) => {
      console.error("Logout failed:", err.message);
    },
  });

  return {
    user,
    session,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
