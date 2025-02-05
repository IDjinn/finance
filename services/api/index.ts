import { Transaction } from "@/utils/data/transaction";
import { Account } from "@/utils/data/account";
import { EntitySorter } from "@/utils/data/entity";


export class API {
    private static readonly _instance = new API();

    public getInstance = () => API._instance;

    public getAllTransactions(): Readonly<Transaction[]> {
        return [
            {
                id: "123",
                accountId: "456",
                timestamp: new Date("2022-01-01T12:00:00Z"),
                type: "income",
                balance: {
                    balance: 1000,
                    currency: "BRL"
                },
                category: {
                    id: "789",
                    name: "Salário"
                },
                description: "Salário",
                createdAt: new Date("2022-01-01T12:00:00Z"),
            },
            {
                id: "124",
                accountId: "456",
                timestamp: new Date("2022-02-01T12:00:00Z"),
                type: "expense",
                balance: {
                    balance: 500,
                    currency: "BRL"
                },
                category: {
                    id: "790",
                    name: "Aluguel"
                },
                description: "Aluguel de Casa",
                createdAt: new Date("2022-02-01T12:00:00Z"),
            },
            {
                id: "125",
                accountId: "457",
                timestamp: new Date("2021-12-01T12:00:00Z"),
                type: "income",
                balance: {
                    balance: 2000,
                    currency: "BRL"
                },
                category: {
                    id: "791",
                    name: "Bônus"
                },
                description: "Bônus de final de ano",
                createdAt: new Date("2021-12-01T12:00:00Z"),
            }
        ].sort(EntitySorter) as Readonly<Transaction[]>;
    }

    public getAllAccounts(): Readonly<Account[]> {
        return [
            {
                id: "456",
                name: "Conta 1",
                agency: "1234",
                agencyCode: "5678",
                cpf: "123.456.789-99",
                createdAt: new Date("2022-01-01T12:00:00Z"),
                modifiedAt: new Date("2022-01-01T12:00:00Z"),
            }
        ]
    }
}