import {Request, Response} from 'express';

//importando o serviço de autentincação;
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController{

    //função para receber e devolver informações do usuário
    async handle(req: Request, res: Response){
        const {email, password} = req.body;

        //instanciando o serviço de autenticação de usuário
        const authUserService = new AuthUserService();

        //executando o método authUserService
        const auth = await authUserService.execute({
            email, password
        })

        return res.json(auth);
    }
}

export {AuthUserController}