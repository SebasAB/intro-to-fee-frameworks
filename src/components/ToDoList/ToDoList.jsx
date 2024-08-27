import PropTypes from 'prop-types'
import { useState } from 'react'

const ToDoList = ({
    tasks,
    setTasks,
    handleEdit,
    toggleTaskCompletion,
    completedTasks,
    setCompletedTasks,
    uncompleteTask
}) => {
    const [showCompleted, setShowCompleted] = useState(false)

    return (
        <div className="mb-6">
            <ul className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-white/30 text-teal-800 rounded-lg p-3 shadow-md hover:bg-white/40 transition"
                    >
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-teal-600"
                                checked={false} // Ensures the checkbox is unchecked by default
                                onChange={() => toggleTaskCompletion(index)}
                            />
                            <span className="font-medium">{task}</span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                onClick={() => handleEdit(index)}
                            >
                                Edit
                            </button>
                            <button
                                className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
                                onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {completedTasks.length > 0 && (
                <div className="mt-4">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="w-full text-left px-4 py-2 bg-gray-200 rounded-lg shadow-md focus:outline-none hover:bg-gray-300 transition"
                    >
                        {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
                    </button>

                    {showCompleted && (
                        <ul className="space-y-4 mt-4 custom-scrollbar">
                            {completedTasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-gray-200 text-gray-600 rounded-lg p-3 shadow-md opacity-75 transition"
                                >
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-teal-600"
                                            checked={true} // Ensures the checkbox is checked for completed tasks
                                            onChange={() => uncompleteTask(index)}
                                        />
                                        <span className="font-medium line-through">{task}</span>
                                    </div>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
                                        onClick={() => setCompletedTasks(completedTasks.filter((_, i) => i !== index))}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

ToDoList.propTypes = {
    tasks: PropTypes.array,
    setTasks: PropTypes.func,
    handleEdit: PropTypes.func,
    toggleTaskCompletion: PropTypes.func,
    completedTasks: PropTypes.array,
    setCompletedTasks: PropTypes.func,
    uncompleteTask: PropTypes.func
}

export default ToDoList
