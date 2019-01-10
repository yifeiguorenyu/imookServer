'use strict'
var fs =require('fs')
var path =require('path')
const mongoose = require('mongoose');
const db ='mongodb://localhost/imooc-app'
mongoose.Promise=require('bluebird')
mongoose.connect(db,{ useNewUrlParser: true },(err)=>{
	if(err){
		console.log(err)
		throw err
	}
})

var models_path=path.join(__dirname,'/app/models')
var wark =(modelPath)=>{
	fs.readdirSync(models_path)
	.forEach((file)=>{
		var filePath=path.join(models_path,file)
		var stat =fs.statSync(filePath)
		if(stat.isFile()){
			if(/(.*)\.(js|coffee)/.test(file)){
				require(filePath)
			}
		}else if(stat.isDirectory()){
			wark(filePath)
		}
	})
}
 wark(models_path)

var koa =require('koa')
var logger =require('koa-logger')
var session =require('koa-session')
var bodyParser =require('koa-bodyparser')
var app =new koa()
app.keys=['imooc']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router =require('./config/routes.js')()

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(1234)
