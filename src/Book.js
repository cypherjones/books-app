import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import CoverImage from './cover-image-placeholder.png'

const Book = ({ book, shelf, onBookUpdate }) => (
  <div className="book">
    <div className="book-top">

      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${book.imageLinks
            ?
              /* has thumbnail */
              book.imageLinks.thumbnail
            :
              /* no thumbnail, use placeholder */
              CoverImage
          })`,
        }}></div>

      <div className="book-shelf-changer">
        <select defaultValue={shelf} onChange={(e) => { onBookUpdate(book, e.target.value) }}>
          <option value="movedTo" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>

    </div>

    <div className="book-title">{book.title}</div>

    {book.authors && book.authors.length
      ?
        /* has author */
        book.authors.map((author, index) => (
          <div key={index} className="book-authors">{author}</div>
        ))
      :
        /* no author */
        <div className="book-authors">No Authors Avaliable</div>
    }

  </div>
)

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
}

export default Book