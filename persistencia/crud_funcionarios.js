const {Client} = require('pg');
const connection = {
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'1234',
    database:'crud_biblioteca'
}

function inserir (nome, usuario, senha, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'INSERT INTO funcionarios (nome_funcionario, usuario, senha) VALUES ($1,$2,$3) RETURNING *';
    const values = [nome, usuario, senha];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } else {
            callback(undefined, res.rows[0])
        }
        cliente.end();        
    })
}

function listar(callback) {
    const cliente = new Client(connection);
    cliente.connect();
    const sql = "SELECT * FROM funcionarios";
    cliente.query(sql, (err, res) => {
        if(err) {
            callback(err.message, undefined);
        } 
        else {
            let funcionarios = res.rows;
            callback(undefined, funcionarios);
        }
        cliente.end();        
    })
}

function buscarPorNome(nome, callback){
    const cliente = new Client(connection);
    cliente.connect();
    // const sql = "SELECT * FROM livros WHERE nome_livro = $1";
    // const values = [nome];
    cliente.query(`SELECT * FROM funcionarios WHERE nome_funcionario LIKE '%${nome}%'`,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let funcionarios = res.rows;
            callback(undefined, funcionarios)
        }
        else {
            const error = "Funcionário não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function atualizar(nome, usuario, senha, id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'UPDATE funcionarios SET nome_funcionario = $1, usuario = $2, senha = $3 WHERE id_funcionario = $4 RETURNING *';
    const values = [nome, usuario, senha, id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let funcionarios = res.rows[0];
            callback(undefined, funcionarios)
        }
        else {
            const error = "Funcionário não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function deletar(id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'DELETE FROM funcionarios WHERE id_funcionario = $1 RETURNING *';
    const values = [id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let funcionarios = res.rows[0];
            callback(undefined, funcionarios)
        }
        else {
            const error = "Funcionário não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function validaFuncionario(id, usuario, senha, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = "SELECT usuario, senha FROM funcionarios WHERE id_funcionario = $1"
    const values = [id];
    cliente.query(sql, values,(err, res) => {
        if(err){
            callback(err.name,undefined);
        } else if(Object.values(res.rows[0]).includes(usuario && senha)){
            callback(undefined, "Usuário Validado!");
        } else {
            callback(`[ERRO] Verifique os dados digitados! 
Usuário:${usuario} - Senha:${senha}`, undefined);
        }
        cliente.end();        
    })
}


module.exports={listar,inserir,buscarPorNome, atualizar, deletar, validaFuncionario}
