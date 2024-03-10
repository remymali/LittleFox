import express from "express";
import path from 'path'
import http from 'http'
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
dotenv.config()   

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
import noticeRoutes from './routes/noticeRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

connectDB();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors()); // CORS should be before other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/socket.io', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')));

app.use((req, res, next) => {
    const signature = req.cookies.jwt;
    console.log(signature);
    console.log(`inside userservice ${req.method} ${req.url}`);
    next();
});

app.use('/notice', noticeRoutes);
app.use('/chat',chatRoutes);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('AuthServer is ready');
});

const users= new Set();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    users.add(socket.id)
    io.emit('userCount',users.size);
    socket.on('chat-message', (msg) => {
        console.log('from:',socket.id+'  message:', msg);
        io.emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        users.delete(socket.id)
        io.emit('userCount',users.size)
    });
});

server.on("error", (err) => {
    console.log("Error opening server:", err);
});

server.listen(port, () => {
    console.log(`Server logged in port ${port}`);
});
