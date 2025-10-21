#recuperer le token :
node -e "console.log(require('jsonwebtoken').sign({userId: 1}, 'your-secret-key', {expiresIn: '1h'}))"
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MTA3MDk0OCwiZXhwIjoxNzYxMDc0NTQ4fQ.T2DiezgKn3lJ_90nMmsrhZQIzqY0Qw4pODvvDE01F1M

curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-H "auth-user: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MTA3MDk0OCwiZXhwIjoxNzYxMDc0NTQ4fQ.T2DiezgKn3lJ_90nMmsrhZQIzqY0Qw4pODvvDE01F1M" \
-d '{"name": "Test Todo", "description": "Description de test"}'