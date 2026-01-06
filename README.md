# CipherCore Audits - Cybersecurity Consulting Platform

A modern, full-stack web application for CipherCore Audits, providing expert-led cybersecurity compliance auditing services. Built with React, TypeScript, Express, and Tailwind CSS.

## 🚀 Features

- **Professional Landing Page** - Modern, responsive design showcasing cybersecurity services
- **Service Pages** - Dedicated pages for SOC 2, ISO 27001, HIPAA, NIST CSF/CMMC, and Cloud Security
- **Contact Form** - Lead capture with validation and storage
- **Consultation Booking** - Schedule consultations with date/time selection
- **Live Chat Widget** - Real-time visitor engagement
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type-Safe** - Full TypeScript implementation with Zod validation
- **Production Ready** - Optimized build with Vite and esbuild

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI library with hooks
- **TypeScript 5.6** - Type-safe JavaScript
- **Wouter** - Lightweight routing (2KB)
- **TanStack Query** - Server state management
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Shadcn/ui** - 45+ pre-built accessible components
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling with Zod validation
- **Vite 5.4** - Fast build tool with HMR

### Backend
- **Node.js 20** - JavaScript runtime
- **Express 4.21** - Web framework
- **TypeScript** - Type-safe server code
- **Zod** - Schema validation
- **In-Memory Storage** - Fast development storage layer

### Development
- **tsx** - TypeScript executor for development
- **esbuild** - Fast production bundler
- **Replit** - Deployment platform

## 📁 Project Structure

```
CipherCoreSite/
├── client/                      # Frontend application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/              # Shadcn/ui components (45 files)
│   │   │   ├── AboutSection.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── ConsultationScheduler.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── ... (more components)
│   │   ├── pages/               # Page components
│   │   │   ├── home.tsx
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   ├── services.tsx
│   │   │   ├── service-*.tsx    # Individual service pages
│   │   │   └── not-found.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/                 # Utilities
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── App.tsx              # Main app with routing
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   └── index.html               # HTML entry point
├── server/                      # Backend application
│   ├── index.ts                 # Express server setup
│   ├── routes.ts                # API route definitions
│   ├── storage.ts               # In-memory data storage
│   ├── static.ts                # Static file serving
│   └── vite.ts                  # Vite dev server integration
├── shared/                      # Shared code
│   └── schema.ts                # Zod schemas and types
├── script/                      # Build scripts
│   └── build.ts                 # Production build script
├── attached_assets/             # Asset files
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── design_guidelines.md         # Design system documentation
└── replit.md                    # Architecture documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm** - Comes with Node.js

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CipherCoreSite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you need to change the default port (5000)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Run TypeScript type checking
npm run check

# Build for production
npm run build

# Start production server
npm start
```

### Development Workflow

1. **Frontend Development**: Edit files in `client/src/` - Vite HMR will auto-reload
2. **Backend Development**: Edit files in `server/` - Server auto-restarts with tsx watch
3. **Shared Types**: Edit `shared/schema.ts` for type-safe contracts between client/server

### Adding New Pages

1. Create a new page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/Navigation.tsx`

### Adding New API Endpoints

1. Add schema validation in `shared/schema.ts`
2. Add route handler in `server/routes.ts`
3. Add storage method in `server/storage.ts` if needed
4. Use TanStack Query on frontend for data fetching

## 🏗 Building for Production

```bash
# Build the application
npm run build

# This creates:
# - dist/public/       Client-side static files
# - dist/index.cjs     Bundled server
```

### Production Deployment

```bash
# Start production server
npm start

# Server runs on port specified in .env or defaults to 5000
```

The production build:
- Minifies and optimizes all assets
- Bundles client-side code with Vite
- Bundles server-side code with esbuild
- Generates optimized CSS with Tailwind
- Creates gzipped assets for faster loading

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Contact Messages

**POST /api/contact**
Submit a contact form message.

Request body:
```json
{
  "name": "string (2-100 chars)",
  "email": "string (valid email)",
  "organization": "string (optional, max 200 chars)",
  "message": "string (10-2000 chars)"
}
```

Response:
```json
{
  "success": true,
  "message": "Message received successfully",
  "id": "uuid"
}
```

**GET /api/contact**
Retrieve all contact messages.

Response:
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "organization": "string | null",
    "message": "string",
    "createdAt": "Date"
  }
]
```

#### Consultation Bookings

**POST /api/bookings**
Book a consultation.

Request body:
```json
{
  "name": "string (2-100 chars)",
  "email": "string (valid email)",
  "phone": "string (optional, valid phone format)",
  "company": "string (optional, max 200 chars)",
  "service": "soc2 | iso27001 | hipaa | nist-csf | nist-cmmc | cloud-security | general-consultation",
  "preferredDate": "string (YYYY-MM-DD, future date)",
  "preferredTime": "string (HH:MM or morning/afternoon/evening)",
  "notes": "string (optional, max 1000 chars)"
}
```

Response:
```json
{
  "success": true,
  "message": "Consultation booked successfully",
  "id": "uuid"
}
```

**GET /api/bookings**
Retrieve all bookings.

#### Chat Messages

**POST /api/chat**
Send a chat message.

Request body:
```json
{
  "visitorId": "string",
  "name": "string (optional, 2-100 chars)",
  "email": "string (optional, valid email)",
  "message": "string (1-1000 chars)",
  "isFromVisitor": "boolean (default: true)"
}
```

**GET /api/chat/:visitorId**
Retrieve chat messages for a visitor.

### Error Responses

All endpoints return standardized error responses:

```json
{
  "error": "Error message",
  "details": {
    // Validation errors if applicable
  }
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `500` - Internal Server Error

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Application Settings
# Add API keys or external service credentials here as needed
```

## 🎨 Design System

See [design_guidelines.md](design_guidelines.md) for:
- Typography system
- Color palette
- Spacing and layout
- Component specifications
- Animation guidelines
- Accessibility standards (WCAG AA)

## 🏛 Architecture

See [replit.md](replit.md) for detailed information about:
- System architecture
- Frontend architecture
- Backend architecture
- API design patterns
- Storage layer implementation
- Data models

## 🧪 Type Safety

This project uses TypeScript with strict mode and Zod for runtime validation:

- **Compile-time safety**: TypeScript catches type errors during development
- **Runtime validation**: Zod schemas validate API requests/responses
- **Shared types**: Types are shared between client and server via `shared/schema.ts`
- **Form validation**: React Hook Form with Zod resolver for client-side validation

## 📦 Dependencies

### Production Dependencies (16 core packages)
- UI Framework: React, React DOM
- Routing: Wouter
- State: TanStack Query
- Forms: React Hook Form, Zod
- Styling: Tailwind CSS, Class Variance Authority
- Components: 30+ Radix UI primitives
- Server: Express
- Icons: Lucide React, React Icons
- Utilities: date-fns, clsx

### Development Dependencies (12 packages)
- Build: Vite, esbuild, tsx
- TypeScript: TypeScript, Type definitions
- Styling: Tailwind CSS, PostCSS, Autoprefixer
- Replit: Integration plugins

## 🔒 Security Features

- **Input validation**: All user inputs validated with Zod schemas
- **Type safety**: TypeScript prevents type-related vulnerabilities
- **XSS protection**: Automatic HTML escaping in React
- **Length limits**: Maximum input lengths prevent DOS attacks
- **Email normalization**: Prevents duplicate accounts
- **Data sanitization**: Trimming and formatting of all inputs
- **UUID validation**: Ensures valid ID formats

## 📈 Performance

- **Fast builds**: Vite HMR for instant feedback
- **Optimized bundles**: Code splitting and tree shaking
- **Minimal dependencies**: Only 16 core production packages
- **In-memory storage**: Fast data access during development
- **Lazy loading**: Route-based code splitting
- **Optimized images**: Proper image formats and compression

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and best practices.

## 📝 License

MIT License - See LICENSE file for details

## 👥 Team

CipherCore Audits - Expert-led cybersecurity compliance auditing services

## 🐛 Issues & Support

For issues or questions:
1. Check existing documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
