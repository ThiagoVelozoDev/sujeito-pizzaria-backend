import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){

        //indo no banco de dados e buscando todos os resultados
        const category = await prismaClient.category.findMany({
            //selecionando o que quer mostrar
            select:{
                id: true,
                name: true,
            }
        })

        //retornando o resultado das categorias encontradas no banco
        return category;
    }
}

export {ListCategoryService}