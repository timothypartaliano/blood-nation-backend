# blood-nation-backend
BloodNation is an application designed to facilitate blood donation by helping users find locations for blood donation events and make reservations to participate in these events.

**application build** :
1. `npm init -y`
2. `npm i sequelize`
3. `npm i --save-dev sequelize-cli`
4. `npm i pg`
5. `npm i express`
6. `npm i bcrypt`
7. `npm i jsonwebtoken`
8. `npm i dotenv`

**application sequelize cli** :
1. `npx sequelize init`
2. `npx sequelize db:create`
3. `npx sequelize model:generate --name <table-name> --attributes <field>:<data-type>,<field>:<data-type>...`
4. `npx sequelize db:migrate`
→ `npx sequelize db:migrate:undo --name <migration--name>`
5. `npx sequelize seed:generate --name <file-name>`
6. `npx sequelize db:seed --seed <seeders-name>`
→ `npx sequelize db:seed:undo --seed <seeders-name>`