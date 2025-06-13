// ...existing code...

# Captain Registration API Documentation 

## Endpoint

`POST /api/captain/register`

---

## Description

Registers a new captain (driver) with their vehicle details. Returns authentication token upon successful registration.

---

## Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"  // optional
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car" // one of: "car", "auto", "motorcycle"
  }
}
```

### Validation Rules

- Email must be valid format
- First name must be at least 3 characters
- Password must be at least 6 characters
- Vehicle color must be at least 3 characters
- Vehicle plate must be at least 3 characters and unique
- Vehicle capacity must be at least 1
- Vehicle type must be one of: "car", "auto", "motorcycle"

---

## Responses

### Success

**Status Code:** `201 Created`

**Example Response:**

```json
{
  "token": "jwt.token.here",
  "captain": {
    "_id": "60c72b2f9b1d8c001c8e4b8a",
    "fullname": {
      "firstname": "John",  
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

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
    }
  ]
}
```

### Conflict Error

**Status Code:** `400 Bad Request`

**Example Response:**

```json
{
  "message": "Captain already exists!"
}
```

---

## Notes

- A new captain starts with "inactive" status by default
- The password is hashed before storing in the database
- The authentication token expires in 1 day
- Vehicle plate numbers must be unique