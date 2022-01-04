import {useState} from 'react'

function Textarea(defaultValue = '') {
  [this.value, this.setValue] = useState(defaultValue)

  this.handleChange = (e) => this.setValue(e.target.value)
  this.getComponent = (event) => <textarea onChange={event}>{this.value}</textarea>
}

function Checkbox(defaultValue = false) {
  [this.checked, this.setChecked] = useState(defaultValue)

  this.handleChange = () => this.setChecked(!this.checked)
  this.getComponent = (event) => <input type="checkbox" onClick={event} checked={this.checked}/>
}

function TextInput(defaultValue = '', placeholder = 'enter text') {
  [this.value, this.setValue] = useState(defaultValue)
  this.placeholder = placeholder

  this.handleChange = (e) => this.setValue(e.target.value)
  this.getComponent = (event) => <input onChange={event} placeholder={this.placeholder} value={this.value}/>
}


function CallbackDecorator(input, callback) {
  this.input = input
  this.onChange = (e) => {
    this.input.handleChange(e)
    callback(e)
  }
}

const Inputs = () => {
  const myCheckbox = new Checkbox(true)
  const myCallbackCheckbox = new CallbackDecorator(new Checkbox(), (r) => console.log(r.target.checked))

  const myInput = new TextInput('', 'Enter custom text')
  const myCallbackInput = new CallbackDecorator(new TextInput(), (r) => console.log(r.target.value))

  return <div>
    {myInput.getComponent(myInput.handleChange)}
    {myCallbackInput.input.getComponent(myCallbackInput.onChange)}

    {myCheckbox.getComponent(myCheckbox.handleChange)}
    {myCallbackCheckbox.input.getComponent(myCallbackCheckbox.onChange)}
  </div>
}

export default Inputs