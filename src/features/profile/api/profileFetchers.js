import { supabase } from "@/utils/supabase/client";

export async function getProfileById(id) {
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return profileData;
}
