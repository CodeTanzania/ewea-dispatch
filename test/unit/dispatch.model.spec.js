import { omit } from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import VehicleDispatch from '../../src/dispatch.model';

describe('VehicleDispatch Instance', () => {
  it('should have pre validate logics', () => {
    const dispatch = VehicleDispatch.fake();
    expect(dispatch.preValidate).to.exist;
    expect(dispatch.preValidate).to.be.a('function');
    expect(dispatch.preValidate.length).to.be.equal(1);
    expect(dispatch.preValidate.name).to.be.equal('preValidate');
  });

  it('should set reportedAt on pre validate', (done) => {
    const dispatch = VehicleDispatch.fakeExcept('reportedAt');

    expect(dispatch.reportedAt).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.reportedAt).to.exist;
      done(error);
    });
  });

  it('should set reportedAt on pre validate', (done) => {
    const vehicle = Predefine.fake();
    const dispatch = VehicleDispatch.fakeExcept('dispatchedAt');
    dispatch.set({ carrier: { vehicle } });

    expect(dispatch.dispatchedAt).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.dispatchedAt).to.exist;
      done(error);
    });
  });

  it('should set waiting status on request', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'dispatchedAt',
      'pickup.arrivedAt',
      'pickup.dispatchedAt',
      'dropoff.arrivedAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set cancel status on cancel', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'dispatchedAt',
      'pickup.arrivedAt',
      'pickup.dispatchedAt',
      'dropoff.arrivedAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set enroute status on dispatch', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'pickup.arrivedAt',
      'pickup.dispatchedAt',
      'dropoff.arrivedAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set at pickup status when arrived at pickup', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'pickup.dispatchedAt',
      'dropoff.arrivedAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set from pickup status when dispatched from pickup', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'dropoff.arrivedAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set at dropoff status when at drop off', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'dropoff.dispatchedAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set from dropoff status when dispatched from drop off', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(
      1,
      null,
      'canceledAt',
      'resolvedAt'
    );

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });

  it('should set completed status once finished', (done) => {
    const dispatch = VehicleDispatch.fakeExcept(1, null, 'canceledAt');

    expect(dispatch.status).to.not.exist;
    dispatch.preValidate((error) => {
      expect(dispatch.status).to.exist;
      done(error);
    });
  });
});

describe.skip('VehicleDispatch Validations', () => {
  // TODO: seedCommons
  it('should generate number', (done) => {
    const dispatch = VehicleDispatch.fakeExcept('number');
    // expect(dispatch.number).to.not.exist;
    dispatch.validate((error) => {
      console.log(error);
      expect(error).to.not.exist;
      expect(dispatch.number).to.exist;
      expect(dispatch.number).to.contain('TZ');
      done(error, dispatch);
    });
  });
});

describe('VehicleDispatch Statics', () => {
  it('should expose model name', () => {
    expect(VehicleDispatch.MODEL_NAME).to.exist;
    expect(VehicleDispatch.MODEL_NAME).to.be.equal('VehicleDispatch');
  });

  it('should expose collection name', () => {
    expect(VehicleDispatch.COLLECTION_NAME).to.exist;
    expect(VehicleDispatch.COLLECTION_NAME).to.be.equal('vehicledispatches');
  });

  it('should expose select options', () => {
    expect(VehicleDispatch.OPTION_SELECT).to.exist;
    expect(VehicleDispatch.OPTION_SELECT).to.be.eql({
      group: 1,
      type: 1,
      event: 1,
      number: 1,
    });
  });

  it('should expose autopopulate options', () => {
    expect(VehicleDispatch.OPTION_AUTOPOPULATE).to.exist;
    expect(VehicleDispatch.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        group: 1,
        type: 1,
        event: 1,
        number: 1,
      },
      maxDepth: 1,
    });
  });

  it('should prepare seed criteria', () => {
    const { _id, ...rest } = VehicleDispatch.fake().toObject();
    const seed = VehicleDispatch.prepareSeedCriteria(rest);
    expect(seed).to.exist;
    expect(seed.number).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const dispatch = VehicleDispatch.fake().toObject();
    const seed = VehicleDispatch.prepareSeedCriteria(dispatch);
    expect(seed).to.exist;
    expect(seed._id).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const dispatch = omit(VehicleDispatch.fake().toObject(), '_id');
    const seed = VehicleDispatch.prepareSeedCriteria(dispatch);
    expect(seed).to.exist;
    expect(seed._id).to.not.exist;
  });
});

describe('VehicleDispatch Faker', () => {
  it('should fake number', () => {
    const dispatch = VehicleDispatch.fake();
    expect(dispatch.number).to.exist.and.be.a('string');
  });
});
