"use client";

import { HiShoppingCart } from "react-icons/hi";
import Image from "next/image";
import { Form } from "@/components/Form";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Order, Product, ProductBatch, User } from "@/types";
import axios from "axios";
import { DialogProducts } from "@/components/DialogProducts";
export default function Products() {
  const [modal, setModal] = useState(false);
  const [especialModal, setEspecialModal] = useState(false);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [loggedUser, setLoggedUser] = useState<User>();
  const [products, setProducts] = useState<Product[]>([]);
  const [actualProduct, setActualProduct] = useState<Product | null>(null);
  const [demandedQuantity, setDemandedQuantity] = useState(0);

  async function makeOrderDemanded() {
    const product: ProductBatch = {
      productQuantity: demandedQuantity,
      product: actualProduct!,
      quantityAvailable: 1,
    };
    const user: User = await getLocalStorage("logged-user");
if (user){
  console.log(user.addresses[0])
  let bah = (await axios.post("http://10.4.96.2:9090/productBatch", product))
  .data;
if (bah) {

  const order: Order = {
    productBatch: bah,
    user: user,
    address: user.addresses[0],
    price: product.productQuantity! * actualProduct?.price!,
    demanded: false,
  };

  await axios.post("http://10.4.96.2:1880/order", order);
}
}
   

    setDemandedQuantity(0);
    setEspecialModal(false);
    setActualProduct(null);
  }
  useEffect(() => {
    setLoggedUser(getLocalStorage("logged-user"));
    const getProductsBatch = async () => {
      const data = (await axios.get("http://10.4.96.2:9090/product")).data;
      setProducts(data);
    };
    getProductsBatch();
  }, []);
  return (
    <div className="flex w-screen relative h-screen flex-col gap-12 px-40">
      <pre>{JSON.stringify(loggedUser)}</pre>
      {modal && (
        <DialogProducts
          fnClose={() => setModal((prev) => !prev)}
          product={actualProduct!}
        />
      )}

      {especialModal && (
        <Dialog.Wrapper className="absolute top-1/2 left-1/2 bg-white w-[450px] p-6 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4">
            <label className="text-[14px] font-medium leading-5 flex justify-between items-center">
              Informe a quantidade a ser pedida do produto
            </label>
            <input
              type="text"
              className="text-[14px] outline-none shadow-default text-graphite leading-5 p-2 px-4 rounded-[6px]"
              value={demandedQuantity}
              onChange={(e) =>
                setDemandedQuantity(
                  e.target.value ? parseInt(e.target.value) : 0
                )
              }
            />

            <div className="flex gap-2 w-full">
              <Form.Button
                className="bg-gray-400"
                onClick={() => {
                  setDemandedQuantity(0);
                  setEspecialModal(false);
                }}
              >
                Cancelar Compra
              </Form.Button>
              <Form.Button
                onClick={() => {
                  makeOrderDemanded();
                }}
              >
                Confirmar Compra
              </Form.Button>
            </div>
          </div>
        </Dialog.Wrapper>
      )}
      <h1 className="font-bold text-primary text-[48px]">Produtos</h1>

      <div className="grid flexive-grid gap-y-10 gap-x-8">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              productName={product?.name!}
              price={product?.price!}
            >
              <Form.Button
                type="button"
                onClick={() => {
                  if (product.id == 3 || product.id == 4) {
                    setActualProduct(product);
                    setEspecialModal(true);
                  } else {
                    setActualProduct(product);
                    setModal(true);
                  }
                }}
                className="flex-1"
              >
                Comprar
              </Form.Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
