import { Product, ProductBatch } from "@/types";
import { Dialog } from "../Dialog";
import { useEffect, useState } from "react";
import axios from "axios";

interface DialogProps {
  product: Product;
  fnClose: () => void;
}

export const DialogProducts = ({ product, fnClose }: DialogProps) => {
  const [productBatchs, setProductBatchs] = useState<ProductBatch[]>([]);
    const getData = async () => {
      const data = (
        await axios.get(
          "http://10.4.96.2:9090/productBatch/product/" + product.id
        )
      ).data;
      console.log(data)
      setProductBatchs(data);
    };
    getData();
  }, []);
  return (
    <Dialog.Wrapper className="absolute top-1/2 left-1/2 flex-row  gap-[72px] pt-12 -translate-x-1/2 -translate-y-1/2 bg-white w-[1024px]">
      <p className="absolute right-12 top-4" onClick={fnClose}>X</p>
      <div className="text-[40px]">
        <h1>{product.name}</h1>
      </div>
      <div className="flex container-lotes flex-col gap-6 flex-1 max-h-[395px] overflow-y-auto">
        {productBatchs.map((batch) => {
          return (
            <div className="flex justify-between  items-center p-4">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p>Data de validade: {batch.expirationDate.toString()}</p>
                </div>
                <p>{batch.quantityAvailable} lotes disponíveis</p>
              </div>
              <div className="flex flex-col items-center">
                <p>Preço</p>
                <p>R${product.price * batch.productQuantity}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p>Lotes</p>
                <div className="flex  gap-4 justify-center">
                  <p>+</p>
                  <p>3</p>
                  <p>-</p>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </Dialog.Wrapper>
  );
};
