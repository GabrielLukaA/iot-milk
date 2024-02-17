import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export const Button = (props: ButtonProps) => {
  const className = twMerge(
    "w-full  px-4  hover:opacity-90 py-2 text-white text-[14px] rounded-[6px] bg-primary text-center",
    props.className
  );
  return <button {...props} className={className} />;
};
