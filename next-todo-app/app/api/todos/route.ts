import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// GET: TODO一覧の取得
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

// POST: TODOの作成
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { title } = json

    const todo = await prisma.todo.create({
      data: {
        title,
      },
    })
    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}