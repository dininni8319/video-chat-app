import { useState, useCallback } from 'react'
import Lobby from './Lobby'
import Room from './Room'

const VideoChat = () => {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName ] = useState('')
  const [ token, setToken ] = useState(null)

  const [ error, setError ] = useState('') 
 
  const handleUsernameChange = useCallback((event) => {
    setUserName(event.target.value)
  }, [])

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value)
  },[])

  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    const response = await fetch(
      'http://localhost:5004/token',{
      method: "POST", 
      body: JSON.stringify({ identity: userName, room: roomName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jwt = await response.json()
    setToken(jwt.token)
  }, [userName, roomName])
  
  const handleLogout = useCallback(event => {
    setToken(null)
  },[])

  let render 
  if (token) {
    render = (
      <Room 
        roomName={roomName}
        token={token}
        handleLogout={handleLogout}
      />
    )
  } else {
    render = (
      <Lobby
         username={userName}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    )
  }
   
  return render
}

export default VideoChat