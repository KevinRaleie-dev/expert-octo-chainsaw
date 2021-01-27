import { Appointment } from '../entity/Appointment';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

export default async function databaseConnection(): Promise<void> {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'kevinraleie',
      entities: [User, Appointment],
      synchronize: true,
      logging: false,
    });
  } catch (error) {
    console.log('Database error: ', error);
  }
}
