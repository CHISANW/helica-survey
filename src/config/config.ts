// config/config.ts
import { Environment } from './environment';
import { config as dotenvConfig } from 'dotenv';

export class Config {
  private static instance: Environment;

  public static getEnvironment(): Environment {
    if (!Config.instance) {
      dotenvConfig();
      Config.instance = new Environment();
    }

    return this.instance;
  }
}
