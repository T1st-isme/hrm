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

In here I have a sample database in mongodb atlas, cloudinary, and jwt secret, you can use it or create your own.

**Detail of .env file**

```bash
DATABASE_URL="mongodb+srv://admin:admin@hrm.dpupm.mongodb.net/hrm?retryWrites=true&w=majority"

JWT_SECRET="valorantistrash"

CLOUDINARY_CLOUD_NAME="dzyf7iccb"
CLOUDINARY_API_KEY="861486826217416"
CLOUDINARY_API_SECRET="Xv9ndXZSjG7J4TWS1wLvx62Iq2w"

COOKIE_EXPIRES_TIME=30

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

## Demo account

**Admin**

- Email: test@dev.com
- Password: 123123123

**User**

- Email: t1st@dev.com
- Password: 123123123

## Contact

- Email: trientrung102@gmail.com
