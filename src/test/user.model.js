const ModelFactory = require('../ModelFactory')

module.exports = db => {

	const schema = {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
	}

	const modelFactory = new ModelFactory(db)
	const model = modelFactory.create('User', schema)

	return model

}
