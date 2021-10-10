import {useState} from 'react'

function Slide(id, name, url, addOns) {
  const [removeSlide] = addOns
  return <img key={id} src={url} alt={name} onClick={removeSlide}/>
}

function BgSlide(id, name, url, addOns) {
  const [removeSlide, removeLastSlider] = addOns
  return <div key={id} style={{width: '200px', height: "200px", background: `url(${url})`}} onClick={removeSlide}>
    {name}
    <div onClick={e => e.stopPropagation()}>
      <span onClick={removeLastSlider}>X</span>
    </div>
  </div>
}

function Avatar(id, name, url, removeSlide) {
  return <img key={id} src={url} alt={name} onClick={removeSlide} style={{borderRadius: '50%'}}/>
}

export function SliderFactory () {
  const [slides, setSlides] = useState([])

  this.removeSlider = function(id) {
    setSlides(prevSliders => prevSliders.filter(f => f.key != id))
  }

  this.removeLastSlider = function() {
    setSlides(prevSliders => prevSliders.slice(0, -1))
  }

  this.getSlides = function() {
    return slides
  }

  this.concatAddons = function(itemId) {
    return [() => this.removeSlider(itemId), this.removeLastSlider]
  }

  this.addSlide = function(data) {
    setSlides(prevSliders => [...prevSliders, Slide(...data, this.concatAddons(data[0]))])
  }

  this.addBGSlide = function(data) {
    setSlides(prevSliders => [...prevSliders, BgSlide(...data, this.concatAddons(data[0]))])
  }
}

const Slider = ({addSlider, addBGSlide}) => {
  const sliderFactory = new SliderFactory()

  return (
    <section>
      {sliderFactory.getSlides()}
      {addSlider && <button
        onClick={() => {
          sliderFactory.addSlide(addSlider())
        }}
      >
        Add default slide
      </button>}
      {addBGSlide && <button
        onClick={() => {
          sliderFactory.addBGSlide(addBGSlide())
        }}
      >
        Add BG slide
      </button>}
    </section>
  )
}


export default Slider