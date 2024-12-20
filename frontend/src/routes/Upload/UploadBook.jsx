import "./upload-book.scss";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useBooks} from "../../context/BooksContext.jsx";

export default function UploadBook() {
    const {addBook} = useBooks();

    const initialValues = {
        title: "",
        description: "",
        published: "",
        author: "",
        series: "",
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
        const url = `${import.meta.env.VITE_API_URL}/books`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(url, options);

        if (response.ok) {
            const resData = await response.json();
            alert('Book uploaded successfully!');
            actions.resetForm();
            addBook(resData.book);
        } else {
            alert('Failed to upload the book. Please try again.');
        }

        actions.setSubmitting(false);
    };

    return (
        <>
            <h1>Upload a Book</h1>
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
                            <button type="submit" disabled={isSubmitting}>Upload</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}