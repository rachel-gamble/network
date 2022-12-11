import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
    async getProfileById(id) {
        AppState.activeProfile = null
        const res = await api.get('api/profiles/' + id)
        // logger.log('getProfileById', res.data)
        AppState.activeProfile = res.data
        // AppState.pageData = res.data
    }
    async editProfile(account){
        const res = await api.put('account', account)
        logger.log('the profile edit',res.data)
    }
}

export const profilesService = new ProfilesService()