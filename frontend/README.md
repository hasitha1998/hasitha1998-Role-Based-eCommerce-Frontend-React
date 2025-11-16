# eCommerce Admin Dashboard - Frontend

A modern, role-based admin dashboard built with React, TypeScript, and Vite for managing an eCommerce platform.

## 🚀 Live Demo

**Deployed Application:** [https://hasitha1998-role-based-e-commerce-f.vercel.app](https://hasitha1998-role-based-e-commerce-f.vercel.app)

**Demo Credentials:**
- **Admin:** `admin@admin.com` / `admin123`
- **User:** Create your own account via registration

## 📋 Features

### Authentication & Authorization
- ✅ JWT-based authentication with secure token storage
- ✅ Role-based access control (Admin/User)
- ✅ Google OAuth integration
- ✅ Protected routes with role validation
- ✅ Automatic token refresh and session management

### Admin Features
- 📊 **Dashboard** - Real-time statistics (users, orders, products, revenue)
- 🛍️ **Product Management** - Full CRUD operations with image upload
- 📁 **Category Management** - Organize products into categories
- 📦 **Order Management** - View and update order statuses
- ⚙️ **Settings** - Configure application settings
- 👥 **User Management** - View and manage user accounts

### User Features
- 📋 View personal orders
- 👤 Profile management
- 🔔 Order status tracking

### UI/UX
- 🎨 Clean, modern interface with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌙 Consistent design system with reusable components
- ⚡ Fast navigation with React Router
- 🔄 Loading states and error handling
- ✅ Form validation

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Authentication:** JWT + Google OAuth
- **Deployment:** Vercel

## 📁 Project Structure
```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── features/   # Feature-specific components
│   │   │   ├── auth/
│   │   │   ├── categories/
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   └── products/
│   │   ├── layout/     # Layout components
│   │   └── ui/         # UI primitives (Button, Card, Input, etc.)
│   ├── contexts/       # React contexts (AuthContext)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── routes/         # Routing configuration
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── .env.example        # Environment variables template
├── package.json
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see [backend repository](../backend))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Google OAuth (Optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts
```bash
# Development
npm run dev              # Start development server

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors

# Type Checking
npm run type-check       # Run TypeScript compiler check
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | No |

## 🎯 Key Features Implementation

### Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all subsequent API requests
6. Protected routes check for valid token

### Role-Based Access Control
```typescript
// Admin-only route
<Route
  path="/products/new"
  element={
    <AdminRoute>
      <CreateProductPage />
    </AdminRoute>
  }
/>

// User route
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  }
/>
```

### API Integration

All API calls are centralized in the `services` folder:
```typescript
// services/product.service.ts
class ProductService {
  async getAll() {
    const response = await api.get('/products');
    return response.data;
  }
  
  async create(data: ProductFormData) {
    const response = await api.post('/products', data);
    return response.data;
  }
}
```

## 🎨 Component Library

Reusable UI components in `src/components/ui/`:

- `Button` - Primary, secondary, danger variants
- `Card` - Container with header/body
- `Input` - Form input with validation
- `Select` - Dropdown select
- `Table` - Data table with sorting
- `Modal` - Dialog/popup
- `Badge` - Status indicators
- `Spinner` - Loading indicator
- `Alert` - Notification messages

## 🔐 Security Features

- ✅ JWT token validation on every request
- ✅ Automatic token refresh
- ✅ Protected routes with authentication check
- ✅ Role-based component rendering
- ✅ XSS protection via React
- ✅ CORS configuration
- ✅ Secure password handling (never stored in frontend)

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Set environment variables in Vercel dashboard**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` with your production backend URL

### Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 🧪 Testing
```bash
# Run tests (if configured)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

Run linting:
```bash
npm run lint
npm run lint:fix
```

## 🐛 Known Issues

- None currently

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@hasitha1998](https://github.com/hasitha1998)

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
- AdminJS for database admin panel inspiration

---

**Backend Repository:** [Link to backend repo]

**API Documentation:** [Link to API docs]