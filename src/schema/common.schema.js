import { compact } from '@lykmapipo/common';
import { Point } from 'mongoose-geojson-schemas';
import { ObjectId } from '@lykmapipo/mongoose-common';
import { Predefine } from '@lykmapipo/predefine';

import { PREDEFINE_OPTION_AUTOPOPULATE } from '../internals';

/**
 * @name name
 * @description Full name name of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Jane Doe
 */
export const name = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'name',
    type: 'findName',
  },
};

/**
 * @name phone
 * @description A mobile phone number of the party(i.e individual).
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 255714989796
 */
export const mobile = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: (faker) => faker.helpers.replaceSymbolWithNumber('255714######'),
};

/**
 * @name location
 * @description A geo-point specifying longitude and latitude pair
 * of the address.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   type: 'Point',
 *   coordinates: [39.2155451, -6.7269984],
 * }
 */
export const location = Point;

/**
 * @name address
 * @description A human readable description of location.
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Tandale
 */
export const address = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'address',
    type: 'county',
  },
};

/**
 * @name area
 * @description Assignable administrative area of a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced model(or collection)
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto population(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 *
 * @since 1.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": {"en": "Dar es Salaam"}
 * }
 */
export const area = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: PREDEFINE_OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    header: 'Area',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 3,
    default: 'NA',
  },
};

/**
 * @name facility
 * @description Assignable pick-up or drop-off facility(i.e Hospital etc).
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced model(or collection)
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto population(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 *
 * @since 1.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": {"en": "Amana Hospital"}
 * }
 */
export const facility = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: PREDEFINE_OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    header: 'Facility',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 3,
    default: 'NA',
  },
};

/**
 * @name gender
 * @description Assignable or given gender to a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced collection
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - population options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} default - default value set when none provided
 *
 * @since 2.6.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": {"en": "Female"}
 * }
 */
export const gender = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: PREDEFINE_OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    header: 'Gender',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: undefined,
};
