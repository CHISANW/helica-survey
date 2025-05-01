import * as process from 'node:process';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class Environment {
  @IsIn(['mysql', 'postgres'])
  type = process.env.DB_TYPE;
  @IsString()
  host = process.env.DB_HOST;
  @IsString()
  username = process.env.DB_USERNAME;
  @IsString()
  password = process.env.DB_PASSWORD;
  @IsString()
  database = process.env.DB_DATABASE;

  @IsNumber()
  port = Number(process.env.DB_PORT);

  @IsString()
  privateKey = process.env.PRIVATE_KEY;

  @IsString()
  name = process.env.SERVER_NAME;
}
