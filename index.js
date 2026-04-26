const http = require('http');
const  movies = require('./data/movie.json');
const fs = require('fs');

const server = http.createServer((req,res) => {
  if (req.url === '/api/movie' && req.method === 'GET') {
     const movies = JSON.parse(fs.readFileSync(path));
    
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(movie));
  } else if (req.url.startsWith('/api/movie/') && req.method === 'GET') {
    const movieId = req.url.split('/')[3]
    const movie = movie.find(m => m.id === id);

    if (movie) {
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(movie));
    } else {
      res.writeHead(404, {'content-type':'text/plain'});
      res.end('not included');
    }

  } else if (){}
 
});
