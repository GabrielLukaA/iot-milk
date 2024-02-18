"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/Form/Label";
import { Form } from "@/components/Form";
import { Dialog } from "@/components/Dialog";
import Link from "next/link";

export default function Home() {
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
  } = loginUserForm;

  function loginUser(data: UserLoginData) {
    console.log(data);
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
