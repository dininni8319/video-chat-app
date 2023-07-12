const Lobby = ({
  username,
  roomName,
  handleUsernameChange,
  handleRoomNameChange,
  handleSubmit,
}) => {
  return ( 
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <br />
        <br />
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <br />
        <br />
      </div>
      <div>
        <label htmlFor="room">Room name:</label>
        <br />
        <br />
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
        <br />
        <br />
      </div>
        <br />
      <button type="submit">Submit</button>
      <br />
      <br />
    </form>
   );
}
 
export default Lobby;