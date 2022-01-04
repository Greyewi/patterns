class Textarea {
  constructor(name, value) {
    this.name = name
    this.value = value
  }

  handleChange(value) {
    this.value = value
    console.log(this.value + '\n textarea has been changed')
  }
}

class TextInput {
  constructor(name, value) {
    this.name = name
    this.value = value
  }

  handleChange(value) {
    this.value = value
    console.log(this.value + '\n input has been changed')
  }
}

class Checkbox {
  constructor(name, checked) {
    this.name = name
    this.checked = checked
  }

  handleChange(checked) {
    this.checked = checked
    console.log(this.checked + '\n checkbox has been changed')
  }
}

class ReadonlyDecorator {
  constructor(input, readonly) {
    this.input = input
    this.name = this.input.name
    this.value = this.input.value
    this.disabled = readonly
  }

  handleChange(value) {
    if(!this.disabled) {
      this.value = value
      console.log(this.value + '\n readonly decorator has been changed')
    } else {
      console.log(this.value + "\n readonly decorator hasn't been changed")
    }
  }

  handleFocus() {
    console.log('element have focused')
  }
}

const myTextArea = new Textarea("description", "please describe description" )
myTextArea.handleChange("please describe description to something")

const readonlyTextArea = new ReadonlyDecorator(myTextArea, false)
readonlyTextArea.handleChange("nope")
readonlyTextArea.handleFocus()