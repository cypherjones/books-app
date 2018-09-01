import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookShelf from './BookShelf'

class App extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <BookShelf 
            currentlyReading={this.state.books.filter((book => book.shelf === "currentlyReading"))}
            read={this.state.books.filter((book => book.shelf === "read"))}
            wantToRead={this.state.books.filter((book => book.shelf === "wantToRead"))}
            onBookUpdate={this.onBookUpdate}
          />
        )} />

        <Route path="/search" render={() => (
          <BookSearch 
            onBookUpdate={this.onBookUpdate}
            savedBooks={this.state.books}
          />
        )} />

      </div>
    )
  }
  
  onBookUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let newBook = book
      newBook.shelf = shelf
      // remove book from state
      // add the updated book to state
      this.setState((prevState) => ({ books: prevState.books.filter(b => b.id !== book.id).concat(newBook) }))
    })
  } // END: onBookUpdate

}

export default App
