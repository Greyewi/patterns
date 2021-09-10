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


/***
  NEW
*/

// Abstract
class MazeFactory {
  makeMaze() {
    return new Maze();
  }
  makeWall() {
    return new Wall();
  }
  makeRoom(id) {
    return new Room(id);
  }
  makeDoor(roomOne, roomTwo) {
    return new Door(roomOne, roomTwo);
  }
}

// Concrete Enchanted
class EnchantedRoom extends Room {
  enter() {
    super.enter();
    console.log('THIS is a Enchanted room!');
  }
}

class EnchantedWall extends Wall {
  enter() {
    console.log('You run into a Enchanted wall.  It makes you feel Enchanted');
  }
}

class EnchantedMazeFactory extends MazeFactory {
  makeRoom(id) {
    return new EnchantedRoom(id);
  }

  makeWall() {
    return new EnchantedWall();
  }
}

// Concrete Bombed

class BombedRoom extends Room {
  enter() {
    super.enter();
    console.log('THIS is a Enchanted room!');
  }
}

class BombedWall extends Wall {
  enter() {
    console.log('You run into a Enchanted wall.  It makes you feel Enchanted');
  }
}

class BombedMazeFactory extends MazeFactory {
  makeRoom(id) {
    return new EnchantedRoom(id);
  }

  makeWall() {
    return new EnchantedWall();
  }
}


// Logic
class FactoryMazeGame {
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

console.log('--------------factory game--------------');

const game2 = new FactoryMazeGame();
const enchantedMazeFactory = new EnchantedMazeFactory();
const enchantedMaze = game2.createMaze(enchantedMazeFactory);

game2.getCurrentRoom();
game2.tryDirection('north');
game2.tryDirection('east');
game2.tryDirection('south', 'open');
game2.tryDirection('east', 'open');
game2.tryDirection('east');
game2.tryDirection('west');