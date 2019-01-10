
const mongoose = require('mongoose');
const xss = require('xss')
var User =mongoose.model("User")
const uuid =require("uuid")

exports.signup =(ctx, next) => {
	let phoneNumber = ctx.query.phoneNumber	+""
	 User.findOne({
		phoneNumber:phoneNumber,
	}).exec((err,res)=>{
		if(err){
			ctx.body={
				success:false
			}
		}
		if(!res){
			res = new User({
				phoneNumber: xss(phoneNumber),
				_id:uuid()
			})	
		}else {
			res.verifyCode = '1234'
		}
		try {
			res.save()
		} catch(e) {
			console.log("error========"+e)
			ctx.body = {
				success: false,
			}
			return
		}
	})
	ctx.body = {
		success: true,
	}
}

exports.verify = (ctx, next) => {
	ctx.body = {
		success: true
	}
}
exports.update = (ctx, next) => {
	ctx.body = {
		success: true
	}
}