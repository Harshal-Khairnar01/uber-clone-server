# User Registration API Documentation

## Endpoint

`POST /user/register`

---

## Description

Registers a new user with the provided details. Validates input and returns a JWT token and user data upon successful registration.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname`: **string**, required, minimum 3 characters
- `fullname.lastname`: **string**, optional, minimum 3 characters if provided
- `email`: **string**, required, must be a valid email address
- `password`: **string**, required, minimum 6 characters

---

## Responses

### Success

**Status Code:** `201 Created`

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
      "msg": "First Name must be 3 character long!",
      "param": "fullname.firstname",
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

## Notes

- The `token` can be used for authenticated requests.
- Passwords are securely hashed before storage.
- Email must be unique.

---