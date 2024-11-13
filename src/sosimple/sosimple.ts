import { SoSimpleSearch } from '../components/search';
import type { SoSimpleSearchConfig } from '../components/search';
import { darkLightToggle } from './dark-light-toggle';

// Classes for interacting with elements in static HTML
export const SoSimple = {
  searchInit(config: SoSimpleSearchConfig) {
    new SoSimpleSearch(config);
  },
  darkLightToggle,
};
