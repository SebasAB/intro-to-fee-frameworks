import { useState } from 'react'
import ToDoForm from "../ToDoForm/ToDoForm"
import ToDoList from "../ToDoList/ToDoList"

const ToDoContainer = () => {
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [editingTask, setEditingTask] = useState(null)
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null)

    const handleEdit = (index) => {
        setEditingTask(tasks[index])
        setCurrentTaskIndex(index)
    }

    const saveTask = (task) => {
        const updatedTasks = tasks.map((t, index) =>
            index === currentTaskIndex ? task : t
        )
        setTasks(updatedTasks)
        setEditingTask(null)
        setCurrentTaskIndex(null)
    }

    const cancelEdit = () => {
        setEditingTask(null)
        setCurrentTaskIndex(null)
    }

    const toggleTaskCompletion = (index) => {
        const taskToComplete = tasks.splice(index, 1)[0]
        setTasks([...tasks])
        setCompletedTasks([...completedTasks, taskToComplete])
    }

    const uncompleteTask = (index) => {
        const taskToUncomplete = completedTasks.splice(index, 1)[0]
        setCompletedTasks([...completedTasks])
        setTasks([...tasks, taskToUncomplete])
    }

    return (
        <div className='container mx-auto flex justify-center items-center min-h-screen p-4'>
            <div className='w-full max-w-md bg-white/80 p-6 rounded-lg shadow-2xl'>
                <ToDoList
                    tasks={tasks}
                    setTasks={setTasks}
                    handleEdit={handleEdit}
                    toggleTaskCompletion={toggleTaskCompletion}
                    completedTasks={completedTasks}
                    setCompletedTasks={setCompletedTasks}
                    uncompleteTask={uncompleteTask}
                />
                <ToDoForm
                    tasks={tasks}
                    setTasks={setTasks}
                    editingTask={editingTask}
                    saveTask={saveTask}
                    cancelEdit={cancelEdit}
                />
            </div>
        </div>
    )
}

export default ToDoContainer





// import ToDoForm from "../ToDoForm/ToDoForm"
// import ToDoList from "../ToDoList/ToDoList"
