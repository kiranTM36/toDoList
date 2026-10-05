import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "./store/store"
import { getUser } from "./store/userSlice"
import { getAlltasks } from "./store/taskSlice"

const Home = () => {
    const [task, setTask] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value)
    }

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTask('')
            console.log(task)
        }
    }

    const [priority , setPriority] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { tasks } = useSelector((state: RootState) => state.task)

    useEffect(() => {
        dispatch(getUser())
        dispatch(getAlltasks())
    }, [dispatch])

    console.log(tasks);

    return (
        <div className="bg-[#FFFFFF]">
            <Navbar />
            <div className="flex justify-center items-center mt-[20vh] flex-col">

                <div className="w-[50vh] flex justify-center gap-3">
                    <input onChange={handleChange} value={task} onKeyDown={handleKeydown} type="text" className="w-[20vw] border px-2 py-1 rounded-sm" />
                    <button className="px-2 py-1 bg-black text-white rounded-sm">send</button>
                </div>

                <div className="mt-[10vh] w-[50vh]">
                    {
                        tasks.map((task) => (
                            <div key={task.id} className={`w-full px-4 py-2 shadow-sm rounded-md flex justify-between items-center border border-gray-200 ${priority ? 'bg-amber-300' : 'bg-white'}`}>
                                <h1>{task.title}</h1>
                                <div className="flex gap-2">
                                    <button onClick={()=> setPriority((priority) => !priority)} className="bg-blue-500 text-white"><i className="fa-solid fa-circle-exclamation"></i></button>
                                    <button className="bg-green-500 text-white"><i className="fa-solid fa-circle-check"></i></button>
                                    <button className="bg-red-500 text-white"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Home