# test-nodejs

Инструкция по запуску проекта.

## Клонируйте репозиторий:

```bash
git clone https://github.com/exxxcellent/test-nodejs.git
```

## Создайте .env файл в корне проекта:

```env
#app configuration
APP_PORT=3000
#database configuration
POSTGRES_USER=YOUR_DB_USER
POSTGRES_PASSWORD=YOUR_DV_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
#db connection string
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
```

## Запустите docker-compose

```bash
docker-compose up -d --build
```

## Выполните первичную миграцию в БД

```bash
docker exec -it CONTAINER_ID npm run db:migrate
```

## Готово!
