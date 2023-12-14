## Architecture

J'ai opté pour une architecture à 2 processus :

1. **Le serveur Web** pour la communication avec le Front-End.
2. **Un worker** pour gérer l'exécution des actions et le rafraîchissement des crédits.

L'exécution des actions de différents utilisateurs peut consommer beaucoup de ressources. De plus, cette partie de l'application est indépendante de l'API.<br/><br/>Donc, séparer ces processus est préférable pour ne pas impacter les performances du serveur Web.

Pour lancer ces processus, j'ai utilisé PM2.

---

## Représentation des données

En ce qui concerne la représentation des données, j'ai adopté une approche très simple, avec un utilisateur unique. 

1. Pour les actions, j'ai utilisé un tableau d'objets contenant le nom des actions et leur nombre de crédits. 
2. Pour les actions à exécuter, j'ai utilisé un objet avec deux clés, "pending" et "executed", représentant chacune un ensemble de noms d'actions.

Dans le cadre de cet exercice, j'ai opté pour l'utilisation de fichiers pour la persistance des données.

J'ai veillé à ce que la data layer soit extensible (voir `IDataProvider` et `DataProviderFactory`) afin de démontrer qu'il est facile de changer la source de données sans modifier le reste de l'application.

Par exemple, dans le cas d'une base de données NoSQL, la représentation pourrait être similaire à celle que j'ai utilisée :

1. Un document pour la file d'attente.
2. Un document pour les actions.

De plus, dans une véritable base de données, chaque document inclurait également l'ID de l'utilisateur, un identifiant unique, ainsi que la date de création/mise à jour. 
Je n'ai pas inclus ces éléments dans mon application car leur utilité n'était pas justifiée pour cet exercice.

---

## API

Pour l'API, j'ai suivi le modèle de données que j'ai implémenté, à savoir avoir des endpoints distincts pour la file d'attente et les actions.

- `GET /actions` pour récupérer les actions avec les crédits.
- `GET /config` pour récupérer l'intervalle d'exécution des actions et celui du rafraîchissement des crédits.
- `GET /queue` pour récupérer les actions en attente et/ou éxécutées. J'ai ajouté des paramètres de filtrage pour éviter de récupérer toutes les actions en permanence, ce qui pourrait impacter les performances du serveur dans une application réelle en production.
- `PATCH /queue` pour ajouter une action à la file d'attente.
