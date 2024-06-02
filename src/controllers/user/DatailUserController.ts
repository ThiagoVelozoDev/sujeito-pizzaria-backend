import {Request, Response} from 'express';
import {DetailUserService} from '../../services/user/DetailUserService';

class DetailUserController{
    
    //função assíncrona para buscar detalhes do usuário logado
    async handle(req: Request, res: Response){

        //variável para pegar o id do user na requisição;
        const user_id = req.user_id;

        //instanciando o detailUserService;
        const detailUserService = new DetailUserService();

        //Executando método execute do serviço instanciado;
        const user = await detailUserService.execute(user_id);

        //retornando os dados do método execute;
        return res.json(user);
    }
}

export {DetailUserController}