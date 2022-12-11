import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


const params = {
    query:'',
    page: 1
}
const profileParams = {
    query: '',
    page: 1
}

class PostsService {
async getPosts(){
    const res = await api.get('/api/posts/')
    AppState.allPosts = res.data.posts
    AppState.pageData = res.data
    logger.log(res.data)
}
async getByQuery(params){
    AppState.activePosts = []
    // AppState.pageData = {}
    const res = await api.get("api/posts/", { params })
    // console.log('get by query', res.data.posts);
    AppState.totalPages = res.data.totalPages
    AppState.activePosts = res.data.posts
    AppState.pageData = res.data
    AppState.newerPage = res.data.newer
    AppState.olderPage = res.data.older
    logger.log('newer page', AppState.newerPage, 'older page', AppState.olderPage)
    // logger.log('[Query based page data]', AppState.pageData, '[Total Pages in Appstate]', AppState.totalPages)
    // logger.log('the AppState.Active Profile', AppState.activeProfile)
}
async getById(id) {
    AppState.activePost = null
    const res = await api.get('api/posts/' + id)
    AppState.activePost = res.data.posts
}
async createPost(newPost){
    const res = await api.post('api/posts', newPost)
    AppState.allPosts.push(res.data)
}
async deletePost(id){
    const res = await api.delete('api/posts/' + id)
    await this.getPosts()
}
async likePost(id){
    const res = await api.post('api/posts/' + id +'/like')
    logger.log('like button pushed', res.data)
    await this.getPosts()
   
    //  const likedPost = await this.getById(id)
    // const drawPost = await api.get('api/posts/' + id)
    // AppState.allPosts = [drawPost, ...AppState.allPosts]
    // AppState.activePosts.unshift(drawPost)
    // AppState.activePost = likedPost

}

async search(query){
    params.query = query
    params.page = AppState.currentPage
    const res = await api.get('api/posts/', { params })
    logger.log('the search response', res.data)
    AppState.allPosts = res.data.posts
}

async changePage(newPage){
    params.page = newPage
    const res = await api.get('api/posts/', { params })
    AppState.allPosts = res.data.posts
    AppState.pageData = res.data
    AppState.totalPages = res.data.totalPages
    logger.log(['ChangePage Method'], res.data) 
}
async changeProfilePage(newProfilePage, id){
    profileParams.page = newProfilePage
    // const res = await api.get('api/profiles', URL)
    const res = await api.get('api/posts/' + id, {params})
    AppState.activePosts = res.data.posts
    AppState.pageData = res.data
    AppState.totalProfilePages = res.data.totalPages
    logger.log(['Change PROFILE Page'], res.data, 'the params', profileParams) 
}
async olderPage(){
    if(AppState.olderPage !== null) {
        const res = await api.get(AppState.olderPage)
        AppState.activePosts = res.data.posts
        AppState.newerPage = res.data.newer
        AppState.pageData = res.data
        logger.log('the older page', res.data)
        console.log('newer PAGE APPSTATE', AppState.newerPage);
    }
}

async newerPage(){
    const res = await api.get(AppState.newerPage)
    AppState.activePosts = res.data.posts
    AppState.olderPage = res.data.older
    AppState.pageData = res.data
    console.log('the newer page', res.data);
    console.log('the NEWER PAGE APPSTATE', AppState.newerPage);
}
}

export const postsService = new PostsService()