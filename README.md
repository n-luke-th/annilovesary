# Annilovesary

## Getting started

- create [`.env`](annilovesary/.env) file, required envs are listed in [`.example.env`](annilovesary/.example.env)
- on your terminal, run `firebase init` with **Firestore**, **Auth**, and **Realtime Database** enabled, and map each key-value pairs to [`/src/firebaseService/firebaseConfig.json`](annilovesary/src/firebaseService/firebaseConfig.json) file. You can also see the example file at [`firebaseConfig.example.json`](annilovesary/src/firebaseService/firebaseConfig.example.json).

## Useful CLIs

- `npm run dev` to start development server.
- `firebase emulators: start` to run all configured emulators. see emulators configs at [`firebase.json['emulators']](annilovesary/firebase.json)
- `firebase emulators: start --only firstore,auth` to run only auth and firestore emulators.
- `firebase init emulators` to force initialization of emulators.
- `npx @tailwindcss/upgrade --force` to auto upgrade tailwindcss.
