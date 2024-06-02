import { Request, Response } from 'express';
import {RemoveItemOrderService} from '../../services/order/RemoveItemOrderService';

class RemoveItemOrderController{
    async handle(req: Request, res: Response){
     
        const id  = req.query.id as string;

        const removeItemOrderService = new RemoveItemOrderService();

        const item_order = await removeItemOrderService.execute({
            id
        });

        return res.json(item_order);
    
    }
}

export {RemoveItemOrderController}