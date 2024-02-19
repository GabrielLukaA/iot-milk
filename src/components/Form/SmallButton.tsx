import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export const SmallButton = (props: ButtonProps) => {
  return <button className="text-xs underline text-secondary" {...props} />;
};
