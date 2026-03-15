# E2E testing

This is a copy of `03-integration-testing` where we'll remove the previous tests and install Cypress for E2E-testing.

## Installation

### Backend

```zsh
cd backend
npm install
npm run server
```

### Frontend

```zsh
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Cypress

```zsh
cd frontend
npm install cypress --save-dev
npx cypress open
```
