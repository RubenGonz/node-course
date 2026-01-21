import { envs } from './config/plugins/env.plugin';
import { MongoDataBase } from './data/mongo';
import { PostgresDataBase } from './data/postgres/init';
import { Server } from './presentation/server';

(async () => {
  main()
})()

async function main() {
  // Conectar Mongo
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // Conectar Postgres
  await PostgresDataBase.connect({ 
    connectionString: envs.POSTGRES_URL 
  });

  // Iniciar servidor
  Server.start();
}