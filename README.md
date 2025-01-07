# Exclusive E-commerce App

Welcome to the Exclusive E-commerce App! This project is a comprehensive e-commerce platform built with Next.js, React, and MongoDB. It offers a seamless shopping experience with a wide range of products across various categories.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with NextAuth.js
- Product listing and detailed product pages
- Shopping cart functionality
- Admin panel for managing products and users
- Responsive design
- Integration with Cloudinary for image uploads
- Toast notifications for user feedback

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/e-commerce-app.git
   cd e-commerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_cloudinary_preset_name
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Register or log in to your account.
- Browse products by category or search for specific items.
- Add products to your cart and proceed to checkout.
- Admin users can manage products and users through the admin panel.

## Folder Structure

```
/src
  ├── /app
  │   ├── /api
  │   ├── /auth
  │   ├── /user
  │   ├── /products
  │   ├── /about
  │   ├── /contact
  │   ├── /layout.js
  │   ├── /page.js
  │   ├── /globals.css
  ├── /components
  │   ├── /adminLinks
  │   ├── /border
  │   ├── /category
  │   ├── /categoryItems
  │   ├── /footer
  │   ├── /loader
  │   ├── /navbar
  │   ├── /productList
  │   ├── /relatedProducts
  │   ├── /searchContainer
  │   ├── /servicesComponents
  │   ├── /wrapper
  ├── /context
  ├── /models
  ├── /providers
  ├── /utils
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
