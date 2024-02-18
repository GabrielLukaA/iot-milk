"use client";

import { Dialog } from "@/components/Dialog";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import Link from "next/link";
export default function Signup() {
  const signupUser = (data: SignupUserData) => {
    console.log(data);
  };
  const SignupUserSchema = z
    .object({
      name: z.string(),
      email: z
        .string()
        .email("O formato de email não é válido")
        .min(1, "O email deve ser informado!"),
      password: z
        .string()
        .min(6, "A senha deve conter no mínimo 6 caracteres."),
      confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não conferem",
          path: ["confirmPassword"],
        });
      }
    });

  type SignupUserData = z.infer<typeof SignupUserSchema>;
  const signupUserForm = useForm<SignupUserData>({
    resolver: zodResolver(SignupUserSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = signupUserForm;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Dialog.Wrapper>
        <Dialog.Headline redirect={ <Link className="text-xs text-secondary underline"  href={"/"}>Acesse sua conta</Link>} title="Cadastro" description="Crie sua conta já" />

        <FormProvider {...signupUserForm}>
          <form className="flex flex-col" onSubmit={handleSubmit(signupUser)}>
            <Form.WrapperInput>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Input placeholder="Insira seu nome" name="name" />
              {errors.name && <Form.Error>{errors.name.message}</Form.Error>}
            </Form.WrapperInput>
            <Form.WrapperInput>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Input placeholder="Insira seu email" name="email" />
              {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
            </Form.WrapperInput>
            <Form.WrapperInput>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Input
                type="password"
                placeholder="Insira sua senha"
                name="password"
              />
              {errors.password && (
                <Form.Error>{errors.password.message}</Form.Error>
              )}
            </Form.WrapperInput>
            <Form.WrapperInput>
              <Form.Label htmlFor="confirmPassword">
                Confirme sua senha
              </Form.Label>
              <Form.Input
                type="password"
                placeholder="Insira sua senha"
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <Form.Error>{errors.confirmPassword.message}</Form.Error>
              )}
            </Form.WrapperInput>
            <Form.Button className="mt-4" type="submit">
              Se cadastrar
            </Form.Button>
          </form>
        </FormProvider>
      </Dialog.Wrapper>
    </div>
  );
}
