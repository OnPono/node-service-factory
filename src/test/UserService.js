const UserModel = require('./UserModel')
const BaseService = require('../BaseService')

module.exports = class UserService extends BaseService {

	constructor(options) {
		super(options)
		this.model = new UserModel(options)
	}

}
