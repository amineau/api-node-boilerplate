import chai     from 'chai';
import chaiHttp from 'chai-http';
import server   from '../src/server';

const should = chai.should()

chai.use(chaiHttp);
describe('User', () => {
  describe('/GET user', () => {
    it('it should get information of user', done => {
      chai.request(server)
        .get('/user')
        .end((err, res) => {
          if (!err) throw err
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('ok');
          done();
        });
    });
  });

    // describe('/POST user', () => {
  //   it('it should an email', done => {
  //     chai.request(server)
  //       .post('/user')
  //       .send({ mail: "toto@mail.fr" })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('success');
  //       done();
  //     });
  //   });
  // });
});