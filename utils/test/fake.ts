import { Account, CPF } from '../data/account';
import { fakerPT_BR as faker } from '@faker-js/faker';


function fakeCPF(): string {
    const randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const calcularDigito = (base: number[]): number => {
        const soma = base.reduce((acc, num, index) => acc + num * (base.length + 1 - index), 0);
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const cpfBase = Array.from({ length: 9 }, () => randomInt(0, 9));
    cpfBase.push(calcularDigito(cpfBase));
    cpfBase.push(calcularDigito(cpfBase));

    return cpfBase.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') as CPF;
}


export const fakeAccount = async (): Promise<Account> => {
    return {
        id: faker.string.uuid(),
        name: faker.internet.username(),
        agency: faker.number.int({ min: 1000, max: 5000 }) + '',
        agencyCode: faker.number.romanNumeral({ max: 10 }),
        cpf: fakeCPF(),
        createdAt: faker.date.anytime(),
        modifiedAt: faker.date.anytime(),
    } as Account;
}

console.log(fakeAccount())