import { ComponentProps } from "react";

interface BatchQuantityProps extends ComponentProps<"div"> {}

export const BatchQuantity = ({ children }: BatchQuantityProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p>Lotes</p>
      <div className="flex  gap-4 justify-center">{children}</div>
    </div>
  );
};
