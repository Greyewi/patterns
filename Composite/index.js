class Element {
  getType() {
    return this.type || 'text'
  }

  getName() {
    return this.name
  }

  getValue() {
    return this.value
  }

  getHeight() {
    return this.height || 0
  }

  setType(type) {
    this.type = type
  }

  setName(name){
    this.name = name
  }

  setValue(value) {
    this.value = value
  }

  setHeight(height) {
    this.height = height
  }
}

class PasswordInput extends Element {
  constructor(label, name, height) {
    super();
    this.setName(name)
    this.setType('password')
    this.setValue(label)
    this.setHeight(height)
  }
}

class NumberInput extends Element {
  constructor() {
    super();
    this.setName('age')
    this.setType('number')
    this.setValue('How old are you?')
    this.setHeight(40)
  }
}

class EmailInput extends Element {
  constructor() {
    super();
    this.setName('email')
    this.setType('email')
    this.setValue('Enter your email')
    this.setHeight(50)
  }
}

class Composite extends Element {
  constructor() {
    super();
    this.elements = []
  }

  add(element) {
    this.elements = [...this.elements, element]
  }

  remove(name) {
    this.elements = this.elements.filter(elem => elem.name !== name)
  }

  getFullHeight() {
    return this.elements.map(elem => elem.getHeight()).reduce((a,b) => a + b)
  }
}

class SignUpForm extends Composite {
  constructor() {
    super();
    this.setName('registry form')
  }
}

class SignInForm extends Composite {
  constructor() {
    super();
    this.setName('login form')
  }
}

const myUpForm = new SignUpForm()
myUpForm.add(new NumberInput());
myUpForm.add(new EmailInput());
myUpForm.add(new PasswordInput('enter pass', 'pass', 20));
myUpForm.add(new PasswordInput('enter pass again', 'pass', 30));

const myInForm = new SignInForm()
myInForm.add(new NumberInput());
myInForm.add(new EmailInput());
myInForm.add(new PasswordInput('enter pass', 'pass', 20));

console.log(myUpForm.getName() + ' ' + myUpForm.getFullHeight())
console.log(myInForm.getName() + '  ' + myInForm.getFullHeight())