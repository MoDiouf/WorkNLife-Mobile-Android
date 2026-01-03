# WorkNLife Mobile

**WorkNLife Mobile** est une application mobile tout-en-un destinée aux employés d’entreprise. Elle vise à **simplifier la vie au travail** en combinant quatre services principaux : **Commandes**, **Covoiturage**, **Loisir** et **Health**, sur Android et iOS.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Contribuer](#contribuer)  
- [Licence](#licence)  

---

## Fonctionnalités

### Inscription et Connexion
L’application propose un processus simple d’inscription et de connexion pour les employés.  
<img width="300" alt="Inscription" src="https://github.com/user-attachments/assets/aea30221-8a8f-4bcb-8d8f-17d50f7a6b1d" />
<img width="300" alt="Connexion" src="https://github.com/user-attachments/assets/fec0ef4b-abb2-47b0-a538-f476eb1412ac" />
<img width="300" alt="Mot de passe oublié" src="https://github.com/user-attachments/assets/f9c46cc3-59d1-4118-9806-fc35f7518057" />

### Page d'accueil
Vue principale regroupant tous les services accessibles en un clic.  
<img width="300" alt="Page d'accueil" src="https://github.com/user-attachments/assets/182da047-56e0-4c89-b3d7-e3858771b188" />

### 1. Commandes
Permet de **passer des commandes chez un restaurateur partenaire** facilement depuis l’application.  
<img width="300" alt="Commandes 1" src="https://github.com/user-attachments/assets/4c3c51d7-551c-4867-a160-83674fa915dd" />
<img width="300" alt="Commandes 2" src="https://github.com/user-attachments/assets/c3ccca6e-fd99-4f7f-845c-0dc875b3b37b" />

### 2. Covoiturage
Gérez vos trajets professionnels de manière simple :  

- **Créer un trajet** et le proposer aux collègues.  
<img width="300" alt="Créer trajet" src="https://github.com/user-attachments/assets/d6f3da3e-2993-4b9e-84a6-5c6189757695" />

- **Réserver un trajet** existant.  
<img width="300" alt="Réserver trajet" src="https://github.com/user-attachments/assets/aaa5dfe4-fe4c-4b49-a531-a86bd83c998e" />

- Notifications en **temps réel** via WebSocket.  
- Accepter ou décliner des demandes de covoiturage.  
- Envoyer des documents pour vérification d’un conducteur avant la création d’un trajet.  
- Démarrer ou supprimer un covoiturage.  
<img width="300" alt="Gestion covoiturage" src="https://github.com/user-attachments/assets/eab17b59-5880-4f61-b4d4-b41b99dd0740" />

### 3. Loisir et Health
- **Loisir** : Lister les entreprises de loisirs créées depuis le portail admin.  
<img width="300" alt="Loisir" src="https://github.com/user-attachments/assets/60f51bae-9b79-4870-8e2a-0b065da8b697" />

- **Health** : Suivi du bien-être et conseils pour les employés.  
<img width="300" alt="Health" src="https://github.com/user-attachments/assets/e88fc621-f6a6-43c5-aace-dd5a2a847529" />

---

## Technologies

- **Frontend** : React Native  
- **Backend** : À cloner depuis le dépôt dédié  
- **Plateformes** : Android & iOS  
- **Notifications temps réel** : WebSocket  

---

## Installation

1. Cloner le dépôt frontend :  
```bash
git clone <URL_DU_FRONTEND>
cd WorkNLifeMobile
```
2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```
3. Lancer l’application avec Expo :
```bash
npx expo start
```
4. Optionnel pour tests avancés :

-Cloner le backend.
-Créer des entreprises (restaurant, loisir, admin) via le portail.
-Connecter l’app au backend local ou distant.
---

