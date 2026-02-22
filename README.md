# Frontend E-Commerce Project

## 📖 Project Overview
This project is a complete, responsive frontend e-commerce application built as part of the Full Stack Node.js Amit Learning curriculum. It integrates with the [DummyJSON API](https://dummyjson.com/) to implement essential e-commerce features including user authentication, product browsing, cart management, and a functional admin dashboard.

## 🚀 Features
- **Authentication**: Login and User Registration (mocked) with JWT token persistence in `localStorage`.
- **Products**: Browse, search, filter by category, and sort products with pagination.
- **Product Details**: View individual product details via a dedicated page.
- **Cart Management**: Add products to cart and manage cart totals (mocked functionality).
- **Admin Dashboard**: A functional CRUD interface with sections for managing Products, Carts, and Users.
- **Responsive Design**: Built with React Bootstrap, ensuring a seamless experience across desktop, tablet, and mobile devices.

## 💻 Tech Stack
- **React.js** (v19)
- **Vite** (Build Tool)
- **React Router DOM** (Routing & Protected Routes)
- **React Bootstrap & Bootstrap 5** (UI Components & Styling)
- **Axios** (API Requests)
- **Context API** (Global State Management for Authentication)

## 🛠️ Installation Steps

To run this project locally on your machine, follow these steps:

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <your-github-repo-url>
   ```

2. **Navigate into the project directory**:
   ```bash
   cd "Frontend E-Commerce Project"
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173/` (or the port provided in your terminal).

## 🔗 Demo Link
*Insert your live Vercel deployed link here once deployed:*
[Live Demo](#)

## 📝 Notes & Known Issues
- **Mock Functionality**: Because this frontend communicates with the DummyJSON API, Create, Update, and Delete (CRUD) operations for Products, Users, and Carts are *simulated*. The API returns successful responses as if the data was modified, but the changes do not persist on the server side upon refresh.
- **Cart Additions**: The "Add to Cart" functionality currently triggers a mock UI alert due to the limitations of modifying DummyJSON carts via the server.
- **Registration**: The registration endpoint will return a success state but won't permanently add a new user to the DummyJSON database. To log in during testing, use one of the default DummyJSON users (e.g., Username: `emilys`, Password: `emilyspass`).
