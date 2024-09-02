import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext'; // Import AuthContext to use the logout function
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoList from "../ToDoList/ToDoList";

const ToDoContainer = () => {
    const { logout } = useContext(AuthContext); // Get the logout function from AuthContext

    const [tasks, setTasks] = useState(() => {
        // Retrieve tasks from localStorage or initialize to an empty array
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [completedTasks, setCompletedTasks] = useState(() => {
        // Retrieve completed tasks from localStorage or initialize to an empty array
        const savedCompletedTasks = localStorage.getItem('completedTasks');
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });

    const [editingTask, setEditingTask] = useState(null);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    useEffect(() => {
        // Save tasks to localStorage whenever they are updated
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        // Save completed tasks to localStorage whenever they are updated
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    const handleEdit = (index) => {
        setEditingTask(tasks[index]);
        setCurrentTaskIndex(index);
    };

    const saveTask = (task) => {
        const updatedTasks = tasks.map((t, index) =>
            index === currentTaskIndex ? task : t
        );
        setTasks(updatedTasks);
        setEditingTask(null);
        setCurrentTaskIndex(null);
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setCurrentTaskIndex(null);
    };

    const toggleTaskCompletion = (index) => {
        const taskToComplete = tasks.splice(index, 1)[0];
        setTasks([...tasks]);
        setCompletedTasks([...completedTasks, taskToComplete]);
    };

    const uncompleteTask = (index) => {
        const taskToUncomplete = completedTasks.splice(index, 1)[0];
        setCompletedTasks([...completedTasks]);
        setTasks([...tasks, taskToUncomplete]);
    };

    const handleLogout = () => {
        logout(); // Call the logout function
        window.location.href = '/login'; // Redirect to the login page
    };

    return (
        <div className='container mx-auto flex justify-center items-center min-h-screen p-4'>
            <div className='w-full max-w-md bg-white/80 p-6 rounded-lg shadow-2xl'>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-teal-700">My To-Do List</h1>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Logout
                    </button>
                </div>
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
    );
};

export default ToDoContainer;
