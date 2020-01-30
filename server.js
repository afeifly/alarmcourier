const express = require('express')
const path = require('path')
const app = express()

let receivers = [];
app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/subscription', (req, res) => {
	let obj = {
		openID: 1,
		name: "est1",
		url: "u1"
	}
	receivers.push(obj)
	let obj1 = {
		openID: 2,
		name: "elll3",
		url: "u1"
	}
	receivers.push(obj1)

  return res.send('pong')
})
app.post('/alarm',(req, res) =>{
	
  return res.send(JSON.stringify(receivers))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000)
