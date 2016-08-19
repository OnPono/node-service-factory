class ModelFactory {

	constructor(db) {
		this.db = db
		this.schema = {
			createdAt: { type: Date },
			modifiedAt: { type: Date },
		}
	}

	create(name, schema = {}) {
		const base = Object.assign({}, this.schema)
		return this._getModel(
			name,
			Object.assign(base, schema)
		)
	}

	_getModel(name, schema) {
		let model
		if (this.db.models[name]) {
			model = this.db.models[name]
		} else {
			const schemaInstance = new this.db.Schema(schema)
			this._setTransformMethod(schemaInstance, this._cleanDocument)
			model = this.db.model(name, schemaInstance)
		}
		return model
	}

	_setTransformMethod(schema, method) {
		if (!schema.options.toObject) schema.options.toObject = {}
		schema.options.toObject.transform = method
	}

	_cleanDocument(doc, ret) { delete ret.__v }

}

module.exports = ModelFactory
