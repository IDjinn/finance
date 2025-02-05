import { OneOf, UTCDate } from "../readonly";
import { Balance } from "./balance";
import { ModifiableEntity } from "./entity";

export type CPF = `${number}${number}${number}.${number}${number}${number}.${number}${number}${number}-${number}${number}`;
export type CNPJ = `${number}${number}.${number}${number}${number}.${number}${number}${number}/${number}${number}${number}${number}-${number}${number}`;


export type PessoaFisica = Readonly<{
    name: string;
    cpf: CPF;
}>;

export type PessoaJuridica = Readonly<{
    cnpj: CNPJ;
}>;

export type Account =
    ModifiableEntity
    & OneOf<PessoaFisica, PessoaJuridica>
    & {
        name: string;
        agency: string;
        agencyCode: string;
        balance: Balance; // TODO: MAYBE SUPORT MULTIPLE PARAMETERS
    }

const lucas: Account = {
    id: 1,
    name: "Lucas",
    agency: "1234",
    agencyCode: "5678",
    cpf: "123.456.789-99",
    createdAt: new Date('2020-09-10T13:03:33.902Z'),
    modifiedAt: new Date('2020-09-10T13:03:33.902Z'),
    balance: {
        value: 231234,
        currency: 'BRL'
    },
}