import prismaClient from "../../prisma";

class DetailUserService{

    //função assíncrona para receber o id do usuário no método execute e retornar os dados que possui no banco
    async execute(user_id: string){
        
        //variavel que verifica no banco o primeiro usuário encontrado com o id informado
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            //selecionando dados a retornar
            select:{
                id: true,
                name: true,
                email: true
            }
        })
        
        return user;
    }
}

export {DetailUserService}