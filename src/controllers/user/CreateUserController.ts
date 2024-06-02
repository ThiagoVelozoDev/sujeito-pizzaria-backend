import {Request, Response} from 'express';

//importação do serviço que irá comunicar com o banco de dados para fazer as manipulações
import { CreateUserService }from '../../services/user/CreateUserService';

class CreateUserController{

    //função para receber dados
    async handle(req: Request, res: Response){

        //recebendo do body da requisição o name, email e passoword
        const{name, email, password} = req.body;

        //instanciando um serviço de usuario
        const createUserService = new CreateUserService(); 

        //executa o método que tem pra fazer no serviço que é criar o usuário no banco
        const user = await createUserService.execute({
                name,
                email,
                password
            });

        
        //retorna o usuário
        return res.json(user)
    }
}

export {CreateUserController}