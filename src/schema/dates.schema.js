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
export const reportedAt = {
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
export const dispatchedAt = {
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
export const arrivedAt = {
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
export const canceledAt = {
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
export const resolvedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};
