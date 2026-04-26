const http = require('http');
const  path = './data/movie.json';
const fs = require('fs');

const server = http.createServer((req,res) => {
  if (req.url === '/api/movie' && req.method === 'GET') {
     const movies = JSON.parse(fs.readFileSync(path));
    
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(movie));

  } else if (req.url.startsWith('/api/movie/') && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[3]);
    const movies = JSON.parse(fs.readFileSync(path));
    const movie = movie.find(m => m.id === id);

    if (movie) {
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(movie));
    } else {
      res.writeHead(404);
      res.end('not included');
    }

  } else if (req.url === '/api/add-movies' && req.method === 'POST'){
    let body = '';
    req.on('data',chunk => {
      body +=chunk.toString();
    });

    req.on('end',async () => {
      const newmovie = JSON.parse(body);
      const movies = await JSON.parse(fs.readFileSync(filePath));
      newmovie.id = movies.length + 1;
      movies.push(newmovie);

      fs.writeFileSync(filePath, JSON.stringify(movies));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newMovie)); 

    });

  }
 else if (req.url.startsWith('/api/movies/') && req.method === 'PUT') {
    const id = parseInt(req.url.split('/')[3]);
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const updatedData = JSON.parse(body);
      let movies = JSON.parse(fs.readFileSync(path));

      movies = movies.map(m =>
        m.id === id ? { ...m, ...updatedData } : m
      );

      fs.writeFileSync(path, JSON.stringify(movies));

      res.writeHead(200);
      res.end('Movie updated');
    });
  
  }

 else if (req.url.startsWith('/api/movies/') && req.method === 'DELETE') {
    const id = parseInt(req.url.split('/')[3]);
    let movies = JSON.parse(fs.readFileSync(path));

    movies = movies.filter(m => m.id !== id);

    fs.writeFileSync(path, JSON.stringify(movies));

    res.writeHead(200);
    res.end('Movie deleted');
  }

  else {
    res.writeHead(404);
    res.end('Route not found');
  }

});

server.listen(4000, () => {
  console.log('server running on port 4000');
});
