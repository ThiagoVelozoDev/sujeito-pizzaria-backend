
import crypto from 'crypto'; //para não repetir imagens
import multer from 'multer'; //multer
import {extname, resolve} from 'path'; //pegar os caminhos das imagens

//configuração multer
export default{
    //esperando receber um diretório do tipo string
    upload(folder: string){
        return{
            //local que vai salvar
            storage: multer.diskStorage({
                //caminho da pasta que no caso é o tmp
                destination: resolve(__dirname, '..','..',folder),

                filename: (request, file, callback)=>{
                    //gerando nome único
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }

    }
}