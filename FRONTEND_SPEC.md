# Frontend Technical Specification for Photo Storage Backend

## 1. Overview

This document outlines the technical specification for a frontend application that will serve as a client for the existing Photo Storage Backend. The backend is a FastAPI application that provides services for uploading, viewing, and managing photos and associated hashtags. The frontend should be a single-page application (SPA) that provides a user-friendly interface to interact with the backend services.

## 2. Tech Stack

-   **Framework**: React (with TypeScript) or Vue.js. React is preferred.
-   **Styling**: A modern CSS framework like Tailwind CSS, or a component library like Material-UI or Ant Design.
-   **State Management**: React Query or a similar library for managing server state (caching, refetching, etc.).
-   **HTTP Client**: Axios or the built-in `fetch` API.
-   **Build Tool**: Vite or Create React App.

## 3. Authentication

Authentication is handled via an OIDC provider. The backend exposes a `/api/v1/auth/login` endpoint that initiates the OIDC flow.

-   The user should be redirected to the `/api/v1/auth/login` endpoint when they click a "Login" button.
-   After successful login with the OIDC provider, the user will be redirected back to a callback URL handled by the backend (`/api/v1/auth/callback`).
-   The backend will then provide a JWT access token. The frontend should store this token (e.g., in `localStorage` or a secure cookie) and use it in the `Authorization` header for all subsequent requests to protected endpoints (`Bearer <token>`).
-   The frontend should provide a way for users to log out, which would involve simply deleting the stored token.
-   There is a `/api/v1/auth/me` endpoint that returns the current user's information, which can be used to verify the token and get user details.

## 4. API Endpoints

The backend API is available under the `/api/v1` prefix.

### 4.1. Authentication (`/api/v1/auth`)

-   `GET /login`: Initiates the OIDC login flow. The frontend should redirect the user to this endpoint.
-   `GET /callback`: The OIDC provider redirects to this endpoint after successful authentication. The backend handles this, and the frontend doesn't need to interact with it directly, but it will receive the JWT token from this flow.
-   `GET /me`: Retrieves the currently authenticated user's information. Requires a valid JWT token.

### 4.2. Photos (`/api/v1/photos`)

-   `POST /`: Uploads a new photo.
    -   **Request**: `multipart/form-data`
        -   `file`: The photo file to upload.
        -   `hashtags`: A comma-separated string of hashtags (e.g., "travel,summer,beach").
    -   **Response**: The created photo object.
-   `GET /`: Retrieves all photos for the authenticated user.
    -   **Query Parameters**:
        -   `hashtag` (optional): A hashtag name to filter the photos by.
    -   **Response**: An array of photo objects.
-   `GET /{photo_id}`: Retrieves a single photo by its ID.
    -   **Response**: The photo object.
-   `DELETE /{photo_id}`: Deletes a photo by its ID.
    -   **Response**: A confirmation message.

### 4.3. Hashtags (`/api/v1/hashtags`)

-   `POST /`: Creates a new hashtag.
    -   **Request Body** (JSON):
        ```json
        {
          "name": "new-hashtag"
        }
        ```
    -   **Response**: The created hashtag object.
-   `GET /`: Retrieves all existing hashtags.
    -   **Response**: An array of hashtag objects.
-   `GET /search`: Searches for hashtags.
    -   **Query Parameters**:
        -   `q`: The search query.
    -   **Response**: An array of hashtag objects matching the query.

## 5. Data Models

### 5.1. User

```json
{
  "id": 1,
  "external_id": "some-oidc-subject",
  "username": "user@example.com",
  "created_at": "2025-10-10T12:00:00Z"
}
```

### 5.2. Photo

```json
{
  "id": 1,
  "owner_id": 1,
  "public_url": "https://your-s3-bucket.s3.amazonaws.com/photo.jpg",
  "s3_key": "photo.jpg",
  "created_at": "2025-10-10T12:00:00Z",
  "hashtags": [
    {
      "id": 1,
      "name": "travel"
    }
  ]
}
```

### 5.3. Hashtag

```json
{
  "id": 1,
  "name": "travel"
}
```

## 6. Features

The frontend application should implement the following features:

-   **Login/Logout**: A clear login button that initiates the OIDC flow. After login, a logout button should be available.
-   **Photo Gallery**: A main view that displays all of the user's photos in a grid or masonry layout.
-   **Photo Upload**: A form that allows users to upload a new photo. The form should include a file input and a text input for hashtags.
-   **Photo Details**: Clicking on a photo in the gallery should lead to a detailed view of the photo, showing the image, its creation date, and associated hashtags.
-   **Photo Deletion**: A button in the photo details view to delete the photo.
-   **Hashtag Filtering**: The gallery view should allow filtering photos by clicking on a hashtag, or selecting from a list of available hashtags.
-   **Hashtag Management**: A separate view to list all hashtags. This view could also allow for creating new hashtags.
-   **Hashtag Search**: An input field to search for hashtags.

## 7. UI/UX Suggestions

-   The application should be responsive and work well on both desktop and mobile devices.
-   Implement "infinite scrolling" or pagination for the photo gallery to handle a large number of photos.
-   Show loading indicators while data is being fetched from the backend.
-   Provide clear feedback to the user on success or failure of operations (e.g., photo upload, deletion).
-   The design should be clean and modern, with a focus on the photos themselves.
