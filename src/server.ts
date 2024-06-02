import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import {router} from './routes';
import cors from 'cors';
import path from 'path';


//utilizando express para ser o servidor da aplicação
const app = express();

//tipo de dado utilizado para request e response na aplicação
app.use(express.json());

//habilitanto para qualquer ip, qualquer api fazer requisição
app.use(cors())


//habilitando para usar as rotas que foram importadas
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..','tmp'))
)

//tratamento de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof Error){
        //Se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, ()=>console.log('Servidor online!'));