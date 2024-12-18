# simple-server

## Installation

1. Klona repot
2. Gå till repo-mappen i terminalen och kör kommandot: `npm install` eller `npm i`
3. Skapa en `.env`-fil i rooten av repo-mappen och definiera följande variabler:
    1. `PORT`
    2. `MONGO_CONNECTION_STRING`
    3. `JWT_SECRET`

För att generera en JWT_SECRET kan du använda följande kommando i terminalen:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```


## Användning av applikationen

Starta servern: `node src/index.js`

### Hur du använder api:et

Bas URL: `localhost:<port>/api`.
Byt ut `<port>` med den port som servern körs på.

1. Skapa en uppgift: POST `/tasks`
    - Skicka ett JSON-objekt i request body som anger "title", "status", "estimatedTime", "category" och "priority".
    - Endast titeln på uppgiften är obligatorisk.
2. Hämta en uppgift: GET `/tasks/{id}`
    - Byt ut `{id}` mot uppgiftens ID.
3. Uppdatera en uppgift: PUT `/tasks/{id}`
    - Skicka ett JSON-objekt som vid skapandet av uppgiften.
4. Ta bort en uppgift: DELETE `/tasks/{id}`
    - Byt ut `{id}` mot uppgiftens ID.
5. Skapa en ny användare: POST `/users`
    - Skicka ett JSON-objekt i request body med namn och lösenord. Exempel:
      ```json
      {
          "name": "mitt namn",
          "password": "mitt lösenord"
      }
      ```
6. Logga in: POST `/auth/login`
    - Du kommer att vara auktoriserad i en timme.
7. Hämta alla uppgifter: POST `/protected/get-tasks`
    - **OBS! Du måste vara inloggad för att använda denna funktion.**
    - **OBS! Efter att du skapat en ny användare måste du logga in; du blir inte automatiskt inloggad.**

### Hur du använder webbsidan

Skapa en ny användare genom att fylla ut textfälten för namn och lösenord och sedan tryck på knappen "sign up". Gå sedan tillbaka till inloggnings sidan.

Logga in genom att fylla ut textfälten för namn och lösenord, tryck sedan på knappen "sing in". Det kommer föra dig vidare till en sida där du kan skapa, hämta, uppdatatera och radera uppgifter. Du kommer vara auktoriserad i en timme.

**För att:**
1. Skapa en uppgift genom att fylla i titel, status, uppskattad tid, kategori och prioritet. Endast titel är obligatorisk. Tryck på "POST"-knappen.
2. Uppdatera en uppgift genom att fylla i samma fält som vid skapande av uppgiften och ID:et. Tryck på "PUT"-knappen.
3. Hämta en uppgift genom att fylla i ID och tryck på "GET".
4. Ta bort en uppgift genom att fylla i ID och trycka på "DELETE".
5. För att hämta alla uppgifter, tryck på "See all tasks"-knappen.

Responsen kommer visas så som JSON-objekt. För att göra ytterligare operationer, gå tillbaka i webbläsaren ett steg (till `http://localhost:<port>/api/auth/login`)

## Skärmdumpar
Skärmdump som visar webbsidan efter lyckad inloggning samt cookie med JWT-token.
![Skärmavbild som visar cookie](screenshoots/Skärmavbild%202024-12-18%20kl.%2020.58.36.png)