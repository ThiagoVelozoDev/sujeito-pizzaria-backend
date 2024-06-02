import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

//tipando dos dados que queremos receber
interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    //método assíncrono recebendo informações tipadas conforme UserRequest
    async execute({name, email, password}: UserRequest){
        
        //verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorreto")
        }

        //verificar se esse email já está cadastrado na plataforma com o prisma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        //validação para verificar se o usuário já existe
        if(userAlreadyExists){
            throw new Error("Usuários já existe")
        }


        //criptografia de senha com padrão 8
        //nessa variável estou usando a senha que quero criptografar e o salto que é 8
        //e o método hash de criptografar do bcryptjs
        const passwordHash = await hash(password, 8)

        //inserindo usuário no banco com o prisma
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            
            //selecionando dados para retornar na resposta da requisitação.
            //importante nunca retornar a senha e a senha deve ser criptografada.
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return user;
    }
}

export {CreateUserService}