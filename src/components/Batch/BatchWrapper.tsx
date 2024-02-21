import { ComponentProps } from "react";

interface WrapperProps extends ComponentProps<"div"> {}

export const BatchWrapper = (props: WrapperProps) => {
  return <div className="flex justify-between  items-center p-4" {...props} />;
};
