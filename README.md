

# User Profile API Documentation

## Endpoint

`GET /user/profile`

---

## Description

Retrieves the authenticated user's profile information. Requires authentication token.

---

## Authentication

Requires valid JWT token in:
- Authorization header: `Bearer <token>`
- OR Cookie: `token=<token>`

---

## Responses

### Success

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "_id": "60c72b2f9b1d8c001c8e4b8a",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Authentication Error

**Status Code:** `401 Unauthorized`

**Example Response:**

```json
{
  "message": "No token provided"
}
```

---

# User Logout API Documentation

## Endpoint

`GET /user/logout`

---

## Description

Logs out the current user by clearing the authentication token cookie and blacklisting the current token.

---

## Authentication

Requires valid JWT token in:
- Authorization header: `Bearer <token>`
- OR Cookie: `token=<token>`

---

## Responses

### Success

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "message": "Logged out successfully"
}
```

### Authentication Error

**Status Code:** `401 Unauthorized`

**Example Response:**

```json
{
  "message": "No token provided"
}
```

---

## Notes

- After logout, the token is blacklisted and cannot be used for future requests
- The authentication cookie is cleared from