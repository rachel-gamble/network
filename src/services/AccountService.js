import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async editAccount(editing) {
    try {
      const res = await api.put('/account', editing)
      AppState.account = res.data
    } catch (error) {
      logger.error('Could not edit account', err)
    }
  }
}

export const accountService = new AccountService()
