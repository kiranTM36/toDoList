import { useDispatch } from 'react-redux'
import { signUp } from '../store/userSlice'
import Form, { type userData } from './Form'
import { type AppDispatch } from '../store/store'

const Signup = () => {
    const dispatch = useDispatch<AppDispatch>() 
    const handleSignup= async(data : userData) => {
      const success = await dispatch(signUp(data))
      if(success){
        alert("Registerd Successful")
      }else{
        alert("Registerd unSuccessful")
      }
    }
  return (
    <Form name='sign up' onEvent={handleSignup}  />
  )
}

export default Signup