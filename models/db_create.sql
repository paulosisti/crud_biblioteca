CREATE TABLE livros
(
	id_livro SERIAL NOT NULL PRIMARY KEY,
	isbn VARCHAR(20) NOT NULL,
	nome_livro VARCHAR(100) NOT NULL,
	id_autor_livro INT NOT NULL,
	CONSTRAINT fk_autor_livro FOREIGN KEY (id_autor_livro) REFERENCES autores (id_autor),
	ano_livro SMALLINT NOT NULL,
	editora_livro VARCHAR(50) NOT NULL,
	status_livro VARCHAR(20) NOT NULL
);

CREATE TABLE funcionarios
(
	id_funcionario SERIAL NOT NULL PRIMARY KEY,
	nome_funcionario VARCHAR(100) NOT NULL,
	usuario VARCHAR(30) NOT NULL,
	senha VARCHAR(8) NOT NULL
);

CREATE TABLE clientes
(
	id_cliente SERIAL NOT NULL PRIMARY KEY,
	nome_cliente VARCHAR(100) NOT NULL,
	telefone_cliente VARCHAR(20) NULL,
	matricula VARCHAR(10) NOT NULL
);

CREATE TABLE emprestimo
(	
	id_emprestimo SERIAL NOT NULL PRIMARY KEY,
	cliente_emprestimo BIGINT NOT NULL,
	livro_emprestimo BIGINT NOT NULL,
	data_emprestimo DATE NOT NULL,
	data_devolucao DATE NOT NULL,
	CONSTRAINT fk_id_livro FOREIGN KEY (livro_emprestimo) REFERENCES livros (id_livro),
	CONSTRAINT fk_id_cliente FOREIGN KEY (cliente_emprestimo) REFERENCES clientes (id_cliente)
);

CREATE TABLE autores
(
	id_autor SERIAL NOT NULL PRIMARY KEY,
	nome_autor VARCHAR(100) NOT NULL,
	pais_autor VARCHAR(20) NULL
);

CREATE OR REPLACE VIEW relatorios AS
SELECT id_cliente, nome_cliente, telefone_cliente, matricula, nome_livro, status_livro, data_emprestimo, data_devolucao FROM clientes, emprestimo, livros WHERE clientes.id_cliente = emprestimo.cliente_emprestimo AND livros.id_livro = emprestimo.livro_emprestimo;


INSERT INTO autores (NOME_AUTOR,PAIS_AUTOR) VALUES
	('Raquel','Brasil'),
	('Paulo','Argentina'),
	('Clarice','França'),
	('Patrícia','Peru'),
	('Wagner','Equador'),
	('Michel','Itália'),
	('Mauricio','Estados Unidos'),
	('Eduardo','Espanha'),
	('Luis','Portugal'),
	('Pedro','Noruega'),
	('Marcelo','Chile'),
	('Ronaldo','Suíça'),
	('Arthur','Suécia'),
	('Luka','Croácia');

INSERT INTO clientes (NOME_CLIENTE,TELEFONE_CLIENTE,MATRICULA) VALUES
	('Ricardo','(51)99999-1111',123),
	('Justin','(51)99999-1111',124),
	('Jhon','(51)99999-1111',125),
	('Fernando','(51)99999-1111',126),
	('Mauro','(51)99999-1111',127),
	('Elias','(51)99999-1111',128),
	('Renato','(51)99999-1111',129),
	('Paulo','(51)99999-1111',130),
	('Luiz','(51)99999-1111',131),
	('Gabriel','(51)99999-1111',132),
	('Brener','(51)99999-1111',133),
	('Ana','(51)99999-1111',134),
	('Cristiane','(51)99999-1111',135),
	('Roberto','(51)99999-1111',136);

INSERT INTO livros (ISBN,NOME_LIVRO,ID_AUTOR_LIVRO,ANO_LIVRO,EDITORA_LIVRO,STATUS_LIVRO) VALUES
	(11111111, 'Programação I', 1, 1999, 'Senac', 'Disponível'),
	(22222222, 'Programação II', 2, 1999, 'Senac', 'Disponível'),
	(33333333, 'Programação III', 3, 1999, 'Senac', 'Disponível'),
	(44444444, 'Construindo API I', 4, 1999, 'Senac', 'Disponível'),
	(55555555, 'Construindo API II', 5, 1999, 'Senac', 'Disponível'),
	(66666666, 'Construindo API III', 6, 1999, 'Senac', 'Disponível'),
	(77777777, 'Algoritmos I', 7, 1999, 'Senac', 'Disponível'),
	(88888888, 'Algoritmos II', 8, 1999, 'Senac', 'Disponível'),
	(99999999, 'Algoritmos III', 9, 1999, 'Senac', 'Disponível'),
	(10101010, 'Bando de Dados I', 10, 1999, 'Senac', 'Disponível'),
	(12121212, 'Bando de Dados II', 11, 1999, 'Senac', 'Disponível'),
	(13131313, 'Bando de Dados III', 12, 1999, 'Senac', 'Disponível'),
	(14141414, 'Testes Automatizados', 13, 1999, 'Senac', 'Disponível'),
	(15151515, 'Sistemas para Internet', 14, 1999, 'Senac', 'Disponível');

INSERT INTO funcionarios (NOME_FUNCIONARIO,USUARIO,SENHA) VALUES
	('José','jose',123),
	('Helena','helena',456);
