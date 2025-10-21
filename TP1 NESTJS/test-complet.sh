#!/bin/bash

echo "🔐 Test d'authentification JWT - Todos Sécurisés"
echo "================================================"

# Générer un token JWT
TOKEN=$(node -e "console.log(require('jsonwebtoken').sign({userId: 1}, 'your-secret-key', {expiresIn: '1h'}))")
echo "✅ Token généré : $TOKEN"
echo ""

# Test 1: Créer un todo
echo "📝 Test 1: Créer un todo"
curl -s -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "auth-user: $TOKEN" \
  -d '{"name": "Test Todo", "description": "Todo de test automatique"}' | jq .
echo ""

# Test 2: Récupérer tous les todos
echo "📋 Test 2: Récupérer tous les todos"
curl -s -X GET http://localhost:3000/todos \
  -H "auth-user: $TOKEN" | jq .
echo ""

# Test 3: Récupérer les statistiques
echo "📊 Test 3: Récupérer les statistiques"
curl -s -X GET http://localhost:3000/todos/stats \
  -H "auth-user: $TOKEN" | jq .
echo ""

# Test 4: Sans token (doit échouer)
echo "❌ Test 4: Sans token (doit retourner 401)"
curl -s -X GET http://localhost:3000/todos | jq .
echo ""

# Test 5: Token invalide (doit échouer)
echo "❌ Test 5: Token invalide (doit retourner 401)"
curl -s -X GET http://localhost:3000/todos \
  -H "auth-user: token-invalide" | jq .
echo ""

echo "🎯 Tests terminés !"
