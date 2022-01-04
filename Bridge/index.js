class Model {
  constructor(color) {
    this.color = color
  }
}

class Color { // bridge
  constructor(type) {
    this.type = type
  }
  get() {
    return this.type
  }
}

class BlackColor extends Color { // realization
  constructor() {
    super('#111');
  }
}

class GreyColor extends Color { // realization
  constructor() {
    super('#888');
  }
}

class WhiteColor extends Color { // realization
  constructor() {
    super('#fff');
  }
}

class Input extends Model { // abstraction
  constructor(color) {
    super(color)
  }

  view() {
    console.log(`this is input with ${this.color.get()} color`) // делегирование на класс color
  }
}

class Textarea extends Model { // abstraction
  constructor(color) {
    super(color)
  }

  view() {
    console.log(`this is textarea with ${this.color.get()} color`) // делегирование на класс color
  }
}

// realization

const blackTextarea = new Textarea(new BlackColor())
blackTextarea.view()