const ModelFactory = require('../ModelFactory')

module.exports = db => {

	const schema = {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: {
			type: String,
			index: { unique: true },
			validate: {
				validator: emailExists,
				message: 'Email address already exists',
			},
		},
		password: { type: String, required: true },
		profileImg: { type: String },
	}

	const modelFactory = new ModelFactory(db)
	const model = modelFactory.create('User', schema)

	function emailExists(email, callback) {
		model.find({ email }).exec((err, users) => {
			if (err) throw err
			return callback(!users.length)
		})
	}

	model.validationErrors = {
		emailExists: {
			name: 'ValidationError',
			type: 'User validation failed',
			message: 'Email address already exists',
		},
	}

	return model

}
