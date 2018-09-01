import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

const BookShelf = ({ currentlyReading, wantToRead, read, onBookUpdate }) => (
  <div className="list-books">

    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>

    <div className="list-books-content">
      <div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {currentlyReading.map((book) => (
                <li key={book.id}>
                  <Book book={book} onBookUpdate={onBookUpdate} shelf={book.shelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {wantToRead.map((book) => (
                <li key={book.id}>
                  <Book book={book} onBookUpdate={onBookUpdate} shelf={book.shelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {read.map((book) => (
                <li key={book.id}>
                  <Book book={book} onBookUpdate={onBookUpdate} shelf={book.shelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </div>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
)

BookShelf.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
}

export default BookShelf
