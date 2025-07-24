import { useState } from 'react'
import reactLogo from './assets/react.svg'
<<<<<<< HEAD
import viteLogo from './assets/vite.svg'    // ← now a relative import!
=======
>>>>>>> 3735eaa (fix: import vite.svg from assets to unblock build)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Only the React logo now */}
      <div className="flex space-x-6 mb-6">
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-16" alt="React logo" />
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-4">Vite + React + Tailwind</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          count is {count}
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Edit <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">src/App.tsx</code> and save to test HMR
      </p>
    </div>
  )
}

export default App
