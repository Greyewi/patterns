import React, {useState} from 'react'

const Input = function(){
  const [value, setValue] = useState('')

  this.onChange = function() {
    setValue('You filled the field')
  }

  this.component = <input type="text" value={value}/>
}

const Checkbox = function(){
  const [checked, setChecked] = useState(false)

  this.onChecked = function() {
    setChecked(!checked)
  }

  this.component = <input type="checkbox" checked={checked}/>
}

const CheckboxAdapter = function(input) {
  this.input = input

  this.onChange = function() {
    this.input.onChecked()
  }
}

const Field = function() {
  this.onChange = function(field){
    field.onChange()
  }

  this.component = function(field) {
    return field.component
  }
}


const InputCheckbox = () => {
  const myField = new Field()
  const myInput = new Input()
  const inputComponent = myField.component(myInput)

  return React.cloneElement(inputComponent, )
}

export default InputCheckbox