import './App.css';

import Typography from './Components/TypographyProto'
import DateInput from './Components/JsInputAdapter'

function App() {

  return (
    <div className="App">
      <Typography fontFamily="monospace" fontSize='20px'>This is standard typography text</Typography>
      <DateInput format={'iso'}/>
      <DateInput/>
    </div>
  );
}

export default App;
