import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const TransportadorController = {

  async listar(req, res) {
    try {
      const transportadores = await prisma.transportador.findMany();
      return res.json(transportadores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async criar(req, res) {
    try {
      // Desestruturando todos os campos necessários
      const { nome, cnpj, contato, endereco } = req.body;
      
      // Criando o transportador no banco de dados
      const transportador = await prisma.transportador.create({
        data: { nome, cnpj, contato, endereco }
      });

      return res.status(201).json(transportador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async alterar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj, contato, endereco } = req.body;  
      const transportador = await prisma.transportador.update({
        where: { id: Number(id) },
        data: { nome, cnpj, contato, endereco }
      });

      return res.json(transportador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const transportadores = await prisma.transportador.findMany();
      return res.json(transportadores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const transportador = await prisma.transportador.findUnique({
        where: { id: Number(id) }
      });
      if (!transportador) {
        return res.status(404).json({ error: 'Transportador não encontrado' });
      }
      return res.json(transportador);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res){
    try{
      const {id} = req.params;
      await prisma.transportador.delete({
        where: {id: Number(id)}
      });
      return res.status(204).send();
    
    }catch(error){
      console.log(error)
      return res.status(400).json({ error: error.message });

    }
  }
};
