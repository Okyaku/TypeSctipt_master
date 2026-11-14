// src/app/api/todos/route.ts
import { NextResponse } from "next/server";

// 仮のデータ保管場所（サーバー側のメモリ ※後でここをデータベースに置き換えます）
let todos = [
  { id: 1, title: "Next.jsのAPIを作る" },
  { id: 2, title: "fetchで通信する" },
];

// 1. GETリクエスト：TODO一覧をフロントエンドへ返す
export async function GET() {
  return NextResponse.json(todos);
}

// 2. POSTリクエスト：フロントエンドから送られたTODOを追加する
export async function POST(request: Request) {
  const body = await request.json(); // フロントから送られたJSONデータを取り出す
  
  const newTodo = {
    id: Date.now(), // 重複しない簡易的なID
    title: body.title,
  };
  
  todos.push(newTodo); // サーバー側の配列に追加
  
  return NextResponse.json(newTodo, { status: 201 });
}