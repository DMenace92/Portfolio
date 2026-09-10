import { connect } from 'react-redux'
import Project from '../Content/Projects'
import { fetchProject } from '../Actions/ProjectAction'

const mapStateToProps = ({ pro }) => {
  return {
    pro: pro.pro,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProject: (pro) => {
      dispatch(fetchProject(pro))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
