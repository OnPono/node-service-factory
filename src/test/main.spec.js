require('should')
const BaseService = require('../BaseService')
const BaseModel = require('../BaseModel')
const UserService = require('./UserService')
const UserModel = require('./UserModel')

context('factory', () => {

	before(() => {})

	describe('new BaseService()', () => {

		let service
		before(() => {
			service = new BaseService('Test', new BaseModel())
		})

		it('returns an instance of a default service object', () => {
			return service.should.be.instanceof(BaseService)
		})

		it('default instance contains all default methods', () => {
			const defaultMethods = ['create', 'find', 'findById', 'update', 'removeById', 'toObject']
			return methodsExist(service, defaultMethods).should.be.true()
		})

	})

	describe('extending BaseService', () => {

		let userService
		before(() => {
			userService = new UserService('User', new UserModel())
		})

		it('userService implements custom create method', () => {
			return true
		})

	})

})

// helpers
function methodsExist(instance, methods) {
	return methods.every(method => (typeof instance[method] === 'function'))
}
