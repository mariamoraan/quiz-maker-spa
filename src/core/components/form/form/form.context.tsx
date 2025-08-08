"use client";

import { createContext, useContext } from "react";
import type { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface FormContextData {
  register: UseFormRegister<FieldValues> | undefined;
  formState: FormState<FieldValues> | undefined;
}
export const FormContext = createContext<FormContextData>({
  register: undefined,
  formState: undefined,
});

export const FormProvider = ({
  register,
  formState,
  children,
}: React.PropsWithChildren<{
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
}>) => {
  return (
    <FormContext.Provider value={{ register, formState }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
