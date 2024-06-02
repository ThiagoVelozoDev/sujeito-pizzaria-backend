import prismaClient from "../../prisma";

interface ItemRequest{
    id: string;
}

class RemoveItemOrderService{
    async execute({id}: ItemRequest){

        const item = await prismaClient.item.delete({
            where:{
                id: id
            }
        })

        return item;
    }
}

export {RemoveItemOrderService}