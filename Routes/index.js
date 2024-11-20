import { Router } from 'express';
import { ClienteController } from '../src/Controller/ClienteController.js';
import { FornecedorController } from '../src/Controller/FornecedorController.js';
import { PedidoCompraController } from '../src/Controller/PedidoCompraController.js';
import { PedidoProdutoController } from '../src/Controller/PedidoProdutoController.js';
import { ProdutoController } from '../src/Controller/ProdutoController.js';
import { TransportadorController } from '../src/Controller/TransportadorController.js';

const router = Router();

// Rotas de Fornecedor
router.post('/fornecedores', FornecedorController.criar);
router.put('/fornecedores/:id', FornecedorController.alterar);
router.delete('/fornecedores/:id', FornecedorController.deletar);
router.get('/fornecedores', FornecedorController.listar);

// Rotas de Produto
router.post('/produtos', ProdutoController.criar);
router.get('/produtos', ProdutoController.getAll);
router.put('/produtos/:id', ProdutoController.alterar);
router.put('/produtos/:id/diminuir', ProdutoController.diminuirEstoque);
router.put('/produtos/:id/aumentar', ProdutoController.aumentarEstoque);
router.delete('/produtos/:id', ProdutoController.delete)

// Rotas de Pedido de Compra
router.post('/pedidos', PedidoCompraController.criar);
router.put('/pedidos/:id/status', PedidoCompraController.alterarStatus);
router.get('/pedidos/:id', PedidoCompraController.consultar);
router.get('/pedidos', PedidoCompraController.listar);
router.delete('/pedidos/:id', PedidoCompraController.deletar)

// Rotas de Cliente
router.post('/clientes', ClienteController.criar);
router.put('/clientes/:id', ClienteController.alterar);
router.get('/clientes', ClienteController.listar);
router.get('/clientes/:id', ClienteController.buscarPorId);
router.get('/clientes', ClienteController.listar);
router.delete('/clientes/:id', ClienteController.delete)

// Rotas de Transportador
router.post('/transportadores', TransportadorController.criar);
router.put('/transportadores/:id', TransportadorController.alterar);
router.get('/transportadores', TransportadorController.listar);
router.get('/transportadores/:id', TransportadorController.buscarPorId);
router.get('/transportadores', TransportadorController.listar);
router.delete('/transportadores/:id', TransportadorController.delete);

// Rotas de PedidoProduto
router.post('/pedido-produtos', PedidoProdutoController.criar);
router.put('/pedido-produtos/:id', PedidoProdutoController.alterar);
router.delete('/pedido-produtos/:id', PedidoProdutoController.excluir);
router.get('/pedido-produtos/:id', PedidoProdutoController.consultar);
router.get('/pedido-produtos', PedidoProdutoController.listar);
router.delete('/pedido-produtos/:id', PedidoProdutoController.deletar);

export default router;
