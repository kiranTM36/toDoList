
import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "./store/store"
import { addTask, getMytasks, updateComplete, updatePriority } from "./store/taskSlice"

interface createTask {
    title: string
    description: string
}

const Home = () => {
    const [data, setData] = useState<createTask>({
        title: "",
        description: "Do first"
    })

    const dispatch = useDispatch<AppDispatch>()
    const { tasks } = useSelector((state: RootState) => state.task)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleComplte = async (id: number) => {
        await dispatch(updateComplete(id))
        dispatch(getMytasks())
    }

    const handlePriority = async (id: number) => {
        await dispatch(updatePriority(id))
        dispatch(getMytasks())
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(addTask(data))
        dispatch(getMytasks())
        setData({
            title: "",
            description: "Do first"
        })
    }

    useEffect(() => {
        dispatch(getMytasks())
    }, [dispatch])

    console.log(tasks)

    return (
        <div className="bg-[#FFFFFF]">
            <div className="flex justify-center items-center mt-[20vh] flex-col">

                <form onSubmit={handleSubmit} className="w-[50vh] flex justify-center gap-3">
                    <input
                        onChange={handleChange}
                        value={data.title}
                        name="title"
                        type="text"
                        className="w-[20vw] border px-2 py-1 rounded-sm"
                    />
                    <button className="px-2 py-1 bg-black text-white rounded-sm">
                        send
                    </button>
                </form>

                <div className="mt-[10vh] w-[50vh]">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`w-full px-4 py-2 shadow-sm rounded-md flex justify-between items-center border border-gray-200 ${task.priority ? 'bg-amber-100' : ''}`}
                        >
                            <h1 className={`${task.complete ? 'line-through' : ''}`}>
                                {task.title}
                            </h1>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePriority(task.id)}
                                    className="bg-blue-500 text-white"
                                >
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                </button>

                                <button
                                    onClick={() => handleComplte(task.id)}
                                    className="bg-green-500 text-white"
                                >
                                    <i className="fa-solid fa-circle-check"></i>
                                </button>

                                <button className="bg-red-500 text-white">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Home
