import { DeepReadonly, OneOf, UTCDate } from "@/utils/readonly";
import { Money } from "../transaction";
import { PessoaFisica, PessoaJuridica } from "../account";

export type ISPB = `${number}${number}${number}${number}${number}${number}${number}${number}`;


export type Pix = DeepReadonly<{
    ispb: ISPB;
    timestamp: UTCDate;
    payer: OneOf<PessoaFisica, PessoaJuridica>;
    amount: Money;
}>
