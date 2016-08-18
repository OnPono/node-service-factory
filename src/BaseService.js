module.exports = class BaseService {

	constructor(db = null, Model) {
		this.db = db
		this.Model = Model
	}

	create(record) {
		record.createdAt = new Date()
		return new this.Model(record).save().then(this.toObject)
	}

	find(q) {
		return this.Model.find(q).then(results => results.map(this.toObject))
	}

	findById(_id) {
		return this.Model.findOne({ _id }).then(this.toObject)
	}

	update(_id, record) {
		record.modifiedAt = new Date()
		return this.find({ _id })
		.then(res => {
			if (!res.length) { throw new Error('S{TODO_GET_CLASS_NAME} not found') }
			return this.Model.findOneAndUpdate({ _id }, { $set: record }, { new: true })
			.then(this.toObject)
		})
	}

	removeById(_id) {
		return this.Model.findOneAndRemove({ _id })
	}

	toObject(record) {
		return (record) ? record.toObject() : record
	}

}
