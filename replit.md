# CipherCore Audits - Cybersecurity Compliance Platform

## Overview

CipherCore Audits is a professional cybersecurity compliance auditing platform that provides expert-led assessment services for various compliance frameworks including SOC 2, ISO 27001, HIPAA, NIST CSF/CMMC, and cloud security. The application serves as a marketing and lead generation website where potential clients can learn about services, submit contact inquiries, and request audits.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

**Design System:**
The application implements a professional, security-focused design language with:
- Custom color palette centered around navy blue (hsl(216, 72%, 14%)) and ice blue accent (hsl(195, 100%, 43%))
- Typography system using Montserrat for headings, Open Sans for body text, and JetBrains Mono for technical content
- Component-based architecture with reusable UI elements (Cards, Buttons, Forms, etc.)
- Responsive grid layouts optimized for mobile, tablet, and desktop viewports

**Page Structure:**
- Home: Hero section with CTAs, feature highlights, animated statistics, services overview, client testimonials
- About: Company vision, mission, and values
- Team: Leadership team, senior consultants, and company values
- Services: Grid of all audit services with individual detail pages for each service type
- Clients & Industries: Target industry segments (Startups, Healthcare, Government, SMBs)
- Insights: Blog-style content grid for thought leadership
- Contact: Lead capture form with contact information

**Interactive Features:**
- Animated statistics counters (500+ audits, 200+ clients, 15+ certifications, 12+ years)
- Consultation scheduler with date/time picker and booking form
- Live chat widget with visitor info collection and auto-replies
- Client testimonials carousel with 6 featured testimonials

### Backend Architecture

**Server Framework:**
- **Runtime**: Node.js with Express
- **Build Tool**: esbuild for production bundling with allowlist-based dependency bundling
- **Development**: tsx for TypeScript execution in development mode

**API Design:**
- RESTful API endpoints under `/api` prefix
- Contact form submission endpoint (`POST /api/contact`)
- Contact messages retrieval endpoint (`GET /api/contact`)
- Consultation booking endpoint (`POST /api/bookings`, `GET /api/bookings`)
- Chat messaging endpoints (`POST /api/chat`, `GET /api/chat/:visitorId`)
- Simple JSON-based request/response format

**Storage Layer:**
The application currently uses an in-memory storage implementation (`MemStorage` class) for development purposes. The storage interface (`IStorage`) defines contracts for:
- User management (CRUD operations)
- Contact message persistence
- UUID-based identifier generation

**Data Models:**
- Users: Basic authentication schema with username/password
- Contact Messages: Form submissions with name, email, organization (optional), and message content
- Bookings: Consultation scheduling with name, email, phone, company, service, date, time
- Chat Messages: Visitor messages with visitorId, name, email, message content, and timestamps

**Session Management:**
Infrastructure is in place for session handling (connect-pg-simple dependency present) though not currently implemented in the core application logic.

### External Dependencies

**Database:**
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Definition**: Shared schema definitions in `shared/schema.ts`
- **Migrations**: Drizzle Kit for schema migrations (output to `./migrations` directory)
- **Connection**: Environment variable `DATABASE_URL` required for database connectivity
- Note: Database integration is configured but storage currently uses in-memory implementation

**UI Component Libraries:**
- Radix UI for accessible, unstyled component primitives (Dialog, Dropdown, Accordion, etc.)
- Embla Carousel for carousel functionality
- Lucide React for icon components
- Class Variance Authority (CVA) for component variant management

**Form Handling:**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration between React Hook Form and Zod
- Drizzle-Zod for generating Zod schemas from Drizzle table definitions

**Development Tools:**
- Replit-specific plugins for development banner, cartographer navigation, and runtime error overlay
- Vite HMR (Hot Module Replacement) for development experience

**Asset Management:**
- Custom Vite alias configuration for assets (`@assets` path)
- Images stored in `attached_assets` directory
- Logo and hero images referenced throughout the application

**Third-Party Services:**
The dependency list indicates potential future integrations (though not currently implemented):
- Stripe for payment processing
- Nodemailer for email notifications
- AI services (OpenAI, Google Generative AI)
- WebSocket support (ws package)

**Typography:**
- Google Fonts CDN for Montserrat, Open Sans, and JetBrains Mono font families
- Preconnect hints for performance optimization