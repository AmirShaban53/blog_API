import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import User from '../src/models/user';

chai.should();
chai.use(chaiHttp);

describe('auth route', () => {

    before(async()=>{
        await User.sync({force: true});
    })

    describe('POST /signup', () => {
        it('it should create a new user', (done) => {
            const newUser = {username: 'test', email:'test@gmail.com', password: 'test'}
            chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=> {
                    res.should.have.status(201);
                    done();
                })
        });
        it('it should not create a new user due null data', (done) => {
            const newUser = {}
            chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
        it('it should not create a new user because user already exists', (done) => {
            const newUser = {username: 'test', email:'test@gmail.com', password: 'test'}
            chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=> {
                    res.should.have.status(409);
                    done();
                })
        });
        it('it should not create a new user due null password', (done) => {
            const newUser = {username: 'test1', email:'test1@gmail.com'}
            chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
        it('it should not create a new user due null userame and email', (done) => {
            const newUser = {password: 'test'}
            chai.request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('POST /login', () => {
        it('it should create a new user', (done) => {
            const user = {email:'test@gmail.com', password: 'test'}
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res)=> {
                    res.should.have.status(200);
                    done();
                })
        });
        it('it should not create a new user due to null data', (done) => {
            const user = {}
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res)=> {
                    res.should.have.status(500);
                    done();
                })
        });
        it('it should not create a new user due to wrong email', (done) => {
            const user = {email:'wrong@gmail.com', password: 'test'}
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res)=> {
                    res.should.have.status(401);
                    done();
                })
        });
        it('it should create a new user due to wrong password', (done) => {
            const user = {email:'test@gmail.com', password: 'wrong'}
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res)=> {
                    res.should.have.status(401);
                    done();
                })
        });
        it('it should create a new user due to null password', (done) => {
            const user = {email:'test@gmail.com'}
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res)=> {
                    res.should.have.status(401);
                    done();
                })
        });
    });
    
    
});
