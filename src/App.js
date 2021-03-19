import './App.css';
import React from 'react';

import { MemberControl } from './components/MemberControl';
import { MemberTag } from './components/MemberTag';
import { Member } from './models/member'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MemberInput } from './components/MemberInput';
import reactDom from 'react-dom';
import { ThemeButton } from './components/ThemeButton';

function App() {
  
  const [members, setMembers] = React.useState([ ]);

  const [newMemberName, setNewMemberName] = React.useState("");

  const [chromaKey, setChromaKey] = React.useState(false);

  const [pickCountdown, setPickCountdown] = React.useState(-1);
  const [pickIndex, setPickIndex] = React.useState(-1);

  React.useEffect(() => {
    if(pickCountdown < 0)
    {
      return;
    }
    
    if(pickCountdown === 0)
    {
      setPickIndex(pickIndex % members.length);
      setPickCountdown(pickCountdown - 1);
      registerPick(pickIndex % members.length);
      return;
    }

    var timeout = setTimeout(() => {
      setPickCountdown(pickCountdown - 1);
      setPickIndex(i => i + 1);
    }, 50 + (1450 / pickCountdown));

    return () => clearTimeout(timeout);
  }, [pickCountdown, pickIndex]);

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

  const randomInt = (min, max) => 
  {
    return min + Math.floor(Math.random() * max);
  }

  const pickRandom = () => {
    const pick = randomInt(0, members.length);
    pickMember(pick);
  }

  const pickFair = () => {
    const selectedArr = members.map(m => m.selectedCount)
    const minSelect = Math.min(...selectedArr);
    let pick = null;

    do{
      pick = randomInt(0, members.length);
    }while(members[pick].selectedCount != minSelect);

    pickMember(pick);
  }

  const pickMember = (index) => {
    const pick = index + members.length * 3 + 2; // +2 because it stards at -1 and the final countdown selects not progresses
    
    setPickIndex(-1);
    setPickCountdown(pick);
  } 

  const clearPick = () => {
    setPickIndex(-1);
    setPickCountdown(-1);
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

  const registerPick = (index) => {
    if(index < 0 || index >= members.length)
      return;

    const copy = [...members];
    copy[index].selectedCount++;
    
    setMembers(copy);
  }

  const selected = pickIndex % members.length;
  const final = pickCountdown < 0;

  return (
    <div class="App" style={{backgroundColor: chromaKey ? "#00ff00" : "#282c34"}}>
      <div class="actions" style={{margin: 10}}>
        <div class="btn btn-primary mr-2" onClick={pickRandom}>Pick Random</div>
        <div class="btn btn-primary mr-2" onClick={pickFair}>Pick Fair</div>
        <div class="btn btn-warning mr-2" onClick={clearPick}>Clear</div>
        <div class="btn btn-info" onClick={() => setChromaKey(k => !k)}>{chromaKey ? "Disable Chroma" : "Enable Chroma"}</div>
      </div>
      <div class="members-board" style={{margin: 10, marginTop: 30}}>
        {members.map((m, i) => 
          <div
          key={`member-${m.id}`}
          class="member-row"
          style={{marginTop: "10px"}}
          >
            <MemberTag 
              name={m.name}
              selected={selected === i && final}
              highlighted={selected === i && !final}
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
            <MemberControl onClick={() => pickMember(i)}>
              <FontAwesomeIcon icon="check" />
            </MemberControl>
            <MemberControl noSelect>
              {m.selectedCount}
            </MemberControl>
            <MemberControl onClick={() => removeMember(i)}>
              <FontAwesomeIcon icon="user-minus" />
            </MemberControl>
          </div>
        )}
      </div>
      <div class="members-new" style={{margin: 10, marginTop: 30}}>
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
