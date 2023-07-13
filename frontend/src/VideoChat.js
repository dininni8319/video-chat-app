import { useState, useEffect, useCallback, useRef } from 'react'
import StartForm from './startForm/startForm'
import Room from './Room'
import Loader from './loader'
import errorImg from './assets/404.png'

const VideoChat = () => {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName ] = useState('')
  const [ token, setToken ] = useState(null)
  const [ error, setError ] = useState(false) 
  const [ loading, setLoading ] = useState(false)
  const [ isMobile, setIsMobile ] = useState(false)
  
  let appRef = useRef()

  const handleUsernameChange = useCallback((event) => {
    setUserName(event.target.value)
  }, [])

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value)
  },[])

  const handleSubmit = useCallback(async event => {
    event.preventDefault()
    setLoading(true) 
    const response = await fetch(
      'http://localhost:5004/token',{
      method: "POST", 
      body: JSON.stringify({ identity: userName, room: roomName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      setError(true)
      return
    }  

    const jwt = await response.json()
    setToken(jwt.token)
    setLoading(false)
  }, [userName, roomName])
  
  const handleLogout = useCallback(event => {
    setToken(null)
  },[])

  useEffect(() => {
    if (appRef.current.offsetWidth <= 1360) {
      setIsMobile(true);
    }
  }, [])
  

  let render 
  if (error) {
    render = (  
      <div className='error'>
        <img src={errorImg} alt='404 Error' />
      </div> 
    )
  } else if (!token && loading) {
    render = <Loader type="Connecting" />
  }
   else if (token) {
    render = (
      <Room 
        roomName={roomName}
        token={token}
        handleLogout={handleLogout}
        isMobile={isMobile}
      />
    )
  } else {
    render = (
      <StartForm
         username={userName}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    )
  }
  return (
    <div className='app' ref={appRef}>
      {render}
    </div>
  )
}

export default VideoChat