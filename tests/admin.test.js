const request = require('supertest') 
const app = require('../app') 
const Admin = require('../models/admin')
const Presentation = require('../models/Presentation')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userId = new mongoose.Types.ObjectId()
const presentationId = new mongoose.Types.ObjectId()

const testUser = {
    username: 'john123',
    first_name: 'john',
    last_name: 'doe',
    email: 'john@gmail.com',
    password: '098johndoe@#'
}
const presentation = {title: 'this is a title', content: 'this is a content', skills: ['python', 'javascript']}
const token = jwt.sign({_id: userId}, process.env.JWT_SECRET)
beforeAll(async() => {
    await Admin.deleteMany()
    await Presentation.deleteMany()
    await Admin.create({
        _id: userId,
        username: testUser.username,
        first_name: testUser.first_name,
        last_name: testUser.last_name,
        email: testUser.email,
        password: testUser.password
    })
    await Presentation.create({
        _id: presentationId,
        title: presentation.title, 
        content: presentation.content,
        skills: presentation.skills
    })
    process.env['ADMIN_ID'] = String(userId)
})

describe('registerAdmin()', () => {
    const data = {username: 'alice123',
         first_name: 'alice', last_name: 'jones',
         email: 'alice@gmail.com',
         password: '098alice123'
    }
    test('should return 400 if invalid data is sent', async () => {
        await request(app).post('/admin/signin').send({}).expect(400)
    })
    test('should return 201 status code if admin is successfully created', async () => {
       await request(app).post('/admin/signin').send(data).expect(201)
    })
    test('should register admin to the database', async () => {
        const response = await request(app).post('/admin/signin').send(data)
        const user = await Admin.findById({_id: response.body._id})
        expect(user).not.toBeNull()
        expect(user).toMatchObject({
            username: data.username,
            first_name: data.first_name
        })
    })
    test('should return token as part of the response', async () => {
       const response = await request(app).post('/admin/signin').send(data)
       expect(response.body.token).toBeDefined()
       expect(response.body.token).toEqual(expect.any(String))
       expect(response.body.token.length).toBeGreaterThan(0)
    })
})

describe('loginAdmin()', () => {
    test('should return 400 status code if username or password is invalid', async () => {
        await request(app).post('/admin/login').send({}).expect(400)
    })
    test('should return 200 status code if username or password is valid', async () => {
        await request(app).post('/admin/login')
        .send({
            username: testUser.username,
            password: testUser.password
        }).expect(200)
    })
    test('should return object containing user data', async () => {
        const response = await request(app).post('/admin/login')
        .send({
            username: testUser.username,
            password: testUser.password
        })
        expect(response.body).toMatchObject({
            username: testUser.username,
            first_name: testUser.first_name
        })
    })
    test('should return token as part of the response if login is successfull', async () => {
        const response = await request(app).post('/admin/login')
            .send({
                username: testUser.username,
                password: testUser.password
           }).expect(200)
        expect(response.body.token).toBeDefined()
        expect(response.body.token).toEqual(expect.any(String))
        expect(response.body.token.length).toBeGreaterThan(0)
    })
})

describe('changePassword()', () => {
    test('should return 500 if unauthorized user access route', async () => {
        await request(app).patch('/admin/change_password').send({}).expect(500)
    })
    test('should return 400 if newPassword doesn\'t match confirmPassword', async () => {
        await request(app).patch('/admin/change_password')
        .set('Authorization', `Bearer ${token}`)
        .send({
            oldPassword: testUser.password,
            newPassword: '098ALICEPYTHON@#',
            confirmPassword: '098ALICEJAVA@#'
        }).expect(400)
    })
    test('should return 200 status code if valid data is sent', async () => {
        await request(app).patch('/admin/change_password')
        .set('Authorization', `Bearer ${token}`)
        .send({
            oldPassword: testUser.password,
            newPassword: '098ALICEPYTHON@#',
            confirmPassword: '098ALICEPYTHON@#'
        }).expect(200)
    })
    test('should return object containing user data if valid data is sent', async () => {
        const response = await request(app).patch('/admin/change_password')
        .set('Authorization', `Bearer ${token}`)
        .send({
            oldPassword: '098ALICEPYTHON@#',
            newPassword: testUser.password,
            confirmPassword: testUser.password
        }).expect(200)
        expect(response.body).toMatchObject({
            username: testUser.username,
            first_name: testUser.first_name,
            email: testUser.email
        })
        expect(response.body.token).toBeDefined()
        expect(response.body.token).toEqual(expect.any(String))
        expect(response.body.token.length).toBeGreaterThan(0)
    })
})

describe('createPresentation()', () => {
    test('should return 500 if unauthorized user access route', async () => {
        await request(app).post('/presentation/new').send({}).expect(500)
    })   
    test('should 400 if invalid data is sent', async () => {
        const response = await request(app).post('/presentation/new')
            .set('Authorization', `Bearer ${token}`)
            .send({age: 22}).expect(400)
    })
    test('should return 201 if presentation is created successfully', async () => {
        let data = {title: 'this is a title', content: 'this is a content', skills: ['python', 'javascript']}
        const response = await request(app).post('/presentation/new')
            .set('Authorization', `Bearer ${token}`)
            .send({title: data.title, content: data.content, skills: data.skills}).expect(201)
        expect(response.body).toMatchObject({
            title: data.title,
            content: data.content
        })
    })     
})

describe('fetchPresentation()', () => {
    test('should return 200 if presentation exist in database', async () => {
        await request(app).get('/presentation/detail').expect(200)
    })
    test('should return object containing presentation', async() => {
        const response = await request(app).get('/presentation/detail')
        const presentation = await Presentation.findById({_id: response.body._id})
        expect(presentation).not.toBeNull()
    })
})

describe('editPresentation()', () => {
    test('should return 400 if invalid data is sent', async () => {
        await request(app).patch(`/presentation/${presentationId}/edit`)
            .set('Authorization', `Bearer ${token}`)
            .send({username: 'alice'}).expect(400)
    })
})