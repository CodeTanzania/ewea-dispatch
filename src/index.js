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
import '@codetanzania/ewea-internals';
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { connect } from '@lykmapipo/mongoose-common';
import { mount } from '@lykmapipo/express-common';
import { start as startHttp } from '@lykmapipo/express-rest-actions';
import { createModels } from '@lykmapipo/file';
import VehicleDispatch from './dispatch.model';
import vehicleDispatchRouter from './dispatch.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
export const info = pkg(
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
 * @name VehicleDispatch
 * @description VehicleDispatch model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { VehicleDispatch };

/**
 * @name vehicleDispatchRouter
 * @description event http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { vehicleDispatchRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const start = (done) => {
  // connect mongodb
  connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // ensure file models
    createModels();

    // mount vehicle dispatch router
    mount(vehicleDispatchRouter);

    // start http server
    return startHttp(done);
  });
};
