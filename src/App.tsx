import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg' // ✅ relative path fix

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="flex space-x-6 mb-6">
        {/* Vite logo */}
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-16" alt="Vite logo" />
        </a>

        {/* React logo */}
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-16" alt="React logo" />
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-4">Vite + React + Tailwind</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setCount(count + 1)}
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
