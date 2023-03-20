import { CreditCardData } from "../providers/CreditCardsProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Account } from "../providers/AccountsProvider";
import { WalletData } from "../providers/WalletProvider";

const Keys = Object.freeze({
  OFFLINE: "is-offline",
  CREDIT_CARDS: "credit-cards",
  ACCOUNTS: "accounts",
  WALLET: "wallet",
  THEME_MODE: 'theme-mode'
});

export default class Storage {
  public static readonly instance = new Storage();

  constructor() {
    AsyncStorage.setItem(Keys.THEME_MODE, 'light');
    AsyncStorage.setItem(Keys.OFFLINE, "true");
    AsyncStorage.setItem(
      Keys.WALLET,
      JSON.stringify({
        currentBalance: 345,
        futureBalance: 657,
        incomings: 0,
        outgoings: 0,
      })
    );
    AsyncStorage.setItem(
      Keys.ACCOUNTS,
      JSON.stringify([
        {
          nickname: "nubank",
          balance: 135.93,
          debt: 342,
          creditCards: ["5555 **** **** 6666"],
        },
        {
          nickname: "bb",
          balance: 345.93,
          debt: 678,
          creditCards: ["5555 **** **** 6666"],
        },
      ])
    );
    AsyncStorage.setItem(
      Keys.CREDIT_CARDS,
      JSON.stringify([
        {
          number: "123 *** *** 99",
          nickname: "Banco do brasil",
          flag: "master-card",
          bank: "banco-do-brasil",
          color: "#8A05BE",
          variantColor: "#C57DD4",
          expireDate: "03/03",
          balance: {
            usedLimit: 500,
            limit: 3_000,
            debt: 200.5,
            invoice: "03/03",
          },
        },
        {
          number: "5555 **** **** 6666",
          nickname: "Nubank",
          flag: "mastercard",
          bank: "Nubank",
          color: "#8A05BE",
          variantColor: "#C57DD4",
          expireDate: "03/25",
          balance: {
            usedLimit: 1500,
            limit: 5000,
            debt: 250.75,
            invoice: "03/25",
          },
        },
      ])
    );
  }

  public async getThemeMode() {
    return await this.getKey<string>(Keys.THEME_MODE, "light");
  }

  public async isOffline() {
    return (await AsyncStorage.getItem(Keys.OFFLINE)) === "true";
  }

  public async getCreditCards() {
    if (await this.isOffline()) {
      return await this.getKey<CreditCardData[]>(Keys.CREDIT_CARDS, []);
    }

    return [];
  }

  public async getAccounts() {
    if (await this.isOffline()) {
      return await this.getKey<Account[]>(Keys.ACCOUNTS, []);
    }

    return [];
  }

  public async getWallet(): Promise<WalletData | null> {
    if (await this.isOffline()) {
      return await this.getKey<WalletData>(Keys.WALLET);
    }

    return null;
  }

  private async getKey<T>(
    key: string,
    defaultValue: T | null = null
  ): Promise<T> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return defaultValue!;
      return JSON.parse(value) as T;
    } catch {
      return defaultValue!;
    }
  }
}
