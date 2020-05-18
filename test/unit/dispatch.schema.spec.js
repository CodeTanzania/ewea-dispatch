import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '@codetanzania/emis-stakeholder';
import { Event } from '@codetanzania/ewea-event';
import VehicleDispatch from '../../src/dispatch.model';

describe('VehicleDispatch Schema', () => {
  it('should have group field', () => {
    const group = VehicleDispatch.path('group');

    expect(group).to.exist;
    expect(group).to.be.instanceof(SchemaTypes.ObjectId);
    expect(group.options).to.exist;
    expect(group.options).to.be.an('object');
    expect(group.options.type).to.exist;
    expect(group.options.ref).to.exist;
    expect(group.options.ref).to.be.equal(Predefine.MODEL_NAME);
    expect(group.options.index).to.be.true;
    // expect(group.options.required).to.be.true;
    expect(group.options.exists).to.be.true;
    expect(group.options.aggregatable).to.exist.and.be.an('object');
    expect(group.options.autopopulate).to.exist;
    expect(group.options.taggable).to.exist;
    expect(group.options.exportable).to.exist;
    // expect(group.options.aggregatable).to.exist;
    expect(group.options.default).to.be.undefined;
  });

  it('should have type field', () => {
    const type = VehicleDispatch.path('type');

    expect(type).to.exist;
    expect(type).to.be.instanceof(SchemaTypes.ObjectId);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.ref).to.exist;
    expect(type.options.ref).to.be.equal(Predefine.MODEL_NAME);
    // expect(type.options.required).to.be.true;
    expect(type.options.exists).to.be.true;
    expect(type.options.aggregatable).to.exist.and.be.an('object');
    expect(type.options.autopopulate).to.exist;
    expect(type.options.taggable).to.exist;
    expect(type.options.exportable).to.exist;
    // expect(type.options.aggregatable).to.exist;
    expect(type.options.default).to.be.undefined;
  });

  it('should have event field', () => {
    const event = VehicleDispatch.path('event');

    expect(event).to.exist;
    expect(event).to.be.instanceof(SchemaTypes.ObjectId);
    expect(event.options).to.exist;
    expect(event.options).to.be.an('object');
    expect(event.options.type).to.exist;
    expect(event.options.ref).to.exist;
    expect(event.options.ref).to.be.equal(Event.MODEL_NAME);
    // expect(event.options.required).to.be.true;
    expect(event.options.exists).to.be.true;
    expect(event.options.aggregatable).to.exist.and.be.an('object');

    expect(event.options.autopopulate).to.exist;
    expect(event.options.taggable).to.exist;
    expect(event.options.exportable).to.exist;
    // expect(event.options.aggregatable).to.exist;
    expect(event.options.default).to.be.undefined;
  });

  it('should have number field', () => {
    const number = VehicleDispatch.path('number');

    expect(number).to.exist;
    expect(number).to.be.instanceof(SchemaTypes.String);
    expect(number.options).to.exist;
    expect(number.options).to.be.an('object');
    expect(number.options.type).to.exist;
    expect(number.options.trim).to.be.true;
    expect(number.options.uppercase).to.be.true;
    expect(number.options.index).to.be.true;
    // expect(number.options.unique).to.be.true;
    // expect(number.options.required).to.be.true;
    expect(number.options.searchable).to.be.true;
    expect(number.options.taggable).to.be.true;
    expect(number.options.fake).to.exist;
  });

  it('should have requester field', () => {
    const requester = VehicleDispatch.path('requester');
    const name = VehicleDispatch.path('requester.name');
    const mobile = VehicleDispatch.path('requester.mobile');

    expect(requester).to.exist;
    expect(requester).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(name).to.exist;
    expect(name).to.be.instanceof(SchemaTypes.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.taggable).to.be.true;
    expect(name.options.exportable).to.be.true;
    expect(name.options.fake).to.exist;

    expect(mobile).to.exist;
    expect(mobile).to.be.instanceof(SchemaTypes.String);
    expect(mobile.options).to.exist;
    expect(mobile.options).to.be.an('object');
    expect(mobile.options.type).to.exist;
    expect(mobile.options.trim).to.be.true;
    expect(mobile.options.index).to.be.true;
    expect(mobile.options.searchable).to.be.true;
    expect(mobile.options.taggable).to.be.true;
    expect(mobile.options.exportable).to.be.true;
    expect(mobile.options.fake).to.exist;
  });

  it('should have victim field', () => {
    const victim = VehicleDispatch.path('victim');
    const referral = VehicleDispatch.path('victim.referral');
    const pcr = VehicleDispatch.path('victim.pcr');
    const name = VehicleDispatch.path('victim.name');
    const mobile = VehicleDispatch.path('victim.mobile');
    const description = VehicleDispatch.path('victim.description');

    expect(victim).to.exist;
    expect(victim).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(referral).to.exist;
    expect(referral).to.be.instanceof(SchemaTypes.String);
    expect(referral.options).to.exist;
    expect(referral.options).to.be.an('object');
    expect(referral.options.type).to.exist;
    expect(referral.options.trim).to.be.true;
    expect(referral.options.index).to.be.true;
    expect(referral.options.searchable).to.be.true;
    expect(referral.options.taggable).to.be.true;
    expect(referral.options.exportable).to.be.true;
    expect(referral.options.fake).to.exist;

    expect(pcr).to.exist;
    expect(pcr).to.be.instanceof(SchemaTypes.String);
    expect(pcr.options).to.exist;
    expect(pcr.options).to.be.an('object');
    expect(pcr.options.type).to.exist;
    expect(pcr.options.trim).to.be.true;
    expect(pcr.options.index).to.be.true;
    expect(pcr.options.searchable).to.be.true;
    expect(pcr.options.taggable).to.be.true;
    expect(pcr.options.exportable).to.be.true;
    expect(pcr.options.fake).to.exist;

    expect(name).to.exist;
    expect(name).to.be.instanceof(SchemaTypes.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.taggable).to.be.true;
    expect(name.options.exportable).to.be.true;
    expect(name.options.fake).to.exist;

    expect(mobile).to.exist;
    expect(mobile).to.be.instanceof(SchemaTypes.String);
    expect(mobile.options).to.exist;
    expect(mobile.options).to.be.an('object');
    expect(mobile.options.type).to.exist;
    expect(mobile.options.trim).to.be.true;
    expect(mobile.options.index).to.be.true;
    expect(mobile.options.searchable).to.be.true;
    expect(mobile.options.taggable).to.be.true;
    expect(mobile.options.exportable).to.be.true;
    expect(mobile.options.fake).to.exist;

    expect(description).to.exist;
    expect(description).to.be.instanceof(SchemaTypes.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.exportable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = VehicleDispatch.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(SchemaTypes.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.exportable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have pickup field', () => {
    const pickup = VehicleDispatch.path('pickup');
    const correspondent = VehicleDispatch.path('pickup.correspondent');
    const address = VehicleDispatch.path('pickup.address');

    expect(pickup).to.exist;
    expect(pickup).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(correspondent).to.exist;
    expect(correspondent).to.be.instanceof(SchemaTypes.String);
    expect(correspondent.options).to.exist;
    expect(correspondent.options).to.be.an('object');
    expect(correspondent.options.type).to.exist;
    expect(correspondent.options.trim).to.be.true;
    expect(correspondent.options.index).to.be.true;
    expect(correspondent.options.searchable).to.be.true;
    expect(correspondent.options.taggable).to.be.true;
    expect(correspondent.options.exportable).to.be.true;
    expect(correspondent.options.fake).to.exist;

    expect(address).to.exist;
    expect(address).to.be.instanceof(SchemaTypes.String);
    expect(address.options).to.exist;
    expect(address.options).to.be.an('object');
    expect(address.options.type).to.exist;
    expect(address.options.trim).to.be.true;
    expect(address.options.index).to.be.true;
    expect(address.options.searchable).to.be.true;
    expect(address.options.taggable).to.be.true;
    expect(address.options.exportable).to.be.true;
    expect(address.options.fake).to.exist;
  });

  it('should have dropoff field', () => {
    const dropoff = VehicleDispatch.path('dropoff');
    const correspondent = VehicleDispatch.path('dropoff.correspondent');
    const address = VehicleDispatch.path('dropoff.address');

    expect(dropoff).to.exist;
    expect(dropoff).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(correspondent).to.exist;
    expect(correspondent).to.be.instanceof(SchemaTypes.String);
    expect(correspondent.options).to.exist;
    expect(correspondent.options).to.be.an('object');
    expect(correspondent.options.type).to.exist;
    expect(correspondent.options.trim).to.be.true;
    expect(correspondent.options.index).to.be.true;
    expect(correspondent.options.searchable).to.be.true;
    expect(correspondent.options.taggable).to.be.true;
    expect(correspondent.options.exportable).to.be.true;
    expect(correspondent.options.fake).to.exist;

    expect(address).to.exist;
    expect(address).to.be.instanceof(SchemaTypes.String);
    expect(address.options).to.exist;
    expect(address.options).to.be.an('object');
    expect(address.options.type).to.exist;
    expect(address.options.trim).to.be.true;
    expect(address.options.index).to.be.true;
    expect(address.options.searchable).to.be.true;
    expect(address.options.taggable).to.be.true;
    expect(address.options.exportable).to.be.true;
    expect(address.options.fake).to.exist;
  });

  it('should have carrier field', () => {
    const carrier = VehicleDispatch.path('carrier');
    const type = VehicleDispatch.path('carrier.type');
    const owner = VehicleDispatch.path('carrier.owner');
    const ownership = VehicleDispatch.path('carrier.ownership');
    const vehicle = VehicleDispatch.path('carrier.vehicle');

    expect(carrier).to.exist;
    expect(carrier).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(type).to.exist;
    expect(type).to.be.instanceof(SchemaTypes.ObjectId);

    expect(owner).to.exist;
    expect(owner).to.be.instanceof(SchemaTypes.ObjectId);

    expect(ownership).to.exist;
    expect(ownership).to.be.instanceof(SchemaTypes.ObjectId);

    expect(vehicle).to.exist;
    expect(vehicle).to.be.instanceof(SchemaTypes.ObjectId);
  });

  it('should have crew field', () => {
    const crew = VehicleDispatch.path('crew');

    expect(crew).to.exist;
    expect(crew).to.be.instanceof(SchemaTypes.Array);
    expect(crew.options).to.exist;
    expect(crew.options).to.be.an('object');
    expect(crew.options.type).to.exist;
    expect(crew.options.ref).to.exist;
    expect(crew.options.ref).to.be.equal(Party.MODEL_NAME);
    // expect(crew.options.required).to.be.true;
    expect(crew.options.exists).to.be.true;
    expect(crew.options.autopopulate).to.exist;
    expect(crew.options.taggable).to.exist;
    expect(crew.options.exportable).to.exist;
    // expect(crew.options.aggregatable).to.exist;
    expect(crew.options.default).to.be.undefined;
  });

  it('should have status field', () => {
    const status = VehicleDispatch.path('status');

    expect(status).to.exist;
    expect(status).to.be.instanceof(SchemaTypes.ObjectId);
    expect(status.options).to.exist;
    expect(status.options).to.be.an('object');
    expect(status.options.type).to.exist;
    expect(status.options.ref).to.exist;
    expect(status.options.ref).to.be.equal(Predefine.MODEL_NAME);
    // expect(status.options.required).to.be.true;
    expect(status.options.exists).to.be.true;
    expect(status.options.aggregatable).to.exist.and.be.an('object');

    expect(status.options.autopopulate).to.exist;
    expect(status.options.taggable).to.exist;
    expect(status.options.exportable).to.exist;
    // expect(status.options.aggregatable).to.exist;
    expect(status.options.default).to.be.undefined;
  });

  it('should have priority field', () => {
    const priority = VehicleDispatch.path('priority');

    expect(priority).to.exist;
    expect(priority).to.be.instanceof(SchemaTypes.ObjectId);
    expect(priority.options).to.exist;
    expect(priority.options).to.be.an('object');
    expect(priority.options.type).to.exist;
    expect(priority.options.ref).to.exist;
    expect(priority.options.ref).to.be.equal(Predefine.MODEL_NAME);
    // expect(priority.options.required).to.be.true;
    expect(priority.options.exists).to.be.true;
    expect(priority.options.aggregatable).to.exist.and.be.an('object');

    expect(priority.options.autopopulate).to.exist;
    expect(priority.options.taggable).to.exist;
    expect(priority.options.exportable).to.exist;
    // expect(priority.options.aggregatable).to.exist;
    expect(priority.options.default).to.be.undefined;
  });

  it('should have reportedAt field', () => {
    const reportedAt = VehicleDispatch.path('reportedAt');

    expect(reportedAt).to.exist;
    expect(reportedAt).to.be.instanceof(SchemaTypes.Date);
    expect(reportedAt.options).to.exist;
    expect(reportedAt.options).to.be.an('object');
    expect(reportedAt.options.type).to.exist;
    expect(reportedAt.options.index).to.be.true;
    expect(reportedAt.options.fake).to.exist;
  });

  it('should have reporter field', () => {
    const reporter = VehicleDispatch.path('reporter');

    expect(reporter).to.exist;
    expect(reporter).to.be.instanceof(SchemaTypes.ObjectId);
    expect(reporter.options).to.exist;
    expect(reporter.options).to.be.an('object');
    expect(reporter.options.type).to.exist;
    expect(reporter.options.ref).to.exist;
    expect(reporter.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(reporter.options.index).to.be.true;
    // expect(reporter.options.required).to.be.true;
    expect(reporter.options.exists).to.be.true;
    expect(reporter.options.autopopulate).to.exist;
    expect(reporter.options.taggable).to.exist;
    expect(reporter.options.exportable).to.exist;
    // expect(reporter.options.aggregatable).to.exist;
    expect(reporter.options.default).to.be.undefined;
  });

  it('should have dispatchedAt field', () => {
    const dispatchedAt = VehicleDispatch.path('dispatchedAt');

    expect(dispatchedAt).to.exist;
    expect(dispatchedAt).to.be.instanceof(SchemaTypes.Date);
    expect(dispatchedAt.options).to.exist;
    expect(dispatchedAt.options).to.be.an('object');
    expect(dispatchedAt.options.type).to.exist;
    expect(dispatchedAt.options.index).to.be.true;
    expect(dispatchedAt.options.fake).to.exist;
  });

  it('should have dispatcher field', () => {
    const dispatcher = VehicleDispatch.path('dispatcher');

    expect(dispatcher).to.exist;
    expect(dispatcher).to.be.instanceof(SchemaTypes.ObjectId);
    expect(dispatcher.options).to.exist;
    expect(dispatcher.options).to.be.an('object');
    expect(dispatcher.options.type).to.exist;
    expect(dispatcher.options.ref).to.exist;
    expect(dispatcher.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(dispatcher.options.index).to.be.true;
    // expect(dispatcher.options.required).to.be.true;
    expect(dispatcher.options.exists).to.be.true;
    expect(dispatcher.options.autopopulate).to.exist;
    expect(dispatcher.options.taggable).to.exist;
    expect(dispatcher.options.exportable).to.exist;
    // expect(dispatcher.options.aggregatable).to.exist;
    expect(dispatcher.options.default).to.be.undefined;
  });

  it('should have canceledAt field', () => {
    const canceledAt = VehicleDispatch.path('canceledAt');

    expect(canceledAt).to.exist;
    expect(canceledAt).to.be.instanceof(SchemaTypes.Date);
    expect(canceledAt.options).to.exist;
    expect(canceledAt.options).to.be.an('object');
    expect(canceledAt.options.type).to.exist;
    expect(canceledAt.options.index).to.be.true;
    expect(canceledAt.options.fake).to.exist;
  });

  it('should have canceler field', () => {
    const canceler = VehicleDispatch.path('canceler');

    expect(canceler).to.exist;
    expect(canceler).to.be.instanceof(SchemaTypes.ObjectId);
    expect(canceler.options).to.exist;
    expect(canceler.options).to.be.an('object');
    expect(canceler.options.type).to.exist;
    expect(canceler.options.ref).to.exist;
    expect(canceler.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(canceler.options.index).to.be.true;
    // expect(canceler.options.required).to.be.true;
    expect(canceler.options.exists).to.be.true;
    expect(canceler.options.autopopulate).to.exist;
    expect(canceler.options.taggable).to.exist;
    expect(canceler.options.exportable).to.exist;
    // expect(canceler.options.aggregatable).to.exist;
    expect(canceler.options.default).to.be.undefined;
  });

  it('should have resolvedAt field', () => {
    const resolvedAt = VehicleDispatch.path('resolvedAt');

    expect(resolvedAt).to.exist;
    expect(resolvedAt).to.be.instanceof(SchemaTypes.Date);
    expect(resolvedAt.options).to.exist;
    expect(resolvedAt.options).to.be.an('object');
    expect(resolvedAt.options.type).to.exist;
    expect(resolvedAt.options.index).to.be.true;
    expect(resolvedAt.options.fake).to.exist;
  });

  it('should have resolver field', () => {
    const resolver = VehicleDispatch.path('resolver');

    expect(resolver).to.exist;
    expect(resolver).to.be.instanceof(SchemaTypes.ObjectId);
    expect(resolver.options).to.exist;
    expect(resolver.options).to.be.an('object');
    expect(resolver.options.type).to.exist;
    expect(resolver.options.ref).to.exist;
    expect(resolver.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(resolver.options.index).to.be.true;
    // expect(resolver.options.required).to.be.true;
    expect(resolver.options.exists).to.be.true;
    expect(resolver.options.autopopulate).to.exist;
    expect(resolver.options.taggable).to.exist;
    expect(resolver.options.exportable).to.exist;
    // expect(resolver.options.aggregatable).to.exist;
    expect(resolver.options.default).to.be.undefined;
  });

  it('should have remarks field', () => {
    const remarks = VehicleDispatch.path('remarks');

    expect(remarks).to.exist;
    expect(remarks).to.be.instanceof(SchemaTypes.String);
    expect(remarks.options).to.exist;
    expect(remarks.options).to.be.an('object');
    expect(remarks.options.type).to.exist;
    expect(remarks.options.trim).to.be.true;
    expect(remarks.options.index).to.be.true;
    expect(remarks.options.searchable).to.be.true;
    expect(remarks.options.exportable).to.be.true;
    expect(remarks.options.fake).to.exist;
  });
});
