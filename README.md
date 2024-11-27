# React-Flask Library

This is a straightforward app using React, Flask, & SQLAlchemy allowing
users to view & upload book information, post book reviews, and find more
books by their favorite authors.

> [!NOTE]
> To post a review, you must either register a new account, or you can log
> into the existing `BookCat` account using the password `catmeow`.

# Running the Application

## Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
       ```bash
       venv\Scripts\activate
       ```
    - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```

4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Start the Flask backend:
   ```bash
   flask run
   ```

## Fontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server
   ```bash
   npm run dev
   ```

# Contributing

This project is a simple full-stack application written for a school project,
and is not open to contributions. Feel free to download/fork/clone and make
modifications to your own version.