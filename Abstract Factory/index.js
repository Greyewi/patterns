// Factory Pattern //
// Несколько конструкторов для нашей фабрики
function Cat(options) {
  this.sound = 'Meow'
  this.name = options.name
}

function Dog(options) {
  this.sound = 'Rawr'
  this.name = options.name
}

// Animal Factory
class AnimalFactory {
  animalType = Cat

  createAnimal = (options) => {
    switch (options.animalType) {
      case "cat":
        this.animalType = Cat
        break
      case "dog":
        this.animalType = Dog
        break
      default:
        this.animalType = Cat
        break
    }
    return new this.animalType(options)
  }
}

const animalFactory = new AnimalFactory()
const doge = animalFactory.createAnimal({
  animalType: 'dog',
  name: 'Doge'
})

const snowball = animalFactory.createAnimal({name: 'Snowball'})

console.log(doge instanceof Dog)     // true
console.log(doge)                    // выводит doge как cat объект
console.log(snowball instanceof Cat) // true
console.log(snowball)                // выводит snowball как cat объект