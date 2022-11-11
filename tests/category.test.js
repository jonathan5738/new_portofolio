const request = require('supertest') 
const app = require('../app') 
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Admin = require('../models/admin')
const Category = require('../models/Category')
const userId = new mongoose.Types.ObjectId()
const categoryId = new mongoose.Types.ObjectId()
const testUser = {
    username: 'john123',
    first_name: 'john',
    last_name: 'doe',
    email: 'john@gmail.com',
    password: '098johndoe@#'
}
const category = {
    name: 'testing category one'
}
const token = jwt.sign({_id: userId}, process.env.JWT_SECRET)
beforeAll(async() => {
    await Admin.deleteMany()
    await Category.deleteMany()
    await Admin.create({
        _id: userId,
        username: testUser.username,
        first_name: testUser.first_name,
        last_name: testUser.last_name,
        email: testUser.email,
        password: testUser.password
    })
    await Category.create({_id: categoryId, name: category.name })
    process.env['ADMIN_ID'] = String(userId)
})

describe('createCategory()', () => {
    test('should return 500 if unathorized user access route', async () => {
        await request(app).post('/category/new')
            .send({name: 'testing category'})
            .expect(500)
    })
    test('should return 404 status code if non-existing user access route', async () => {
        const userIdTest = new mongoose.Types.ObjectId()
        const token = jwt.sign({_id: userIdTest}, process.env.JWT_SECRET)
        process.env['ADMIN_ID'] = String(userIdTest)
        await request(app).post('/category/new')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'testing category'})
            .expect(404)
        process.env['ADMIN_ID'] = String(userId)
    })
    test('should return 400 if invalid data is sent', async() => {
        await request(app).post('/category/new')
            .set('Authorization', `Bearer ${token}`)
            .send({age: 40})
            .expect(400)
    })
    test('should return 201 status code and object if authorized user create category', async () => {
        const response = await request(app).post('/category/new')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'testing category'})
            .expect(201)
        const category = await Category.findById({_id: response.body._id})
        expect(category).not.toBeNull()
        expect(response.body).toMatchObject({name: 'testing category'})
    })
})

describe('listCategory()', () => {
    test('should return a list of object if categories exist in database', async () => {
        const categories = await Category.find({})
        expect(categories).toEqual(expect.any(Array))
        expect(categories.length).toBeGreaterThan(0)
    })
})

describe('editCategory()', () => {
    test('should return 500 if unauthorized user access this route', async () => {
        const categoryId = String(new mongoose.Types.ObjectId())
        await request(app).patch(`/category/${categoryId}/edit`)
         .expect(500)
    })
    test('should return 404 if category is not to be found', async () => {
        const categoryId = String(new mongoose.Types.ObjectId())
        await request(app).patch(`/category/${categoryId}/edit`)
         .set('Authorization', `Bearer ${token}`)
         .expect(404)
    })
    test('should return 200 if category is successfully created', async () => {
        const response = await request(app).patch(`/category/${categoryId}/edit`)
         .set('Authorization', `Bearer ${token}`)
         .send({name: 'TESTING CATEGORY'})
         .expect(200)
        expect(response.body.name).toEqual('TESTING CATEGORY')
    })
})
describe('deleteCategory', () => {
    test('should return 500 if unauthorized user access route', async () => {
        await request(app).delete(`/category/${categoryId}/delete`)
         .expect(500)
    })
    test('should return 404 if category id is invalid', async() => {
        const categoryId = String(new mongoose.Types.ObjectId())
        await request(app).delete(`/category/${categoryId}/delete`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
    })
    test('should return 200 if category is successfully deleted', async () => {
        await request(app).delete(`/category/${categoryId}/delete`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
})