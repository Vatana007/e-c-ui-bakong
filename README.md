# 🛒 Bakong E-Commerce Store

Modern, minimalist E-Commerce storefront featuring a clean, human-crafted design with **Bakong KHQR** integration, dedicated full-page checkout (with Standard & Express delivery), and a **Laravel MySQL API** backend.

---

## 🌟 Key Features

* **4 Clean Product Cards**:
  * Sony WH-1000XM5 Wireless Headphones
  * Apple Watch Ultra 2 Titanium
  * Fujifilm X100VI Digital Camera
  * Keychron Q1 Pro Mechanical Keyboard
* **Clean, Human-Crafted Aesthetics**: Single-line concise descriptions, balanced whitespace, and dual currency support (**USD `$`** and **KHR `៛`**).
* **Slide-over Cart Drawer**: Real-time quantity adjustments, coupon discounts (e.g., `BAKONG10`), and cross-tab `localStorage` synchronization.
* **Full-Page Checkout (No Modals)**:
  * Dedicated 2-column checkout screen at `/checkout`.
  * **Delivery Speed Options**: Standard (Free / 2-3 business days) vs. Express ($5.00 / same-day priority courier).
  * **Bakong KHQR**: Integrated digital KHQR code with simulated scanner verification, credit card, and cash on delivery.
* **Order Confirmation (`/order-success`)**: Itemized receipt with printable summary and confirmed order ID.
* **Laravel Backend (`/backend`)**:
  * 2 tables: `categories` and `products`.
  * REST API endpoint: `GET /api/products`.
  * Pre-configured `DatabaseSeeder.php` for MySQL.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router v7
* **Backend**: Laravel 12 (PHP 8.2+), MySQL, Eloquent ORM

---

## 🚀 Quick Start Guide

### 1. Frontend Setup (React)
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

### 2. Backend Setup (Laravel)
```bash
# Navigate to the backend directory
cd backend

# Install PHP dependencies (if not already installed)
composer install

# Configure environment (.env is pre-set for MySQL database 'api_db')
# Run migrations and seed database
php artisan migrate:fresh --seed

# Start Laravel API server
php artisan serve
```
API will run at `http://127.0.0.1:8000/api/products`.
