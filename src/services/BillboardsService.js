import { AppState } from "../AppState";
import { logger }  from "../utils/Logger";
import { api }  from "./AxiosService";

class BillboardsService {
    async getBillboards(){
        const res = await api.get('api/ads')
        // logger.log("the billboard res", res.data)
        AppState.activeBillboards = res.data
    }
}
export const billboardsService = new BillboardsService()
