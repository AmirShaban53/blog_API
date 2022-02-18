import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

import Post from '../src/models/post';
import User from '../src/models/user';
import logger from '../src/middleware/logger';
dotenv.config();
chai.should();
chai.use(chaiHttp);

let post_id;
let user_id;
let token; 

const post_data= {title:'abc',discription:'abc',content:'abc',aurthor:'admin'}
const user_data= {username:'abc',email:'abc@gmail.com',password:'password', role: 'USER'}
const comment_data= {comment:'abc'}

describe('posts route', () => {

    before(async()=>{
        try { 
            await Post.sync({force: true});
            await User.sync({force: true});
            const testPost = await Post.create(post_data);
            const testUser = await User.create(user_data);
            post_id = testPost.id;
            user_id = testUser.id;
            logger.info('test post AND user created')
            token = JWT.sign(
                {id: user_id}, 
                process.env.JWT_KEY, 
                {expiresIn: '1h'} 
                )

        } catch (error) {
            logger.error('failed to create test post'+ error)
        }
    })

    describe('POST /posts', () => {
        it('it should create a new post', (done) => {
            chai.request(app)
                .post('/posts')
                .send(post_data)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        });
        it('it should not create a new post', (done) => {
            const post = {}
            chai.request(app)
                .post('/posts')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

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

    

    describe('GET /posts/:id', () => {
        it('it should show a single post', (done) => {
            chai.request(app)
                .get(`/posts/${post_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
        it('it should not show any post', (done) => {
            chai.request(app)
                .get(`/posts/sdksad`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('DELETE /posts/:id', () => {
        it('it should delete a post', (done) => {
            chai.request(app)
                .delete(`/posts/${post_id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
        it('it should not delete any post', (done) => {
            chai.request(app)
                .delete(`/posts/sdsd`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });


    describe('POST /posts/:id/comment', () => {
        it('it should create a new comment', (done) => {
            chai.request(app)
                .post(`/posts/${post_id}/comment`)
                .set(`authorization`, `bearer ${token}`)
                .send(comment_data)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        });
        it('it should not create a new comment due to null data', (done) => {
            chai.request(app)
                .post(`/posts/${post_id}/comment`)
                .set(`authorization`, `bearer ${token}`)
                .send()
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
        it('it should not create a new comment due to wrong token', (done) => {
            chai.request(app)
                .post(`/posts/${post_id}/comment`)
                .set(`authorization`, `bearer wrong `)
                .send()
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    describe('GET /posts/:id/comment', () => {
        it('it should show all comments of a post', (done) => {
            chai.request(app)
                .get(`/posts/${post_id}/comment`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
        it('it should not show comments of a post', (done) => {
            chai.request(app)
                .get(`/posts/wrong_id/comment`)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });

    

    

    
});
