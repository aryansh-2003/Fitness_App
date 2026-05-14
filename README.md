# FitTrack — Elite Fitness & Wellness Platform

FitTrack is a premium, full-stack fitness application designed with a "Product-First" mindset. The goal was to move away from generic SaaS templates and build something that feels energetic, high-end, and professional—drawing inspiration from modern athletic brands like Gymshark and Nike.

## 🚀 Live Demo
**Live Link:** [https://fitness-app-one-sooty.vercel.app]

## 📸 Screenshots

### 1. Hero & Landing Page
![Landing Page](https://fitness-app-one-sooty.vercel.app/screenshot-landing.png)
*High-impact hero section with video background and bold typography.*

### 2. Multi-Step Onboarding
![Sign Up](https://fitness-app-one-sooty.vercel.app/screenshot-signup.png)
*Seamless 5-step registration flow with real-time validation and progress tracking.*

### 3. User Dashboard
![Dashboard](https://fitness-app-one-sooty.vercel.app/screenshot-dashboard.png)
*Comprehensive fitness overview featuring activity charts, quick actions, and personal metrics.*

---

> [!NOTE]
> **Recommended Viewing:** For the best experience, view the landing page on desktop to see the high-resolution video hero and scroll-triggered animations.

---

## 🛠 Tech Stack

### Frontend
- **React 19 (Vite):** Leveraging the latest React features for high-performance rendering.
- **Tailwind CSS 4:** Utilized for a strict utility-first design system with custom theme tokens.
- **Framer Motion:** Powering all page transitions, multi-step auth slides, and micro-interactions.
- **Shadcn/UI:** Used as the foundation for accessible, high-quality components like Cards, Buttons, and Modals.
- **Zod + React Hook Form:** Strict schema validation for the complex 5-step onboarding flow.
- **Redux Toolkit:** Managing global authentication and user session state.

### Backend (Bonus Implementation)
- **Node.js & Express:** Scalable API architecture.
- **JWT & Axios:** Secure session management with cookie-based/header-based auth.
- **Cloudinary/Multer:** Handling profile picture uploads and optimization.

---

## 🎨 Design Decisions

### 1. The "Power" Palette
Instead of the standard "Startup Blue," I chose a **Cream (#fdfcf6), Onyx Black, and Crimson Red** palette. 
- **Cream:** Provides a premium, editorial feel that is easier on the eyes than pure white.
- **Red:** Used sparingly for CTA buttons and "active" states to evoke energy and urgency.

### 2. High-Fashion Typography
I used a combination of **Bold Italic Headers** and wide-tracked subheaders. This gives the app a "sporty-editorial" vibe, making the data feel more like a performance report and less like a spreadsheet.

### 3. UX-First Onboarding
The 5-step signup flow isn't just about data collection; it's about building a user profile. I implemented:
- **Immediate Feedback:** Password strength bars and real-time validation.
- **Visual Selection:** Goals and Activity levels are cards with icons, not boring dropdowns.
- **Success State:** A "Celebration" screen post-signup to trigger a dopamine hit before the user even enters the dashboard.

---

## 🏗 Component Architecture & Patterns

### 1. Multi-Step Form Pattern (Atomic Decomposition)
To avoid a "Mega-Component" for the signup flow, I decomposed the 5 steps into standalone components located in `src/components/SignUpSteps/`. 
- **The Wrapper:** `SignUp.jsx` manages the `step` state and the `AnimatePresence` wrapper.
- **The Steps:** Each step receives `register`, `errors`, and `watch` from the parent `react-hook-form` instance. This ensures the data remains centralized while the UI is decoupled.

### 2. Layout & Sidebar Strategy
The Dashboard uses a **Persistent Sidebar / Contextual Topbar** pattern. 
- On desktop, the sidebar is a fixed column for quick navigation.
- On mobile, it transforms into a slide-out drawer, while the topbar provides a "Quick Action" profile link.

### 3. Reusable UI Primitives
I strictly followed a "No-Ad-Hoc-Styles" rule. Every button, input, and card is a variant of the Shadcn/UI primitives. This ensures that if I want to change the border-radius of the entire app, I only change it in the `ui/` folder.

---

## 💻 Local Setup

1. **Clone the repo:**
   ```bash
   git clone [your-repo-link]
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd Frontend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `Frontend` root:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

---

## 📈 Future Roadmap
- [ ] **Dark Mode:** Adding a sophisticated midnight-blue theme toggle.
- [ ] **Social Integration:** Ability to share workout streaks to Instagram/Twitter.
- [ ] **WebSockets:** Live "Global Activity" feed on the dashboard.

---
Created with ❤️ by **[Aryansh Dixit]**
