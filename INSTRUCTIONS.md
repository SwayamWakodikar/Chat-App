# ChatApp Setup Instructions

The application code has been updated to provide a full-stack chat experience.
To get it running, you need to install a few dependencies manually as requested.

## Server
1. Navigate to the `server` directory.
2. Install `bcrypt` (optional but recommended for password hashing, currently using plain text for demo simplicity):
   ```bash
   npm install bcrypt
   ```
   *Note: If you want to use bcrypt, uncomment the lines in `server/src/controllers/authController.js`.*

3. Start the server:
   ```bash
   npm run dev
   ```
   (Or `node server.js` if you don't have nodemon)

## Client
1. Navigate to the `client` directory.
2. Install `uuid` (Required for unique keys in list):
   ```bash
   npm install uuid
   ```
3. Start the client:
   ```bash
   npm run dev
   ```

## Features Implemented
- **Authentication**: Login and Register pages.
- **Real-time Chat**: Socket.IO integration for instant messaging.
- **Database**: MongoDB storage for users and messages.
- **UI**: Sidebar with user list, Chat window with history.

## Notes
- The default `server` port is 5000.
- The `socket` server runs on port 9000.
- Make sure MongoDB is running and your `.env` contains a valid `MONGO_URI`.
