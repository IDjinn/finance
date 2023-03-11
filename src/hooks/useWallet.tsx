import { useContext } from "react"
import { WalletContext } from "../providers/WalletProvider"


export const useWallet = () => {
    return useContext(WalletContext);
}