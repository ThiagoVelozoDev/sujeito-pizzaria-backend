import { Request, Response } from 'express';
import {CreateOrderService} from '../../services/order/CreateOrderService';

class CreateOrderController{
    async handle(req: Request, res: Response){
        //faz a requisição e busca no corpo da página o valor do table e name
        const{table, name} = req.body;

        //cria uma order(pedido) 
        const createOrderService = new CreateOrderService();

        //executa as intruções que estão na class service
        const order = await createOrderService.execute({
            table,
            name,
        })

        return res.json(order);
    }
}

export {CreateOrderController}