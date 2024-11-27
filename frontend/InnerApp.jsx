import {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useBooks} from "./src/context/BooksContext.jsx";
import Home from "./src/routes/Home/Home.jsx";
import Books from "./src/routes/Books/Books.jsx";
import BookDetails from "./src/routes/BookDetails/BookDetails.jsx";
import UploadBook from "./src/routes/Upload/UploadBook.jsx";
import Authors from "./src/routes/Authors/Authors.jsx";
import Login from "./src/routes/Login/Login.jsx";
import Logout from "./src/routes/Logout/Logout.jsx";
import Register from "./src/routes/Register/Register.jsx";
import UpdateBook from "./src/routes/Update/UpdateBook.jsx";

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