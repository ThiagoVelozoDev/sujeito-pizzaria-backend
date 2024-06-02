import prismaClient from "../../prisma";
import { compare } from "bcryptjs"; // comparar senhas: criptografada e sem criptografia;
import { sign } from 'jsonwebtoken';

//tipagem dos dados para o tipo que quer receber
interface AuthRequest {
    email: string;
    password: string;
}


//Autenticação do usuário
class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        //verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        //se o email for diferente gera um erro informando que está incorreto.
        //erro genérico para o usuário não tentar burlar.
        if (!user) {
            throw new Error("User/passoword incorrect")
        }

        //preciso verificar se a senha que ele mandou está correta.
        //primeiro parâmetro senha que o usuário enviou no segundo senha do banco.
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("User/passoword incorrect")
        }


        //gerar um token JWT e devolver os dados do usuário como id, name e email.

        // o Token serve para identificar se o usuário está logado e caso esteja permite que consiga acessar
        //rotas privadas que só podem ser acessadas se o usuário estiver logado.

        //se deu tudo certo nas validações de login  vamos gerar o token para o usuário.
        const token = sign(
            {
                name: user.name, //retornando o nome do banco
                email: user.email // retornando o email do banco
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'//quando vai expirar o token
            }
        )
        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         }
    }
}

export { AuthUserService };