import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const PedidoProdutoController = {

    async listar(req, res) {
        try {
          const pedidosProdutos = await prisma.pedidoProduto.findMany();
          return res.json(pedidosProdutos);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      },
  async criar(req, res) {
    try {
      const { 
        id_pedido_compra,
        id_produto,
        quantidade,         
        valor_unitario,
        valor_total
      } = req.body;

      
      if (!quantidade) {
        return res.status(400).json({ error: 'Quantidade é obrigatória' });
      }

      // Criação do pedido-produto
      const pedidoProduto = await prisma.pedidoProduto.create({
        data: {
          id_pedido_compra,
          id_produto,
          quantidade,         
          valor_unitario,
          valor_total
        },
        include: {
          pedido: true,
          produto: true
        }
      });

      return res.status(201).json(pedidoProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  
  async alterar(req, res) {
    try {
      const { id } = req.params;
      const { valor_unitario, valor_total } = req.body;
      
      const pedidoProduto = await prisma.pedidoProduto.update({
        where: { id: Number(id) },
        data: { 
          valor_unitario,
          valor_total
        }
      });
      return res.json(pedidoProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  
  async excluir(req, res) {
    try {
      const { id } = req.params;
      await prisma.pedidoProduto.delete({
        where: { id: Number(id) }
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  
  async consultar(req, res) {
    try {
      const { id } = req.params;
      const pedidoProduto = await prisma.pedidoProduto.findUnique({
        where: { id: Number(id) },
        include: {
          pedido: true,
          produto: true
        }
      });
      if (!pedidoProduto) {
        return res.status(404).json({ error: 'Produto do pedido não encontrado' });
      }
      return res.json(pedidoProduto);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },


  async deletar(req, res){
    try{
      const {id} = req.params;
      await prisma.pedidoProduto.delete({
        where: {id: Number(id)}
      });
      return res.status(204).send();
    
    }catch(error){
      console.log(error)
      return res.status(400).json({ error: error.message });

    }
  }
};
