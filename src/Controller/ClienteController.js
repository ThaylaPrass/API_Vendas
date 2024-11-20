import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const ClienteController = {
  async criar(req, res) {
    try {
      const { nome, cpf, contato, endereco } = req.body;
      
      // Validação simples de CPF
      if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
        return res.status(400).json({ error: 'CPF inválido' });
      }

      const cliente = await prisma.cliente.create({
        data: { nome, cpf, contato, endereco }
      });
      return res.status(201).json(cliente);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async alterar(req, res) {
    try {
      const { id } = req.params;
      const { contato, endereco } = req.body;
      const cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data: { nome, cpf, contato, endereco }
      });
      return res.json(cliente);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const clientes = await prisma.cliente.findMany();
      return res.json(clientes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
      });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      return res.json(cliente);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },


  async delete(req, res){
    try{
      const {id} = req.params;
      await prisma.cliente.delete({
        where: {id: Number(id)}
      });
      return res.status(204).send();
    
    }catch(error){
      console.log(error)
      return res.status(400).send()

    }
  }


};