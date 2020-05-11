'use strict';

const eweaInternals = require('@codetanzania/ewea-internals');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const expressCommon = require('@lykmapipo/express-common');
const expressRestActions = require('@lykmapipo/express-rest-actions');
const file = require('@lykmapipo/file');
const lodash = require('lodash');
require('@lykmapipo/mongoose-sequenceable');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const moment = require('moment');
const predefine = require('@lykmapipo/predefine');
const eweaEvent = require('@codetanzania/ewea-event');
const mongooseGeojsonSchemas = require('mongoose-geojson-schemas');
const emisStakeholder = require('@codetanzania/emis-stakeholder');

// common constants
const DEFAULT_COUNTRY_CODE = env.getString('DEFAULT_COUNTRY_CODE', 'TZ');
const COUNTRY_CODE = env.getString('COUNTRY_CODE', DEFAULT_COUNTRY_CODE);

// event schema
const VEHICLEDISPATCH_SCHEMA_OPTIONS = {
  collection: eweaInternals.COLLECTION_NAME_VEHICLEDISPATCH,
};

// event options
const VEHICLEDISPATCH_OPTION_SELECT = {
  group: 1,
  type: 1,
  event: 1,
  number: 1,
};
const VEHICLEDISPATCH_OPTION_AUTOPOPULATE = {
  select: VEHICLEDISPATCH_OPTION_SELECT,
  maxDepth: eweaInternals.POPULATION_MAX_DEPTH,
};

// relation options

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_PREDEFINE = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
  },
  maxDepth: eweaInternals.POPULATION_MAX_DEPTH,
};

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_AREA = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
    'relations.level': 1,
  },
  maxDepth: 2,
};

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_VEHICLE = {
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
const AUTOPOPULATE_OPTION_PARTY = {
  select: { name: 1, email: 1, mobile: 1, abbreviation: 1, role: 1 },
  maxDepth: 2,
};

/**
 * @name group
 * @description Event group underwhich a vehicle dispatch belongs to.
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
 *   _id: '5dde6ca23631a92c2d616253',
 *   strings: { name: { en: 'Meteorological' }, code: 'MAT' },
 * }
 */
const group = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name type
 * @description Event type underwhich a vehicle dispatch belongs to.
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
 *   strings: { name: { en: 'Flood' }, code: 'FL' },
 * }
 */
const type = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name event
 * @description Event underwhich a vehicle dispatch belongs to.
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
 *   strings: { name: { en: 'Flood' }, code: 'FL' },
 * }
 */
const event = {
  type: mongooseCommon.ObjectId,
  ref: eweaEvent.Event.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: eweaEvent.Event.OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name number
 * @description Human readable, unique identifier of a vehicle dispatch.
 *
 * It consist of two letters to identify the emergency event type
 * (e.g. FL - Flood); the year of the event; a six-digit, sequential
 * event number; and the three-letter ISO code for country of occurrence
 * e.g FL-2001-000033-TZA.
 *
 * @memberof VehicleDispatch
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} uppercase - force value to uppercase
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} unique - ensure unique database index
 * @property {boolean} searchable - allow searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * FL-2018-000033-TZA
 */
const number = {
  type: String,
  trim: true,
  uppercase: true,
  required: true,
  index: true,
  // unique: true,
  searchable: true,
  taggable: true,
  exportable: true,
  sequenceable: {
    prefix: function prefix() {
      const year = moment(new Date()).format('YYYY-MM');
      return year;
    },
    suffix: COUNTRY_CODE,
    length: 4,
    pad: '0',
    separator: '-',
  },
  fake: {
    generator: 'random',
    type: 'uuid',
  },
};

/**
 * @name description
 * @description A brief summary about a vehicle dispatch i.e additional
 * details that clarify more about a vehicle dispatch.
 *
 * @memberof VehicleDispatch
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Provide medical assistance on rescue mission.
 */
const description = {
  type: String,
  trim: true,
  // required: true,
  index: true,
  searchable: true,
  exportable: true,
  fake: {
    generator: 'lorem',
    type: 'sentence',
  },
};

/**
 * @name status
 * @description Currently assigned vehicle status of a vehicle dispatch.
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
 *   _id: '5dde6ca33631a92c2d616284',
 *   strings: { name: { en: 'Actual' } },
 * }
 */
const status = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name remarks
 * @description A brief human readable comments and feedbacks
 * about a vehicle dispatched.
 *
 * @memberof VehicleDispatch
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Requested first aid were provided to the victim immediately.
 */
const remarks = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  exportable: true,
  fake: {
    generator: 'lorem',
    type: 'sentence',
  },
};

/**
 * @name owner
 * @description A party(i.e agency etc) who own a dispatched vehicle.
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
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
const owner = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name reporter
 * @description A party(i.e call center or EOC operator) who
 * recorded a vehicle dispatch request.
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
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
const reporter = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name dispatcher
 * @description A party(i.e call center or EOC operator) who
 * dispatched a vehicle to full fill the request.
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
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
const dispatcher = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name canceler
 * @description A party(i.e call center or EOC operator) who
 * canceled a vehicle dispatch request.
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
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
const canceler = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name resolver
 * @description A party(i.e call center or EOC operator) who
 * resolve a vehicle dispatch request.
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
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
const resolver = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name correspondent
 * @description Full name of a contact party of vehicle dispatch
 * destination(i.e pick-up or drop-off).
 *
 * @memberof VehicleDispatch
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
 * @version 0.2.0
 * @instance
 * @example
 * Jane Doe
 */
const correspondent = {
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
 * @name crew
 * @description Parties(i.e driver, nurses etc) assigned to a vehicle dispatch.
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
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * [{
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 *   role: { name: { en: "Driver" } }
 * }]
 */
const crew = {
  type: [mongooseCommon.ObjectId],
  ref: emisStakeholder.Party.MODEL_NAME,
  index: true,
  exists: true,
  duplicate: mongooseCommon.areSameObjectId,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => common.join(v, ', ', 'name'),
    default: 'NA',
  },
  default: undefined,
};

// TODO: map them against vehicle statuses

/**
 * @name reportedAt
 * @description Date when a vehicle dispatch was recorded(or requested).
 *
 * @memberof VehicleDispatch
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
 * 2018-10-17T07:53:32.831Z
 */
const reportedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'past',
  },
};

/**
 * @name dispatchedAt
 * @description Date when a vehicle dispatch was dispatched(or allowed).
 *
 * @memberof VehicleDispatch
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
 * 2018-10-17T07:54:32.831Z
 */
const dispatchedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'past',
  },
};

/**
 * @name arrivedAt
 * @description Date when a vehicle dispatch arrived at
 * the destination(i.e pick-up or drop-off).
 *
 * @memberof VehicleDispatch
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
 * 2018-10-17T07:54:32.831Z
 */
const arrivedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'past',
  },
};

/**
 * @name canceledAt
 * @description Date when a vehicle dispatch was canceled.
 *
 * @memberof VehicleDispatch
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
 * 2018-10-19T07:54:32.831Z
 */
const canceledAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};

/**
 * @name resolvedAt
 * @description Date when a vehicle dispatched resolved.
 *
 * @memberof VehicleDispatch
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
 * 2018-10-19T07:55:32.831Z
 */
const resolvedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};

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
const name = {
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
const age = {
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
const weight = {
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
const mobile = {
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
const location = mongooseGeojsonSchemas.Point;

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
const address = {
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
const referral = {
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
const pcr = {
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
const area = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_AREA,
  taggable: true,
  exportable: {
    header: 'Area',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
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
const facility = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Facility',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
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
const gender = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Gender',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
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
const type$1 = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
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
const vehicle = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_VEHICLE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
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
const requester = mongooseCommon.createSubSchema({
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
 *   address: "Tandale",
 *   area: { name: { en: "Dar es Salaam"} }
 * }
 */
const victim = mongooseCommon.createSubSchema({
  referral,
  pcr,
  name,
  mobile,
  gender,
  age,
  weight,
  description,
  address,
  area,
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
 * @property {object} correspondent - Answerable party of the destination
 * @property {object} remarks - Feedback of the destination
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   facility: { name: { en: "Amana Hospital"} },
 *   area: { name: { en: "Dar es Salaam"} },
 *   location: { type: "Point", coordinates: [39.2155451, -6.7269984] },
 *   address: "Tandale"
 *   arrivedAt: "2018-10-17T07:54:32.831Z",
 *   dispatchedAt: "2018-10-18T07:54:32.831Z",
 *   correspondent: "Jane Doe",
 *   remarks: "Well received"
 * }
 */
const destination = mongooseCommon.createSubSchema({
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
 * @name carrier
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
const carrier = mongooseCommon.createSubSchema({
  type: type$1,
  owner,
  vehicle,
});

const SCHEMA = common.mergeObjects(
  { group, type, event, number },
  { requester, victim },
  { description },
  { pickup: destination, dropoff: destination },
  { carrier, crew },
  { status },
  { reportedAt, reporter },
  { dispatchedAt, dispatcher },
  { canceledAt, canceler },
  { resolvedAt, resolver },
  { remarks }
);

/**
 * @module VehicleDispatch
 * @namespace VehicleDispatch
 * @name VehicleDispatch
 * @description A representation of an entity which define and track
 * vehicle dispatches(i.e ambulance etc) during an emergency event.
 *
 * @see {@link https://en.wikipedia.org/wiki/Computer-aided_dispatch}
 * @see {@link https://en.wikipedia.org/wiki/Emergency_medical_dispatcher}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { VehicleDispatch } = require('@codetanzania/ewea-dispatch');
 * VehicleDispatch.create(event, (error, created) => { ... });
 */
const VehicleDispatchSchema = mongooseCommon.createSchema(
  SCHEMA,
  VEHICLEDISPATCH_SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @function validate
 * @description Vehicle dispatch schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
VehicleDispatchSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description Vehicle dispatch schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
VehicleDispatchSchema.methods.preValidate = function preValidate(done) {
  // ensure started(or reported) date
  this.reportedAt = this.reportedAt || new Date();

  // TODO: ensure requestor from victim or requester facility
  // TODO: esnure requestor, victim, pickup address

  // ensure group and type
  const eventType = lodash.get(this, 'event.type', this.type);
  const eventGroup = lodash.get(type, 'relations.group', this.group);
  if (!this.group) {
    this.group = eventGroup;
  }
  if (!this.type) {
    this.type = eventType;
  }

  // ensure dispatchedAt if carrer vehicle assigned
  const hasVehicle = lodash.get(this, 'carrier.vehicle');
  if (hasVehicle && !this.dispatchedAt) {
    this.dispatchedAt = new Date();
  }

  return done(null, this);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
VehicleDispatchSchema.statics.MODEL_NAME = eweaInternals.MODEL_NAME_VEHICLEDISPATCH;
VehicleDispatchSchema.statics.COLLECTION_NAME = eweaInternals.COLLECTION_NAME_VEHICLEDISPATCH;
VehicleDispatchSchema.statics.OPTION_SELECT = VEHICLEDISPATCH_OPTION_SELECT;
VehicleDispatchSchema.statics.OPTION_AUTOPOPULATE = VEHICLEDISPATCH_OPTION_AUTOPOPULATE;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description Define seed data criteria
 * @param {object} seed event to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @static
 */
VehicleDispatchSchema.statics.prepareSeedCriteria = (seed) => {
  const copyOfSeed = mongooseCommon.copyInstance(seed);

  const criteria = common.idOf(copyOfSeed)
    ? lodash.pick(copyOfSeed, '_id')
    : lodash.pick(copyOfSeed, 'group', 'type', 'event', 'number');

  return criteria;
};

/* export vehicle dispatch model */
const VehicleDispatch = mongooseCommon.model(eweaInternals.MODEL_NAME_VEHICLEDISPATCH, VehicleDispatchSchema);

/**
 * @name ensureReporter
 * @description Set reporter on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ensureReporter = (request, response, next) => {
  if (request.body && request.party) {
    request.body.reporter = request.body.reporter || request.party;
  }
  return next();
};

/**
 * @name ensureDispatcher
 * @description Set dispatcher on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ensureDispatcher = (request, response, next) => {
  if (request.body && request.party) {
    const isDispatched = request.body.dispatchedAt || request.body.dispatcher;
    if (isDispatched) {
      request.body.dispatchedAt = new Date();
      request.body.dispatcher = request.body.dispatcher || request.party;
    }
  }
  return next();
};

/**
 * @name ensureCanceler
 * @description Set canceler on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ensureCanceler = (request, response, next) => {
  if (request.body && request.party) {
    const isCanceled = request.body.canceledAt || request.body.canceler;
    if (isCanceled) {
      request.body.canceledAt = new Date();
      request.body.canceler = request.body.canceler || request.party;
    }
  }
  return next();
};

/**
 * @name ensureResolver
 * @description Set resolver on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ensureResolver = (request, response, next) => {
  if (request.body && request.party) {
    const isResolved =
      request.body.resolvedAt ||
      request.body.completedAt ||
      request.body.resolver;
    if (isResolved) {
      request.body.resolvedAt = new Date();
      request.body.resolver = request.body.resolver || request.party;
    }
  }
  return next();
};

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/dispatches/:id';
const PATH_LIST = '/dispatches';
const PATH_EXPORT = '/dispatches/export';
const PATH_SCHEMA = '/dispatches/schema/';

/**
 * @name VehicleDispatchHttpRouter
 * @namespace VehicleDispatchHttpRouter
 *
 * @description  A representation of an entity which define and track
 * vehicle dispatches(i.e ambulance etc) during an emergency event.
 *
 * @see {@link https://en.wikipedia.org/wiki/Computer-aided_dispatch}
 * @see {@link https://en.wikipedia.org/wiki/Emergency_medical_dispatcher}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const router = new expressRestActions.Router({
  version: API_VERSION,
});

/**
 * @name GetVehicleDispatches
 * @memberof VehicleDispatchHttpRouter
 * @description Returns a list of dispatches
 */
router.get(
  PATH_LIST,
  expressRestActions.getFor({
    get: (options, done) => VehicleDispatch.get(options, done),
  })
);

/**
 * @name GetVehicleDispatchSchema
 * @memberof VehicleDispatchHttpRouter
 * @description Returns dispatch json schema definition
 */
router.get(
  PATH_SCHEMA,
  expressRestActions.schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = VehicleDispatch.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportVehicleDispatches
 * @memberof VehicleDispatchHttpRouter
 * @description Export dispatches as csv
 */
router.get(
  PATH_EXPORT,
  expressRestActions.downloadFor({
    download: (options, done) => {
      const fileName = `dispatches_exports_${Date.now()}.csv`;
      const readStream = VehicleDispatch.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostVehicleDispatch
 * @memberof VehicleDispatchHttpRouter
 * @description Create new dispatch
 */
router.post(
  PATH_LIST,
  ensureReporter,
  expressRestActions.postFor({
    post: (body, done) => VehicleDispatch.post(body, done),
  })
);

/**
 * @name GetVehicleDispatch
 * @memberof VehicleDispatchHttpRouter
 * @description Get existing dispatch
 */
router.get(
  PATH_SINGLE,
  expressRestActions.getByIdFor({
    getById: (options, done) => VehicleDispatch.getById(options, done),
  })
);

/**
 * @name PatchVehicleDispatch
 * @memberof VehicleDispatchHttpRouter
 * @description Patch existing dispatch
 */
router.patch(
  PATH_SINGLE,
  ensureDispatcher,
  ensureCanceler,
  ensureResolver,
  expressRestActions.patchFor({
    patch: (options, done) => VehicleDispatch.patch(options, done),
  })
);

/**
 * @name PutVehicleDispatch
 * @memberof VehicleDispatchHttpRouter
 * @description Put existing dispatch
 */
router.put(
  PATH_SINGLE,
  ensureDispatcher,
  ensureCanceler,
  ensureResolver,
  expressRestActions.putFor({
    put: (options, done) => VehicleDispatch.put(options, done),
  })
);

/**
 * @name DeleteVehicleDispatch
 * @memberof VehicleDispatchHttpRouter
 * @description Delete existing dispatch
 */
router.delete(
  PATH_SINGLE,
  ensureCanceler,
  expressRestActions.deleteFor({
    del: (options, done) => VehicleDispatch.del(options, done),
    soft: true,
  })
);

/**
 * @module VehicleDispatch
 * @namespace VehicleDispatch
 * @name VehicleDispatch
 * @description A representation of an entity which define and track
 * vehicle dispatches(i.e ambulance etc) during an emergency event.
 *
 * @see {@link https://en.wikipedia.org/wiki/Computer-aided_dispatch}
 * @see {@link https://en.wikipedia.org/wiki/Emergency_medical_dispatcher}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { VehicleDispatch, start } = require('@codetanzania/ewea-dispatch');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = common.pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = env.apiVersion();

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const start = (done) => {
  // connect mongodb
  mongooseCommon.connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // ensure file models
    file.createModels();

    // mount vehicle dispatch router
    expressCommon.mount(router);

    // start http server
    return expressRestActions.start(done);
  });
};

exports.VehicleDispatch = VehicleDispatch;
exports.apiVersion = apiVersion;
exports.info = info;
exports.start = start;
exports.vehicleDispatchRouter = router;
