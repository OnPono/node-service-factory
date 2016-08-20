require('should')
const BaseService = require('../BaseService')
const ModelFactory = require('../ModelFactory')
const UserService = require('./UserService')
const userModel = require('./user.model.js')
const mongoose = require('mongoose')
const mockgoose = require('mockgoose')

const defaultMethods = ['create', 'find', 'findById', 'update', 'removeById', 'toObject']

context('main tests', () => {

	let modelFactory

	before(() => {
		return mockConnect(mongoose).then(db => {
			modelFactory = new ModelFactory(db)
		})
	})

	after(() => { return mockClose(mongoose) })

	describe('new BaseService()', () => {

		let model
		let service
		before(() => {
			model = modelFactory.create('Test')
			service = new BaseService('Test', model)
		})

		it('is an instance of a BaseService object', () => {
			return service.should.be.instanceof(BaseService)
		})

		it('contains all default methods', () => {
			return methodsExist(service, defaultMethods).should.be.true()
		})

	})

	describe('new UserService()', () => {

		let userService
		before(() => {
			userService = new UserService('Test', userModel(mongoose))
		})

		it('extends BaseService', () => {
			return (typeof userService.prototype === BaseService)
		})

		it('contains all default methods', () => {
			return methodsExist(userService, defaultMethods).should.be.true()
		})

		it('implements custom create method', () => {
			return userService.create({
				firstName: 'Homer',
				lastName: 'Simpson',
				email: 'homer@simpsons.com',
			}).should.be.rejectedWith('Password is required')
		})

	})

})

// helpers
function methodsExist(instance, methods) {
	return methods.every(method => (typeof instance[method] === 'function'))
}

function mockConnect(db) {
	db.Promise = global.Promise
	return mockgoose(db).then(() => {
		return db.connect('node-service-factory-tests').then(() => db)
	})
}

function mockClose(db) {
	return db.connection.close()
}
