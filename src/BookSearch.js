import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

export default class BookSearch extends Component {
  static propTypes = {
    onBookUpdate: PropTypes.func.isRequired,
  }

  state = {
    query: "",
    searchedBooks: [],
  }
  
  render() {
    const { query, searchedBooks } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      showingBooks = searchedBooks.filter((book) => match.test(book.title))
    } else {
      showingBooks = []
    }

    // sort books by title
    showingBooks.sort(sortBy("title"))

    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link className="close-search" to="/">Close</Link>
          
          <div className="search-books-input-wrapper">

            <Debounce time="400" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {
                  this.handleQuery(event.target.value)
                }}
                autoFocus
              />
            </Debounce>

          </div>
        </div>

        <div className="search-books-results">

          <ol className="books-grid">
            {showingBooks.length
              ?
                /* has books */
                showingBooks.map((book) => (
                  <li key={book.id}>
                    <Book book={book} onBookUpdate={this.props.onBookUpdate} shelf={book.shelf} />
                  </li>
                ))
              :
                /* no books */
                <li>
                  <h1>No books available</h1>
                </li>
            }
          </ol>

        </div>
      </div>
    )
  }

  clearQuery = () => {
    this.setState({ query: "" })
  } // END: clearQuery

  handleQuery = (query) => {
    const { savedBooks } = this.props

    if (query) {
      this.setState({ query: query })

      BooksAPI.search(query, 20).then((queriedBooks) => {

        // cycle through the savedBooks
        // for each queriedBooks, if its id matches an id from the savedBooks, replace book
        savedBooks.map((book, index) => {
          for (let [index, queriedBook] of queriedBooks.entries()) {
            if (book.id === queriedBook.id) {
              // index = index of element to be removed
              // 1 = # of elements to be removed
              // book = the element to input in the open slot
              queriedBooks.splice(index, 1, book)
            }
          }
          return null
        })

        // cycle through the queriedBooks
        // if there is no shelf, set the shelf to "none"
        queriedBooks.forEach(book => {
          if(!book.shelf){
            book.shelf = "none"
          }
        })

        this.setState({ searchedBooks: queriedBooks })

      }).catch((error) => {
        // if an invalid search term exists, set state to blank array
        this.setState({ searchedBooks: [] })
        // dump error to console
        console.log("Error", error)
      })

    } else {
      this.clearQuery();
    }
  } // END: handleQuery

}
