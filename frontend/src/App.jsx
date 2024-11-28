import './app.scss'
import Navbar from "./components/Navbar/Navbar.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {BooksProvider} from "./context/BooksContext.jsx";
import InnerApp from "./InnerApp.jsx";

export default function App() {
    return (
        <div>
            <UserProvider>
                <BooksProvider>
                    <Navbar/>
                    <InnerApp/>
                </BooksProvider>
            </UserProvider>
        </div>
    );
}