# 🔐 Authentification & Sécurité des Todos

## 📋 Résumé de l'implémentation

Ce projet implémente un système d'authentification JWT complet pour sécuriser les opérations CRUD des todos.

## ✅ Fonctionnalités implémentées

### 1. Middleware d'Authentification JWT
- **Fichier** : `src/auth/auth/auth.middleware.ts`
- **Fonctionnalités** :
  - Vérification de la présence du header `auth-user`
  - Décodage du token JWT avec `jsonwebtoken`
  - Extraction du `userId` du token
  - Injection du `userId` dans l'objet `request`
  - Gestion des erreurs 401 pour tokens absents ou invalides

### 2. Sécurisation du TodoController
- **Fichier** : `src/todo/todo.controller.ts`
- **Fonctionnalités** :
  - **Création** : Ajout automatique du `userId` lors de l'ajout d'un todo
  - **Lecture** : Retour seulement des todos de l'utilisateur connecté
  - **Modification** : Vérification que seul le propriétaire peut modifier un todo
  - **Suppression** : Vérification que seul le propriétaire peut supprimer un todo

### 3. Mise à jour du TodoService
- **Fichier** : `src/todo/todo.service.ts`
- **Fonctionnalités** :
  - Toutes les méthodes acceptent maintenant un paramètre `userId`
  - Filtrage automatique par `userId` dans toutes les requêtes
  - Vérification de propriété avant modification/suppression

### 4. Mise à jour de l'entité Todo
- **Fichier** : `src/todo/entities/todo.entity.ts`
- **Ajout** : Champ `userId` pour associer chaque todo à un utilisateur

### 5. Gestion des Erreurs
- **Fichier** : `src/common/error-messages.ts`
- **Messages d'erreur** :
  - `UNAUTHORIZED_ACCESS` : Accès non autorisé
  - `FORBIDDEN_MODIFICATION` : Modification interdite
  - `FORBIDDEN_DELETION` : Suppression interdite
  - `TODO_NOT_FOUND` : Todo non trouvé ou pas d'autorisation

## 🚀 Comment tester

### 1. Générer un token JWT de test
```bash
node test-auth.js
```

### 2. Utiliser le token dans vos requêtes
```bash
# Créer un todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "auth-user: VOTRE_TOKEN_JWT" \
  -d '{"name": "Mon Todo", "description": "Description de mon todo"}'

# Récupérer tous les todos
curl -X GET http://localhost:3000/todos \
  -H "auth-user: VOTRE_TOKEN_JWT"

# Récupérer les statistiques
curl -X GET http://localhost:3000/todos/stats \
  -H "auth-user: VOTRE_TOKEN_JWT"
```

### 3. Tests d'erreur
```bash
# Sans token (doit retourner 401)
curl -X GET http://localhost:3000/todos

# Avec token invalide (doit retourner 401)
curl -X GET http://localhost:3000/todos -H "auth-user: token-invalide"
```

## 🔧 Configuration

### Variables d'environnement
- `JWT_SECRET` : Clé secrète pour signer les tokens (actuellement : `'your-secret-key'`)

### Middleware appliqué
Le middleware d'authentification est automatiquement appliqué à toutes les routes du `TodosController` via la configuration dans `src/todo/todo.module.ts`.

## 📊 Sécurité implémentée

1. **Authentification obligatoire** : Toutes les routes nécessitent un token JWT valide
2. **Isolation des données** : Chaque utilisateur ne voit que ses propres todos
3. **Vérification de propriété** : Impossible de modifier/supprimer les todos d'autres utilisateurs
4. **Messages d'erreur sécurisés** : Pas d'exposition d'informations sensibles
5. **Gestion des tokens expirés** : Détection et gestion des tokens expirés

## 🎯 Points clés

- ✅ Middleware JWT fonctionnel
- ✅ Sécurisation complète du TodoController
- ✅ Gestion d'erreurs appropriée
- ✅ Messages d'erreur en français
- ✅ Isolation des données par utilisateur
- ✅ Vérification de propriété sur toutes les opérations
