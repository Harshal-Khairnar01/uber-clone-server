# Captain API Documentation

## Overview
RESTful API for managing captain (driver) accounts in the Uber-clone system. Built with Node.js, Express, and MongoDB.


## Authentication
JWT-based authentication implemented via:
- Bearer token in Authorization header
- HTTP-only secure cookies

## API Endpoints

## 1. Register Captain
**POST** `/api/captain/register`

### Request Body:
```json
{
  "fullname": {
    "firstname": "John",     // required, min 3 characters
    "lastname": "Doe"        // optional, min 3 characters if provided
  },
  "email": "john@example.com",  // required, must be valid email format
  "password": "password123",    // required, min 6 characters
  "vehicle": {
    "color": "Black",          // required, min 3 characters
    "plate": "ABC123",         // required, min 3 characters, must be unique
    "capacity": 4,             // required, min value 1
    "vehicleType": "car"       // required, enum: "car", "auto", "motorcycle"
  }
}
```

### Success Response (201):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",  // JWT token, valid for 1 day
  "captain": {
    "_id": "60c72b2f9b1d8c001c8e4b8a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"      // default status for new captains
  }
}
```

## 2. Login Captain
**POST** `/api/captain/login`

### Request Body:
```json
{
  "email": "john@example.com",    // required, must be valid email
  "password": "password123"       // required, min 6 characters
}
```

### Success Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",  // JWT token, valid for 1 day
  "captain": {
    "_id": "60c72b2f9b1d8c001c8e4b8a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
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

## 3. Get Captain Profile
**GET** `/api/captain/profile`

### Headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."  // required, JWT token
}
```

### Success Response (200):
```json
{
  "_id": "60c72b2f9b1d8c001c8e4b8a",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "inactive",
  "location": {                    // optional
    "latitude": 12.9716,
    "longitude": 77.5946
  }
}
```

## 4. Logout Captain
**GET** `/api/captain/logout`

### Headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."  // required, JWT token
}
```

### Success Response (200):
```json
{
  "message": "Logged out successfully!"
}
```

### Error Responses (for all endpoints):
```json
{
  "errors": [                            // Validation errors
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

```json
{
  "message": "Captain not found!"        // 404 error
}
```

```json
{
  "message": "Invalid email or password" // 401 error
}
```

```json
{
  "message": "Unauthorized access"       // 401 error
}
```