# Checkmate - Premium Chess Web Application

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer)
![Zustand](https://img.shields.io/badge/Zustand-4-brown)

Checkmate is a production-quality, frontend-only chess application built with modern web technologies. It features a clean architecture, premium UI/UX, and complete chess rules validation.

## 🚀 Features

- **Full Chess Engine**: Implements all official rules (Castling, En Passant, Promotion, etc.)
- **Premium UI/UX**: Glassmorphism, smooth animations, and beautiful dark mode.
- **Move History**: Full PGN support, jump to any move, and move list.
- **Customization**: Multiple board themes and piece styles.
- **Statistics**: LocalStorage-backed game statistics.
- **PWA Support**: Installable on desktop and mobile.
- **Responsive**: Works perfectly on all devices.

## 🛠️ Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Zustand**
- **Chess.js**

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Muhammadnvd/checkmate.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏛️ Architecture

The project follows a clean architecture separating the game engine from the UI.

```
src/
├── app/          # Next.js App Router
├── components/   # Reusable UI components
├── engine/       # Core chess logic (Engine class)
├── store/        # Zustand state management
├── types/        # TypeScript interfaces
├── utils/        # Helper functions
└── constants/    # Game constants and themes
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
