CREATE SCHEMA "public";
CREATE TABLE "empresas" (
	"id" serial PRIMARY KEY,
	"nome" varchar(120) NOT NULL,
	"cnpj" varchar(20),
	"criado_em" timestamp DEFAULT CURRENT_TIMESTAMP,
	"Password" varchar(14) NOT NULL,
	"email" varchar(40)
);
CREATE TABLE "justificativas" (
	"id" serial PRIMARY KEY,
	"usuario_id" integer NOT NULL,
	"registro_ponto_id" integer,
	"motivo" text NOT NULL,
	"status" varchar(20) DEFAULT 'pendente' NOT NULL,
	"criado_em" timestamp DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "registros_ponto" (
	"id" serial PRIMARY KEY,
	"usuario_id" integer NOT NULL,
	"tipo" varchar(30) NOT NULL,
	"data_hora" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"observacao" text,
	"criado_em" timestamp DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY,
	"empresa_id" integer NOT NULL,
	"nome" varchar(120) NOT NULL,
	"email" varchar(120) CONSTRAINT "usuarios_email_key" UNIQUE,
	"senha" varchar(255) NOT NULL,
	"cargo" varchar(80),
	"perfil" varchar(20) DEFAULT 'funcionario' NOT NULL,
	"ativo" boolean DEFAULT true,
	"criado_em" timestamp DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "empresas_pkey" ON "empresas" ("id");
CREATE UNIQUE INDEX "justificativas_pkey" ON "justificativas" ("id");
CREATE UNIQUE INDEX "registros_ponto_pkey" ON "registros_ponto" ("id");
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios" ("email");
CREATE UNIQUE INDEX "usuarios_pkey" ON "usuarios" ("id");
ALTER TABLE "justificativas" ADD CONSTRAINT "fk_justificativa_registro" FOREIGN KEY ("registro_ponto_id") REFERENCES "registros_ponto"("id") ON DELETE SET NULL;
ALTER TABLE "justificativas" ADD CONSTRAINT "fk_justificativa_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;
ALTER TABLE "registros_ponto" ADD CONSTRAINT "fk_registro_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;
ALTER TABLE "usuarios" ADD CONSTRAINT "fk_usuario_empresa" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE;