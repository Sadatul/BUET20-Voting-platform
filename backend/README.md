# api routes

### user verification (GET)
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


### vote casting (POST)
http://localhost:5000/name/vote

* request = {
   "options":[
     "988ea80a-6148-4351-a4b9-c7a2556bd58a",
"9c89166e-ebe2-487e-82ec-021ef0e7577f",
"fa71b36d-c7fb-42e0-8a38-451fa10e9d23"]
}

* response = {
  "success": true,
  "message": "Vote successfully cast",
  "votedNames": [
    "Antakshari'20",
    "Bishorgo 20",
    "Bivishon (বিভিষণ) -20"
  ]
}

* response if user has cast vote to all the names before

{
  "success": false,
  "message": "You have already voted for all these names"
}

* response if user has cast vote to one of the names before

{
  "success": true,
  "message": "Vote successfully cast",
  "votedNames": [
    "Phoenix ২০/ফিনিক্স ২০"
  ]
}


### voting result (GET)

http://localhost:5000/name/result

- response will be the all the names sorted in descending order of their vote count

* response = {
  "success": true,
  "message": "Voting results retrieved successfully",
  "data": [
    {
      "id": "988ea80a-6148-4351-a4b9-c7a2556bd58a",
      "name": "Antakshari'20",
      "meaning": "...",
      "votes": 1
    },............... ]
}

* response if user wants to submit vote to the same names twice
