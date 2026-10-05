import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './Home'
import Signup from './auth/Signup'
import Login from './auth/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App