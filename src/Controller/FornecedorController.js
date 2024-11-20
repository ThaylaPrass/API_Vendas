import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const FornecedorController = {


  async listar(req, res) {
    try {
      const fornecedores = await prisma.fornecedor.findMany();
      return res.json(fornecedores);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async criar(req, res) {
    try {
      const { nome, cnpj, contato, endereco } = req.body;
      
      // Validação simples de CNPJ
      if (!cnpj || cnpj.replace(/\D/g, '').length !== 14) {
        return res.status(400).json({ error: 'CNPJ inválido' });
      }

      const fornecedor = await prisma.fornecedor.create({
        data: { nome, cnpj, contato, endereco }
      });
      return res.status(201).json(fornecedor);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'CNPJ já cadastrado' });
      }
      return res.status(400).json({ error: error.message });
    }
  },

  async alterar(req, res) {
    try {
      const { id } = req.params;
      const { contato, endereco } = req.body;
      const fornecedor = await prisma.fornecedor.update({
        where: { id: Number(id) },
        data: { nome, cnpj, contato, endereco }
      });
      return res.json(fornecedor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await prisma.fornecedor.delete({
        where: { id: Number(id) }
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
