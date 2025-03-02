# Word Book API Documentation

This document provides detailed information about the API endpoints available in the Word Book application.

## Table of Contents

1. [Book Management](#book-management)
2. [Web Content Extraction](#web-content-extraction)
3. [EPUB Processing](#epub-processing)
4. [Vocabulary Assessment](#vocabulary-assessment)
5. [Vocabulary Count Test](#vocabulary-count-test)
6. [Word Management](#word-management)

---

## Book Management

Endpoints for managing vocabulary books and words.

### Get All Books

Retrieves a list of all vocabulary books.

- **URL**: `/api/books`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "books": ["book1", "book2", "..."]
  }
  ```

### Create New Book

Creates a new vocabulary book.

- **URL**: `/api/books`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "book_name": "string"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Book 'book_name' created successfully"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Book name is required
  - `400 Bad Request`: Book already exists

### Get Book Words

Retrieves all words from a specific vocabulary book.

- **URL**: `/api/books/<book_name>`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "book_name": "string",
    "word_count": 0,
    "words": ["word1", "word2", "..."]
  }
  ```

### Add Word to Book

Adds a single word to a vocabulary book.

- **URL**: `/api/books/<book_name>/words`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "word": "string"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Word 'word' added to 'book_name' successfully"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Word is required
  - `404 Not Found`: Book does not exist
  - `400 Bad Request`: Word already exists in book

### Add Multiple Words to Book

Adds multiple words to a vocabulary book.

- **URL**: `/api/books/<book_name>/words/batch`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "words": ["word1", "word2", "..."]
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "X new words added to 'book_name' successfully"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Words are required
  - `404 Not Found`: Book does not exist

---

## Web Content Extraction

Endpoints for extracting words from web content.

### Extract Words from Webpage

Extracts words from a webpage and saves them to a file.

- **URL**: `/api/extract-webpage`
- **Method**: `POST`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Parameters**:
  - `url`: URL of the webpage to extract words from
- **Response**:
  ```json
  {
    "status": "success",
    "message": "X words extracted and saved to 'filename'",
    "filename": "string",
    "word_count": 0,
    "words": ["word1", "word2", "..."] // First 20 words only
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: URL is required
  - `400 Bad Request`: No words could be extracted
  - `500 Internal Server Error`: Error saving extracted words

### Extract Words from Webpage to Book

Extracts words from a webpage and adds them to a vocabulary book.

- **URL**: `/api/extract-to-book`
- **Method**: `POST`
- **Content-Type**: `application/x-www-form-urlencoded`
- **Request Parameters**:
  - `url`: URL of the webpage to extract words from
  - `book_name`: Name of the book to add words to
- **Response**:
  ```json
  {
    "status": "success",
    "message": "X words extracted, Y new words added to 'book_name'",
    "filename": "string",
    "word_count": 0,
    "new_word_count": 0,
    "words": ["word1", "word2", "..."] // First 20 words only
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: URL and book name are required
  - `404 Not Found`: Book does not exist
  - `400 Bad Request`: No words could be extracted
  - `500 Internal Server Error`: Error saving extracted words

---

## EPUB Processing

Endpoints for processing EPUB files.

### Upload EPUB File

Uploads and processes an EPUB file to extract words.

- **URL**: `/api/upload-epub`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Parameters**:
  - `file`: EPUB file to upload
- **Response**:
  ```json
  {
    "status": "success",
    "message": "X words extracted and saved to 'filename'",
    "filename": "string",
    "word_count": 0,
    "words": ["word1", "word2", "..."] // First 20 words only
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: No file part
  - `400 Bad Request`: No selected file
  - `400 Bad Request`: File type not allowed
  - `400 Bad Request`: No words could be extracted
  - `500 Internal Server Error`: Error saving the uploaded file
  - `500 Internal Server Error`: Error saving extracted words

### Extract EPUB Words to Book

Uploads an EPUB file, extracts words, and adds them to a vocabulary book.

- **URL**: `/api/epub-to-book`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Parameters**:
  - `file`: EPUB file to upload
  - `book_name`: Name of the book to add words to
- **Response**:
  ```json
  {
    "status": "success",
    "message": "X words extracted, Y new words added to 'book_name'",
    "filename": "string",
    "word_count": 0,
    "new_word_count": 0,
    "words": ["word1", "word2", "..."] // First 20 words only
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: No file part
  - `400 Bad Request`: Book name is required
  - `404 Not Found`: Book does not exist
  - `400 Bad Request`: No selected file
  - `400 Bad Request`: File type not allowed
  - `400 Bad Request`: No words could be extracted
  - `500 Internal Server Error`: Error saving the uploaded file
  - `500 Internal Server Error`: Error saving extracted words

### Access Uploaded File

Serves an uploaded file.

- **URL**: `/uploads/<filename>`
- **Method**: `GET`
- **Response**: The requested file

---

## Vocabulary Assessment

Endpoints for vocabulary assessment tests.

### Generate Vocabulary Test

Generates a vocabulary assessment test.

- **URL**: `/api/assessment/generate_test`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "user_id": "string", // Optional, generated if not provided
    "test_type": "quick|adaptive", // Default: "quick"
    "num_words": 50, // Optional, for quick tests
    "initial_level": "B1", // Optional, for adaptive tests
    "max_questions": 25 // Optional, for adaptive tests
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "test_id": "string",
    "user_id": "string",
    "words": ["word1", "word2", "..."] // All words for quick test, first word only for adaptive test
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Invalid test type

### Submit Vocabulary Test

Submits answers for a vocabulary assessment test.

- **URL**: `/api/assessment/submit_test`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "test_id": "string",
    "user_id": "string",
    "answers": {
      "word1": true,
      "word2": false,
      "...": "..."
    }
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "result": {
      // Test result data
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Missing required data
  - `404 Not Found`: Test not found

### Get Next Adaptive Question

Gets the next question for an adaptive test.

- **URL**: `/api/assessment/adaptive/next_question`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "test_id": "string",
    "knew_previous": true|false
  }
  ```
- **Response** (if test is not complete):
  ```json
  {
    "status": "success",
    "word": "string",
    "question_number": 0,
    "total_questions": 0
  }
  ```
- **Response** (if test is complete):
  ```json
  {
    "status": "success",
    "complete": true
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Missing required data
  - `404 Not Found`: Test not found

### Get Assessment History

Gets assessment history for a user.

- **URL**: `/api/assessment/history/<user_id>`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "history": [
      // Assessment history data
    ]
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: User ID is required

---

## Vocabulary Count Test

Endpoints for vocabulary size estimation tests.

### Get Vocabulary Test Words

Gets words for a vocabulary count test session.

- **URL**: `/api/vocab_test/words`
- **Method**: `GET`
- **Query Parameters**:
  - `session`: Session number (1-3)
- **Response**:
  ```json
  {
    "status": "success",
    "words": ["word1", "word2", "..."],
    "session": 0
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Session number must be between 1 and 3
  - `400 Bad Request`: Invalid session number

### Calculate Vocabulary Test Results

Calculates vocabulary size estimate based on test answers.

- **URL**: `/api/vocab_test/calculate`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "answers": {
      "word1": true,
      "word2": false,
      "...": "..."
    }
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "results": {
      // Vocabulary size estimate data
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: No answers provided

---

## Word Management

Endpoints for managing words marked as "done" (recognized).

### Mark Word as Done

Marks a word as done (recognized).

- **URL**: `/api/words/done`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "word": "string"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Word 'word' marked as done successfully",
    "removed_from_books": ["book1", "book2", "..."]
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Word is required
  - `400 Bad Request`: Word is already marked as done

### Get Done Words

Gets all words marked as done.

- **URL**: `/api/words/done`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "word_count": 0,
    "words": ["word1", "word2", "..."]
  }
  ```
