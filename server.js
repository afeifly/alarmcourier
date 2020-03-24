const express = require('express')
const path = require('path')
const app = express()
const https = require('https');
const bodyParser = require('body-parser');


let receivers = [];
let currentValue = 100;
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
  return res.send('pong')
})
app.get('/getValue', (req, res) => {
//	let value =	Math.floor(Math.random() * Math.floor(100))
	let value =	currentValue
	let obj = {
		value : value
	}	
  return res.send(JSON.stringify(obj))
})
app.get('/setValue', (req, res) => {
	currentValue = parseInt(req.query.value)
  return res.send('pong')
})
app.post('/subscription',express.json({type: '*/*'}), (req, res) => {
	//let openID = req.query.openID
	let openID = req.body.openID
	
	let obj = {
		openID: openID,
		name: req.body.nickName,
		url: req.body.avatarUrl
	}
	let alreadyIn = false
	for(var item of receivers){
		if(item.openID===openID){
			alreadyIn = true
			break;
		}
	}
	if(!alreadyIn){
		receivers.push(obj)
	}	
  return res.send('pong '+ receivers.length)
})
app.get('/subscriptions', (req, res) => {
  return res.send(JSON.stringify(receivers))
})
app.get('/alarmTriger', (req, res) => {
	let currentV = req.query.value
	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5972e6e35ef9a1bb&secret=d1d81d294b8a4def6705eafe398448d6',
		(resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
		let accTK = JSON.parse(data).access_token
		//TODO time format
		let m = new Date()
		let dateString = m.getUTCFullYear() 
			+"-"+ ("0" + (m.getUTCMonth()+1)).slice(-2)
			+"-"+ ("0" + m.getUTCDate()).slice(-2)
			//+ " " + ("0" + m.getUTCHours()).slice(-2) 
			+ " " + ("0" + m.getHours()).slice(-2) 
			+ ":" + ("0" + m.getUTCMinutes()).slice(-2)
			+ ":" + ("0" + m.getUTCSeconds()).slice(-2);
		for(var item of receivers){
			data = JSON.stringify({
					touser: item.openID,
					template_id: 'IKKc_gGEZCqQgqQw6mXKVzrvoWxS_TZYz4GPksSBREo',
					data: {
						time2: {
							//value: "2019-10-22 14:41:11"
							value: dateString 
						},
						thing1: {
							value: "Alarm trigger"
						},						
					}
			})
			const options = {
				hostname: 'api.weixin.qq.com',
  			port: 443,
			  path: '/cgi-bin/message/subscribe/send?access_token='+accTK,
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			    'Content-Length': data.length
			  }
			}
			const req = https.request(options, (res) => {
		  console.log(`statusCode: ${res.statusCode}`)

			res.on('data', (d) => {
			    process.stdout.write(d)
			  })
			})

			req.on('error', (error) => {
			  console.error(error)
			})

			req.write(data)
			req.end()

			
		}
		
		});
		}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
  return res.send(JSON.stringify(receivers))
})
app.post('/alarm',(req, res) =>{
	
  return res.send(JSON.stringify(receivers))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000)
