class Engine2 {
  analogIgnition() {
    console.log("Engine is working")
  }
}

class EngineV8 {
  digitIgnition() {
    console.log("Engine V8 is working")
  }
}

class EngineV8Adapter { // Адаптер
  constructor(engine) {
    this.engine = engine
  }

  analogIgnition() {
    this.engine.digitIgnition()
  }
}

class Auto {
  startEngine(engine) {
    engine.analogIgnition()
  }
}

// Standard
// const myCar = new Auto()
// const oldE = new Engine2()
// myCar.startEngine(oldE)

// V8
const myCar2 = new Auto()
const newE = new EngineV8()

try { // у класса EngineV8 нет метода simpleI
  myCar2.startEngine(newE)
} catch (e){
  console.log(e)
}

// V8 Adapter
const myCar3 = new Auto()
const newEA = new EngineV8Adapter(new EngineV8())
myCar3.startEngine(newEA)


