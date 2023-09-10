import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'

function Emoji() {
    const [text,settext]=useState("")
    console.log(text)
  return (
    <Picker data={data} onEmojiSelect={settext} />
  )
}
export default Emoji