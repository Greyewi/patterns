class Car {
  constructor(model, price, color) {
    this.model = model
    this.price = price
    this.color = color
  }

  clone() {
    return new Car(this.model, this.price, this.color)
  }
}

// using
const protoCar = new Car("MX", 30000, 'red')

const car1 = protoCar.clone()
const car2 = protoCar.clone()
const car3 = protoCar.clone()

car2.color = "black"
car3.price = 25000

console.log(car1, car2, car3)