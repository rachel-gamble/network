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
    async editProfile(account) {
        const res = await api.put('account', account)
        logger.log('the profile edit', res.data)
    }

    async changePage(newPage) {
        const res = await api.get(newPage)
        AppState.allPosts = res.data.posts
        AppState.pageData = res.data
        AppState.totalPages = res.data.totalPages
        logger.log(['ChangePage Method'], res.data, AppState.activeProfile)

        this.getProfileById(res.data.posts[0].creatorId)
    }

    async search(query) {
        params.query = query
        params.page = AppState.currentPage
        const res = await api.get('api/profiles', { params })
        logger.log('search profiles', res.data)
        AppState.allPosts = res.data.posts
    }

    // async likePost(id) {
    //     const res = await api.post('api/posts/' + id + '/like')
    //     logger.log('like button pushed', res.data)
    //     await this.getPosts()
    // }
}

export const profilesService = new ProfilesService()