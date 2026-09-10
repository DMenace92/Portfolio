import { connect } from 'react-redux'
import ProjectView from '../Components/Admin/ProjectPage/ProjectView'
import { fetchProject, deleteProject } from '../Actions/ProjectAction'

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
    deleteProject: (id) => {
      dispatch(deleteProject(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView)
