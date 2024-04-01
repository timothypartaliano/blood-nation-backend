# blood-nation-backend
BloodNation is an application designed to facilitate blood donation by helping users find locations for blood donation events and make reservations to participate in these events.

application build :
1. `npm init -y`
2. `npm i sequelize`
3. `npm i --save-dev sequelize-cli`
4. `npm i pg`
5. `npm i express`

application sequelize cli :
1. `npx sequelize init`
2. `npx sequelize db:create`
3. `npx sequelize model:generate --name <table-name> --attributes <field>:<data-type>,<field>:<data-type>...`
4. `npx sequelize db:migrate`