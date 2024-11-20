


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const ProdutoController = {

    async getAll(req, res) {
        try {
          const produtos = await prisma.produto.findMany();
          return res.json(produtos);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      },
    async criar(req, res) {
        try {
          const { nome, descricao, valor_unitario, quantidade_estoque } = req.body;
          
          const produto = await prisma.produto.create({
            data: { 
              nome, 
              descricao, 
              valor_unitario, 
              quantidade_estoque 
            }
          });
          return res.status(201).json(produto);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      },
  
    async alterar(req, res) {
      try {
        const { id } = req.params;
        const { nome, 
          descricao, 
          valor_unitario, 
          quantidade_estoque  } = req.body;
        const produto = await prisma.produto.update({
          where: { id: Number(id) },
          data: { nome, 
            descricao, 
            valor_unitario, 
            quantidade_estoque  }
        });
        return res.json(produto);
      } catch (error) {
        console.log("Erro ao alterar produto:", error);
        return res.status(400).json({ error: error.message });
      }
    },
  
    async diminuirEstoque(req, res) {
      try {
        const { id } = req.params;
        const { quantidade } = req.body;
        const produto = await prisma.produto.update({
          where: { id: Number(id) },
          data: {
            quantidade_estoque: {
              decrement: quantidade
            }
          }
        });
        return res.json(produto);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    },
  
    async aumentarEstoque(req, res) {
      try {
        const { id } = req.params;
        const { quantidade } = req.body;
        const produto = await prisma.produto.update({
          where: { id: Number(id) },
          data: {
            quantidade_estoque: {
              increment: quantidade
            }
          }
        });
        return res.json(produto);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    },


    async delete(req, res){
      try{
        const {id} = req.params;
        await prisma.produto.delete({
          where: {id: Number(id)}
        });
        return res.status(204).send();
      
      }catch(error){
        console.log(error)
        return res.status(400).json({ error: error.message });
  
      }
    }
  };
  