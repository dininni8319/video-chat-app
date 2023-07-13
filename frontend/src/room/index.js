import { useState, useEffect } from 'react'
import Video from 'twilio-video'
import Participant from '../participant'
import ParticipantList from '../participantList'
import './style.scss'
import Loader from '../loader'
import Menu from '../menu/menu'

const Room = ({
  roomName,
  token,
  handleLogout,
  setReconnection,
  isMobile,
  setToken
}) => {

  const [roomWidth, setRoomWidth] = useState(false);// Is true when the participant list is opened and adds 400px margin right to the room class
  const [room, setRoom] = useState(null)
  const [participants, setParticipants] = useState([]);
  const [toggleAudio, setToggleAudio] = useState(true);// Is true when local participant's mic is on
  const [toggleVideo, setToggleVideo] = useState(true);// Is true when local participant's mic is off
  const [toggleParticipantsList, setParticipantsList] = useState(false);  //Is true when participant's list menu button is pressed and thus the menu slides open
  const [toggleMenu, setToggleMenu] = useState(false);  // Is true when move moves or hover over the menu component and the menu appears
  const [toggleFullScreen, setFullScreen] = useState(false) //Is true when a local participant pins a remote participants video thus making it fullscreen

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room?.participants.forEach(participantConnected);
      room.once('disconnected', (room, error) => {
        if (error) {
          console.log('You were disconnected from the Room:', error.code, error.message);
          setReconnection(true);
        }
      });

    }).catch(error => {
      if ('code' in error) {
        console.error(`Fail to join Room, error code: ${error.code}, error message: ${error.message}`)
      }
    })
    
    return () => setRoom(currentRoom => {
      if (currentRoom && currentRoom?.localParticipant?.state === 'connected') {
        currentRoom?.localParticipant?.tracks.forEach(function (trackPublication) {
          trackPublication.track.stop();
        });
        currentRoom.disconnect();
        return null;
      } else {
        return currentRoom;
      }
    });
  }, [roomName, token, setReconnection])

  const handleCallDisconnect = () => {
    room.disconnect()
    setToken(null)
  }

  // Function to disable or enable the local participant's audio
  const handleAudioToggle = () => {
    room?.localParticipant?.audioTracks?.forEach(track => {
      if (track.track.isEnabled) {
        track.track.disable();
      } else {
        track.track.enable();
      }
      setToggleAudio(track.track.isEnabled);
    });
  };

  // Function to disable or enable the local participant's audio
  const handleVideoToggle = () => {
    room?.localParticipant?.videoTracks?.forEach(track => {
      if (track?.track.isEnabled) {
        track?.track.disable();
      } else {
        track?.track.enable();
      }
      setToggleVideo(track?.track?.isEnabled);
    });
  };

  // Function the open or close the participant list component
  const handleParticipantListToggle = () => {
    setParticipantsList((prevState) => !prevState);
    if (!isMobile) {
      setRoomWidth(!roomWidth);
    }
  }

  // Function to open and close the menu when the mouse moves 
  const handleMenuOpen = () => {
    setToggleMenu(true);
    setTimeout(
      () => setToggleMenu(false),
      3000
    );
  }

  // Function to make a participant's video full screen
  const handleFullScreen = (event) => {
    setFullScreen(prevState => !prevState);
    if (toggleFullScreen) {
      event.target.parentElement.style.position = "absolute";
      event.target.parentElement.style.zIndex = "3"
    }
    else {
      event.target.parentElement.style.position = "relative";
      event.target.parentElement.style.zIndex = "1"
    }
  }

  const remoteParticipants = participants?.map(
    participant => (
      <Participant
        key={participant.sid}
        participant={participant.identity}
        toggleFullScreen={toggleFullScreen}
        handleFullScreen={handleFullScreen}
      />
  ))

  let style;

  if (roomWidth) {
    style = { marginRight: "400px" }
  }

  return (
    <div className="room" onMouseMove={handleMenuOpen} style={style} >
      <h2>Room: {roomName}</h2>
      <div className="local-participant">
        {room ? (
          <>
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
          <ParticipantList key={participants.sid} participants={participants} toggleParticipantsList={toggleParticipantsList}/>
          <Menu
            handleAudioToggle={handleAudioToggle}
            handleVideoToggle={handleVideoToggle}
            handleCallDisconnect={handleCallDisconnect}
            handleParticipantListToggle={handleParticipantListToggle}
            toggleMenu={toggleMenu}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            style={style}
          />
          </>
        ) : <Loader type='Connecting' />}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  )
}

export default Room