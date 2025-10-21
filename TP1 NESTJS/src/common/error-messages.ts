export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Le nom du todo est obligatoire.',
  NAME_TOO_SHORT: 'Le nom doit contenir au moins 3 caractères.',
  NAME_TOO_LONG: 'Le nom ne peut pas dépasser 10 caractères.',
  DESCRIPTION_REQUIRED: 'La description est obligatoire.',
  DESCRIPTION_TOO_SHORT: 'La description doit contenir au moins 10 caractères.',
  STATUS_INVALID: 'Le statut doit être PENDING, IN_PROGRESS ou DONE.',
  // Messages d'erreur d'autorisation
  UNAUTHORIZED_ACCESS: 'Accès non autorisé : vous ne pouvez pas accéder à cette ressource.',
  FORBIDDEN_MODIFICATION: 'Modification interdite : vous ne pouvez modifier que vos propres todos.',
  FORBIDDEN_DELETION: 'Suppression interdite : vous ne pouvez supprimer que vos propres todos.',
  TODO_NOT_FOUND: 'Todo non trouvé ou vous n\'avez pas l\'autorisation d\'y accéder.',
};
