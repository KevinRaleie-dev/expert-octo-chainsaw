import { Appointment } from "../Entity/Appointment";
import { createConnection } from "typeorm";
import { User } from "../Entity/User";

export const db = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "postgres",
      username: 'kevinraleie',
      entities: [
        User,
        Appointment
      ],
      synchronize: true,
      logging: true,
    }).then(() => console.log("database connected"));
  } catch (error) {
    console.log("db error: ", error);
  }
};
