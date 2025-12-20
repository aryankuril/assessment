# Next.js Interactive UI & E-Commerce Assignment

This project is built using **Next.js**, **React**, **GSAP**, **Framer Motion**, **Tailwind CSS**, and **Firebase**.  
It contains multiple interactive UI components and a complete e-commerce flow with cart, payment simulation, and data storage.

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **GSAP + ScrollTrigger**
- **Framer Motion**
- **Firebase (Firestore)**
- **Shopify Demo Store API**

---

## 📌 Task 1: 3D Scroll Rotation Carousel

### Description
A scroll-based **3D rotating image carousel** where images are arranged in a circular ring and rotate smoothly on scroll.

### Features
- 3D ring layout using `translateZ` and `rotateY`
- Scroll-based animation using GSAP ScrollTrigger
- Touch & drag rotation (mobile + desktop)
- Fully responsive (different radius for mobile & desktop)
- Caption text shown below each card

### Key Concepts Used
- GSAP `ScrollTrigger`
- CSS `preserve-3d`
- Pointer events for drag interaction
- Responsive animation logic

---

## 📌 Task 2: Interactive 3D Hover Card Stack

### Description
A stacked card UI that expands into a **3D fan layout** on hover (desktop) and auto-activates on scroll (mobile).

### Features
- Card stack depth effect (Z-axis)
- Hover interaction for desktop
- Auto-trigger animation for mobile
- Individual card activation with labels
- Smooth easing and shadows for depth

### Key Concepts Used
- GSAP timelines
- Intersection Observer
- Conditional logic for mobile vs desktop
- 3D transforms with perspective

---

## 📌 Task 3: Scattered 3D Cards with Directional Entry

### Description
Cards are scattered in 3D space and **enter the center one by one from different directions** as the user scrolls.

### Entry Pattern
1. Right
2. Top
3. Left
4. Bottom  
(repeats in sequence)

### Features
- Scroll-pinned animation section
- Center-focused card transition
- Background cards remain scattered in 3D
- Smooth reverse scroll support
- Depth, rotation, and scale transitions

### Key Concepts Used
- GSAP Timeline + ScrollTrigger
- 3D layout preservation
- Dynamic entry direction logic
- Performance-optimized transforms

---

## 📌 Task 4: E-commerce Flow (Logic Implementation)

### Description
A complete **e-commerce flow** implemented using a **Shopify demo store**.

### Features
- Fetch products from Shopify demo store
- Product listing page
- Individual product detail page
- Add to Cart functionality
- Update product quantity
- Remove items from cart
- Cart state persists on page refresh

### Cart Persistence
- Cart data is stored in **localStorage**
- Automatically restored on page reload

### State Management
- Clean and structured logic
- Centralized cart handling
- Reusable helper functions

---

## 📌 Task 5: Payment Flow & Firebase Storage (Addon of Task 4)

### Description
A simulated payment system with order data stored in **Firebase Firestore**.

### Payment Simulation
- Payment Success
- Payment Failure / Cancellation
- No real payment credentials used

### Data Stored in Firebase
- User data (guest users allowed)
- Cart data before payment
- Order details:
  - Product list
  - Total amount
  - Payment status (success / failed)
  - Timestamp

### Firebase Structure
- Well-organized collections
- Clear separation of users and orders
- Easy to scale and maintain

---

## 📂 Project Setup

### 1️⃣ Install Dependencies
```bash
npm install
