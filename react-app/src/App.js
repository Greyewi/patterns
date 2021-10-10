import './App.css';

import Slider from './Components/Slider'
import FormGenerator from './Components/FormGenerator'

function App() {

  return (
    <div className="App">
      <Slider
        addSlider={() => {
          const data = [
            Math.floor(Math.random() * 99999),
            "newSlide",
            "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg"
          ]
          return (data)
        }}
        addBGSlide={() => {
          const data = [
            Math.floor(Math.random() * 99999),
            "newBGSlide",
            "https://images2.boardingschoolreview.com/photo/1122x864/1000/593/img-academy-bo8wmxb.jpg"
          ]
          return (data)
        }}
      />

      <FormGenerator/>
    </div>
  );
}

export default App;
