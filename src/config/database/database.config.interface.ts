export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  seeds: string[]; // Daftar file atau direktori seeder
}
