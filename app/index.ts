import express from 'express'
import expressWS from 'express-ws'
import { webSocket } from './infra/adapters/websocket.adapter';
import { RestAdapterExpress } from './infra/adapters/rest.adapter';

const PORT = 8000;
const rest = new RestAdapterExpress();
rest.listen(PORT);
