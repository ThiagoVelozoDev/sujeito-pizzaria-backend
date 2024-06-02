import {NextFunction, Request, Response} from 'express';
import {verify} from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
   //Receber o token
   const authToken = req.headers.authorization;

   //verificação se está recebendo o token se não retorna erro 401
   if(!authToken){
    return res.status(401).end();
   }

   //pegando apenas o token sem o Bearer, para isso recebe como array e nomeia como token o segundo item
   const [, token ] = authToken.split(" ")

   //validar esse token
   try{
    const {sub}=verify(
        token,
        process.env.JWT_SECRET
    )as Payload;

    //recuperar o id do token e colocar dentro de uma variavel user)id dentro do req.
    req.user_id = sub;

    // se tudo certo prossegue a rota
    return next();

   }catch(err){
    return res.status(401).end();
   }
}