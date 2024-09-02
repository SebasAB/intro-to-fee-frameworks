import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const ToDoForm = ({ tasks, setTasks, editingTask, saveTask, cancelEdit }) => {
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    if (editingTask !== null) {
      setTaskInput(editingTask)
    }
  }, [editingTask])

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (editingTask !== null) {
      saveTask(taskInput)
    } else {
      setTasks([...tasks, taskInput])
    }

    setTaskInput('')
  }

  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold text-teal-700 mb-2" htmlFor="task">
            {editingTask !== null ? 'Edit your task...' : 'Enter a task...'}
          </label>
          <input
            type="text"
            id="task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-teal-800 placeholder-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
            placeholder="Enter a task..."
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className={`px-6 py-2 font-semibold rounded-lg focus:outline-none transition transform hover:scale-105 shadow-md ${editingTask !== null ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-teal-600 hover:bg-teal-700'
              } text-white`}
          >
            {editingTask !== null ? 'Edit Task' : 'Add Task'}
          </button>
          {editingTask !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-400 focus:outline-none transition transform hover:scale-105 shadow-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

ToDoForm.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  editingTask: PropTypes.string,
  saveTask: PropTypes.func,
  cancelEdit: PropTypes.func
}

export default ToDoForm
