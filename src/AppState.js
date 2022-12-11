import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  allPosts: [],
  activePost: null,
  activeProfile: null,
  activePosts: [],
  activeBillboards: {},
  pageData: {},
  currentPage: 1,
  currentProfilePage: 1,
  totalProfilePages: 0,
  totalPages: 0,
  newerPage: null,
  olderPage: null
})
