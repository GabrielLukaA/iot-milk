import { ComponentProps } from "react";

interface WrapperProps extends ComponentProps<"div"> {}

export const WrapperInput = (props: WrapperProps) => {
  return <div className=" gap-1 mt-6 flex flex-col w-full" {...props} />;
};
