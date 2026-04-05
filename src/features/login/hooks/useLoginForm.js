import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

export default function useLoginForm() {
  const { login, register: registerUser, isLoading } = useAuth();
  const form = useForm({
    // defaultValues: {
    //   fullname: "",
    //   email: "",
    //   password: "",
    // },
  });

  // fungsi bawaan next (form.handleSubmit)
  const { handleSubmit, register } = form;

  // Manipulasi sebelum di execute ke API
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    login({ email: data.email, password: data.password });
  });

  const onRegister = handleSubmit(async (data) => {
    registerUser({
      full_name: data.fullname ?? "",
      email: data.email,
      password: data.password,
    });
  });

  return { onSubmit, form, handleSubmit, register, onRegister };
}
