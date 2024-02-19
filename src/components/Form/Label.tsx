import { ComponentProps } from "react";

interface LabelProps extends ComponentProps<"label"> {}

export const Label = (props: LabelProps) => {
  return (
    <label
      className="text-[14px] font-medium leading-5 flex justify-between items-center"
      {...props}
    />
  );
};
