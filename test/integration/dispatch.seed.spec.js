import path from 'path';
import { first } from 'lodash';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { seedCommons } from '@codetanzania/ewea-common';
import { VehicleDispatch } from '../../src';

describe('VehicleDispatch Seed', () => {
  const { SEED_PATH } = process.env;
  let dispatch;

  before((done) => clear(done));

  before(() => {
    process.env.SEED_PATH = path.join(__dirname, '..', 'fixtures');
  });

  before((done) => seedCommons(done));

  it('should be able to seed', (done) => {
    VehicleDispatch.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      dispatch = first(seeded);
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', (done) => {
    VehicleDispatch.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = VehicleDispatch.fake().toObject();
    VehicleDispatch.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = VehicleDispatch.fake().toObject();
    VehicleDispatch.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = dispatch.toObject();
    VehicleDispatch.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', (done) => {
    VehicleDispatch.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    VehicleDispatch.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  after((done) => clear(done));

  after(() => {
    process.env.SEED_PATH = SEED_PATH;
  });
});
