# SpendWise 

SpendWise is a modern, lightweight expense tracking application built with **React Native** and **Expo**. It focuses on providing a clean user interface and meaningful visual insights to help users manage their personal finances effectively.

## Key Features

*   **Financial Dashboard:** Quick overview of total balance, monthly income, and recent spending.
*   **Visual Statistics:** Beautiful SVG-based donut charts and category breakdown progress bars.
*   **Transaction Management:** Log expenses with titles, amounts, categories, and optional notes.
*   **Advanced History:** Search through past transactions with real-time filtering and category grouping.
*   **Dark Mode Support:** Fully themed UI that respects system settings with manual override.
*   **Data Persistence:** Uses `AsyncStorage` to keep your data safe locally on your device.
*   **Data Export:** Export your expense history to a CSV file for external analysis.
*   **Haptic Feedback:** Tactile responses for a premium, high-quality mobile experience.

## Architecture & Patterns

The application followed the **layered modular architecture**, which is built with a focus on **Separation of Concerns**, **Maintainability**, and **Performance**:

*   **State Management (Context API):** I implemented the **Provider Pattern** using React's Context API to manage global state for both Theme and Expense data. This avoids "prop-drilling," making the data accessible anywhere in the component tree while keeping the state management centralized.
*   **Logic Abstraction (Custom Hooks):** Business logic—such as calculating category totals, handling persistence, and managing themes—is abstracted into custom hooks (`useExpenses`, `useTheme`). This keeps the UI components "dumb" and focused solely on rendering and user interaction.
*   **Modular File Structure:**
    *   **Context:** Centralized state and persistence logic.
    *   **Components:** Small, reusable UI units (StatCards, CustomAlerts).
    *   **Utils:** Pure helper functions for formatting, validation, and data grouping.
    *   **Navigation:** Nested structure combining Stack and Tab navigators for a fluid and intuitive flow.
*   **Persistence Layer:** An effect-based synchronization system that automatically persists the application state to `AsyncStorage` whenever data changes, ensuring no data loss between sessions.

## Tech Stack

*   **Framework:** React Native (Expo SDK 54)
*   **Navigation:** React Navigation (Stack & Bottom Tabs)
*   **Icons:** Expo Vector Icons (Ionicons)
*   **Animations:** Lottie React Native (for a smooth, animated splash screen)
*   **Storage:** React Native Async Storage
*   **Charts:** Custom SVG implementation using `react-native-svg`
*   **Utils:** Expo Haptics, Expo FileSystem, Expo Sharing

## Project Structure

```text
src/
 ├── assets/          # Images, Icons, and Lottie animations
 ├── components/      # Reusable UI components (StatCard, FAB, etc.)
 ├── constants/       # Global styles (colors, spacing, typography)
 ├── context/         # State management (Theme and Expense contexts)
 ├── navigation/      # Stack and Tab navigation configuration
 ├── screens/         # Main application screens
 └── utils/           # Helper functions (formatting, validation, exports)
```

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd MyExpenseApp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the project:**
    ```bash
    npx expo start
    ```

4.  **Run on a device:**
    Scan the QR code in the **Expo Go** app (iOS/Android), or press `a` for Android or `i` for iOS to use a simulator.

## Key Design Decisions

*   **Performance Optimization:** I used `useMemo` for heavy operations, like calculating chart segments and filtering transaction history, ensuring the app remains responsive (60fps) even as data grows.
*   **Custom SVG Implementation:** Instead of relying on heavy third-party charting libraries, I built the Donut Chart using raw SVGs. This provided full control over styling and significantly reduced the application's bundle size.
*   **UX-First Approach:** Integrated haptic feedback for key user actions (saving, deleting) and a floating bottom tab bar design to give the app a modern "fintech" feel.
