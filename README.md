# Haven — Modern Real Estate Mobile Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB.svg?logo=react&logoColor=white)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Haven is a premier, production-grade cross-platform real estate exploration mobile application developed with React Native and TypeScript. It offers property seekers an immersive discovery experience featuring high-resolution photo galleries, comprehensive architectural specifications, amenity breakdowns, and direct agent connection channels.

---

## Overview

Haven streamlines the residential and commercial property acquisition journey. Built natively for both Android and iOS devices, it couples smooth 60fps gesture-driven transitions with detailed listing intelligence, interactive media sliders, and clean categorical filtering.

---

## Problem Statement

Traditional real estate platforms frequently overload users with cluttered interfaces, slow loading speeds, and fragmented property specifications. Haven resolves this by providing:
- Instant visual access to property details, amenities, and dimensions.
- Intuitive navigation tailored for touch interfaces and mobile ergonomics.
- Unified, modular architecture engineered to scale with cloud backends (Supabase ready).

---

## Features

- **Dynamic Property Discovery**: Browse curated residential listings, luxury villas, modern apartments, and commercial spaces with live filtering by category and status.
- **Detailed Property Dossier**: Inspect room layouts, square footage, parking allocations, verified status badges, and comprehensive property narratives.
- **Interactive Media Slider**: Smooth horizontal touch-enabled photo carousel with high-fidelity asset rendering.
- **Fullscreen Gallery Viewer**: Dedicated visual gallery mode for inspecting architecture, interiors, and floor plans.
- **Agent / Owner Card**: Direct communication hub displaying owner credentials, contact endpoints, and profile avatars.
- **Amenities Matrix**: Visual breakdown of essential amenities (Wi-Fi, swimming pool, 24/7 security, gymnasium, smart home automation).
- **Backend-Ready Architecture**: Pluggable service layer prepared for seamless Supabase or custom REST integration.

---

## User Roles

- **Property Seeker / Buyer**: Explores real estate listings, inspects high-resolution media galleries, reviews property metrics, and connects with listing agents.
- **Property Owner / Realtor**: Presents verified real estate assets with rich metadata, descriptions, pricing structures, and contact information.

---

## Technology Stack

- **Framework**: [React Native](https://reactnative.dev/) (v0.86.0)
- **Core Library**: [React](https://react.dev/) (v19.2.3)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.8)
- **Navigation**: [React Navigation](https://reactnavigation.org/) Native Stack (v7)
- **UI Components & Icons**: `react-native-vector-icons`, Custom modular design system
- **Gesture Handling & Animation**: `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`
- **Testing**: [Jest](https://jestjs.io/) & React Test Renderer

---

## Architecture

Haven follows clean separation of concerns and atomic component design principles:

```
[ App.tsx ]
     │
     ▼
[ AppNavigator ] (Native Stack Navigator)
     │
     ├──► PropertyListingScreen  (Home / Discovery feed & category filters)
     │         │
     │         ▼
     ├──► PropertyDetailsScreen  (Overview, Specs, Owner Card, Amenities)
     │         │
     │         ▼
     └──► PropertyGalleryScreen  (Fullscreen high-resolution photo gallery)
```

- **Screens**: Orchestrate layouts and consume data services.
- **Components**: Reusable, atomic UI elements (`PropertyCard`, `AmenitiesList`, `OwnerCard`, `GallerySlider`).
- **Services**: Abstracted data layer with mock stores and pluggable Supabase endpoints.
- **Theme**: Centralized design tokens (colors, typography, spacing, border radii).

---

## Project Structure

```
RealEstateApp/
├── android/                   # Native Android project configuration & Gradle scripts
├── ios/                       # Native iOS workspace configuration
├── src/
│   ├── assets/                # Local images, icons, and graphic resources
│   ├── components/            # Atomic, reusable UI presentation components
│   ├── constants/             # Application constants and status enums
│   ├── data/                  # Property data catalog and image registries
│   ├── hooks/                 # Custom React application hooks
│   ├── navigation/            # Stack navigator and route type declarations
│   ├── screens/               # Main application screen views
│   ├── services/              # Property data services and Supabase clients
│   ├── styles/                # Global style sheets and helpers
│   ├── theme/                 # Design system tokens and palette
│   ├── types/                 # TypeScript interfaces and domain models
│   └── utils/                 # Formatting and mathematical utilities
├── App.tsx                    # Application root entry point
├── index.js                   # React Native application registry
└── package.json               # Dependencies and build scripts
```

---

## Prerequisites

Ensure the following tools are installed on your workstation:

- [Node.js](https://nodejs.org/) (v18 or higher recommended, LTS)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java Development Kit (JDK 21)](https://www.oracle.com/java/technologies/downloads/) (or Android Studio bundled JBR)
- [Android Studio](https://developer.android.com/studio) with Android SDK and build-tools configured

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhartiaditya730-ux/real-estate-mobile-app.git
   cd real-estate-mobile-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

Copy the provided environment example file:

```bash
cp .env.example .env
```

Configure your environment settings in `.env`:

```env
# Supabase Configuration (Optional for cloud sync)
SUPABASE_URL=
SUPABASE_ANON_KEY=

# API Configuration
API_BASE_URL=
```

> **Note**: Never commit your actual `.env` file with production keys to version control.

---

## Running the Application

### 1. Start Metro Bundler
In your terminal, start the Metro JavaScript packager:
```bash
npm start
```

### 2. Launch on Android
With an Android emulator active or physical device connected via USB:
```bash
npm run android
```

### 3. Launch on iOS (macOS required)
```bash
npx pod-install
npm run ios
```

---

## Build Instructions

### Generate Android Debug APK
```bash
cd android
./gradlew assembleDebug
```
The compiled APK will be generated at `android/app/build/outputs/apk/debug/app-debug.apk`.

### Generate Android Release Bundle (AAB)
```bash
cd android
./gradlew bundleRelease
```

---

## Testing

Run the test suite using Jest:
```bash
npm test
```

Run linter validation:
```bash
npm run lint
```

---

## GitHub & Contributing

Contributions, feedback, and feature proposals are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m "Add some AmazingFeature"`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

**Aditya Bharti**  
GitHub: [@bhartiaditya730-ux](https://github.com/bhartiaditya730-ux)  
Email: [bhartiaditya730@gmail.com](mailto:bhartiaditya730@gmail.com)
