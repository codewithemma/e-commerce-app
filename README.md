# Exclusive E-commerce App

Welcome to the Exclusive E-commerce App repository! This project is a comprehensive e-commerce platform built with Next.js, React, and MongoDB. It offers a wide range of features including user authentication, product management, cart functionality, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Google and Credentials)
- Product Management (CRUD operations)
- Cart Management
- Responsive Design
- Dark Mode Support
- Admin Dashboard
- User Profile Management
- Order Management

## Technologies Used

- Next.js
- React
- MongoDB
- Mongoose
- NextAuth.js
- Cloudinary
- Tailwind CSS
- Sonner (for notifications)
- FontAwesome (for icons)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-app.git
   cd e-commerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   MONGO_URI=your_mongo_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_cloudinary_preset_name
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```plaintext
.
├── src
│   ├── app
│   │   ├── api
│   │   ├── auth
│   │   ├── user
│   │   ├── products
│   │   ├── contact
│   │   ├── about
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── globals.css
│   ├── components
│   │   ├── navbar
│   │   ├── footer
│   │   ├── relatedProducts
│   │   ├── category
│   │   ├── productList
│   │   ├── loader
│   │   ├── border
│   ├── context
│   │   ├── ThemeContext.jsx
│   │   ├── CartContext.jsx
│   ├── models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   ├── providers
│   │   ├── ThemeProvider.jsx
│   │   ├── CartProvider.jsx
│   ├── utils
│   │   ├── auth.js
│   │   ├── connect.js
│   │   ├── db.js
│   │   ├── api.js
│   ├── pages
│   │   ├── index.js
│   │   ├── _app.js
│   │   ├── _document.js
│   ├── public
│   │   ├── assets
│   ├── styles
│   │   ├── globals.css
│   │   ├── Home.module.css
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── jsconfig.json
│   ├── next.config.mjs
│   ├── package.json
│   ├── README.md
```

## Environment Variables

The following environment variables need to be set in your `.env.local` file:

- `MONGO_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `GOOGLE_ID`: Google OAuth Client ID
- `GOOGLE_SECRET`: Google OAuth Client Secret
- `NEXT_PUBLIC_CLOUDINARY_PRESET_NAME`: Cloudinary preset name for image uploads

## Scripts

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for linting errors.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
