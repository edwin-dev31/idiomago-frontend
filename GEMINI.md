# IdiomaGo Frontend Analysis

This document provides a summary of the IdiomaGo frontend project, including its architecture, technologies, and key functionalities.

## 1. Core Task

The primary goal of this project is to provide a modern, user-friendly web interface for the IdiomaGo language learning platform. It enables users to discover, save, practice, and manage vocabulary across multiple languages, with a strong emphasis on AI-powered features and a clean user experience.

## 2. Technologies Used

- **Framework/Library:** React (with Vite for tooling)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui for components and Tailwind CSS Animate for animations.
- **Routing:** `react-router-dom` for Single Page Application (SPA) navigation.
- **HTTP Client:** Axios for making requests to the backend API.
- **State Management:** A combination of React hooks (`useState`, `useContext`) and custom hooks for managing component and application-level state.
- **Linting:** ESLint for code quality.

## 3. Architecture

- **Component-Based:** The application follows a standard React component-based architecture.
- **Directory Structure:**
    - `src/components`: Contains reusable UI components, separated into `ui` (generic components like buttons, dialogs), `layout` (structural components like sidebar, menu), and feature-specific components (`wordCard`).
    - `src/pages`: Each route in the application has a corresponding component in this directory (e.g., `HomePage`, `DashboardPage`, `LoginPage`).
    - `src/lib`: Holds the core application logic, including:
        - `hooks`: Custom hooks abstracting data fetching, authentication, and state management for features like words, categories, and user favorites.
        - `axios.ts`: Centralized Axios instance configuration.
        - `utils.ts`: Utility functions.
    - `src/types`: TypeScript type definitions for data structures used throughout the application (e.g., `WordView`, `User`, `Category`).
- **Client-Server Model:** This is a pure frontend application that communicates with a separate backend service (Spring Boot/Java) via a RESTful API for all data operations.
- **Protected Routes:** The application uses a `ProtectedRoute` component to manage access to pages that require user authentication, redirecting unauthenticated users to the login page.

## 4. Business Rules

- **Authentication:** Users must be authenticated to access most features. Unauthenticated users have limited access (e.g., viewing the home page, logging in).
- **Authorization:** Authentication is handled via JWTs obtained through email/password login or OAuth 2.0 providers (Google, GitHub).
- **Email Verification:** New users must verify their email address before they can log in.
- **Word Management:**
    - Users can save words to their personal collection ("My Words").
    - Words can be favorited for quick access.
    - Users can create custom categories to organize their words.
- **AI Integration:** The application leverages an AI service (via the backend) to generate new words and translations.

## 5. Primary Functionalities

- **User Authentication:** Register, log in (with email or OAuth), and log out.
- **Word Discovery:** Search for words and view them as flashcards.
- **Personal Vocabulary Management:**
    - View a dashboard of all words.
    - View a dedicated list of "My Words" (words the user has created).
    - View a list of favorited words.
- **Save Words:**
    - Save a single word with its translation.
    - Use an AI-powered form to generate and save multiple words at once.
- **Filtering and Searching:** Filter words by language and category, and search by text.

## 6. Secondary Functionalities

- **User Profile:** Update user information and profile picture.
- **Theme Customization:** Switch between light and dark modes.
- **Word Interaction:**
    - Edit translations of existing words.
    - Share words.
    - React to words (e.g., with emojis).
- **Responsive Design:** A mobile-friendly menu and layout for smaller screens.
- **Notifications:** Toast notifications for user actions (e.g., "Word saved successfully").

## 7. Important Aspects

- **Custom Hooks:** The project makes extensive use of custom hooks (`useWords`, `useAuth`, `useCategories`) to encapsulate and reuse logic, which is a key architectural pattern.
- **Separation of Concerns:** The code is well-organized, with a clear distinction between UI components, application pages, and business logic/data fetching.
- **API Abstraction:** All interactions with the backend API are funneled through the configured Axios instance and abstracted by custom hooks, making components cleaner.
- **Type Safety:** The use of TypeScript ensures type safety, which is crucial for maintaining a large codebase and preventing common runtime errors.
