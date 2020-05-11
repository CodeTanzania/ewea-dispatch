import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';

import VehicleDispatch from './dispatch.model';

import {
  ensureReporter,
  ensureDispatcher,
  ensureCanceler,
  ensureResolver,
} from './http.middlewares';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
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
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetVehicleDispatches
 * @memberof VehicleDispatchHttpRouter
 * @description Returns a list of dispatches
 */
router.get(
  PATH_LIST,
  getFor({
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
  schemaFor({
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
  downloadFor({
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
  postFor({
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
  getByIdFor({
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
  patchFor({
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
  putFor({
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
  deleteFor({
    del: (options, done) => VehicleDispatch.del(options, done),
    soft: true,
  })
);

/* expose router */
export default router;
