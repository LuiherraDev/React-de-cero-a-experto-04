import { MySubTitle } from "./ui/MySubTitle"
import { MyTitle } from "./ui/MyTitle"
import { useState } from "react"

export const MemoHook = () => {
  const [title, setTitle] = useState('Hola')
  const [subTitle, setSubTitle] = useState('Mundo')

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl fonr-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubTitle subtitle={subTitle} />

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle('Hello, ' + new Date().getTime())}
      >
        Cambiar Titulo
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        // onClick={() => setSubTitle('Worl, ' + new Date().getTime())}
        onClick={() => setSubTitle('World')}
      >
        Cambiar Subtitulo
      </button>


    </div>
  )
}
