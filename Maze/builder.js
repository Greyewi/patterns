// Logic
class MapSite {
  enter() {
    console.log('interfaces is not available with pure js')
  }
}

class Wall extends MapSite {
  enter() {
    console.log(`You bump into a wall`);
  }
}

class Door extends MapSite {
  constructor(roomOne, roomTwo) {
    super();
    this.roomOne = roomOne;
    this.roomTwo = roomTwo;
    this.isOpen = false;
  }
  open() {
    console.log('you open the door');
    this.isOpen = true;
  }
  getNextRoom(currentRoom) {
    let nextRoom = null;

    if (this.roomOne.roomNumber === currentRoom) {
      nextRoom = this.roomTwo;
    } else {
      nextRoom = this.roomOne;
    }

    return nextRoom;
  }
  enter(currentRoom) {
    if (this.isOpen) {
      const room = this.getNextRoom(currentRoom);
      room.enter();
      return room;
    } else {
      console.log('You bumped your nose on the door');
    }
  }
}

class Room extends MapSite {
  constructor(roomNumber) {
    super();
    this.sides = {
      north: null,
      south: null,
      east: null,
      west: null,
    };
    this.roomNumber = roomNumber;
  }

  getSide(direction) {
    return this.sides[direction];
  }

  setSide(direction, mapSite) {
    this.sides[direction] = mapSite;
  }

  enter() {
    console.log(`You are in room number ${this.roomNumber}`);
  }
}

class Maze {
  constructor() {
    this.rooms = [];
  }
  addRoom(room) {
    this.rooms.push(room);
  }
  getRoom(roomNumber) {
    return this.rooms.find((room) => room.roomNumber == roomNumber);
  }
}

class MazeGame {
  createMaze(mazeFactory) {
    const aMaze = mazeFactory.makeMaze();
    const r1 = mazeFactory.makeRoom(1);
    const r2 = mazeFactory.makeRoom(2);
    const door = mazeFactory.makeDoor(r1, r2);

    aMaze.addRoom(r1);
    aMaze.addRoom(r2);

    r1.setSide('north', mazeFactory.makeWall());
    r1.setSide('east', door);
    r1.setSide('south', mazeFactory.makeWall());
    r1.setSide('west', mazeFactory.makeWall());

    r2.setSide('north', mazeFactory.makeWall());
    r2.setSide('east', mazeFactory.makeWall());
    r2.setSide('south', mazeFactory.makeWall());
    r2.setSide('west', door);

    this.currentRoom = r1;

    return aMaze;
  }

  tryDirection(direction, action) {
    const dir = this.currentRoom.getSide(direction);
    if (action) {
      console.log(`--- trying to ${action} ${direction}`);
      if (action === 'open' && dir instanceof Door) {
        dir.open();
      } else {
        console.log("you can't open that");
      }
      return;
    }

    console.log(`--- trying to go ${direction}`);
    const newRoom = dir.enter(this.currentRoom.roomNumber);
    if (newRoom) {
      this.currentRoom = newRoom;
    }
  }

  getCurrentRoom() {
    this.currentRoom.enter();
    return this.currentRoom;
  }
}


/*
* New Builder
* */


class MazeBuilder { // абстрактный Строитель - для абстрактного интерфейса, который создает части объекта
  constructor() {}

  buildMaze() {}

  buildRoom() {}

  buildDoor() {}

  getMaze() {}
}

class StandardMazeBuilder extends MazeBuilder { // Конкретный строитель
  constructor() { //
    super()
    this._currentMaze = null
  }

  buildMaze() { // конструирует части продукта
    this._currentMaze = new Maze()
  }

  buildRoom(id) { // конструирует части продукта
    if (!this._currentMaze.getRoom(id)) {
      const room = new Room(id)

      room.setSide('north', new Wall())
      room.setSide('east', new Wall())
      room.setSide('south', new Wall())
      room.setSide('west', new Wall())

      this._currentMaze.addRoom(room)
    }
  }

  buildDoor(id1, dir1, id2, dir2) { // конструирует части продукта
    const r1 = this._currentMaze.getRoom(id1)
    const r2 = this._currentMaze.getRoom(id2)

    const door = new Door(r1, r2)
    r1.setSide(dir1, door)
    r2.setSide(dir2, door)
  }

  getMaze() { // интерфейс для доступа к продукту
    return this._currentMaze
  }
}

class BuilderMazeGame extends MazeGame {
  createMaze(builder) {
    builder.buildMaze()
    builder.buildRoom(1)
    builder.buildRoom(2)
    builder.buildDoor(1, 'east', 2, 'west')

    const maze = builder.getMaze()
    this.currentRoom = maze.getRoom(1)

    return maze
  }
}


console.log('--------------builder game--------------')
const builderGame = new BuilderMazeGame()
const builder = new StandardMazeBuilder()
builderGame.createMaze(builder)

builderGame.getCurrentRoom()
builderGame.tryDirection('north')
builderGame.tryDirection('east')
builderGame.tryDirection('south', 'open')
builderGame.tryDirection('east', 'open')
builderGame.tryDirection('east')
builderGame.tryDirection('west')