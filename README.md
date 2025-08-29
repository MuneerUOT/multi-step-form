# Multi-Step Form

A modern multi-step form application built with React, TypeScript, and TanStack Router. Features a clean UI with form validation, state management, and smooth navigation between steps.

## ✨ Features

- **Multi-step form flow** with 4 steps: Account, Location, Confirmation, and Success
- **Form validation** using Zod schemas and React Hook Form
- **State management** with Zustand
- **Modern UI** built with Shadcn/UI and Tailwind CSS
- **Type-safe routing** with TanStack Router
- **Responsive design** that works on all devices
- **Dark mode support** with theme switching

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Zustand** - State management
- **Shadcn/UI** - UI components
- **Tailwind CSS** - Styling
- **Radix UI** - Headless UI primitives

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **Bun** (recommended) or **npm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MuneerUOT/multi-step-form
   cd multi-step-form
   ```

2. **Install dependencies**

   ```bash
   # Using Bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

### Running the Application

1. **Start the development server**

   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

### Building for Production

1. **Build the application**

   ```bash
   # Using Bun
   bun run build

   # Or using npm
   npm run build
   ```

2. **Preview the production build**

   ```bash
   # Using Bun
   bun run preview

   # Or using npm
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── theme-provider/ # Theme management
│   └── form/           # Form-specific components
├── features/           # Feature-based modules
│   └── multistep-form/ # Multi-step form feature
│       ├── components/ # Step components
│       ├── hooks/      # Custom hooks
│       ├── schemas/    # Zod validation schemas
│       ├── services/   # API services
│       ├── store/      # Zustand store
│       └── types/      # TypeScript types
├── routes/             # TanStack Router routes
└── lib/                # Utility libraries
```

## 🎯 Usage

The application provides a 4-step form process:

1. **Step 1: Account** - User account information
2. **Step 2: Location** - Location details
3. **Step 3: Confirmation** - Review and confirm details
4. **Step 4: Success** - Completion confirmation

Each step includes:

- Form validation with real-time feedback
- Progress indication
- Navigation between steps
- Data persistence across steps

## 🧪 Development

### Architecture Overview

This project follows a **feature-based architecture** with clear separation of concerns and type safety throughout.

#### 🏗️ Code Structure

**Feature-Based Organization**

- Each feature is self-contained in its own directory
- Components, hooks, types, and stores are co-located
- Easy to maintain and scale individual features

**Component Architecture**

```
components/
├── ui/                 # Base UI components (Shadcn/UI)
│   ├── button.tsx     # Reusable button component
│   ├── input.tsx      # Form input components
│   └── ...
├── form/              # Form-specific components
│   ├── controlled-inputs.tsx      # Controlled form inputs
│   └── controller-field-wrapper.tsx  # Field wrapper logic
└── theme-provider.tsx # Global theme management
```

#### 🗂️ State Management with Zustand

**Why Zustand?**

- **Easy integration** - Minimal boilerplate, works out of the box
- **Built-in plugins** - localStorage persistence without extra dependencies
- **No providers** - Direct store access without context wrapping
- **TypeScript friendly** - Excellent type inference and safety

**Form Store Structure**

```typescript
// features/multistep-form/store/form.store.ts
interface FormState {
  currentStep: number;
  formData: FormData;
  isSubmitting: boolean;
  // Actions
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  submitForm: () => Promise<void>;
}

// With localStorage persistence plugin
export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      // Store implementation with automatic localStorage sync
    }),
    { name: "multi-step-form" }
  )
);
```

**Key Benefits:**

- **Centralized state** - All form data in one place
- **Persistent data** - Form data persists across steps and browser sessions
- **Type-safe actions** - All state updates are typed
- **Simple API** - Easy to use hooks for components
- **Automatic persistence** - localStorage integration without extra packages

#### 📝 Type System

**Type Organization**

```typescript
// features/multistep-form/types/form.types.ts
export interface AccountData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LocationData {
  address: string;
  city: string;
  country: string;
}

export interface FormData {
  account: AccountData;
  location: LocationData;
}
```

**Schema Validation**

```typescript
// features/multistep-form/schemas/form.schemas.ts
export const accountSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be 8+ characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });
```

#### 🎯 Component Patterns

**Step Components**

- Each step is a separate component (`StepAccount.tsx`, `StepLocation.tsx`, etc.)
- Follows consistent pattern: validation, state management, navigation
- Reusable form field components with proper error handling

**Form Field Pattern**

```typescript
// Consistent field wrapper for all inputs
<ControllerFieldWrapper
  name="email"
  control={control}
  render={({ field }) => (
    <Input {...field} type="email" placeholder="Enter email" />
  )}
/>
```

#### 🔄 Data Flow

1. **User Input** → Form components capture input
2. **Validation** → Zod schemas validate data in real-time
3. **State Update** → Zustand store updates with valid data
4. **Navigation** → TanStack Router handles step transitions
5. **Persistence** → Form data persists across all steps

#### 🎨 UI Component Strategy

**Shadcn/UI Integration**

- **Base components** - Button, Input, Card, etc.
- **Consistent styling** - Tailwind CSS with design tokens
- **Accessibility** - Built on Radix UI primitives
- **Theme support** - Dark/light mode with next-themes

**Custom Components**

- Built on top of Shadcn/UI base components
- Feature-specific styling and behavior
- Reusable across different parts of the application

#### 🛣️ Routing Architecture

**Why TanStack Router over React Router?**

- **Type-safe routes** - Compile-time validation of routes and parameters
- **Better DX** - Auto-completion and error checking for navigation
- **Advanced features** - Built-in loading states, error boundaries, and data fetching
- **File-based routing** - Automatic route generation from file structure
- **Modern API** - Designed for modern React patterns and TypeScript

**TanStack Router Setup**

```typescript
// Type-safe routes with proper nesting
routes/
├── __root.tsx          # Root layout with providers
├── index.tsx           # Landing page
└── (form)/            # Form route group
    ├── route.tsx      # Form layout
    ├── step1.tsx      # Account step
    ├── step2.tsx      # Location step
    ├── step3.tsx      # Confirmation step
    └── step4.tsx      # Success step
```

**Benefits:**

- **Type-safe navigation** - Compile-time route validation and auto-completion
- **Nested layouts** - Shared form layout across steps
- **Route parameters** - Type-safe step management
- **Better error handling** - Built-in error boundaries and loading states
- **Enhanced performance** - Code splitting and lazy loading out of the box

#### 🎯 Mock Data & API

**Development Setup**

- **Mock data services** - Simulated API responses for development
- **State simulation** - Realistic form submission flows
- **Error handling** - Mock error scenarios for robust testing
- **Data persistence** - localStorage integration for form state

```typescript
// features/multistep-form/services/form.api.ts
export const mockFormSubmission = async (data: FormData) => {
  // Simulate API call with realistic delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true, id: "mock-id-123" };
};
```

## 📝 Scripts

| Script    | Description              |
| --------- | ------------------------ |
| `dev`     | Start development server |
| `build`   | Build for production     |
| `preview` | Preview production build |
| `lint`    | Run ESLint               |
