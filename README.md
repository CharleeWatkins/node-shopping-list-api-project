
# Shopping List API
## Overview
This project is a REST API for managing a shopping list, built entirely with **Node.js** and **TypeScript** using the built-in `http` module. It allows users to add, view, update, and delete shopping list items. Each item is assigned a unique numeric ID for easy reference.
The application runs an HTTP server and stores data in an in-memory array, meaning the data resets when the server restarts. This project demonstrates core backend concepts such as manual routing, HTTP request/response handling, and JSON parsing without relying on external frameworks like Express.

## Features
- **Create items:** Add new shopping list items using POST requests.
- **View all items:** Retrieve the entire shopping list using GET requests.
- **View a single item:** Retrieve a specific item using its unique ID.
- **Update items:** Modify an existing item's details (name, quantity, or purchased status) using PUT requests.
- **Delete items:** Remove items from the shopping list using DELETE requests.
- **Error handling:** Return consistent, structured JSON responses for all errors (e.g., missing data, item not found).
- **TypeScript:** Utilize static typing to ensure data integrity and improve code maintainability.

## API Endpoints
The API uses the `/items` route to manage shopping list items. All requests and responses use JSON.

### 1. Get All Items
- **Endpoint:** `GET /items`
- **Description:** Retrieves all items currently in the shopping list.
- **Example URL:** `http://localhost:3000/items`

### 2. Create an Item
- **Endpoint:** `POST /items`
- **Description:** Adds a new item to the shopping list.
- **Example URL:** `http://localhost:3000/items`
- **Request Body:**

```json
{
  "name": "Milk",
  "quantity": 2
}
```

### 3. Get a Single Item
- **Endpoint:** `GET /items/:id`
- **Description:** Retrieves a single item using its unique ID.
- **Example URL:** `http://localhost:3000/items/1`

### 4. Update an Item
- **Endpoint:** `PUT /items/:id`
- **Description:** Updates an existing item. You only need to provide the fields you want to change.
- **Example URL:** `http://localhost:3000/items/1`
- **Request Body:**

```json
{
  "purchased": true
}
```

### 5. Delete an Item
- **Endpoint:** `DELETE /items/:id`
- **Description:** Deletes a shopping list item using its unique ID.
- **Example URL:** `http://localhost:3000/items/1`
- **Success Response:** Returns `204 No Content` upon successful deletion.

## Requirements
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v22.15.0 or higher recommended)
- npm (included with Node.js)
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)

## Setup and Installation
### 1. Clone the Repository
```bash
git clone https://github.com/CharleeWatkins/node-shopping-list-api-project.git
```

### 2. Navigate to the Project Directory
```bash
cd shopping-list-api
```

### 3. Install Dependencies
```bash
npm install
```

## Running the Server
### Development Mode
Start the development server using `ts-node`:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### Production Mode
To compile the TypeScript code and run the compiled JavaScript version:
```bash
npm run build
npm start
```

## Testing the API
You can test the API endpoints using Postman or any HTTP client.
### Example: Creating an Item
1. Open Postman and create a new request.
2. Select the **POST** method.
3. Enter the URL: `http://localhost:3000/items`
4. Go to the **Body** tab, select **raw**, and choose **JSON**.
5. Paste the following:

```json
{
  "name": "Apples",
  "quantity": 5
}
```

6. Click **Send**. A `201 Created` response will be returned with the new item data.
*(To test the other endpoints, simply change the HTTP method, URL, and request body as outlined in the API Endpoints section above).*

## Data Storage
This application uses an in-memory array to store shopping list items. While this is perfect for learning and testing a REST API, the data is not permanently stored and will be lost when the server restarts. In a production environment, this would be replaced with a database (e.g., PostgreSQL, MongoDB) to provide persistent storage.

## License
This project is licensed under the MIT License.
