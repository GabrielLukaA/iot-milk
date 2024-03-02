"use client";

import { Dialog } from "@/components/Dialog";
import { FaTrash } from "react-icons/fa";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";
import Link from "next/link";
import axios from "axios";
import { useCep } from "@/hooks/useCep";
import { User } from "@/types";
export default function Signup() {
  type ViaCep = {
    bairro: string;
    cep: string;
    complemento: "";
    ddd: "47";
    gia: "";
    ibge: "4208906";
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
  };

  const getData = async (cep: string) => {
    const response = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
      .data;
    // // console.log(response);
    return response;
  };

  const verify = async (data: SignupUserData) => {
    const results = await Promise.all(
      data.addresses.map(async (address) => {
        const s: any = await getData(address.cep.toString());
        if (s.erro) {
          // // console.log("Não fui");
          return true;
        } else {
          return false;
        }
      })
    );

    // Verificar se algum resultado é verdadeiro (erro) e retornar true
    if (results.includes(true)) {
      return true;
    } else {
      return false;
    }
  };
  const signupUser = async (data: SignupUserData) => {
    let counter = await verify(data);

    // // console.log(counter);
    if (counter) {
      // // console.log("Não fui nem fundendo");
    } else {
      const address: any[] = await Promise.all(
        data.addresses.map(async (address) => {
          let viacepResponse: ViaCep = await getData(address.cep.toString());
          if (viacepResponse) {
            return {
              state: viacepResponse.uf,
              city: viacepResponse.localidade,
              street: viacepResponse.logradouro,
              number: address.number,
              cep: viacepResponse.cep,
            };
          } else {
            return null;
          }
        })
      );
      const user: User = {
        name: data.name,
        email: data.email,
        password: data.password,
        addresses: address,
      };
      // // console.log(user);
      await axios.post("http://10.4.96.2:9090/user", user);
      window.location.href = "/";
    }
  };
  const SignupUserSchema = z
    .object({
      name: z.string().min(1, "O nome deve ser informado."),
      email: z
        .string()
        .email("O formato de email não é válido")
        .min(1, "O email deve ser informado!"),
      password: z
        .string()
        .min(6, "A senha deve conter no mínimo 6 caracteres."),
      confirmPassword: z.string(),
      addresses: z
        .array(
          z.object({
            cep: z.coerce
              .number()
              .refine(
                (cep) => cep.toString().length === 8,
                "Um cep possui 9 digitos."
              ),
            number: z.coerce.number().min(1, "Preencha o número do local."),
          })
        )
        .min(1, "Adicione pelo menos um endereço"),
    })
    .superRefine(({ confirmPassword, password, addresses }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não conferem",
          path: ["confirmPassword"],
        });
      }
      addresses.map(async (address, index) => {
        let data: any = null;
        try {
          if (address.cep.toString().length === 8) {
            data = await getData(address.cep.toString());
          }
          // // console.log(data);
        } catch (e) {
          // // console.log(e);
        }
        if (data?.erro) {
          setError(`addresses.${index}`, {
            type: "manual",
            message: "O CEP informado é inválido.",
          });
          // // console.log(errors.addresses?.[index]?.message);
          // // console.log("Sou o erro atual ein");
        } else {
          setError(`addresses.${index}`, {
            type: "manual",
            message: "",
          });
        }
      });
    });

  type SignupUserData = z.infer<typeof SignupUserSchema>;
  const signupUserForm = useForm<SignupUserData>({
    resolver: zodResolver(SignupUserSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    resetField,
  } = signupUserForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });
  function addNewAdress() {
    append({
      cep: 0,
      number: 0,
    });
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Dialog.Wrapper>
        <Dialog.Headline
          redirect={
            <Link className="text-xs text-secondary underline" href={"/"}>
              Acesse sua conta
            </Link>
          }
          title="Cadastro"
          description="Crie sua conta já"
        />

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
            <Form.WrapperInput>
              <Form.Label>
                Endereços
                <Form.SmallButton type="button" onClick={addNewAdress}>
                  Adicione um endereço
                </Form.SmallButton>
              </Form.Label>
              {fields.map((field, index) => {
                return (
                  <Form.WrapperInput key={field.id}>
                    <div className="flex gap-4 items-center w-[100%] relative">
                      <Form.Input
                        type="number"
                        className="flex-1 w-full"
                        placeholder="Insira seu cep"
                        name={`addresses.${index}.cep`}
                      />

                      <Form.Input
                        type="number"
                        className="w-36"
                        placeholder="Número do local."
                        name={`addresses.${index}.number`}
                      />
                      <FaTrash
                        color="#7D0929"
                        size={12}
                        onClick={() => remove(index)}
                      />
                    </div>
                    <div className="flex gap-8">
                      {errors?.addresses?.[index]?.cep && (
                        <Form.Error>
                          {errors.addresses[index]?.cep?.message}
                        </Form.Error>
                      )}
                      {errors?.addresses?.[index]?.number && (
                        <Form.Error>
                          {errors.addresses[index]?.number?.message}
                        </Form.Error>
                      )}
                      {errors?.addresses?.[index]?.message && (
                        <Form.Error>
                          {errors.addresses?.[index]?.message}
                        </Form.Error>
                      )}
                    </div>
                  </Form.WrapperInput>
                );
              })}
            </Form.WrapperInput>

            {errors.addresses && (
              <Form.Error> {errors.addresses.message}</Form.Error>
            )}

            <Form.Button className="mt-4" type="submit">
              Se cadastrar
            </Form.Button>
          </form>
        </FormProvider>
      </Dialog.Wrapper>
    </div>
  );
}
