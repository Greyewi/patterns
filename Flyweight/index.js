class Computer {
  constructor(part){
    this.part = part
  }
}

class ComputerFactory {
  constructor() {
    this.parts = {}
  }

  createComputer(partName) {
    const part = this.parts[partName]
    if(part) return part
    this.parts[partName] = new Computer(partName)
    return this.parts[name]
  }

  getParts(){
    return this.parts
  }

  getPart(){

  }
}
