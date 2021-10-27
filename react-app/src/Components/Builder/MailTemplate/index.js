import {useState} from 'react'

function Letter() {
  this.start = 'Dear '
  this.article = 'I am writing to '
  this.end = 'Your sincerely'
}

function LetterBuilder() {
  this.letter = new Letter()

  this.addStart = function(data) {
    this.letter.start = data
    return this
  }

  this.addArticle = function(data) {
    this.letter.article = data
    return this
  }

  this.addEnd = function(data) {
    this.letter.end = data
    return this
  }

  this.createText = function() {
    this.letter.text = `
      ${this.letter.start}
      ${this.letter.article}
      ${this.letter.end}`
    return this
  }

  this.build = function() {
    return this.letter
  }
}

const MailTemplate = ({name, cols = 30, rows = 10}) => {
  const myLetter1 = new LetterBuilder()
    .addStart('Dear ms Kristina')
    .addArticle('I am writing to explain about builder pattern')
    .addEnd('I hope you have fun!')
    .createText()
    .build()

  const myLetter2 = new LetterBuilder()
    .addArticle('I am writing to explain about builder pattern')
    .createText()
    .build()

  return <><textarea name={name} id="" cols={cols} rows={rows}>
        {myLetter1.text}
    </textarea>
    </>
}

export default MailTemplate