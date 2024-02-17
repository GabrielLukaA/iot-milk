import { HiShoppingCart } from "react-icons/hi";
import Image from "next/image";
import { Form } from "@/components/Form";
import { Card } from "@/components/Card";
export default function Products() {
  return (
    <div className="flex w-screen h-screen flex-col gap-12 px-40">
      <h1 className="font-bold text-primary text-[48px]">Produtos</h1>

      <div className="grid flexive-grid gap-y-10 gap-x-8">
        <Card productName="Bah, Leite!" price={23.9} />
        <Card productName="Bah, Leite!" price={23.9} />
        <Card productName="Bah, Leite!" price={23.9} />
        <Card productName="Bah, Leite!" price={23.9} />
        <Card productName="Bah, Leite!" price={23.9} />
        <Card productName="Bah, Leite!" price={23.9} />
      </div>
    </div>
  );
}
