import Image from 'next/image'
import { Button } from "@/app/components/ui/button"
import Todo from "@/app/components/todo/todo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Todo></Todo>
    </main>
  )
}
