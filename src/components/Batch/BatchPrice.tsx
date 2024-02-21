type BatchPriceProps = {
  price: number;
  productQuantity: number;
};

export const BatchPrice = ({ price, productQuantity }: BatchPriceProps) => {
  return (
    <div className="flex flex-col items-center">
      <p>Preço</p>
      <p>R${price * productQuantity}</p>
    </div>
  );
};
