class User {
  #userList

  constructor(data) {
    this.#userList = data
  }

  getUser(id) {
     console.log(`User #${id} has been found`)
  }

  setUser() {
    console.log(`User #${this.#userList.length + 1} has been created`)
  }

  changeUser(id, name) {
    this.#userList.map((user) => {
      if(user.id === id){
        user.name = name
      }
    })
  }

  setException(id) {
    console.log(`User ${id} hasn't been found`)
  }

  getUserList(){
    return this.#userList
  }

}

class Security {
  constructor(user) {
    this.user = user
    this.users = this.user.getUserList().map(user => {
      user.token = null
      return user
    })
  }

  checkToken(token) {
    console.log(`token ${token} has been checked`)
  }

  generatedToken(){
    console.log('token  has been generated')
    return 'token 43y478236423462394236'
  }

  addToken(userId, token) {
    this.users.map(user => {
      if(user.id === userId){
        user.token = token
      }
    })
  }
}

class SignInFacade {
  constructor(user, security) {
    this.user = user
    this.security = security
  }

  handleSignIn() {
    const token = this.security.generatedToken()
    this.security.checkToken(token)
    this.security.addToken(token)
    this.user.getUser(1)
  }
}

class SignUpFacade {
  constructor(user, security) {
    this.user = user
    this.security = security
  }

  handleSignUp() {
    this.user.setUser()
    this.user.setException(10)
    this.user.getUser(1)
  }
}

const myUser = new User([{id: 1, name: 'Vasya'}, {id:2, name: 'Petya'}])

const mySignIn = new SignInFacade(myUser, new Security(myUser))
const mySignUp = new SignUpFacade(myUser, new Security(myUser))

mySignIn.handleSignIn()
mySignUp.handleSignUp()