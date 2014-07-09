var http = require('http')
  , fs = require('fs')
  , path = require('path')

function onrequest(req, res){
  console.log('request!', req.url)
  if (req.connection.xForward){
    console.log('already ssl')
    req.headers['x-forwarded-for'] = req.connection.xForward
  }
  else if (req.headers['x-forwarded-for']){
    console.log('initial ssl')
    req.connection.xForward = req.headers['x-forwarded-for']
  }
  else {
    console.log('not ssl!')
    res.writeHead(301, {
      'Location': 'https://localhost:1443'
    })
    return void res.end()
  }

  // default to 1 year
  res.setHeader('Strict-Transport-Security', 'max-age=' + 60 * 60 * 24 * 365)
  if (req.url === '/')
    fs.createReadStream(path.resolve('static', 'index.html')).pipe(res)
  else if (req.url === '/demo.js')
    fs.createReadStream(path.resolve('static', 'demo.js')).pipe(res)
  else {
    res.writeHead(404)
    res.end('not found')
  }
}

http.createServer(onrequest).listen(8000, 'localhost')
