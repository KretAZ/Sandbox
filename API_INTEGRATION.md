# Ofertownik+ API Integration Guide

This guide explains how to integrate the React frontend with the Java Spring Boot backend API.

## Backend Setup

### 1. Prerequisites
- Java 17 or higher
- Maven 3.6+

### 2. Start the Backend Server

```bash
cd ../ofertownik-backend
mvn clean install
mvn spring-boot:run
```

The server will start on `http://localhost:3001/api`

### 3. Verify Backend is Running

```bash
curl http://localhost:3001/api/cases
# Should return: []
```

## Frontend Setup

### 1. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the API base URL if needed:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Using the API Service

### Importing the API Service

```javascript
import { authAPI, casesAPI, dashboardAPI } from '../services/api';
```

### Using Custom Hooks

```javascript
import { useCases } from '../hooks/useCases';
import { useDashboardStats } from '../hooks/useDashboardStats';

function MyComponent() {
  const { cases, loading, error, createCase } = useCases();
  const { stats, loading: statsLoading } = useDashboardStats();

  // Use cases and stats in your component
}
```

## API Endpoints Reference

### Authentication

#### Login
```javascript
const response = await authAPI.login('anna.kowalska@ofertownik.pl', 'password123');
// Returns: { token: "...", user: { id, email, firstName, lastName, role } }
```

Test Users:
- **Email**: `anna.kowalska@ofertownik.pl` | **Password**: `password123`
- **Email**: `jan.nowak@ofertownik.pl` | **Password**: `password123`

#### Get Current User
```javascript
const user = await authAPI.getCurrentUser();
// Requires: Authorization header with JWT token
```

#### Logout
```javascript
await authAPI.logout();
// Clears the JWT token from localStorage
```

### Cases

#### Get All Cases
```javascript
const cases = await casesAPI.getAll();
// Returns: [ { id, client, broker, product, priority, ... }, ... ]
```

#### Get Single Case
```javascript
const caseData = await casesAPI.getById('2024-0886');
```

#### Create Case
```javascript
const newCase = await casesAPI.create({
  id: '2024-1000',
  client: 'New Client',
  broker: 'New Broker',
  product: 'Produktu',
  priority: 'WYSOKI',
  underwriter: 'J. Nowak',
  slaHours: 24
});
```

#### Update Case
```javascript
const updated = await casesAPI.update('2024-0886', {
  status: 'CLOSED',
  priority: 'NISKI'
});
```

#### Delete Case
```javascript
await casesAPI.delete('2024-0886');
```

#### Filter by Broker
```javascript
const brokerCases = await casesAPI.filterByBroker('Everest Trading Co.');
```

#### Filter by Priority
```javascript
const urgentCases = await casesAPI.filterByPriority('PILNY');
// Priority values: 'PILNY', 'WYSOKI', 'ŚREDNI', 'NISKI'
```

### Dashboard

#### Get Statistics
```javascript
const stats = await dashboardAPI.getStats();
// Returns: { urgentCount, newCount, inProgressCount, missingDocsCount }
```

## Implementing API Calls in Components

### Example: Update Dashboard with Real Data

Before (using mock data):
```javascript
function Dashboard() {
  const stats = [
    { icon: 'alert', label: 'Pilne', value: 1, color: 'var(--danger-500)' },
    // ...
  ];

  return (
    <div>
      {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
    </div>
  );
}
```

After (using API):
```javascript
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useCases } from '../hooks/useCases';

function Dashboard() {
  const { stats, loading: statsLoading } = useDashboardStats();
  const { cases, loading: casesLoading } = useCases();

  if (statsLoading || casesLoading) {
    return <LoadingSpinner />;
  }

  const statCards = [
    { icon: 'alert', label: 'Pilne', value: stats.urgentCount, color: 'var(--danger-500)' },
    { icon: 'mail', label: 'Nowe sprawy', value: stats.newCount, color: 'var(--brand-500)' },
    { icon: 'clock', label: 'Sprawy w toku', value: stats.inProgressCount, color: 'var(--brand-500)' },
    { icon: 'document', label: 'Braki dokumentów', value: stats.missingDocsCount, color: 'var(--warning-600)' },
  ];

  return (
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {statCards.map(stat => <StatCard key={stat.label} {...stat} />)}
      </div>
      <CaseTable cases={cases} />
    </div>
  );
}
```

## Error Handling

The API service includes built-in error handling:

```javascript
try {
  const cases = await casesAPI.getAll();
} catch (error) {
  console.error('Failed to fetch cases:', error);
  // Show error toast or UI notification
}
```

With hooks:

```javascript
function MyComponent() {
  const { cases, loading, error } = useCases();

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return <CaseTable cases={cases} />;
}
```

## Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token is stored in `localStorage`
4. All subsequent requests include `Authorization: Bearer {token}` header
5. If token is invalid/expired, user is redirected to login

## CORS Configuration

The backend is configured with CORS for:
- `http://localhost:5173` (frontend dev server)

To allow other origins (e.g., production URLs), update `SecurityConfig.java`:

```java
@CrossOrigin(origins = {"http://localhost:5173", "https://yourdomain.com"})
```

## Troubleshooting

### Backend not running
```bash
# Check if port 3001 is in use
lsof -ti:3001

# Kill the process
lsof -ti:3001 | xargs kill -9

# Restart backend
mvn spring-boot:run
```

### CORS errors
- Ensure backend is running on port 3001
- Check `@CrossOrigin` annotation in controllers
- Verify `VITE_API_BASE_URL` in `.env` matches backend URL

### Authentication errors (401)
- Check JWT token is stored in localStorage
- Verify token hasn't expired (24 hours by default)
- Try logging in again with test credentials

### JWT token not being sent
- Ensure the token is in `localStorage` under key `authToken`
- Check browser DevTools > Application > Local Storage
- Verify API requests include `Authorization` header

## Next Steps

1. **Replace Mock Data**: Update Dashboard, CaseTable, and other components to use the hooks
2. **Add Loading States**: Show spinners while data is loading
3. **Add Error Notifications**: Display toast/snackbar for errors
4. **Implement Mutations**: Use forms to create/update/delete cases
5. **Add Pagination**: Handle large case lists
6. **Implement Filtering**: Build filter UI that uses the API
7. **Add Authentication UI**: Create login page if needed
8. **Deploy**: Follow deployment guide for both frontend and backend

## Testing

### Manual Testing with curl

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anna.kowalska@ofertownik.pl","password":"password123"}'

# Get cases (with token from login)
curl http://localhost:3001/api/cases \
  -H "Authorization: Bearer {token_from_login}"

# Get stats
curl http://localhost:3001/api/dashboard/stats \
  -H "Authorization: Bearer {token}"
```

### With Postman

1. Set variable `base_url = http://localhost:3001/api`
2. POST `{{base_url}}/auth/login` to get token
3. Set variable `token` from response
4. Use `Authorization: Bearer {{token}}` in subsequent requests
5. Test all endpoints with GET, POST, PUT, DELETE methods

## Production Deployment

See `ofertownik-backend/README.md` for backend production setup.

For frontend:
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

Update `VITE_API_BASE_URL` to point to your production backend API.
