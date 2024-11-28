import {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useBooks} from "./context/BooksContext.jsx";
import Home from "./routes/Home/Home.jsx";
import Books from "./routes/Books/Books.jsx";
import BookDetails from "./routes/BookDetails/BookDetails.jsx";
import UploadBook from "./routes/Upload/UploadBook.jsx";
import Authors from "./routes/Authors/Authors.jsx";
import Login from "./routes/Login/Login.jsx";
import Logout from "./routes/Logout/Logout.jsx";
import Register from "./routes/Register/Register.jsx";
import UpdateBook from "./routes/Update/UpdateBook.jsx";

export default function InnerApp() {
    const {books, fetchBooks} = useBooks();

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="content-container">
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="books" element={<Books/>}/>
                <Route path="books/upload" element={<UploadBook/>}/>
                <Route path="books/:book_id" element={<BookDetails/>}/>
                <Route path="books/:book_id/update" element={<UpdateBook/>}/>
                <Route path="authors" element={<Authors/>}/>
                <Route path="users/login" element={<Login/>}/>
                <Route path="users/logout" element={<Logout/>}/>
                <Route path="users/register" element={<Register/>}/>
            </Routes>
        </div>
    );
}