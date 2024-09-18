import './App.css'
import TodoList from './components/ToDoContainer/ToDoContainer'

function App() {

  return (
    <>
      <main className='h-screen m-auto flex justify-center items-center bg-gradient-to-r from-green-300 via-teal-400 to-blue-500'>
        <TodoList />
      </main>
    </>
  )
}

export default App
