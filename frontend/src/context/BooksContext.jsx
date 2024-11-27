import React, {createContext, useContext, useState} from 'react';

// Create UserContext
const BooksContext = createContext();

// Custom hook for easy access to context
export const useBooks = () => useContext(BooksContext);

// Provider Component
export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);

    // Method to fetch books
    const fetchBooks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
            if (response.ok) {
                const data = await response.json();
                setBooks(data.books);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const removeBook = async (bookId) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${import.meta.env.VITE_API_URL}/books/${bookId}`, options)
            .then(response => response.json())
            .then(data => {
                const newBooks = books.filter((book) => book.id !== bookId);
                setBooks(newBooks);
                return data;
            })
            .catch(error => console.error('Error:', error));
    }

    const updateBook = async (bookId, bookData) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        }
        return fetch(`${import.meta.env.VITE_API_URL}/books/${bookId}`, options)
            .then(response => response.json())
            .then(data => {
                // Remove old book
                const newBooks = books.filter((book) => book.id !== bookId);
                // Add updated book
                setBooks([...newBooks, data.book]);
                return data.book;
            })
            .catch(error => console.error('Error:', error));
    }

    const addBook = (book) => {
        setBooks([...books, book]);
    }

    return (
        <BooksContext.Provider value={{books, fetchBooks, addBook, updateBook, removeBook}}>
            {children}
        </BooksContext.Provider>
    );
};