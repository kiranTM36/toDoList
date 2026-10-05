import { useDispatch } from 'react-redux'
import Form, { type userData } from './Form'
import { type AppDispatch } from '../store/store'
import { login } from '../store/userSlice'

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = async(data : userData ) => {
        const success = await dispatch(login(data))

        if(success){
            alert('Login Successful')
        }else{
            alert('Login unSuccessful')
        }
    }
  return (
    <Form name='login' onEvent={handleLogin}/>
  )
}

export default Login