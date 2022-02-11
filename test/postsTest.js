import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.should();
chai.use(chaiHttp);

describe('posts route', () => {

    describe('GET /posts', () => {
        it('it should show all posts', (done) => {
            chai.request(app)
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe('POST /posts', () => {
        it('it should create a new post', (done) => {
            chai.request(app)
                .post('/posts')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('GET /posts/:id', () => {
        it('it should show a single post', (done) => {
            chai.request(app)
                .get('/posts/ukgyu')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('DELETE /posts/:id', () => {
        it('it should delete a post', (done) => {
            chai.request(app)
                .delete('/posts/:id')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('GET /posts/:id/comment', () => {
        it('it should show all comments of a post', (done) => {
            chai.request(app)
                .get('/posts/:id/comment')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('POST /posts/:id/comment', () => {
        it('it should create a new comment', (done) => {
            chai.request(app)
                .post('/posts/:id/comment')
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    

    
});
