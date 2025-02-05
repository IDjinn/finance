import { APIContext } from "@/services/api/ApiProvider"
import { useContext } from "react"


export const useApi  = () => {
    return useContext(APIContext);
}