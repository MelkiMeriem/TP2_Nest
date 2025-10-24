# CRUD Testing with PowerShell

## Users

### GET all users
Invoke-RestMethod -Uri http://localhost:3000/user -Method GET

### GET one user
Invoke-RestMethod -Uri http://localhost:3000/user/4 -Method GET

### POST create user
Invoke-RestMethod -Uri http://localhost:3000/user -Method POST -Body (@{username="testuser";email="test@example.com";password="123456"} | ConvertTo-Json) -ContentType "application/json"

### PATCH update user
Invoke-RestMethod -Uri http://localhost:3000/user/1 -Method PATCH -Body (@{username="emma"} | ConvertTo-Json) -ContentType "application/json"

### DELETE user
Invoke-RestMethod -Uri http://localhost:3000/user/3 -Method DELETE

## CVs

### GET all CVs
Invoke-RestMethod -Uri http://localhost:3000/cv -Method GET

### GET one CV
Invoke-RestMethod -Uri http://localhost:3000/cv/1 -Method GET

### POST create CV
Invoke-RestMethod -Uri http://localhost:3000/cv -Method POST -Body (@{name="Doe";firstname="John";age=30;cin="12345678";job="Developer";userId=1;skillsIds=@()} | ConvertTo-Json) -ContentType "application/json"

### PATCH update CV
Invoke-RestMethod -Uri http://localhost:3000/cv/1 -Method PATCH -Body (@{job="Senior Developer"} | ConvertTo-Json) -ContentType "application/json"

### DELETE CV
Invoke-RestMethod -Uri http://localhost:3000/cv/1 -Method DELETE

## Skills

### GET all skills
Invoke-RestMethod -Uri http://localhost:3000/skill -Method GET

### GET one skill
Invoke-RestMethod -Uri http://localhost:3000/skill/5b167ba0-c8af-4b20-b5c7-9e2ff051e2e9 -Method GET

### POST create skill
Invoke-RestMethod -Uri http://localhost:3000/skill -Method POST -Body (@{designation="NewSkill"} | ConvertTo-Json) -ContentType "application/json"

### PATCH update skill
Invoke-RestMethod -Uri http://localhost:3000/skill/5b167ba0-c8af-4b20-b5c7-9e2ff051e2e9 -Method PATCH -Body (@{designation="UpdatedSkill"} | ConvertTo-Json) -ContentType "application/json"

### DELETE skill
Invoke-RestMethod -Uri http://localhost:3000/skill/5b167ba0-c8af-4b20-b5c7-9e2ff051e2e9 -Method DELETE

