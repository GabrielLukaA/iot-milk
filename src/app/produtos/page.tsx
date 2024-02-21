"use client";

import { HiShoppingCart } from "react-icons/hi";
import Image from "next/image";
import { Form } from "@/components/Form";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Product, ProductBatch, User } from "@/types";
import axios from "axios";
import { DialogProducts } from "@/components/DialogProducts";
export default function Products() {
  const [modal, setModal] = useState(false);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [loggedUser, setLoggedUser] = useState<User>();
  const [products, setProducts] = useState<Product[]>([]);
  const [actualProduct, setActualProduct] = useState<Product | null>(null);

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
          fnClose={() => setModal(prev => !prev)}
          product={actualProduct!}
        />
      )}
      <h1 className="font-bold text-primary text-[48px]">Produtos</h1>

      <div className="grid flexive-grid gap-y-10 gap-x-8">
        {products.map((product) => {
          return (
            <Card
              productName={product.name}
              price={product.price}
              children={
                <Form.Button
                  type="button"
                  onClick={() => {
                    setActualProduct(product);
                    setModal(true);
                  }}
                  className="flex-1"
                >
                  Comprar
                </Form.Button>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
