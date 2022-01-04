import {useState, useEffect} from 'react'

class Product {
  getName() {
    return this.name
  }

  getPrice() {
    return this.price
  }

  getCount() {
    return this.count
  }

  getSum() {
    return this.price * this.count
  }

  setName(name) {
    this.name = name || ''
  }

  setPrice(price) {
    this.price = price || 0
  }

  setCount(count) {
    this.count = count || 0
  }
}

class Orange extends Product {
  constructor(count) {
    super()
    this.setName('red sunrise')
    this.setPrice(20)
    this.setCount(count)
  }
}

class Apple extends Product {
  constructor(count) {
    super()
    this.setName('fuji')
    this.setPrice(40)
    this.setCount(count)
  }
}

class Banana extends Product {
  constructor(count) {
    super()
    this.setName('Maroko')
    this.setPrice(15)
    this.setCount(count)
  }
}

class Composite extends Product {
  constructor() {
    super()
    this.productList = []
    this.getFullPrice = this.getFullPrice.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.getList = this.getList.bind(this)
  }

  add(product) {
    console.log(this.productList)
    this.productList.push(product)
  }

  remove(product) {
    this.productList = this.productList.filter(f => f.name !== product.name)
  }

  getFullPrice() {
    console.log(this.productList, this.productList.length && this.productList.map(product => product.getSum()).reduce((a, b) => a + b))
    return this.productList.length && this.productList.map(product => product.getSum()).reduce((a, b) => a + b)
  }

  getList() {
    return this.productList
  }
}


const Basket = () => {
  const [count, setCount] = useState(0)
  const [type, setType] = useState('')
  const [myPosition, setMyPosition] = useState(null)

  useEffect(() => {
    setMyPosition(new Composite())
  }, [])

  return (
    <>
      <input type="number" onChange={e => setCount(e.target.value)} value={count}/>

      <div>
        <input type="radio" id="contactChoice1" name="product" value="orange" onClick={() => setType('orange')}/>
        <label htmlFor="contactChoice1">red sunrise</label>

        <input type="radio" id="contactChoice2" name="product" value="apple" onClick={() => setType('apple')}/>
        <label htmlFor="contactChoice2">fuji</label>

        <input type="radio" id="contactChoice3" name="product" value="banana" onClick={() => setType('banana')}/>
        <label htmlFor="contactChoice3">Maroko</label>
      </div>

      <button onClick={() => {
        switch(type){
          case 'orange': {
            myPosition.add(new Orange(count))
            break;
          }
          case 'apple': {
            myPosition.add(new Apple(count))
            break;
          }
          case 'banana': {
            myPosition.add(new Banana(count))
            break;
          }
        }

        setCount(0)
        setType('')
      }}>
        Add
      </button>

      {myPosition && myPosition.getFullPrice()}
      {myPosition && myPosition.getList().map(product => product.getName())}
    </>
  )
}

export default Basket