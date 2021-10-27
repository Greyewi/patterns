class ISODate {
  constructor(date) {
    this.date = date
  }

  getISODate() {
    return this.date
  }
}

class StandardDate {
  constructor(date) {
    this.date = new Date(date)
  }

  getDate() {
    return this.date.toISOString()
  }
}

class StandardDateAdapter {
  constructor(dataDate) {
    this.dataDate = dataDate
  }

  getISODate() {
    return this.dataDate.getDate()
  }
}

class DateWorker {
  getDate(dateData) {
    return dateData.getISODate()
  }
}

const myDateWorker = new DateWorker()
const myISODate = new ISODate('2020-05-05T16:25:40-06:00')

const time = myDateWorker.getDate(myISODate)
console.log(time)

const myDateWorker2 = new DateWorker()
const myDate = new StandardDateAdapter(new StandardDate('2020-05-05T16:25:40-06:00'))

const time2 = myDateWorker2.getDate(myDate)
console.log(time2)