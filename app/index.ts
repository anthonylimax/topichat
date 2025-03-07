import express from 'express'
import expressWS from 'express-ws'
import { webSocket } from './infra/adapters/websocket.adapter';

const PORT = 8000;

const app = express();
app.use(express.json())
webSocket(app)


app.listen(8000, ()=>{
    console.log('log')
})
