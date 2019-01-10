'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema=new Schema({
	_id:String,
	phoneNumber:{
		unique:true,
		type:String,
	},
	areaCode:String,
	verifyCode:String,
	accessToken:String,
	nickname:String,
	gender:String,
	greed:String,
	age:String,
	avatar:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now(),
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
UserSchema.pre('save',function(next){
	if(!this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	next()
})
var UserModel =mongoose.model('User',UserSchema)
module.exports= UserModel
