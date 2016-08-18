module.exports = class BaseModel {

	constructor() {
		this.schema = {
			createdAt: { type: Date },
			modifiedAt: { type: Date },
		}
	}

}
