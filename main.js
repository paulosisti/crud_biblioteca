const cadastroLivros = require('./persistencia/crud_livros.js')
const cadastroClientes = require('./persistencia/crud_clientes.js')
const cadastroFuncionarios = require('./persistencia/crud_funcionarios.js')
const cadastroAutores = require('./persistencia/crud_autores.js')
const cadastroEmprestimo = require('./persistencia/crud_emprestimo.js')

// ------------ TESTE TERMINAL CRUD LIVROS --------------
// cadastroLivros.listar(function(err, res){
//     console.log("Relatório:");
//     if(err) {
//       console.log(err);
//     } else {
//       console.table(res);
//     }
// });

// cadastroLivros.buscarPorNome("Pro", function (err, res){
//   console.log("Buscando Livro... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Livro encontrado");
//     console.log(res);
//   }
// });

// cadastroLivros.buscarPorStatus('Indisponível',function (err, res){
//   console.log("Buscando Livros... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Livros encontrados");
//     console.table(res);
//   }
// });

// cadastroLivros.inserir(33333333, "Dom Quixote", 7, 1605, "Far Away", "Disponível", function (err, res){
//   console.log("Adicionando livro...");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroLivros.atualizar(11111111, "Programação I", 1, 1990, "Senac", "Indisponível",1,function (err, res){
//   console.log("Atualizando livro... ");
//   if (err) {
//     console.log("Erro: "+err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroLivros.deletar(15, function (err, res){
//   console.log("Livro Deletado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });
// ------------ FIM TESTE TERMINAL CRUD LIVROS --------------

// ------------ TESTE TERMINAL CRUD CLIENTES --------------
// cadastroClientes.listar(function(err, res){
//     console.log("Relatório:");
//     if(err) {
//       console.log(err);
//     } else {
//       console.table(res);
//     }
// });

// cadastroClientes.buscarPorNome("R", function (err, res){
//   console.log("Buscando Cliente... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Cliente encontrado");
//     console.table(res);
//   }
// });

// cadastroClientes.inserir("Raquel", "(51)99999-8888", "456", function (err, res){
//   console.log("Cliente adicionado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroClientes.atualizar("Rochele", "(51)99999-8888", "456",15,function (err, res){
//   console.log("Cliente atualizado: ");
//   if (err) {
//     console.log("Erro: "+err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroClientes.deletar(15, function (err, res){
//   console.log("Cliente Deletado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });
// ------------ FIM TESTE TERMINAL CRUD CLIENTES --------------


// ------------ TESTE TERMINAL CRUD FUNCIONÁRIOS --------------
// cadastroFuncionarios.listar(function(err, res){
//     console.log("Relatório:");
//     if(err) {
//       console.log(err);
//     } else {
//       console.table(res);
//     }
// });

// cadastroFuncionarios.buscarPorNome("Hel", function (err, res){
//   console.log("Buscando Funcionário... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Funcionário encontrado");
//     console.table(res);
//   }
// });

// cadastroFuncionarios.inserir("Rafael", "rafael.gastao","1234", function (err, res){
//   console.log("Funcionário adicionado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroFuncionarios.atualizar("Rafaela","rafael.gastao","1234",3,function (err, res){
//   console.log("Funcionário atualizado: ");
//   if (err) {
//     console.log("Erro: "+err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroFuncionarios.deletar(3, function (err, res){
//   console.log("Funcionário Deletado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroFuncionarios.validaFuncionario(1, "José", "123", function (err,res){
//   console.log("Validando Acesso...");
//   if (err) {
//     console.log("Erro" + err);
//   } else {
//     console.log(res);
//   }
// })
// ------------ FIM TESTE TERMINAL CRUD FUNCIONÁRIOS --------------

// ------------ TESTE TERMINAL CRUD AUTORES --------------
// cadastroAutores.listar(function(err, res){
//     console.log("Relatório:");
//     if(err) {
//       console.log(err);
//     } else {
//       console.table(res);
//     }
// });

// cadastroAutores.buscarPorNome("R", function (err, res){
//   console.log("Buscando Autor(a)... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Autor(a) encontrado");
//     console.table(res);
//   }
// });

// cadastroAutores.inserir("Paula", "Bélgica", function (err, res){
//   console.log("Autor adicionado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroAutores.atualizar("Paola", "Brasil",15,function (err, res){
//   console.log("Autor(a) atualizado: ");
//   if (err) {
//     console.log("Erro: "+err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroAutores.deletar(15, function (err, res){
//   console.log("Autor Deletado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// });
// ------------ FIM TESTE TERMINAL CRUD AUTORES --------------

// ------------ TESTE TERMINAL CRUD EMPRÉSTIMOS --------------
// cadastroEmprestimo.inserir(9, 1,function (err, res){
//   console.log("Adicionando Empréstimo... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//   console.log(res);
//   }
// })

// cadastroEmprestimo.listar(function(err, res){
//     console.log("Relatório:");
//     if(err) {
//       console.log(err);
//     } else {
//       console.table(res);
//     }
// });

// cadastroEmprestimo.buscarPorId(1, function (err, res){
//   console.log("Buscando livro... ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log("Livro encontrado");
//     console.log(res);
//   }
// });

// cadastroEmprestimo.atualizar(3, 3, '2022-08-30', '2022-09-02',3,function (err, res){
//   console.log("Registro atualizado: ");
//   if (err) {
//     console.log("Erro: "+err);
//   } else {
//     console.log(res);
//   }
// });

// cadastroEmprestimo.deletar(3, function (err, res){
//   console.log("Registro Deletado: ");
//   if (err) {
//     console.log("Erro: " + err);
//   } else {
//     console.log(res);
//   }
// })
// ------------ FIM TESTE TERMINAL CRUD EMPRESTIMOS --------------