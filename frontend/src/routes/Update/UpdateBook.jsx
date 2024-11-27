import "./update-book.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useBooks} from "../../context/BooksContext.jsx";
import {useLocation, useNavigate} from "react-router";

export default function UpdateBook() {
    const navigate = useNavigate();
    const location = useLocation();
    const {book} = location.state || {}
    const {updateBook} = useBooks();

    const date = new Date(book.published);
    const formattedDate = date.toISOString().split('T')[0];
    const initialValues = {
        title: book.title,
        description: book.description,
        published: formattedDate,
        author: book.author.name,
        series: book.series ? book.series.name : "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().min(100, "Description must be at least 100 characters").required("Description is required"),
        published: Yup.date().required("Publication date is required"),
        author: Yup.string().required("Author is required"),
        series: Yup.string(),
    });

    const handleSubmit = async (values, actions) => {

        const data = {
            title: values.title,
            description: values.description,
            published: values.published,
            author_name: values.author,
            series_name: values.series,
        };

        updateBook(book.id, data)
            .then(bookData => {
                actions.resetForm();
                navigate(`/`);
                return bookData;
            })
            .catch(error => {
                console.error(error);
                alert('Failed to update the book. Please try again.');
            });

        actions.setSubmitting(false);
    };

    return (
        <>
            <h1>Update {book.name}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="book-form-section">
                            <label htmlFor="title">Title</label>
                            <Field type="text" name="title" placeholder="Book Title"/>
                            <ErrorMessage name="title" component="div" className="error-message"/>
                        </div>
                        <div className="book-form-section">
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" name="description" placeholder="Book Description"/>
                            <ErrorMessage name="description" component="div" className="error-message"/>
                        </div>
                        <div className="book-form-section">
                            <label htmlFor="published">Published</label>
                            <Field type="date" name="published" placeholder="Date Published"/>
                            <ErrorMessage name="published" component="div" className="error-message"/>
                        </div>
                        <div className="book-form-section">
                            <label htmlFor="author">Author</label>
                            <Field type="text" name="author" placeholder="Author Name"/>
                            <ErrorMessage name="author" component="div" className="error-message"/>
                        </div>
                        <div className="book-form-section">
                            <label htmlFor="series">Series</label>
                            <Field type="text" name="series" placeholder="Series Name"/>
                            <ErrorMessage name="series" component="div" className="error-message"/>
                        </div>
                        <div className="book-form-section">
                            <button type="submit" disabled={isSubmitting}>Submit Changes</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}