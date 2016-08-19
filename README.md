# Node Service Utils

Generate simple CRUD service modules for your service oriented Node.js architecture (user, auth, todo etc.)

## Introduction

* MongoDB based
* ES2015 (Node 6 or above is required)
* Fully tested

## Installation

Requirements
* MongoDB (with Mongoose) (link how to install Mongo)
* Node 6

```
npm i node-service-utils --save
```

### Usage

*Note: Look at `/src/test` folder for more detailed examples.*

```
mongoose = require('mongoose')
serviceUtils = require('node-service-utils')

// Your custom service class
class UserService extends serviceUtils.BaseService {
	// ... custom CRUD methods
}

// Your custom model for your service class
function userModel(db) => {

	const schema = {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: true },
	}

	const modelFactory = new ModelFactory(db)
	const model = modelFactory.create('User', schema)

	return model
}

// Use model for new instances of your custom service class
mongoose.connect(config.mongo, err => {
	const userService = new UserService('User', userModel(mongoose))
	// userService.create({ firstName: 'Homer', ... }).then(...)
	// userService.find({ firstName: 'Simpson', ... }).then(...)
})
```
