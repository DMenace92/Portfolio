import { combineReducers } from 'redux'
import EmailReducers from './EmailReducers'
import PageCountReducers from './PageCountReducers'
import Projectreducers from './ProjectReducers'
import LoginReducers from './LoginReducers'
import WorkHistoryReducers from './WorkHistoryReducers'
const rootReducers = combineReducers({
  email: EmailReducers,
  currentPage: PageCountReducers,
  pro: Projectreducers,
  log: LoginReducers,
  workHistory: WorkHistoryReducers,
})

export default rootReducers
