import React, { useState } from "react"
import { Link } from "react-router-dom"

export interface userData {
    username : string
    email : string
    password : string
}

interface formData {
    name : string
    onEvent : (data : userData) => void 
}

const Form: React.FC<formData> = ({name , onEvent}) => {
    const [userData , setUserData] = useState({
        username : '',
        email : '',
        password : ""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target
        setUserData({
            ...userData , 
            [name] : value
        })

        console.log(name , value);
    }

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onEvent(userData)
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center">

        <form onSubmit={handleSubmit} className="h-[70vh] w-[30vw] border border-gray-200 rounded-2xl shadow flex justify-center items-center flex-col gap-5">
            <h1 className="text-2xl font-black">{name.toUpperCase()}</h1>

            {
                ! (name === "login") && (
                <div>
                    Name : <br />
                    <input onChange={handleChange} type="text" name="username" className="w-[20vw] border-gray-400 border px-2 py-1 rounded-sm" />
                </div>
                )
            }

            <div>
                Email : <br />
                <input onChange={handleChange} name="email" type="text" className="w-[20vw] border-gray-400 border px-2 py-1 rounded-sm" />
            </div>

            <div>
                Password : <br />
                <input type="text" onChange={handleChange} name="password" className="w-[20vw] border-gray-400 border px-2 py-1 rounded-sm" />
            </div>

            <div>
                {
                    (name === "sign up") ? ( <p className="text-[15px] font-medium">Already have an Account? <Link to='/login'><span className="text-blue-500">login</span></Link></p>) : (<p className="text-[15px] font-medium">create new Account? <Link to='/signup'><span className="text-blue-500">Sign up</span></Link></p>)
                }
            </div>

            <button className="bg-black px-2 py-1 text-white rounded-md">{name}</button>
        </form>

    </div>
  )
}

export default Form