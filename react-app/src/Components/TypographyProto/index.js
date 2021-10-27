import React, {useState} from 'react'

const Text = function(fontSize, fontFamily, text, color) {
  this.fontSize = fontSize
  this.fontFamily = fontFamily
  this.text = text
  this.color = color

  this.clone = function() {
    return new Text(this.fontSize, this.fontFamily, this.text, this.color)
  }
}

const Typography = ({fontSize, fontFamily, fontColor, children}) => {
  const [textFields, setTextFields] = useState([])
  const myTextField = new Text(fontSize, fontFamily, children, fontColor)
  return (
    <>
      <button
        onClick={() => {
          setTextFields(prevFields => [...prevFields, myTextField.clone()] )
        }}
      >
        Create
      </button>

      <div>
        {textFields.map((field, key) => <div
            key={key}
            style={{fontFamily: field.fontFamily, fontSize: field.fontSize, color: field.color}}
          >
            {field.text}
            <input
              type="text"
              onChange={e => {
                setTextFields(prev => prev.map((item, index) => {
                  if(index === key) {
                    item.text = e.target.value
                  }
                  return item
                }))
              }}
              defaultValue={field.text}
            />
          <input
            type="number"
            onChange={e => {
              setTextFields(prev => prev.map((item, index) => {
                if(index === key) {
                  item.fontSize = e.target.value + 'px'
                }
                return item
              }))
            }}
            style={{width: '35px'}}
            defaultValue={field.fontSize.slice(0, -2)}
          />

          <input
            type="color"
            onChange={e => {
              setTextFields(prev => prev.map((item, index) => {
                if(index === key) {
                  item.color = e.target.value
                }
                return item
              }))
            }}
          />
          </div>
        )}
      </div>
    </>
  )
}

export default Typography