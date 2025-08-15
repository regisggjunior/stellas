# Instituto Stellas Landing Page

## Overview

This is a landing page for Instituto Stellas, a Brazilian non-profit organization that provides support to families affected by gender-based violence and femicide. The application features a modern, responsive design built with React and Express.js, offering comprehensive information about the institute's mission, services, and impact. The site includes a contact form for users to reach out for help or support, emphasizing the organization's motto "Do trauma à transformação: um caminho possível com apoio" (From trauma to transformation: a possible path with support).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using **React with TypeScript** and follows a component-based architecture. The application uses:
- **Vite** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** for styling with custom brand colors (teal, orange, light backgrounds)
- **shadcn/ui** component library for consistent UI elements
- **React Hook Form** with Zod validation for form handling
- **TanStack Query** for server state management

The project structure separates components into logical sections (Header, Hero, About, Contact, etc.) and follows a pages-based routing pattern. Custom hooks and utilities are organized in dedicated directories.

### Backend Architecture
The backend uses **Express.js** with TypeScript and follows RESTful API patterns:
- **Express middleware** for request/response handling and logging
- **Zod schemas** for request validation
- **In-memory storage** for development (with interface for future database integration)
- **API routes** for contact form submissions and data retrieval

The server is configured to serve the React application in production while providing API endpoints for dynamic functionality.

### Data Storage
Currently uses **in-memory storage** with a well-defined interface (`IStorage`) that allows for easy migration to persistent storage solutions. The schema includes:
- **Users table** with basic authentication fields
- **Contacts table** for storing form submissions with comprehensive contact information
- **Drizzle ORM** configuration prepared for PostgreSQL integration

### Form Handling and Validation
The contact form implements comprehensive validation using:
- **Zod schemas** for both client and server-side validation
- **React Hook Form** for efficient form state management
- **Custom validation rules** for Brazilian context (phone numbers, subject categories)
- **Toast notifications** for user feedback

### Styling and Design System
The application uses a custom design system built on Tailwind CSS:
- **Custom color palette** reflecting the organization's brand:
  - Stellas Teal: #247B7F (primary brand color)
  - Stellas Orange: #F28A3A (accent color)
  - Stellas Light: #F8F9FA (light backgrounds)
  - Stellas Dark: #2D3748 (dark text/backgrounds)
- **Brand assets**: Official Instituto Stellas logos integrated throughout the site
- **Responsive design** with mobile-first approach
- **CSS custom properties** for consistent theming
- **shadcn/ui components** for accessibility and consistency

### Development and Build Process
The project is configured for both development and production environments:
- **Development**: Vite dev server with HMR and error overlays
- **Production**: Optimized builds with ESM modules for server and static assets for client
- **TypeScript**: Strict type checking across the entire codebase
- **Replit integration**: Special plugins and configurations for Replit environment

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for component-based UI development
- **Express.js** for server-side API and static file serving
- **Vite** for fast development and optimized production builds

### UI and Styling
- **Tailwind CSS** for utility-first styling approach
- **Radix UI** components (via shadcn/ui) for accessible, unstyled UI primitives
- **Lucide React** for consistent iconography
- **Inter font** from Google Fonts for typography

### Form and Data Management
- **React Hook Form** for performant form handling
- **Zod** for schema validation and type safety
- **TanStack React Query** for server state management and caching
- **date-fns** for date manipulation utilities

### Database and ORM (Prepared)
- **Drizzle ORM** configured for PostgreSQL integration
- **Neon Database** serverless PostgreSQL connection ready
- **drizzle-zod** for seamless schema-to-validation integration

### Development Tools
- **TypeScript** for static type checking
- **ESLint** and **Prettier** (configured via Next.js standards)
- **PostCSS** with Autoprefixer for CSS processing
- **Replit-specific plugins** for development environment integration

### Utility Libraries
- **clsx** and **tailwind-merge** for conditional styling
- **class-variance-authority** for component variant management
- **nanoid** for unique ID generation
- **Wouter** for lightweight client-side routing