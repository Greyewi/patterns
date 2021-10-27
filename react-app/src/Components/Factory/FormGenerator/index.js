import {useState} from 'react'

const TextField = (defaultValue, name, placeholder, onChange) => {
  return <input
    type="text"
    onChange={onChange}
    defaultValue={defaultValue}
    placeholder={placeholder}
    name={name}
    key={name + defaultValue}
  />
}

const NumberField = (onChange, value, name, placeholder) => {
  return <input type="number" onChange={onChange} placeholder={placeholder} name={name} key={name + value}/>
}

const SelectField = (onChange, value, options, name) => {
  return <select onChange={onChange} name={name} key={name + value}>
    {
      options && options.length && options.map((option, key) =>
        <option key={key} value={option.value} selected={value === option.value}>{value}</option>)
    }
  </select>
}

const CheckboxField = (onChange, value, label, name) => {
  return <label key={name + value}>
    <input type="checkbox" onClick={onChange} value={value} name={name}/>
    {label}
  </label>
}

function FieldFactory() {

  this.createTextField = function(data) {
    return TextField(...data)
  }

  this.createNumberField = function(data) {
    return NumberField(...data)
  }

  this.createSelectField = function(data) {
    return SelectField(...data)
  }

  this.createCheckboxField = function(data) {
    return CheckboxField(...data)
  }
}


const FormGenerator = ({onSave}) => {
  const [fields, setFields] = useState([])
  const [type, setType] = useState('text')

  const fieldFactory = new FieldFactory()
  return (
    <div>
      <select onChange={e => setType(e.target.value)}>
        <option value={"text"}>text</option>
        <option value={"number"}>number</option>
        <option value={"select"}>select</option>
        <option value={"checkbox"}>checkbox</option>
      </select>

      <button
        type="button"
        onClick={() => {
          let field

          switch(type) {
            case "text": {
              field = fieldFactory.createTextField(['', 'myInput', 'placeholder', () => console.log('changed')])
            }
            case "number": {
              field = fieldFactory.createNumberField(['', 'myInput', 'number', () => console.log('changed')])
            }
            default: {
              break
            }
          }
          setFields(preFields => [...preFields, field])
        }}
      >
        add new field
      </button>

      <form>
        {fields && fields.length && fields.map(field => {
          return field
        })}
      </form>
    </div>
  )
}

export default FormGenerator