import { ComponentProps } from "react";

interface BatchInfoProps extends ComponentProps<'div'>{
  expirationDate:Date,
  quantityAvailable:number
}

export const BatchInfo = ({expirationDate, quantityAvailable, ...props}:BatchInfoProps) => {
  return (
    <div className="flex flex-col" {...props}>
      <p>Data de validade: {expirationDate.toString()}</p>
      <p>{quantityAvailable} lotes disponíveis</p>
    </div>
  );
};
