# Explications des fonctions du Seeder et de la génération de données

## 1. `uniqueGenerate(fn, count)`

**But :** Générer un ensemble de valeurs uniques à partir d’une fonction génératrice `fn`.  

**Comment ça marche :**  
- Crée un `Set` vide (`set`) pour stocker les valeurs uniques.  
- Tant que la taille du `Set` est inférieure au nombre demandé (`count`), appelle `fn()` et ajoute le résultat au `Set`.  
- Comme un `Set` ne peut pas contenir de doublons, les valeurs répétées sont automatiquement ignorées.  
- Convertit ensuite le `Set` en tableau (`Array.from(set)`) et le retourne.  

**Exemple d’usage :** Générer 5 emails uniques ou 10 noms uniques.

---

## 2. `genSkills()`

**But :** Créer une liste de compétences (`Skill`) uniques pour la base de données.  

**Comment ça marche :**  
- Appelle `uniqueGenerate(() => randWord(), cfg.skills)` :  
  - `randWord()` génère un mot aléatoire.  
  - `cfg.skills` indique combien de compétences créer.  
- Transforme chaque mot en objet `Skill` : `{ designation } as Skill`.  

**Résultat :** Un tableau de `Skill` prêt à être inséré en DB, chaque `designation` étant unique.

---

## 3. `genUsers()`

**But :** Générer des utilisateurs uniques avec email, username et mot de passe.  

**Comment ça marche :**  
- Utilise `uniqueGenerate` pour :  
  - Créer `usernames` uniques à partir de `randFirstName().toLowerCase()`.  
  - Créer `emails` uniques à partir de `randEmail()`.  
- Crée ensuite un tableau d’objets `Partial<User>` :  
  - `username` = nom d’utilisateur unique  
  - `email` = email unique  
  - `password` = mot de passe aléatoire (`randPassword({ length: 10, memorable: true }).join('')`)  

**Remarque :** On ne met pas l’ID ici, il sera généré automatiquement par TypeORM lors de l’insertion en DB.

---

## 4. `pickSkills(allSkills)`

**But :** Sélectionner un sous-ensemble unique de compétences pour un CV.  

**Comment ça marche :**  
- Copie le tableau `allSkills` pour ne pas modifier l’original.  
- Mélange le tableau avec `.sort(() => 0.5 - Math.random())`.  
- Retourne les `cfg.skillsPerCv` premiers éléments du tableau mélangé.  

**Résultat :** Chaque CV obtient un ensemble unique de compétences sans doublons.

---

## 5. `genCv(user, allSkills)`

**But :** Générer un CV associé à un utilisateur.  

**Comment ça marche :**  
- Remplit les champs du CV avec des valeurs aléatoires :  
  - `name` = nom de famille aléatoire (`randLastName()`)  
  - `firstname` = prénom aléatoire (`randFirstName()`)  
  - `age` = nombre aléatoire entre 20 et 60 (`randNumber({ min: 20, max: 60 })`)  
  - `cin` = nombre aléatoire de 8 chiffres (`randNumber({ min: 10000000, max: 99999999 }).toString()`)  
  - `job` = titre de poste aléatoire (`randJobTitle()`)  
  - `path` = chemin du fichier CV généré avec le nom de l’utilisateur et un timestamp  
- Associe des compétences à ce CV via `skills: pickSkills(allSkills)`.

---

## 6. Partie Seeder (Appel des fonctions)

**But :** Générer et insérer automatiquement des données fictives dans la base (`users`, `CVs`, `skills`).  

**Comment ça marche :**  
1. **Générer les compétences** avec `genSkills()` et les insérer dans la DB via le `SkillService`.  
2. **Générer les utilisateurs** avec `genUsers()` et les insérer via le `UserService`.  
3. Pour chaque utilisateur :  
   - Créer `cfg.cvsPerUser` CVs avec `genCv(user, skills)`  
   - Associer chaque CV à son utilisateur et à un sous-ensemble de compétences  
   - Insérer chaque CV via le `CvService`.  

**Résultat :**  
- Les `users` sont uniques.  
- Chaque `CV` appartient à un utilisateur correct et contient un ensemble unique de compétences.  
- La base de données est initialisée avec un jeu de données complet et cohérent pour le développement ou les tests.
