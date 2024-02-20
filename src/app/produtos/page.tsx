"use client";

import { HiShoppingCart } from "react-icons/hi";
import Image from "next/image";
import { Form } from "@/components/Form";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductBatch, User } from "@/types";
import axios from "axios";
export default function Products() {
  const [modal, setModal] = useState(false);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [loggedUser, setLoggedUser] = useState<User>();
  const [products, setProducts] = useState<ProductBatch[]>([]);

  useEffect(() => {
    setLoggedUser(getLocalStorage("logged-user"));
    const getProductsBatch = async () => {
      const data = (await axios.get("http://10.4.96.2:9090/productBatch")).data;
      setProducts(data)
    };
    getProductsBatch();
  }, []);
  return (
    <div className="flex w-screen relative h-screen flex-col gap-12 px-40">
      <pre>{JSON.stringify(loggedUser)}</pre>
      <Dialog.Wrapper className="absolute hidden top-1/2 left-1/2 flex-row  gap-[72px] -translate-x-1/2 -translate-y-1/2 bg-white w-[1024px]">
        <div className="text-[40px]">
          <h1>BOMDIA CLEITON</h1>
        </div>
        <div className="flex container-lotes flex-col gap-6 flex-1 max-h-[395px] overflow-y-auto">
          <div className="flex justify-between  items-center p-4">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Data de validade: 24/03/2024</p>
              </div>
              <p>24 lotes</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Preço</p>
              <p>R$23,99</p>
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
          <div className="flex justify-between  items-center p-4">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Lote A</p>
                <p>24 unidades</p>
              </div>
              <p>Data de validade: 24/03/2024</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Preço</p>
              <p>R$23,99</p>
            </div>
          </div>
          <div className="flex justify-between  items-center p-4">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Lote A</p>
                <p>24 unidades</p>
              </div>
              <p>Data de validade: 24/03/2024</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Preço</p>
              <p>R$23,99</p>
            </div>
          </div>
          <div className="flex justify-between border-b-[1px] items-center p-4">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Lote A</p>
                <p>24 unidades</p>
              </div>
              <p>Data de validade: 24/03/2024</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Preço</p>
              <p>R$23,99</p>
            </div>
          </div>
        </div>
      </Dialog.Wrapper>
      <h1 className="font-bold text-primary text-[48px]">Produtos</h1>

      <div className="grid flexive-grid gap-y-10 gap-x-8">
        {products.map((product)=>{
          return (
            <Card productName={product.productName} price={product.unitPrice}/>
          )
        })}
      </div>
    </div>
  );
}
