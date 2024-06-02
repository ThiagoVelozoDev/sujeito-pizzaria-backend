import { Request, Response } from "express";
import { AddIntemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res: Response) {
        const { amount, order_id, product_id } = req.body;

        const addItemController = new AddIntemService();

        const order = await addItemController.execute({
            amount,
            order_id,
            product_id
        });

        return res.json(order);
    }
}

export { AddItemController }

