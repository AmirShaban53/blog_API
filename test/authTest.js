import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.should();
chai.use(chaiHttp);

describe('auth route', () => {

    describe('POST /signup', () => {
        it('it should create a new user', (done) => {
            chai.request(app)
                .post('/auth/signup')
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('POST /login', () => {
        it('it should create a new user', (done) => {
            chai.request(app)
                .post('/auth/login')
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
    });
    
    
});
