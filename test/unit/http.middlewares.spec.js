import { expect } from '@lykmapipo/mongoose-test-helpers';
import { ensureReporter } from '../../src/http.middlewares';

describe('Http Middlewares', () => {
  it('should ensure reporter if not set', (done) => {
    const request = { body: {}, party: {} };
    ensureReporter(request, {}, () => {
      expect(request.body.reporter).to.exist;
      expect(request.body.reporter).to.be.eql(request.party);
      done();
    });
  });

  it('should ignore reporter if set', (done) => {
    const request = { body: { reporter: {} }, party: {} };
    ensureReporter(request, {}, () => {
      expect(request.body.reporter).to.exist;
      expect(request.body.reporter).to.be.eql(request.body.reporter);
      done();
    });
  });
});
