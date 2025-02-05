import { OneOf, UTCDate } from "../readonly";
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

export type Accont =
    ModifiableEntity
    & OneOf<PessoaFisica, PessoaJuridica>
    & {
        name: string;
        agency: string;
        agencyCode: string;
    }

    const lucas: Accont = {
        id: 1,
        name: "Lucas",
        agency: "1234",
        agencyCode: "5678",
        cpf: "123.456.789-99",
        createdAt: new Date( '2020-09-10T13:03:33.902Z'),
        modifiedAt: new Date( '2020-09-10T13:03:33.902Z'),
    }