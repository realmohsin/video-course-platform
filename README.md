# Video Course Platform

A comprehensive Learning Management System (LMS) built with Next.js 13, TypeScript, and modern web technologies. This platform enables instructors to create, manage, and sell online courses while providing students with an engaging learning experience through video content, progress tracking, and interactive features.

The application features a dual-interface design with separate dashboards for teachers and students, integrated payment processing via Stripe, video streaming with Mux, and comprehensive course management capabilities.

## Features

- **Dual User Interfaces**: Separate dashboards for instructors and students
- **Course Creation & Management**: Rich course builder with chapters, attachments, and video content
- **Video Streaming**: Integrated Mux video player with progress tracking
- **Payment Processing**: Stripe integration for course purchases and instructor payouts
- **Authentication**: Secure user authentication and authorization with Clerk
- **Progress Tracking**: Student progress monitoring and course completion analytics
- **Search & Filtering**: Advanced course discovery with categories and search functionality
- **File Uploads**: Support for video, image, and document attachments
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Analytics Dashboard**: Revenue and enrollment analytics for instructors
- **Course Publishing**: Draft/publish workflow for course management

## Development Instructions

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd video-course-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="your-database-url"
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   
   # Stripe
   STRIPE_API_KEY="your-stripe-secret-key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   
   # Mux Video
   MUX_TOKEN_ID="your-mux-token-id"
   MUX_TOKEN_SECRET="your-mux-token-secret"
   
   # UploadThing
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

### Running the Application

**Development mode:**
```bash
npm run dev
```
This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Production build:**
```bash
npm run build
npm start
```
Builds and runs the app in production mode.

**Testing:**
```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

**Database operations:**
```bash
npx prisma studio     # Open Prisma Studio
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema changes
```

## Project Structure

```
video-course-platform/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   └── (routes)/
│   │       ├── sign-in/
│   │       └── sign-up/
│   ├── (course)/                  # Student course pages
│   │   └── courses/
│   │       └── [courseId]/
│   │           └── chapters/
│   ├── (dashboard)/               # Teacher dashboard
│   │   ├── (routes)/
│   │   │   ├── teacher/
│   │   │   │   ├── courses/
│   │   │   │   └── analytics/
│   │   │   └── search/
│   │   └── _components/
│   ├── api/                       # API routes
│   │   ├── courses/
│   │   ├── uploadthing/
│   │   └── webhook/
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── modals/                    # Modal components
│   ├── providers/                 # Context providers
│   ├── ui/                        # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── banner.tsx                 # Alert banner component
│   ├── course-card.tsx            # Course display card
│   ├── course-progress.tsx        # Progress indicator
│   ├── file-upload.tsx            # File upload component
│   ├── icon-badge.tsx             # Icon with badge
│   ├── navbar-routes.tsx          # Navigation component
│   └── search-input.tsx           # Search functionality
├── lib/
│   ├── db.ts                      # Database connection
│   ├── format.ts                  # Utility functions
│   ├── stripe.ts                  # Stripe configuration
│   ├── teacher.ts                 # Teacher utilities
│   └── utils.ts                   # General utilities
├── hooks/
│   ├── use-confetti-store.ts      # Confetti state management
│   └── use-debounce.ts            # Debounce hook
├── actions/                       # Server actions
│   ├── get-analytics.ts
│   ├── get-courses.ts
│   └── get-dashboard-courses.ts
├── prisma/
│   └── schema.prisma              # Database schema
├── __tests__/                     # Test files
│   └── components/
├── public/                        # Static assets
├── scripts/
│   └── seed.ts                    # Database seeding
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## Key Dependencies

- **Next.js 13.4.12**: React framework with App Router
- **TypeScript 5.2.2**: Type-safe JavaScript development
- **Prisma 5.3.0**: Database ORM and schema management
- **Clerk 4.23.5**: Authentication and user management
- **Stripe 13.6.0**: Payment processing and subscriptions
- **Mux**: Video streaming and encoding platform
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Hook Form 7.46.1**: Form state management
- **Zustand 4.4.1**: Lightweight state management
- **Zod 3.22.2**: Schema validation library

## Application Flow

### For Instructors:
1. **Authentication**: Sign up/in via Clerk authentication
2. **Course Creation**: Create new courses with title, description, and category
3. **Content Management**: Add chapters, upload videos, and attach resources
4. **Publishing**: Review and publish courses for student enrollment
5. **Analytics**: Monitor revenue, enrollments, and course performance

### For Students:
1. **Course Discovery**: Browse and search available courses
2. **Enrollment**: Purchase courses via Stripe integration
3. **Learning**: Watch videos, track progress, and complete chapters
4. **Progress Tracking**: Monitor completion status and achievements

## Database Schema

The application uses PostgreSQL with Prisma ORM:

- **User**: User profiles and authentication data
- **Course**: Course information, pricing, and metadata
- **Category**: Course categorization system
- **Chapter**: Individual course lessons and content
- **Attachment**: File attachments for courses and chapters
- **Purchase**: Student course purchases and enrollment records
- **UserProgress**: Chapter completion tracking
- **StripeCustomer**: Payment processing integration
- **MuxData**: Video streaming metadata

## API Integration

### External Services:
- **Clerk**: User authentication and profile management
- **Stripe**: Payment processing, webhooks, and customer management
- **Mux**: Video upload, encoding, and streaming
- **UploadThing**: File upload and storage service

### Internal APIs:
- **Courses API**: CRUD operations for course management
- **Chapters API**: Chapter content and progress tracking
- **Analytics API**: Revenue and enrollment statistics
- **Webhook API**: Stripe payment event processing

## Styling Architecture

- **Tailwind CSS**: Utility-first styling with custom configuration
- **Radix UI**: Accessible, unstyled component primitives
- **Class Variance Authority**: Type-safe component variants
- **CSS Grid & Flexbox**: Responsive layout systems
- **Custom Components**: Reusable UI components with consistent styling

## State Management

- **Zustand**: Global state for confetti animations and UI interactions
- **React Hook Form**: Form state and validation
- **Server Components**: Server-side data fetching and rendering
- **Local Storage**: Client-side preference persistence

## Testing

Comprehensive test suite with Jest and React Testing Library:
- **Unit Tests**: Component behavior and rendering
- **Snapshot Tests**: Visual regression prevention
- **Integration Tests**: Component interaction testing
- **85+ Test Cases**: Covering UI components and business logic

## Security Features

- **Authentication**: Secure user sessions with Clerk
- **Authorization**: Role-based access control (teacher/student)
- **Payment Security**: PCI-compliant Stripe integration
- **Data Validation**: Server-side validation with Zod schemas
- **CSRF Protection**: Built-in Next.js security features
