import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const PedidoCompraController = {

    async listar(req, res) {
        try {
          const pedidos = await prisma.pedidoCompra.findMany();
          return res.json(pedidos);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      },
  async criar(req, res) {
    try {
      const { 
        id_fornecedor, 
        id_transportador, 
        desconto_total = 0,
        status,
        produtos,
        Clienteid
      } = req.body;

      // Calcula o valor total do pedido baseado nos produtos
      const valor_do_pedido = produtos.reduce((total, produto) => {
        return total + (produto.valor_unitario * produto.quantidade);
      }, 0);

      // Calcula o valor final aplicando o desconto
      const valor_final = valor_do_pedido - desconto_total;

      const pedido = await prisma.pedidoCompra.create({
        data: {
          id_fornecedor,
          id_transportador,
          valor_do_pedido,
          desconto_total,
          valor_final,
          status,
          produtos: {
            create: produtos.map(produto => ({
              id_produto: produto.id_produto,
              quantidade: produto.quantidade,
              valor_unitario: produto.valor_unitario,
              valor_total: produto.valor_unitario * produto.quantidade
            }))
          },
          Clienteid
        },
        include: {
          fornecedor: true,
          transportador: true,
          produtos: {
            include: {
              produto: true
            }
          }
        }
      });

      return res.status(201).json(pedido);
    } catch (error) {
        console.log(error);
      return res.status(400).json({ error: error.message });
    }
  },

  async alterarStatus(req, res) {
    try {
      const { id } = req.params; // Recebe o ID do pedido da URL
      const { status } = req.body; // Recebe o novo status do pedido do corpo da requisição

      // Atualiza o status do pedido de compra
      const pedido = await prisma.pedidoCompra.update({
        where: { id: Number(id) }, // Filtra pelo ID do pedido
        data: { status } // Atualiza o status
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido de compra não encontrado' });
      }

      return res.json(pedido);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async consultar(req, res) {
    try {
      const { id } = req.params; // Recebe o ID do pedido da URL
  
      // Encontra o pedido de compra pelo ID
      const pedido = await prisma.pedidoCompra.findUnique({
        where: { id: Number(id) }, // Filtra pelo ID do pedido
        include: {
          fornecedor: true,
          transportador: true,
          produtos: {
            include: {
              produto: true // Inclui os detalhes do produto
            }
          }
        }
      });
  
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido de compra não encontrado' });
      }
  
      return res.json(pedido);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res){
    try{
      const {id} = req.params;
      await prisma.pedidoCompra.delete({
        where: {id: Number(id)}
      });
      return res.status(204).send();
    
    }catch(error){
      console.log(error)
      return res.status(400).json({ error: error.message });

    }
  }



  
};