import {useState} from 'react'
import moment from 'moment'
const ISO_FORMAT = 'YYYY-MM-DDThh:mm:ssTZD'

const ISODateInput = function(defaultDate) {
  const [date, setDate] = useState(defaultDate)

  this.onChangeISO = function(date) {
    setDate(date.target.value)
  }

  this.getDate = function(){
    return date
  }
}

const StandardDateInput = function(defaultDate) {
  const [date, setDate] = useState(new Date(defaultDate))

  this.onChangeDate = function(event) {
    setDate(event.target.value)
  }

  this.getISODate = function(){
    return date
  }
}

const StandardDateInputAdapter = function(dateInput) {
  this.dateInput = dateInput

  this.onChangeISO = (e) => {
    this.dateInput.onChangeDate(e)
  }

  this.getDate = () => {
    return this.dateInput.getISODate()
  }
}

const DateInput = function(){
  const myDateInput = new StandardDateInputAdapter(new StandardDateInput('2020-05-05T16:25:40-06:00'))

  return <input type="date" onChange={myDateInput.onChangeISO} value={moment(myDateInput.getDate(), ISO_FORMAT).format('YYYY-MM-DD')}/>
}


export default DateInput