# Smart CRM: AI-Powered Crop Residue Management Platform 🚜

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) **Sustainable Farming, Smarter Monitoring.**

A mobile-first platform connecting farmers, Custom Hiring Centres (CHCs), and government agencies to efficiently manage Crop Residue Management (CRM) machinery in real-time, aiming to reduce stubble burning and promote sustainable agriculture in India.

---

## 🎯 Problem Statement

Despite the distribution of numerous CRM machines, challenges like under-utilization, idle equipment, and lack of accountability persist, contributing to continued stubble burning. Smart CRM provides a technology-driven solution for transparent tracking, optimized usage, and data-driven policy insights.

---

## ✨ Key Features

* **Machine Discovery:** Farmers can view nearby available CRM machines (Seeders, Balers, Harvesters, etc.) on an interactive map. 🗺️
* **Smart Booking:** Book machines directly via the app or through local agents. Includes cost/time estimation. 📅
* **Live Tracking:** Real-time location tracking of booked machines with ETA and status updates. 📍
* **Agent Mode:** Enables local agents to facilitate bookings for farmers with limited digital access, supporting offline functionality. 🧑‍🌾
* **Usage Analytics (for CHCs/Admins):** Dashboards displaying utilization rates, idle time, fuel efficiency, and policy heatmaps. 📊
* **AI Recommendations (Demo):** Voice-based input allows farmers to describe their task (e.g., "plough 5 acres") and receive machine recommendations (frontend demo). 🧠
* **Multilingual Support:** Currently supports English and Hindi. 🌐

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **UI Library:** [Shadcn UI](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router](https://reactrouter.com/)
* **State Management:** (Mention if using Zustand, Context API, etc. - currently uses React Context for Language)
* **Mapping:** [React Leaflet](https://react-leaflet.js.org/)
* **Speech Recognition:** Web Speech API (Browser built-in)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd <your_project_directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    The application should now be running, typically at `http://localhost:8080` (check your Vite config).

**How to Use:**

1.  Replace `<YOUR_REPOSITORY_URL>` with the actual URL of your Git repository.
2.  Replace `<your_project_directory>` with the name of the folder created after cloning.
3.  Add a link to a screenshot or GIF if you have one.
4.  Fill in or remove the optional "Contributing" and "License" sections as needed.
5.  If you are using a specific state management library besides React Context (like Zustand, Redux), mention it in the Technology Stack.
6.  Save this content as `README.md` in the root directory of your project.