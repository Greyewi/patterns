import {useState} from 'react'

function Dropdown() {
  this.name = "Dropdown!"
  this.body = "something in dropdown area"
}

export function DropdownBuilder(defaultExpanded) {
  this.dropdown = new Dropdown()
  const [isExpended, setIsExpanded] = useState(defaultExpanded)

  this.addName = function(text) {
    this.dropdown.name = text
    return this
  }

  this.addBody = function(text) {
    this.dropdown.body = text
    return this
  }

  this.build = function() {
    return <section>
      <div onClick={() => setIsExpanded(!isExpended)}>{this.dropdown.name}</div>
      <div style={{display: isExpended ? 'block' : 'none'}}>{this.dropdown.body}</div>
    </section>
  }
}

const DropdownUi = ({name = new Dropdown().name, body = new Dropdown().body}) => {
  const myDropdown = new DropdownBuilder().addName(name).addBody(body).build()
  return myDropdown
}

export default DropdownUi