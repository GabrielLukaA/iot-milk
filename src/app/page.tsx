"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/Form/Label";
import { Form } from "@/components/Form";
import { Dialog } from "@/components/Dialog";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartItem } from "@/types/cart-item";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [errorLogin, setErrorLogin] = useState("");

  const { getLocalStorage, setLocalStorage } = useLocalStorage<CartItem[]>();
  const cartItem: CartItem = {
    product: {
      id: 1,
      name: "Leite UHT integral",
      price: 23.99,
    },
    quantity: 23,
  };

  const cartItems: CartItem[] = [cartItem];
  setLocalStorage("cart-items", cartItems);

  useEffect(() => {
    console.log(getLocalStorage("cart-items"));
  }, []);

  const userLoginSchema = z.object({
    email: z
      .string()
      .email("Formato de email inválido")
      .toLowerCase()
      .min(1, "É preciso preencher o email"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
  });

  type UserLoginData = z.infer<typeof userLoginSchema>;

  const loginUserForm = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    resetField
  } = loginUserForm;

  async function loginUser(data: UserLoginData) {
    const user = await (
      await axios.get(
        `http://10.4.96.2:9090/user/login/${data.email}/${data.password}`
      )
    ).data;
    if (user) {
      setLocalStorage("logged-user", user)
      window.location.href = "/produtos"
    } else {
      setErrorLogin("Email ou senha incorretos")
      resetField("email")
      resetField("password")
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Dialog.Wrapper>
        <Dialog.Headline
          redirect={
            <Link
              className="text-xs text-secondary underline"
              href={"/cadastro"}
            >
              Crie sua conta
            </Link>
          }
          title={"Login"}
          description={"Acesse sua conta"}
        />
        {errorLogin &&
          <Form.Error>{errorLogin}</Form.Error>}
        <FormProvider {...loginUserForm}>
          <form className="flex flex-col" onSubmit={handleSubmit(loginUser)}>
            <Form.WrapperInput>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Input placeholder="Insira seu email" name="email" />
              {errors.email && (
                <span className=" text-error text-sm">
                  {errors.email.message}
                </span>
              )}
            </Form.WrapperInput>
            <Form.WrapperInput>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Input
                type="password"
                placeholder="Insira sua senha"
                name="password"
              />
              {errors.password && (
                <span className=" text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </Form.WrapperInput>

            <Form.Button className="mt-4" type="submit">
              Logar
            </Form.Button>
          </form>
        </FormProvider>
      </Dialog.Wrapper>
    </div>
  );
}
