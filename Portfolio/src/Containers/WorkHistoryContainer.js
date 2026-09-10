import { connect } from 'react-redux'
import WorkHistoryManager from '../Components/Admin/WorkHistory/WorkHistoryManager'
import {
  fetchWorkHistory,
  createWorkHistory,
  updateWorkHistory,
  deleteWorkHistory,
} from '../Actions/WorkHistoryAction'

const mapStateToProps = ({ workHistory }) => ({
  entries: workHistory.entries,
  loading: workHistory.loading,
  error: workHistory.error,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWorkHistory: () => dispatch(fetchWorkHistory()),
  createWorkHistory: (entry) => dispatch(createWorkHistory(entry)),
  updateWorkHistory: (id, entry) => dispatch(updateWorkHistory(id, entry)),
  deleteWorkHistory: (id) => dispatch(deleteWorkHistory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkHistoryManager)
