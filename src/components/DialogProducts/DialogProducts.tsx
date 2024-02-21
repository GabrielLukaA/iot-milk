import { Product, ProductBatch } from "@/types";
import { Dialog } from "../Dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "../Form";
import { Batch } from "../Batch";

interface DialogProps {
  product: Product;
  fnClose: () => void;
}

export const DialogProducts = ({ product, fnClose }: DialogProps) => {
  const [productBatchs, setProductBatchs] = useState<ProductBatch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<ProductBatch | null>(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const data = (
        await axios.get(
          "http://10.4.96.2:9090/productBatch/product/" + product.id
        )
      ).data;
      console.log(data);
      setProductBatchs(data);
    };
    getData();
  }, []);
  return (
    <Dialog.Wrapper className="absolute top-1/2 left-1/2 bg-white w-[1024px] p-6 -translate-x-1/2 -translate-y-1/2">
      <Dialog.Wrapper className="flex-row shadow-nao w-full gap-[72px] pt-12">
        <p className="absolute right-12 top-4" onClick={fnClose}>
          X
        </p>

        <div className="flex flex-col gap-6">
          <div className="text-[40px]">
            <h1>{product.name}</h1>
          </div>
          <img src="product.svg" alt="" />
        </div>

        <div className="flex container-lotes flex-col gap-6 flex-1 max-h-[395px] overflow-y-auto">
          {productBatchs.map((batch) => {
            if (batch == selectedBatch) {
            } else {
            }
            return (
              <Batch.Wrapper>
                <Batch.Info
                  onClick={() => {
                    setCount(1)
                    if (selectedBatch != batch) {
                      setSelectedBatch(batch);
                    } else {
                      setSelectedBatch(null);
                    }
                  }}
                  quantityAvailable={batch.quantityAvailable}
                  expirationDate={batch.expirationDate}
                />
                <Batch.Price
                  price={product.price}
                  productQuantity={batch.productQuantity}
                />
                {selectedBatch == batch && (
                  <Batch.Quantity>
                    <button
                    className=" disabled:hidden"
                    disabled={count == batch.quantityAvailable}
                      onClick={() => {
                        setCount((prev) =>
                          prev == batch.quantityAvailable
                            ? batch.quantityAvailable
                            : prev+1
                        );
                      }}
                    >
                      +
                    </button>
                    <p>{count}</p>
                    <button
                    className=" disabled:hidden"
                    disabled={count == 1}
                      onClick={() => {
                        setCount((prev) => (prev == 1 ? 1 : prev-1));
                      }}
                    >
                      -
                    </button>
                  </Batch.Quantity>
                )}
              </Batch.Wrapper>
            );
          })}
        </div>
      </Dialog.Wrapper>
      <Form.Button
        disabled={!selectedBatch}
        className="mt-4 disabled:opacity-40 disabled:bg-graphite"
      >
        Comprar
      </Form.Button>
    </Dialog.Wrapper>
  );
};
