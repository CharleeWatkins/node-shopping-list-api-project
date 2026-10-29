# Shopping List API

## Overview

This project is a REST API for managing shopping list items. It is built using Node.js, TypeScript, and Express. The API allows users to add, view, update, and delete shopping list items. Each item has a unique numeric ID for easy reference. The application runs an HTTP server and stores data in an in-memory array. This means that the data is reset when the server restarts.

## Features

- **Create items:** Add new shopping list items using POST requests.
- **View all items:** Retrieve the entire shopping list using GET requests.
- **View a single item:** Retrieve an item using its unique ID.
- **Update items:** Modify an existing item's details using PUT requests.
- **Delete items:** Remove items from the shopping list using DELETE requests.
- **Error handling:** Return consistent JSON responses for errors.
- **TypeScript:** Use static typing to improve code reliability and maintainability.

## API Endpoints

The API uses the `/items` route to manage shopping list items.

### 1. Get All Items

**Endpoint:** `GET /items`

Retrieves all items in the shopping list.

**Example URL:**

```text
http://localhost:3000/items
```

### 2. Create an Item

**Endpoint:** `POST /items`

Adds a new item to the shopping list.

**Example URL:**

```text
http://localhost:3000/items
```

**Request Body:**

```json
{
  "name": "Milk",
  "quantity": 2
}
```

The request body contains the item's name and quantity.

### 3. Get a Single Item

**Endpoint:** `GET /items/:id`

Retrieves a single shopping list item using its unique ID.

Replace `:id` with the ID of the item you want to retrieve.

**Example URL:**

```text
http://localhost:3000/items/1
```

### 4. Update an Item

**Endpoint:** `PUT /items/:id`

Updates an existing shopping list item using its unique ID.

**Example URL:**

```text
http://localhost:3000/items/1
```

**Request Body:**

```json
{
  "purchased": true
}
```

You can provide the fields supported by the API that you want to update, such as the item's name, quantity, or purchased status.

### 5. Delete an Item

**Endpoint:** `DELETE /items/:id`

Deletes a shopping list item using its unique ID.

**Example URL:**

```text
http://localhost:3000/items/1
```

A successful deletion returns `204 No Content`, provided this is how the endpoint is implemented.

## Requirements

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v22.15.0
- npm, which is included with Node.js
- [Postman](https://www.postman.com/) or another API testing tool (optional) v12.34.2

## Setup and Installation

### 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/CharleeWatkins/node-shopping-list-api-project.git
```

### 2. Navigate to the Project Directory

```bash
cd shopping-list-api
```

### 3. Install Dependencies

Install the project's required packages:

```bash
npm install
```

## Running the Server

### Development Mode

Start the development server using:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:3000
```

Make sure your `package.json` contains the appropriate development script.

### Production Mode

To build and run the production version, use:

```bash
npm run build
npm start
```

These commands require the corresponding `build` and `start` scripts to be configured in your `package.json`.

## Testing the API

You can test the API endpoints using Postman or another HTTP client.

### Example: Creating a Shopping List Item

1. Open Postman.
2. Create a new HTTP request.
3. Select the `POST` method.
4. Enter the URL:

   `http://localhost:3000/items`

5. Open the **Body** tab.
6. Select **raw** and choose **JSON**.
7. Enter the following request body:

```json
{
  "name": "Apples",
  "quantity": 5
}
```

8. Click **Send** to submit the request.

If the request is valid, the API should create a new shopping list item and return a response containing the created item, depending on the implementation.

You can test the remaining endpoints by changing the HTTP method and URL.

## Data Storage

The application uses an in-memory array to store shopping list items.

This approach is suitable for learning and testing a REST API. However, the data is not permanently stored and will be lost when the server restarts.

A database could be added in the future to provide persistent storage.

## License

This project is licensed under the MIT License.
