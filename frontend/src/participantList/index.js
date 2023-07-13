import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Scrollbars } from 'react-custom-scrollbars';
import './style.scss';


const  ParticipantList = ({ participants, toggleParticipantsList }) => {
  let participantListClass = 'participantList';

  if (toggleParticipantsList) {
    participantListClass = 'participantList open';
  }

  let participantList = participants?.map(participant =>
    <div key={participant.sid} className="participantList__participant" >
      <AccountCircleIcon className="participantList__participant__icon" />
      <div>
        <p className="participantList__participant__name">{participant.identity}</p>
        <p className="participantList__participant__role">Participant</p>
      </div>
    </div>
    )

  return (<div className={participantListClass}>
    <h3 className="participantList__title">Participants</h3>
    <Scrollbars style={{ width: "100%", height: "100%" }}>
      {participantList}
    </Scrollbars>
  </div>
  );
}

export default ParticipantList;