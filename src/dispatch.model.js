import {
  MODEL_NAME_VEHICLEDISPATCH,
  COLLECTION_NAME_VEHICLEDISPATCH,
} from '@codetanzania/ewea-internals';
import { get, pick } from 'lodash';
import { mergeObjects, idOf } from '@lykmapipo/common';
import { copyInstance, createSchema, model } from '@lykmapipo/mongoose-common';
import '@lykmapipo/mongoose-sequenceable';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { dispatchStatusFor } from '@codetanzania/ewea-common';

import {
  VEHICLEDISPATCH_SCHEMA_OPTIONS,
  VEHICLEDISPATCH_OPTION_SELECT,
  VEHICLEDISPATCH_OPTION_AUTOPOPULATE,
} from './internals';

import {
  group,
  type,
  event,
  number,
  description,
  status,
  priority,
  remarks,
} from './schema/base.schema';
import {
  requester,
  victim,
  destination,
  carrier,
} from './schema/common.schema';
import {
  reporter,
  dispatcher,
  canceler,
  resolver,
  crew,
} from './schema/parties.schema';
import {
  reportedAt,
  dispatchedAt,
  canceledAt,
  resolvedAt,
} from './schema/dates.schema';

const SCHEMA = mergeObjects(
  { group, type, event, number },
  { requester, victim },
  { description },
  { pickup: destination, dropoff: destination },
  { carrier, crew },
  { status, priority },
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
const VehicleDispatchSchema = createSchema(
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
  // TODO: drop reported date & use createdAt
  this.reportedAt = this.reportedAt || this.createdAt || new Date();

  // TODO: ensure requestor from victim or requester facility
  // TODO: esnure requestor, victim, pickup address

  // ensure group and type
  const eventType = get(this, 'event.type', this.type);
  const eventGroup = get(type, 'relations.group', this.group);
  if (!this.group) {
    this.group = eventGroup;
  }
  if (!this.type) {
    this.type = eventType;
  }

  // ensure dispatchedAt if carrer vehicle assigned
  // TODO: ensure type, owner & ownership
  const hasVehicle = get(this, 'carrier.vehicle');
  if (hasVehicle && !this.dispatchedAt) {
    this.dispatchedAt = new Date();
  }

  // TODO: ensure default values

  // ensure dispatch status
  const statusesOptns = mergeObjects(
    pick(this, 'createdAt', 'canceledAt', 'dispatchedAt', 'resolvedAt'),
    pick(this, 'pickup.dispatchedAt', 'pickup.arrivedAt'),
    pick(this, 'dropoff.dispatchedAt', 'dropoff.arrivedAt')
  );
  const statuses = dispatchStatusFor(statusesOptns);
  if (statuses) {
    this.status = statuses.dispatch || this.status;
    // TODO: set vehicle statup if avalable
  }

  return done(null, this);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
VehicleDispatchSchema.statics.MODEL_NAME = MODEL_NAME_VEHICLEDISPATCH;
VehicleDispatchSchema.statics.COLLECTION_NAME = COLLECTION_NAME_VEHICLEDISPATCH;
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
  const copyOfSeed = copyInstance(seed);

  const criteria = idOf(copyOfSeed)
    ? pick(copyOfSeed, '_id')
    : pick(copyOfSeed, 'group', 'type', 'event', 'number');

  return criteria;
};

/* export vehicle dispatch model */
export default model(MODEL_NAME_VEHICLEDISPATCH, VehicleDispatchSchema);
