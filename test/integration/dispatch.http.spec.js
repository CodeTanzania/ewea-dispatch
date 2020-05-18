import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  create,
  clear as clearDb,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { createModels } from '@lykmapipo/file';
import { Party } from '@codetanzania/emis-stakeholder';
import { Event } from '@codetanzania/ewea-event';
import { VehicleDispatch, vehicleDispatchRouter } from '../../src';

describe('VehicleDispatch Rest API', () => {
  const area = Predefine.fakeAdministrativeArea();
  const role = Predefine.fakePartyRole();

  const reporter = Party.fake();
  reporter.set({ role });

  const vehicle = Predefine.fakeVehicle();
  vehicle.set({ owner: reporter, relations: { area } });

  const group = Predefine.fakeEventGroup();
  const type = Predefine.fakeEventType();
  const event = Event.fake();

  const dispatch = VehicleDispatch.fakeExcept('number');
  dispatch.set({
    group,
    type,
    event,
    reporter,
    carrier: { vehicle },
    crew: [reporter],
  });

  const options = {
    pathSingle: '/dispatches/:id',
    pathList: '/dispatches',
    pathSchema: '/dispatches/schema/',
    pathExport: '/dispatches/export/',
  };

  before((done) => clearDb(VehicleDispatch, done));

  before(() => clearHttp());

  beforeEach(() => createModels());

  before((done) => create(role, group, type, area, done));
  before((done) => create(reporter, done));
  before((done) => create(vehicle, done));
  before((done) => create(event, done));

  it('should handle HTTP POST on /dispatches', (done) => {
    const { testPost } = testRouter(options, vehicleDispatchRouter);
    testPost({ ...dispatch.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new VehicleDispatch(body);
        expect(created._id).to.exist.and.be.eql(dispatch._id);
        expect(created.number).to.exist;
        expect(created.type).to.exist;
        expect(created.group).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /dispatches', (done) => {
    const { testGet } = testRouter(options, vehicleDispatchRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /dispatches/schema', (done) => {
    const { testGetSchema } = testRouter(options, vehicleDispatchRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /dispatches/export', (done) => {
    const { testGetExport } = testRouter(options, vehicleDispatchRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /dispatches/:id', (done) => {
    const { testGet } = testRouter(options, vehicleDispatchRouter);
    const params = { id: dispatch._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new VehicleDispatch(body);
        expect(found._id).to.exist.and.be.eql(dispatch._id);
        expect(found.number).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /dispatches/:id', (done) => {
    const { testPatch } = testRouter(options, vehicleDispatchRouter);
    const { description, remarks } = dispatch.fakeOnly(
      'description',
      'remarks'
    );
    const params = { id: dispatch._id.toString() };
    testPatch(params, { description, remarks })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new VehicleDispatch(body);
        expect(patched._id).to.exist.and.be.eql(dispatch._id);
        expect(patched.number).to.exist;
        expect(patched.description).to.exist.and.be.eql(description);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /dispatches/:id', (done) => {
    const { testPut } = testRouter(options, vehicleDispatchRouter);
    const { description, interventions } = dispatch.fakeOnly(
      'description',
      'interventions'
    );
    const params = { id: dispatch._id.toString() };
    testPut(params, { description, interventions })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new VehicleDispatch(body);
        expect(patched._id).to.exist.and.be.eql(dispatch._id);
        expect(patched.number).to.exist;
        expect(patched.description).to.exist.and.be.eql(description);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /dispatches/:id', (done) => {
    const { testDelete } = testRouter(options, vehicleDispatchRouter);
    const params = { id: dispatch._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new VehicleDispatch(body);
        expect(patched._id).to.exist.and.be.eql(dispatch._id);
        expect(patched.number).to.exist;
        expect(patched.deletedAt).to.exist;
        done(error, body);
      });
  });

  after(() => clearHttp());

  after((done) => clearDb(VehicleDispatch, done));
});
