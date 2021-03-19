import './App.css';
import { MemberTag } from './components/MemberTag';
import { Member } from './models/member'

function App() {
  
  const members = [
    Member("Joseph Wheatley"),
    Member("Nicholas Shyne"),
    Member("Georgia Hill"),
    Member("Rupreet Rai", true, false),
    Member("Nicholas Mead", false, true),
  ]

  members.forEach((m, i) => {
    m.score = -2 + i;
  })

  return (
    <div class="App">
      {members.map((m, i) => 
        <MemberTag 
          name={m.name}
          selected={m.selected}
          highlighted={m.highlighted}
          style={{margin: "10px"}}
          score = {m.score}
          />
      )}
    </div>
  );
}

export default App;
