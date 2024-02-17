"use client";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export const Input = ({ name, ...props }: InputProps) => {
  const { register } = useFormContext();

  return (
    <input
      className="text-[14px] outline-none shadow-default text-graphite leading-5 p-2 px-4 rounded-[6px]"
      {...props}
      {...register(name)}
    />
  );
};
