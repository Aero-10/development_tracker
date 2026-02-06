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
