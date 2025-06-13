# User Login API Documentation

## Endpoint

`POST /user/login`

---

## Description

Authenticates a user with email and password. Returns a JWT token and user data upon successful login.

---

## Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email`: **string**, required, must be a valid email address
- `password`: **string**, required, minimum 6 characters

---

## Responses

### Success

**Status Code:** `200 OK`

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1d8c001c8e4b8a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

### Validation Error

**Status Code:** `400 Bad Request`

**Example Response:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 character long!",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Authentication Error

**Status Code:** `401 Unauthorized`

**Example Response:**

```json
{
  "message": "Invalid email or password"
}
```

---

## Notes

- The `token` can be used for authenticated requests.
- Passwords are securely compared and never returned in responses.