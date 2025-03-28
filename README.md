# Zara Category Editor

A React-based web application for managing and editing products from a category
in ZARA website. This project allows users to organize products within
categories, featuring drag-and-drop functionality, image management, and 
real-time updates.

## Project Description

The Category Editor is tool that allow:
- Dynamic category management with sections and products
- Drag and drop functionality for product reordering
- Add new products to categories
- Real-time category updates
- Responsive design for various screen sizes


## Architecture

The project follows a Clean Architecture approach with clear separation of concerns:

```
src/
├── core/           # Core application configuration
├── category/       # Category management module
│   ├── domain/        # Business entities and interfaces
│   ├── infrastructure/# External services implementation
│   ├── presentation/  # UI components and hooks
│   └── usecase/      # Application business logic
├── products/      # Products management module
│   ├── domain/
│   └── presentation/
└── shared/        # Shared components and utilities
    ├── presentation/
    │   ├── ui/         # Reusable UI components
    ├── infrastructure/
    └── usecase/
```

### Key Technical Decisions

- **State Management**: Context API for local state management
- **API Communication**: React Query for server state management
- **Drag and Drop**: @dnd-kit library for smooth drag-and-drop interactions
- **Component Architecture**: Atomic Design principles
- **Error Handling**: Error boundaries and snackbar notifications

## Main Libraries

- **React**: Frontend framework
- **TypeScript**: Static typing
- **@dnd-kit**: Drag and drop functionality
- **React Query**: Server state management and API calls
- **Cypress**: E2E testing
- **Jest & React Testing Library**: Unit testing


## Getting Started


1. Clone the repository

2. Install dependencies:
```
pnpm install
```
3. Start the development server:
```
pnpm run dev
```
4. Open the application in your browser:
```
http://localhost:5173
```

## Testing

The project includes both unit and E2E tests:

- Run unit tests:
```
pnpm run test
```
- Run E2E tests:
```
pnpm run cypress:open
```

## Next Steps

1. **Testing Improvements**
   - [ ] Increase E2E test coverage
   - [ ] Add more unit tests for complex business logic

2. **Technical Debt**
   - [ ] Add performance monitoring
   - [ ] Improve loading states
   - [ ] Add proper documentation for components

4. **Infrastructure**
   - [ ] Set up CI/CD pipeline
   - [ ] Implement automated deployment
   - [ ] Add environment configuration management

