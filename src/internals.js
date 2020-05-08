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

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_PREDEFINE = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_AREA = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
    'relations.level': 1,
  },
  maxDepth: 2,
};

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_VEHICLE = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
    'relations.type': 1,
    'relations.status': 1,
    'relations.owner': 1,
    'relations.ownership': 1,
    'relations.area': 1,
    'relations.facility': 1,
  },
  maxDepth: 2,
};

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_PARTY = {
  select: { name: 1, email: 1, mobile: 1, abbreviation: 1, role: 1 },
  maxDepth: 2,
};
