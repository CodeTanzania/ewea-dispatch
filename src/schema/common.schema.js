import { get } from 'lodash';
import { compact } from '@lykmapipo/common';
import { Point } from 'mongoose-geojson-schemas';
import { ObjectId, createSubSchema } from '@lykmapipo/mongoose-common';
import { Predefine } from '@lykmapipo/predefine';

import { owner, correspondent } from './parties.schema';
import { arrivedAt, dispatchedAt } from './dates.schema';
import { remarks } from './base.schema';
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
 * @name age
 * @description Current age of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 23
 */
export const age = {
  type: Number,
  index: true,
  exportable: true,
  fake: (f) => f.random.number(),
};

/**
 * @name weight
 * @description Current weight of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 53
 */
export const weight = {
  type: Number,
  index: true,
  exportable: true,
  fake: (f) => f.random.number(),
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
 * @name referral
 * @description Referral number of the party(i.e patient or victim).
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
 * AMN-5657
 */
export const referral = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'finance',
    type: 'account',
  },
};

/**
 * @name pcr
 * @description Patient care record number of the
 * party(i.e patient or victim).
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
 * PTN-8687
 */
export const pcr = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'finance',
    type: 'account',
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

/**
 * @name type
 * @description Type of a vehicle dispatched.
 *
 * @memberof VehicleDispatch
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto populate(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {boolean} aggregatable - allow field use for aggregation
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: '5dde6ca33631a92c2d616298',
 *   strings: { name: { en: 'Ambulance' } },
 * }
 */
export const type = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: PREDEFINE_OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    format: (v) => get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name vehicle
 * @description Actual vehicle dispatched.
 *
 * @memberof VehicleDispatch
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto populate(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {boolean} aggregatable - allow field use for aggregation
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: '5dde6ca33631a92c2d616298',
 *   strings: { name: { en: 'T 123 ABC' } },
 * }
 */
export const vehicle = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: PREDEFINE_OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    format: (v) => get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name requester
 * @description A party who is requesting a vehicle dispatch on
 * behalf of another party.
 *
 * @type {object}
 * @property {string} name - Full name of the requester
 * @property {string} mobile - Mobile phone number of the requester
 * @property {object} facility - Facility of the requester
 * @property {object} area - Administrative area of the requester
 * @property {object} location - Geo-point of the requester
 * @property {string} address - Address of the requester
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   facility: { name: { en: "Amana Hospital"} },
 *   area: { name: { en: "Dar es Salaam"} },
 *   location: { type: "Point", coordinates: [39.2155451, -6.7269984] },
 *   address: "Tandale"
 * }
 */
export const requester = createSubSchema({
  name,
  mobile,
  facility,
  area,
  location,
  address,
});

/**
 * @name victim
 * @description A party(i.e patient or victim) whom a vehicle dispatch
 * is requested for.
 *
 * @type {object}
 * @property {string} referral - Valid referral number
 * @property {string} pcr - Valid patient care number
 * @property {string} name - Full name of the victim
 * @property {string} mobile - Mobile phone number of the victim
 * @property {object} gender - Gender of the victim
 * @property {number} age - Age of the victim
 * @property {number} weight - Weight of the victim
 * @property {string} address - Address of the victim
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   referral: "AMN-5657",
 *   pcr: "PTN-8687",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   gender: { name: { en: "Female"} },
 *   age: 23,
 *   weight: 53,
 *   address: "Tandale"
 * }
 */
export const victim = createSubSchema({
  referral,
  pcr,
  name,
  mobile,
  gender,
  age,
  weight,
  address,
});

/**
 * @name destination
 * @description Vehicle dispatch pick-up(or drop-off) location.
 * @type {object}
 * @property {object} facility - Facility of the destination
 * @property {object} area - Administrative area of the destination
 * @property {object} location - Geo-point of the destination
 * @property {string} address - Address of the destination
 * @property {Date} arrivedAt - Arrive date of the destination
 * @property {Date} dispatcheAt - Dispatch date of the destination
 * @property {object} correspondent - Answerable of the destination
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 * facility: { name: { en: "Amana Hospital"} },
 * area: { name: { en: "Dar es Salaam"} },
 * location: { type: "Point", coordinates: [39.2155451, -6.7269984] },
 * address: "Tandale"
 * arrivedAt: "2018-10-17T07:54:32.831Z",
 * dispatchedAt: "2018-10-18T07:54:32.831Z",
 * correspondent: { name: "Jane Doe" },
 * remarks: "Well received"
 * }
 */
export const destination = createSubSchema({
  facility,
  area,
  location,
  address,
  arrivedAt,
  dispatchedAt,
  correspondent,
  remarks,
});

/**
 * @name vehicle
 * @description Dispatched vehicle details.
 *
 * @type {object}
 * @property {object} type - Type of the vehicle
 * @property {object} owner - Owner of the vehicle
 * @property {object} vehicle - Actual vehicle
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   type: { name: { en: "Ambulance"} },
 *   owner: { name: { en: "Amana Hospital"} },
 *   vehicle: { name: { en: "T 123 ABC"} }
 * }
 */
export const carrier = createSubSchema({
  type,
  owner,
  vehicle,
});
