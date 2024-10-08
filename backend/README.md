
# api routes

### user verification 
- http://localhost:5000/admin/auth/link
- Example: 
- http://localhost:5000/admin/auth/0e7e806e1a7aed667b0b81433f8319bc%3A5a76010ca26cf9df5f73ecbf3e007a01680502312432a6853a46a18c2dd7d18f97a4bb2a74873a36ecd47d6324f741d5

* response
- {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjIwMTUwMzAsImVtYWlsIjoiMjAxNTAzMEB1cnAuYnVldC5hYy5iZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MjgzNjU1MTMsImV4cCI6MTcyODM3MjcxM30.0_PGh0C371dVYeyRiF1olEQZ9ja-scfPeRniT0UXzSI",
  "isAdmin": false
}

* response if fails

- {
  "success": false,
  "message": "Not verified"
}