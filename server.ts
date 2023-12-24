import express, { Request, Response } from 'express';
import { Server } from 'socket.io';

const app = express();

app.use('/static', express.static('node_modules'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// initialize & listen to server
const io = new Server(server);
// Handle connection
io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");
    
    setInterval(function(){
        var news = getNews();
        // Send news on the socket
        socket.emit('news', news);
    } , 5000);
    

    socket.on('my other event', function (data) {
        console.log(data);
    });
});
    function getNews(){
    var length = Math.floor(Math.random() * 21);
    var news = [];
    for(var i = 0; i < length ; i++ ){
        var val = {id : i , title : 'The cure of the Sadness is to play Videogames' + i , date: new Date() }
        news.push(val);
    }
    return news
    }

export default app;