import {
  POPULATION_MAX_DEPTH,
  COLLECTION_NAME_VEHICLEDISPATCH,
} from '@codetanzania/ewea-internals';
import { getString } from '@lykmapipo/env';

// common constants
export const DEFAULT_COUNTRY_CODE = getString('DEFAULT_COUNTRY_CODE', 'TZ');
export const COUNTRY_CODE = getString('COUNTRY_CODE', DEFAULT_COUNTRY_CODE);

// event schema
export const VEHICLEDISPATCH_SCHEMA_OPTIONS = {
  collection: COLLECTION_NAME_VEHICLEDISPATCH,
};

// event options
export const VEHICLEDISPATCH_OPTION_SELECT = {
  group: 1,
  type: 1,
  event: 1,
  number: 1,
};
export const VEHICLEDISPATCH_OPTION_AUTOPOPULATE = {
  select: VEHICLEDISPATCH_OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};

// relation options
export const PREDEFINE_OPTION_SELECT = {
  'strings.name': 1,
  'strings.color': 1,
  'strings.code': 1,
};
export const PREDEFINE_OPTION_AUTOPOPULATE = {
  select: PREDEFINE_OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};
