import { Router } from "express";

const router = Router();

router.get('api/v1/', (req, res)=>{
    res.send('hola');
})