import { config } from 'dotenv';
import { ISettings } from './shared/interfaces/ISettings';

const env: any = config().parsed;
const values = process.env.NODE_ENV === 'production' ? { ...env } : {};

const settings: ISettings = {
  port: values.PORT || 4000
};

export { settings };
