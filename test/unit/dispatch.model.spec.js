import { omit } from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import VehicleDispatch from '../../src/dispatch.model';

describe('VehicleDispatch Instance', () => {
  it('should have pre validate logics', () => {
    const event = VehicleDispatch.fake();
    expect(event.preValidate).to.exist;
    expect(event.preValidate).to.be.a('function');
    expect(event.preValidate.length).to.be.equal(1);
    expect(event.preValidate.name).to.be.equal('preValidate');
  });

  it('should set reportedAt on pre validate', (done) => {
    const event = VehicleDispatch.fakeExcept('reportedAt');

    expect(event.reportedAt).to.not.exist;
    event.preValidate((error) => {
      expect(event.reportedAt).to.exist;
      done(error);
    });
  });
});

describe('VehicleDispatch Validations', () => {
  it('should generate number', (done) => {
    const event = VehicleDispatch.fakeExcept('number');
    // expect(event.number).to.not.exist;
    event.validate((error) => {
      expect(error).to.not.exist;
      expect(event.number).to.exist;
      expect(event.number).to.contain('TZ');
      done(error, event);
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
    const event = VehicleDispatch.fake().toObject();
    const seed = VehicleDispatch.prepareSeedCriteria(event);
    expect(seed).to.exist;
    expect(seed._id).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const event = omit(VehicleDispatch.fake().toObject(), '_id');
    const seed = VehicleDispatch.prepareSeedCriteria(event);
    expect(seed).to.exist;
    expect(seed._id).to.not.exist;
  });
});

describe('VehicleDispatch Faker', () => {
  it('should fake number', () => {
    const event = VehicleDispatch.fake();
    expect(event.number).to.exist.and.be.a('string');
  });
});
