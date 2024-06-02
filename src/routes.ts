import {Router} from 'express';

import multer from 'multer';

//importação do controller
import { CreateUserController } from './controllers/user/CreateUserController';

//importação do AuthController
import { AuthUserController } from './controllers/user/AuthUserController';

//importação do DetailUserController
import { DetailUserController } from './controllers/user/DatailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';

import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer';

import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';

import { RemoveOrderController } from './controllers/order/RemoveOrderService';

import { AddItemController } from './controllers/order/AddItemController';

import { RemoveItemOrderController } from './controllers/order/RemoveItemOrderController';

import { SendOrderController} from './controllers/order/SendOrderController';

import { ListOrderController } from './controllers/order/ListeOrderController';

import { DetailOrderController } from './controllers/order/DetailOrderController';

import { FinishOrderController } from './controllers/order/FinishOrderController';



const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))



//----ROTAS USER------

//cadastrar usuario - usando o método post e instanciando o método para criar usuário do Controller
router.post('/users',new CreateUserController().handle);

//realizar login - usando o método post e instanciando o método para realizar a comunicação do service e fazer validações
router.post('/session', new AuthUserController().handle);

//buscar informações do usuário logado
router.get('/me', isAuthenticated, new DetailUserController().handle);



//----ROTAS CATEGORY------

//criar categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

//listar categorias
router.get('/category', isAuthenticated, new ListCategoryController().handle)

export {router};



//----ROTAS PRODUCT--------


//criar produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);


//listar produtos por categoria
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle );


//----ROTAS ORDER--------

router.post('/order',isAuthenticated, new CreateOrderController().handle);

router.delete('/order',isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add',isAuthenticated, new AddItemController().handle);

router.delete('/order/item/delete',isAuthenticated, new RemoveItemOrderController().handle);

router.put('/order/send',isAuthenticated, new SendOrderController().handle);

router.get('/orders',isAuthenticated, new ListOrderController().handle);

router.get('/order/detail',isAuthenticated, new DetailOrderController().handle);

router.put('/order/finish',isAuthenticated, new FinishOrderController().handle);