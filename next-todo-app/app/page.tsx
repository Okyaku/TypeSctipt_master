'use client'

import { useState, useEffect } from 'react'

type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  // TODO一覧を取得する関数
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      console.error('Failed to fetch todos', err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // TODOを追加する関数
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (res.ok) {
        setTitle('')
        fetchTodos()
      }
    } catch (err) {
      console.error('Failed to add todo', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">TODO App</h1>

      {/* 追加フォーム */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTODOを入力..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '追加中...' : '追加'}
        </button>
      </form>

      {/* TODOリスト一覧 */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 border rounded-md"
          >
            <span className="text-gray-800">{todo.title}</span>
            <span className="text-xs text-gray-400">
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">TODOがまだありません</p>
        )}
      </ul>
    </main>
  )
}