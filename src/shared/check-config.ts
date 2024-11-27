import { themeConfigSchema, type ThemeConfig } from './define-config';
import { validate } from 'jsonschema';

export function checkConfig(config: unknown): config is ThemeConfig {
  const result = validate(config, themeConfigSchema);
  if (result.valid) {
    return true;
  }
  throw result.toString();
}
