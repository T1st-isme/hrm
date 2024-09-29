# HRM System


## Technologies

### Frontend

- Next.js
- TailwindCSS
- shadcn/ui
- flowbite
- zustand
- zod
- react-hook-form

### Backend

- Nest.js
- Prisma
- MongoDB
- Cloudinary
- JWT



## Prerequisites

- Node.js
- VS Code or Any Code Editor
- **npm** or **yarn** or **bun**

## Installation

### Clone the repository

```bash
git clone https://github.com/T1st-isme/hrm.git
```

<details>
<summary> Frontend </summary>

## Go to the client directory

```bash
cd client
```

## Configure the environment variables

```bash
PORT =
```

## Install dependencies

```bash
npm install
or
yarn install
or
bun install
```

## Run the development server

```bash
npm run dev
or
yarn dev
or
bun dev
```

</details>

<details>

<summary> Backend </summary>

## Go to the server directory

```bash
cd server
```

## Configure the environment variables
<p>You can use the .env.example file to create the .env file</p>

**Detail of .env file**

```bash
DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

COOKIE_EXPIRES_TIME=
```


## Install dependencies

```bash
npm install
or
yarn install
or
bun install
```

## Run the development server

```bash
yarn start:dev
```

</details>
