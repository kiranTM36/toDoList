import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import { logout } from "../store/userSlice"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.user)

  const handleLogout = async () => {
    const success = await dispatch(logout())

    if (success) {
      navigate("/login")
    }
  }

  console.log(user);
  

  return (
    <nav className="h-[7vh] w-full bg-black fixed top-0 left-0 flex justify-between items-center px-4 z-50">
      <h1 className="text-white font-medium text-4xl">
        To-Do-List
      </h1>

      <div className="flex gap-5">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navLink ${isActive ? "navActivate" : ""}`
          }
        >
          Home
        </NavLink>

          <NavLink
            to="/user"
            className={({ isActive }) =>
              `navLink ${isActive ? "navActivate" : ""}`
            }
          >
            Users
          </NavLink>
        
      </div>

      <div className="flex gap-3">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-white border border-white px-3 py-1 rounded-md"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/signup")}
              className="text-white border border-white px-3 py-1 rounded-md"
            >
              Sign up
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-white border border-white px-3 py-1 rounded-md"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar