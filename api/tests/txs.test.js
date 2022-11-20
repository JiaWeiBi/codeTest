const { app } = require('../index');
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.expect;
chai.use(chaiHttp);

describe('txs', function () {
  it('response ok', function (done) {
    chai
      .request(app)
      .get('/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90')
      .end((err, res) => {
        if (err || res.body.status != 1) {
          done(err || new Error(res.body.message));
          return;
        }
        done();
      });
  });
  it('invalid sort', function (done) {
    chai
      .request(app)
      .get('/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&sort=xxxx')
      .end((err, res) => {
        if (res.body && res.body.status == 0) {
          done();
          return;
        }
        done(new Error('invalid sort still response'));
      });
  });
  it('invalid perPage', function (done) {
    chai
      .request(app)
      .get('/api/txs?a=0xeb2a81e229b68c1c22b6683275c00945f9872d90&perPage=1000000')
      .end((err, res) => {
        if (res.body && res.body.status == 0) {
          done();
          return;
        }
        console.log(res.body);
        done(new Error('invalid perPage still response'));
      });
  });
});
