# development_tracker
My own development tracking tool

1) Login page:
User logs in (email + password + device fingerprint)
↓
Server verifies credentials (bcrypt)
↓
Server issues:
  - Access Token (JWT, expires in 10 minutes)
    • Stored in frontend memory
    • Contains: userId, roles, tokenVersion
  - Refresh Token (expires in 7–30 days)
    • Bound to: userId + device fingerprint + tokenVersion
    • Hashed and stored in DB
    • Sent as httpOnly, Secure, SameSite cookie
↓
Frontend calls protected APIs
↓
Access token sent in Authorization header (Bearer token)
↓
Access token expires
↓
Frontend calls /auth/refresh endpoint
↓
Browser automatically sends refresh token cookie
↓
Server verifies refresh token:
  • Hash match
  • Not expired
  • Device fingerprint matches
  • Token version matches
  • Token not previously used
↓
Server rotates refresh token:
  • Invalidates old refresh token
  • Issues new access token (10 min)
  • Issues new refresh token (7–30 days)
  • Updates DB and cookie
↓
Frontend continues with new access token
↓
If refresh token reuse or validation fails:
  • Invalidate all refresh tokens
  • Increment tokenVersion
  • Clear auth cookies
  • Force re-login

colour theme :
#F38181
#FCE38A
#EAFFD0
#95E1D3

6-2-2026

Backend throws meaningful HTTP status + message
↓
Frontend catches Axios error
↓
Extract safe message
↓
Show it in UI
↓
Never crash app


in backend/src/routes/auth.js make signup route -> verifyEmail false when doing actual sending mail


User Dashboard & Item Management

User opens dashboard
↓
Frontend fetches all items → GET /items
↓
Server queries DB:

Items filtered by userId

Each item includes:
• type: Project / College Subject / Placement Topic / Task
• title, description
• status: Not Started / In Progress / Completed
• priority / tags
• deadlines / links / notes
↓
Server responds with items → dashboard displays cards / table / list
↓
User creates a new item → POST /items
↓
Server validates item:
• Required fields (title, type)
• Status and priority valid
↓
Server saves item to DB → responds with created item
↓
Frontend updates dashboard with new item

User edits an item → PUT /items/:id
↓
Server validates & updates DB → responds with updated item
↓
Frontend updates dashboard

User deletes an item → DELETE /items/:id
↓
Server removes item from DB → responds with success
↓
Frontend updates dashboard

Progress Tracking / Analytics

Dashboard aggregates item progress:

% of Projects completed

% of Subjects / Placement Topics completed

Tasks done vs pending

Upcoming deadlines / priority tasks
↓
Frontend displays charts / progress bars / calendar

Optional: Daily / Weekly Activity Logs

User logs session or time spent on item → POST /logs
↓
Server stores log → DB
↓
Dashboard displays streaks, total hours, heatmaps

Data Model Overview (simplified)

User: { id, email, passwordHash, roles, tokenVersion, refreshTokens }

Item: { id, userId, type, title, description, status, priority, tags, links, notes, createdAt, updatedAt }

ActivityLog: { id, userId, itemId, date, duration, notes }



_______________________________________________________________________________________________
7-2-26

Updates (Since Last Version)
1. Dashboard Layout & UI

Topbar now shows the app title, user email, and logout button.

Floating “New Item” button added at the top for quick item creation.

Sticky layout preserved: Sidebar + Topbar + scrollable main content.

Improved item cards and panels with hover effects, rounded corners, and consistent spacing.

Responsive grid: 1–4 columns depending on screen size.

2. Item Management

Full CRUD functionality implemented:

Create new item via modal form.

Update item details using ItemDetailsPanel.

Delete items from the dashboard.

New Item modal supports:

Title, Description, Type, Status, Priority, Notes.

Cancel / Create buttons.

Smooth overlay without overlapping Topbar elements.

3. Filters & Search

Filters Bar now fully functional:

Filter by Type, Status, Priority.

Clear Filters button resets all filters.

Search integrated into Filters Bar:

Instant search by Title and Notes.

Optimized using useMemo to avoid unnecessary re-renders.

Filters and search work for both Recent Items and All Items grids.

4. Recent Items

Displays last 4 updated items in a responsive grid.

Clicking an item opens ItemDetailsPanel with live updates.

5. ItemCardsGrid

Displays all items.

Respects applied filters and search text.

Shows friendly message if no items match the current filters.

6. Optimizations

Search and filter updates are reactive and instant.

Reduced re-renders using memoized filtered results.

Smooth UX with consistent spacing and hover effects.

7. Notes on Future Enhancements

Attachments (PDFs/files) – will store in MongoDB or external storage.

Export / Download Items (CSV / JSON).

Pagination / Infinite Scroll for large lists.

Dark / Light Theme toggle.

Notifications / Toasts for actions.