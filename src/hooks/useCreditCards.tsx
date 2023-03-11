import { useContext } from "react";
import { CreditCardsContext } from "../providers/CreditCardsProvider";

export const useCreditCards = () => useContext(CreditCardsContext);