import { HiShoppingCart } from "react-icons/hi";
import { Form } from "../Form";
import Image from "next/image";
import { ReactNode } from "react";

interface CardProps {
  productName: string;
  price: number;
  children: ReactNode
}

export const Card = ({ productName, price, children }: CardProps) => {
  const calcDiscount = (price: number, percent: number) => {
    const fullPercent = 100;
    return (price / fullPercent) * percent;
  };

  function formatNumber(number: number, decimalPlaces: number) {
    let numeroFormatado = number.toFixed(decimalPlaces);
    // Substitui o ponto por vírgula
    numeroFormatado = numeroFormatado.replace(".", ",");
    return numeroFormatado;
  }

  const discountPrice = calcDiscount(price, 90);
  const oldPrice = formatNumber(discountPrice, 2);

  return (
    <div className="flex flex-col gap-6 shadow-default w-max p-4 rounded-lg">
      <Image
        src={"product.svg"}
        alt="A product picture"
        height={177}
        width={251}
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-base leading-6 font-semibold text-graphite">
          {productName}
        </h2>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold leading-6 text-secondary">
            R${formatNumber(price, 2)}
          </p>
          <p className="text-[10px] font-medium text-graphite line-through">
            R${oldPrice}
          </p>
        </div>
        <div className="flex items-center gap-4 h-10">
         {children}
          <div className="rounded-[6px] bg-secondary w-[48px] h-[40px] flex items-center justify-center">
            <HiShoppingCart size={"24"} color="#FCFCFC" />
          </div>
        </div>
      </div>
    </div>
  );
};
