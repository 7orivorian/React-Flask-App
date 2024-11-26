import './app.scss'
import {useEffect} from "react";
import {Route, Routes} from "react-router";
import Home from "./routes/Home/Home.jsx";
import Books from "./routes/Books/Books.jsx";
import Authors from "./routes/Authors/Authors.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import BookDetails from "./routes/BookDetails/BookDetails.jsx";
import UploadBook from "./routes/Upload/UploadBook.jsx";
import Login from "./routes/Login/Login.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import Logout from "./routes/Logout/Logout.jsx";

export default function App() {
    useEffect(() => {

    }, []);

    return (
        <div>
            <UserProvider>
                <Navbar/>
                <div className="content-container">
                    <Routes>
                        <Route path="" element={<Home/>}/>
                        <Route path="books" element={<Books/>}/>
                        <Route path="books/:book_id" element={<BookDetails/>}/>
                        <Route path="books/upload" element={<UploadBook/>}/>
                        <Route path="authors" element={<Authors/>}/>
                        <Route path="authors/:author_id" element={<Authors/>}/>
                        <Route path="users/login" element={<Login/>}/>
                        <Route path="users/logout" element={<Logout/>}/>
                    </Routes>
                </div>
            </UserProvider>
        </div>
    );
}