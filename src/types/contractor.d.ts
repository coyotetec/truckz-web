export interface ICreateContractorResponse {
  id: string;
  name: string;
  cnpj: string | null;
  cpf: string | null;
  stateRegistration: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export interface IFindContractorResponse {
  cnpj?: string;
  cpf?: string;
  id: string;
  name: string;
  phoneNumber: string;
  stateRegistration: string;
  whatsappNumber: string;
}
