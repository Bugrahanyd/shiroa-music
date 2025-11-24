# SHIROA Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict typing**: All files use TypeScript with explicit type definitions
- **Interface definitions**: Props and data structures defined with interfaces
- **Type safety**: No `any` types unless absolutely necessary
- **Enum alternatives**: Use union types for mode/state definitions (e.g., `type FormMode = 'signin' | 'signup' | 'forgot' | 'code'`)

### File Organization
- **Single responsibility**: Each file focuses on one component or service
- **Clear naming**: Descriptive names that reflect purpose (e.g., `auth.service.ts`, `WaveformVisualizer.tsx`)
- **Consistent structure**: Services, controllers, DTOs, entities organized in feature modules

### Import Conventions
- **Absolute imports**: Frontend uses `@/` path alias for src directory
- **Grouped imports**: External packages first, then internal modules
- **Explicit imports**: Named imports preferred over default imports where applicable

## Frontend Patterns (Next.js + React)

### Component Structure
- **Client components**: Mark interactive components with `'use client'` directive at top
- **Functional components**: Use function declarations with TypeScript interfaces
- **Props interface**: Define props interface above component
```typescript
interface ComponentNameProps {
  prop1: string;
  prop2?: boolean; // Optional props with ?
}

export default function ComponentName({ prop1, prop2 = false }: ComponentNameProps) {
  // Component logic
}
```

### State Management
- **React hooks**: Use `useState`, `useEffect`, `useRef` for local state
- **Context providers**: Global state via context (auth, theme, language)
- **Custom hooks**: Extract reusable logic into custom hooks (e.g., `useAuth()`, `useTheme()`)
- **Zustand**: Lightweight state management for complex state

### Styling Approach
- **Tailwind CSS**: Utility-first styling with inline classes
- **Conditional classes**: Template literals for dynamic styling
```typescript
className={`base-classes ${condition ? 'true-classes' : 'false-classes'}`}
```
- **Theme classes**: Custom theme classes (e.g., `theme-bg`, `theme-text`, `theme-border`)
- **Responsive design**: Mobile-first with `md:`, `lg:` breakpoints
- **Animations**: Tailwind transitions and custom CSS animations

### Form Handling
- **Controlled inputs**: State-driven form inputs with `value` and `onChange`
- **Form validation**: HTML5 validation attributes (`required`, `minLength`, `type`)
- **Error handling**: Display errors in dedicated error state
- **Loading states**: Disable buttons and show loading text during submission
- **Success feedback**: Visual confirmation with success messages

### Internationalization
- **Translation objects**: Nested objects with language keys (`en`, `tr`)
- **Language context**: Global language state via context provider
- **Dynamic content**: Use translation function `t()` for all user-facing text
```typescript
const translations = {
  en: { key: "English text" },
  tr: { key: "Turkish text" }
};
const t = translations[lang];
```

### Navigation
- **Next.js Link**: Use `Link` component for client-side navigation
- **useRouter**: Programmatic navigation with `router.push()` or `router.replace()`
- **Route protection**: Redirect authenticated users in `useEffect`

### Error Handling
- **Try-catch blocks**: Wrap async operations in try-catch
- **Fail-safe patterns**: Fallback to demo mode if backend fails
- **User feedback**: Always inform users of success or failure
- **Console logging**: Log errors for debugging but don't expose to users

## Backend Patterns (NestJS)

### Module Architecture
- **Feature modules**: Organize by domain (auth, users, tracks, payment)
- **Module structure**: Controller → Service → Repository pattern
- **Dependency injection**: Use NestJS decorators for DI
```typescript
@Injectable()
export class ServiceName {
  constructor(
    private dependency: DependencyType,
    @InjectRepository(Entity)
    private repository: Repository<Entity>
  ) {}
}
```

### Service Layer
- **Business logic**: All business logic in service classes
- **Single responsibility**: Each service handles one domain
- **Private methods**: Helper methods marked as `private`
- **Async/await**: All database operations use async/await
- **Error handling**: Throw NestJS exceptions (UnauthorizedException, ConflictException)

### Authentication & Authorization
- **JWT tokens**: Access tokens (15min) + refresh tokens (7 days)
- **Password hashing**: bcrypt for password hashing
- **Token generation**: Separate method for token generation
- **Refresh token storage**: Store refresh tokens in database with expiration
- **Guards**: Use guards for route protection (JwtAuthGuard, RolesGuard)

### Data Transfer Objects (DTOs)
- **Validation**: Use class-validator decorators
- **Separation**: Separate DTOs for different operations (RegisterDto, LoginDto)
- **Type safety**: DTOs ensure type safety across layers

### Database Patterns
- **Dual database**: PostgreSQL (relational) + MongoDB (analytics)
- **TypeORM**: For PostgreSQL with entity decorators
- **Mongoose**: For MongoDB with schema definitions
- **Repositories**: Inject repositories via @InjectRepository
- **Transactions**: Use transactions for multi-step operations

### API Response Structure
- **Consistent format**: Return objects with tokens and user data
```typescript
return {
  access_token: string,
  refresh_token: string,
  user: {
    id: string,
    email: string,
    name: string,
    role: string
  }
};
```

### Configuration
- **Environment variables**: Use ConfigService for env vars
- **Validation**: Validate required env vars on startup
- **Type safety**: Access config with type-safe methods

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `WaveformVisualizer.tsx`)
- **Services**: kebab-case with suffix (e.g., `auth.service.ts`)
- **DTOs**: kebab-case with suffix (e.g., `register.dto.ts`)
- **Entities**: kebab-case with suffix (e.g., `refresh-token.entity.ts`)
- **Scripts**: kebab-case (e.g., `seed-tracks.ts`)

### Variables & Functions
- **camelCase**: Variables, functions, methods
- **Descriptive names**: Clear purpose (e.g., `isPlaying`, `handleSubmit`, `generateTokens`)
- **Boolean prefixes**: `is`, `has`, `should` for booleans
- **Event handlers**: Prefix with `handle` (e.g., `handleSubmit`, `handleClick`)

### Constants
- **UPPER_SNAKE_CASE**: For true constants
- **camelCase**: For configuration objects and arrays

### CSS Classes
- **Tailwind utilities**: Standard Tailwind classes
- **Custom classes**: kebab-case (e.g., `theme-bg`, `glass-card`)
- **BEM-like**: For complex components (e.g., `sidebar__item--active`)

## Common Patterns

### Canvas Animation
- **useRef**: Store canvas reference
- **useEffect**: Initialize and cleanup animations
- **requestAnimationFrame**: For smooth animations
- **Cleanup**: Cancel animation frames on unmount
```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  let animationId: number;
  const draw = () => {
    // Drawing logic
    animationId = requestAnimationFrame(draw);
  };
  draw();
  
  return () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}, [dependencies]);
```

### Conditional Rendering
- **Ternary operators**: For simple conditions
- **Logical AND**: For conditional display (`{condition && <Component />}`)
- **Early returns**: For loading/error states
- **Map with conditions**: Filter or conditionally render in maps

### Data Seeding
- **Mongoose models**: Define schema and model
- **dotenv**: Load environment variables
- **Connection management**: Connect, seed, disconnect
- **Error handling**: Try-catch with detailed logging
- **Data arrays**: Organize seed data in arrays of objects

### Security Practices
- **Password hashing**: Never store plain passwords
- **Token expiration**: Short-lived access tokens
- **Refresh tokens**: Revoke on use, store in database
- **Input validation**: Validate all user inputs
- **Error messages**: Generic messages to prevent information leakage
- **HTTPS**: Use secure connections in production

## UI/UX Patterns

### Glassmorphism
- **Backdrop blur**: `backdrop-blur-md` for glass effect
- **Semi-transparent backgrounds**: `bg-white/10` or `bg-black/20`
- **Borders**: Subtle borders with `border-white/20`
- **Shadows**: Layered shadows for depth

### Gradients
- **Background gradients**: `bg-gradient-to-br from-color via-color to-color`
- **Text gradients**: `bg-gradient-to-r bg-clip-text text-transparent`
- **Accent colors**: Purple, pink, cyan color scheme

### Interactive Elements
- **Hover effects**: Scale transforms (`hover:scale-105`)
- **Active states**: Scale down on click (`active:scale-95`)
- **Transitions**: Smooth transitions with `transition-all`
- **Loading states**: Disabled state with opacity reduction

### Responsive Design
- **Mobile-first**: Base styles for mobile
- **Breakpoints**: `md:` for tablet, `lg:` for desktop
- **Hidden elements**: `hidden md:block` for desktop-only
- **Mobile navigation**: Bottom navigation bar for mobile

### Accessibility
- **Semantic HTML**: Use appropriate HTML elements
- **ARIA labels**: Add labels for screen readers
- **Keyboard navigation**: Support tab navigation
- **Focus states**: Visible focus indicators

## Performance Optimization

### Frontend
- **Code splitting**: Automatic with Next.js App Router
- **Lazy loading**: Dynamic imports for heavy components
- **Memoization**: Use React.memo for expensive components
- **Image optimization**: Next.js Image component
- **Canvas cleanup**: Always cleanup animation frames

### Backend
- **Caching**: Redis for frequently accessed data
- **Database indexes**: Index frequently queried fields
- **Connection pooling**: Reuse database connections
- **Async operations**: Non-blocking async/await
- **Rate limiting**: Throttle API requests

## Testing Approach
- **Manual testing**: Primary testing method currently
- **Error scenarios**: Test error handling paths
- **Edge cases**: Test boundary conditions
- **Cross-browser**: Test on multiple browsers
- **Responsive**: Test on different screen sizes

## Documentation Standards
- **Code comments**: Minimal, code should be self-documenting
- **Complex logic**: Comment only complex algorithms
- **API documentation**: Document endpoints in API_DOCUMENTATION.md
- **README files**: Each major directory has README
- **Inline documentation**: JSDoc for public APIs

## Git Workflow
- **Feature branches**: Create branches for features
- **Descriptive commits**: Clear commit messages
- **Small commits**: Atomic commits for single changes
- **Pull requests**: Review before merging to main

## Environment Management
- **Local development**: Use .env files
- **Example files**: Provide .env.example templates
- **Validation**: Validate env vars on startup
- **Secrets**: Never commit secrets to git
- **Docker**: Use docker-compose for local services

## API Design
- **RESTful**: Follow REST conventions
- **Versioning**: Prepare for API versioning
- **Error responses**: Consistent error format
- **Status codes**: Appropriate HTTP status codes
- **Pagination**: Implement for list endpoints

## Logging
- **Winston**: Structured logging with Winston
- **Log levels**: Use appropriate levels (error, warn, info, debug)
- **Rotation**: Daily log rotation
- **Production**: Log to files in production
- **Development**: Console logging for development
