const BaseService = require('../BaseService')

module.exports = class UserService extends BaseService {

	create(user) {
		user.createdAt = new Date()
		const u = new this.Model(user)
		return new Promise((resolve, reject) => {
			if (!user.password) {
				reject(new Error('Password is required'))
			} else {
				resolve('hashed-password')
			}
		})
		.then(hash => {
			u.password = hash
			return u.save()
		})
	}

}
