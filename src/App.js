import './App.css';
import React from 'react';

import { MemberControl } from './components/MemberControl';
import { MemberTag } from './components/MemberTag';
import { Member } from './models/member'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MemberInput } from './components/MemberInput';

function App() {
  
  const [members, setMembers] = React.useState(
  [
    Member("Joseph Wheatley"),
    Member("Nicholas Shyne"),
    Member("Georgia Hill"),
    Member("Rupreet Rai"),
    Member("Nicholas Mead"),
  ]);

  const [newMemberName, setNewMemberName] = React.useState("");

  const changeMemberScore = (index, change) => {
    const copy = [...members];

    if(index < 0 || index >= copy.length)
      return;

    copy[index].score = copy[index].score + change;

    setMembers(copy);
  }

  const moveMemberPosition = (index, change) => {
    const copy = [...members];

    if(index >= copy.length || index >= copy.length || index + change >= copy.length || index + change < 0)
      return;

    const tempMember = {...copy[index + change]};
    copy[index + change] = {...copy[index]};
    copy[index] = tempMember;

    setMembers(copy);
  }

  const removeMember = (index) => {
    const copy = [...members];

    if(index < 0 || index >= copy.length)
      return;

    setMembers(copy.filter((_, i) => i != index));
  }

  const addMember = () => {
    if(!newMemberName)
      return;

    const unique = members.reduce(
      (unique, current) => unique && current.name !== newMemberName, 
      true);

    if(!unique)
      return;

    setMembers([...members, Member(newMemberName)]);
    clearNewMember();
  }

  const clearNewMember = () => setNewMemberName("");

  return (
    <div class="App">
      <div class="members-board">
        {members.map((m, i) => 
          <div
          key={m.name}
          class="member-row"
          style={{margin: "10px"}}
          >
            <MemberTag 
              name={m.name}
              selected={m.selected}
              highlighted={m.highlighted}
              score = {m.score}
              />
            <MemberControl 
              style={{marginLeft: "20px"}}
              onClick={() => changeMemberScore(i, 1)}
              >
                  🍪
            </MemberControl>
            <MemberControl
              onClick={() => changeMemberScore(i, -1)}
              >
              💩
            </MemberControl>
            { i > 0 ? 
              <MemberControl
              onClick={() => moveMemberPosition(i, -1)}
              >
                <FontAwesomeIcon icon="angle-up" />
              </MemberControl>
              : 
              <MemberControl noSelect/>
            }
            {i < members.length - 1 ?
              <MemberControl
              onClick={() => moveMemberPosition(i, 1)}
              >
                <FontAwesomeIcon icon="angle-down" />
              </MemberControl>
              : 
              <MemberControl noSelect/>
            }
            <MemberControl onClick={() => removeMember(i)}>
              <FontAwesomeIcon icon="user-minus" />
            </MemberControl>
          </div>
        )}
      </div>
      <div class="members-new" style={{margin: 10, marginTop: 50}}>
        <div class="member-row">
          <MemberInput 
            onChange={setNewMemberName}
            value={newMemberName} 
          />
          <MemberControl 
              style={{marginLeft: "20px"}}
              onClick={addMember}
              >
                  <FontAwesomeIcon icon="user-plus" />
            </MemberControl>
            <MemberControl 
              onClick={clearNewMember}
              >
                  <FontAwesomeIcon icon="ban" />
            </MemberControl>
        </div>
      </div>
    </div>
  );
}

export default App;
