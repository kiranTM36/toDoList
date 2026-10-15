import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import { useEffect } from "react"
import { getUser } from "../store/userSlice"
import { Link } from "react-router-dom"

const User = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { users } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  console.log(users);
  

  return (
    <div className="flex justify-center items-center mt-[5vh] flex-col gap-5">
      <h1 className="font-medium text-4xl">List of Users</h1>

      <table className="border border-collapse border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">SN.</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((person, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">
                {index + 1}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <Link to={`/${person.id}`}>{person.username}</Link>
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {person.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User