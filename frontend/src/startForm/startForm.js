import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './startForm.scss';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 4,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textDecoration: 'white',
    width: "300px",
    color: "white",
  },
  buttonStyle: {
    width: "300px",
    margin: "15px",
    color: "white",
    "&:hover": {
      backgroundColor: "solid",
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }
  },
  input: {
    color: "white"
  },
});

const StartForm = ({
  username,
  roomName,
  handleUsernameChange,
  handleRoomNameChange,
  handleSubmit,
}) => {

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className='startForm'>
      <TextField
        label="Name"
        id='name'
        name='name'
        variant="filled"
        margin="normal"
        className={classes.root}
        InputProps={{
          className: classes.input
        }}
        value={username}
        onChange={handleUsernameChange}
        InputLabelProps={{ className: "startForm__label" }}
      />

      <TextField
        label="Room Code"
        variant="filled"
        margin="normal"
        id='room'
        name='room'
        className={classes.root}
        InputProps={{
          className: classes.input
        }}
        value={roomName}
        onChange={handleRoomNameChange}
        InputLabelProps={{ className: "startForm__label" }}
      />

      <Button
        type="submit"
        className={classes.buttonStyle}
      > Join Room
      </Button>
    </form>
  )
}

export default StartForm
