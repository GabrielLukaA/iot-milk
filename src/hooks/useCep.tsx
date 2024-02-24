import axios from "axios";

const getData = async (cep: string) => {
  const response = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
    .data;
  // // console.log(response)
  return response;
};

export function useCep(cep: string) {
  return getData(cep);
}
