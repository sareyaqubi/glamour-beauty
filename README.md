# 💄 Glamour Beauty Store

A production-grade React e-commerce platform for beauty and cosmetic products. Built with modern state management, a beautiful pink-themed UI system, and full dark/light mode support.

## ✨ Features

- **Product Browsing** with search, category filter, and layout toggle
- **Product Details** page with image gallery, ratings, and full info
- **Shopping Cart** with add/remove, quantity controls, and checkout summary
- **Settings Panel** with theme, language, and layout preferences
- **Dark/Light Theme** with pink luxury design and glassmorphism
- **Persian/English** language support
- **Responsive** mobile-first design
- **Persistent** cart and settings via localStorage
- **Skeleton loading** states and smooth animations

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Redux Toolkit | Cart state management |
| React Query | Server state & caching |
| Context API + useReducer | Settings state management |
| React Router DOM v6 | Routing |
| Tailwind CSS 3 | Styling |
| react-hot-toast | Notifications |
| DummyJSON API | Product data |

## ⚙️ Setup

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── app/                    # Redux store
│   └── store.js
├── features/
│   └── cart/              # Cart feature (Redux slice + components)
│       ├── cartSlice.js
│       ├── CartItem.jsx
│       └── CartPage.jsx
├── settings/              # Settings (Context API + Reducer)
│   ├── SettingsContext.jsx
│   └── settingsReducer.js
├── products/              # Products (API service + React Query hooks)
│   ├── productService.js
│   └── useProducts.js
├── components/            # Reusable UI components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── Button.jsx
│   ├── Skeleton.jsx
│   ├── Loader.jsx
│   └── Footer.jsx
├── pages/                 # Route pages
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   └── Settings.jsx
├── hooks/                 # Custom hooks
│   └── useSettings.js
├── styles/                # Global styles
│   └── index.css
├── App.jsx                # Root with routing
└── main.jsx               # Entry point with providers
```

## 🌐 API

Uses [DummyJSON](https://dummyjson.com/) for product data.
