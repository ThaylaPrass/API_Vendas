-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transportador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valor_unitario" REAL NOT NULL,
    "quantidade_estoque" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PedidoCompra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_fornecedor" INTEGER NOT NULL,
    "id_transportador" INTEGER NOT NULL,
    "valor_do_pedido" REAL NOT NULL,
    "desconto_total" REAL NOT NULL DEFAULT 0,
    "valor_final" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "data_pedido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PedidoCompra_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoCompra_id_transportador_fkey" FOREIGN KEY ("id_transportador") REFERENCES "Transportador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PedidoProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_pedido_compra" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_unitario" REAL NOT NULL,
    "valor_total" REAL NOT NULL,
    CONSTRAINT "PedidoProduto_id_pedido_compra_fkey" FOREIGN KEY ("id_pedido_compra") REFERENCES "PedidoCompra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidoProduto_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Transportador_cnpj_key" ON "Transportador"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
