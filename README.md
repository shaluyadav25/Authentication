# User account flow

A React + Vite demo with account registration, sign-in, a protected dashboard,
and sign-out. User records are stored by JSON Server in `db.json`.

## Run locally

Start the API and frontend in separate terminals:

```sh
npm run server
npm run dev
```

Open the local URL printed by Vite. The app starts at the registration form;
after registering, sign in with the same email and password to open the
dashboard.

## Demo limitation

This project uses JSON Server as a local mock API. It stores passwords in
`db.json` and the frontend session in browser local storage, so it is not
suitable for production or real user credentials. A production application
needs a trusted backend, password hashing, and server-validated sessions.
"# Authentication" 
