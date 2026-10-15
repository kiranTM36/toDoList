import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { type AppDispatch, type RootState } from "../store/store"
import { useEffect } from "react"
import { getOthertasks } from "../store/taskSlice"

const Singleuser = () => {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    
    const {tasks} = useSelector((state:RootState) => state.task)
    
    useEffect(() => {
        if(id){
            dispatch((getOthertasks(Number(id))))
        }
    }, [dispatch , id])

    console.log(tasks);
    
  return (
    <div>

        <h1>{tasks[0]?.username} Tasks</h1>

        <table className="border border-collapse border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">SN.</th>
            <th className="border border-gray-400 px-4 py-2">title</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">
                {index + 1}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <Link to={`/${task.id}`}>{task.title}</Link>
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {task.description
}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Singleuser