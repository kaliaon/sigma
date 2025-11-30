# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sigma is a full-stack application with a Django REST Framework backend and an Expo React Native mobile frontend. The project uses JWT authentication for secure API access.

## Project Structure

```
sigma/
├── backend/          # Django REST Framework API
│   ├── backend/      # Django project settings
│   ├── accounts/     # Authentication app
│   └── manage.py
└── mobile/           # Expo React Native app
    ├── app/          # File-based routing
    ├── components/   # Reusable UI components
    ├── hooks/        # Custom React hooks
    └── constants/    # Theme and configuration
```

## Development Commands

### Backend (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (first time setup)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Linux/Mac
# or
venv\Scripts\activate     # On Windows

# Install dependencies (first time setup, after activating venv)
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Start development server
python manage.py runserver

# Run on specific port
python manage.py runserver 8000

# Create new app
python manage.py startapp <app_name>

# Make migrations after model changes
python manage.py makemigrations
python manage.py migrate
```

### Mobile (Expo)

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies (first time setup)
npm install

# Start development server
npm start
# or
npx expo start

# Run on specific platform
npm run android
npm run ios
npm run web

# Lint code
npm run lint

# Reset project (moves starter code to app-example/)
npm run reset-project
```

## Architecture

### Backend Architecture

**Framework**: Django 5.0+ with Django REST Framework

**Authentication**:
- JWT tokens via `djangorestframework-simplejwt`
- Access token lifetime: 1 hour
- Refresh token lifetime: 1 day
- Session authentication also supported

**Database**: SQLite (development) at `backend/db.sqlite3`

**API Structure**:
- Base URL pattern: `/api/<app_name>/`
- Authentication endpoints: `/api/auth/`
  - `POST /api/auth/register/` - User registration
  - `POST /api/auth/login/` - Login (returns JWT tokens)
  - `POST /api/auth/logout/` - Logout
  - `GET /api/auth/profile/` - Get current user profile (authenticated)
  - `POST /api/auth/token/refresh/` - Refresh JWT access token

**Apps**:
- `accounts`: Handles user authentication using Django's built-in User model
  - Views: RegisterView, LoginView, LogoutView, UserProfileView
  - Serializers: UserSerializer, RegisterSerializer, LoginSerializer
  - Uses Django's built-in User model (can be extended with profile model if needed)

**CORS**: Enabled for all origins in development (configure `CORS_ALLOWED_ORIGINS` for production)

**Static/Media Files**:
- Static files: `/static/` → `backend/staticfiles/`
- Media files: `/media/` → `backend/media/`

### Mobile Architecture

**Framework**: Expo SDK 54 with React 19.1.0

**Routing**: File-based routing with `expo-router` v6
- Routes defined in `app/` directory
- Tab navigation in `app/(tabs)/`
- Modal routes supported (see `app/modal.tsx`)
- Typed routes enabled via experiments

**Theme System**:
- Automatic light/dark mode support via `useColorScheme` hook
- Theme colors defined in `constants/theme.ts`
- Themed components: `ThemedText`, `ThemedView`
- Uses `@react-navigation/native` theming

**Key Features**:
- New Architecture enabled (`newArchEnabled: true`)
- React Compiler experimental feature enabled
- React Native Reanimated for animations
- Expo Router for navigation
- TypeScript support

**Component Organization**:
- `components/`: Reusable UI components
  - `themed-text.tsx`, `themed-view.tsx`: Theme-aware base components
  - `ui/`: UI-specific components (icons, collapsibles)
  - `parallax-scroll-view.tsx`, `haptic-tab.tsx`: Interactive components
- `hooks/`: Custom React hooks (color scheme, theme colors)
- `constants/`: Configuration and theme definitions

**Import Aliases**:
- `@/` maps to the mobile root directory
- Example: `import { ThemedText } from '@/components/themed-text'`

## Common Development Workflows

### Adding a New API Endpoint

1. Create view in appropriate app's `views.py` (e.g., `backend/accounts/views.py`)
2. Create serializer in app's `serializers.py` if needed
3. Add URL pattern to app's `urls.py`
4. Test endpoint with Django admin or API client

### Adding a New Mobile Screen

1. Create file in `mobile/app/` (e.g., `settings.tsx` for `/settings` route)
2. For tab screens, add to `mobile/app/(tabs)/`
3. Use themed components (`ThemedText`, `ThemedView`) for consistency
4. Import with `@/` alias for project files

### Database Changes

1. Modify models in `backend/<app>/models.py`
2. Run `python manage.py makemigrations`
3. Review generated migration file
4. Run `python manage.py migrate`

## Important Notes

### Backend

- **Virtual Environment**: The backend uses a Python virtual environment (`venv/`). Always activate it before running Django commands: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
- The `SECRET_KEY` in `settings.py` is insecure and should be changed for production
- `DEBUG = True` should be set to `False` in production
- `ALLOWED_HOSTS` must be configured for production deployment
- CORS is set to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`) - restrict this in production
- JWT tokens are configured with Bearer authentication header type

### Mobile

- The app uses Expo's new architecture and React Compiler (experimental)
- File-based routing means file structure = route structure
- Group routes with parentheses: `(tabs)` creates a route group without adding URL segment
- The starter code includes example screens that can be cleared with `npm run reset-project`
- 1. System Overview
Qadam is an intelligent, gamified personal-development system that guides users across five domains: health, learning, finance, relationships, and mental growth. The system integrates a mobile application, a server-side API with a database, and an AI module powered by an LLM.

2. Functional Requirements

Users must be able to register and log in.

User profiles and personal data must be stored securely.

The system must generate daily, weekly, and epic quests.

Each quest awards XP and in-app currency.

Completing tasks increases user XP and level.

Using the Google Gemini API, the system must generate a personalized development roadmap in JSON format.

Users must have access to progress statistics and visual charts.

A leaderboard and achievements system must be available.

Local notifications and reminders must be supported.

Security measures must include authorization, encryption, and data validation.

3. Non-Functional Requirements

Response time must not exceed 500 ms.

The mobile interface must be simple and intuitive.

The system must support Kazakh, Russian, and English.

All user data must be stored in encrypted form.

The architecture must be modular and easily extensible.

4. System Architecture
The system consists of four layers:

Mobile Application — built with React Native.

Application Layer (Backend API) — implemented using Node.js or Supabase (REST API).

Data Layer (Database) — PostgreSQL with tables: users, quests, user_quests, economy, checkins.

AI Layer — Google Gemini API for generating personalized plans. 