const {Client} = require('pg');
const connection = {
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'1234',
    database:'crud_biblioteca'
}

function inserir (nome, telefone, matricula, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'INSERT INTO clientes (nome_cliente, telefone_cliente, matricula) VALUES ($1,$2,$3) RETURNING *';
    const values = [nome, telefone, matricula];
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
    const sql = "SELECT * FROM clientes";
    cliente.query(sql, (err, res) => {
        if(err) {
            callback(err.message, undefined);
        } 
        else {
            let clientes = res.rows;
            callback(undefined, clientes);
        }
        cliente.end();        
    })
}

function buscarPorNome(nome, callback){
    const cliente = new Client(connection);
    cliente.connect();
    // const sql = "SELECT * FROM livros WHERE nome_livro = $1";
    // const values = [nome];
    cliente.query(`SELECT * FROM clientes WHERE nome_cliente LIKE '%${nome}%'`,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let clientes = res.rows;
            callback(undefined, clientes)
        }
        else {
            const error = "Cliente não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function atualizar(nome, telefone, matricula, id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'UPDATE clientes SET nome_cliente = $1, telefone_cliente = $2, matricula = $3 WHERE id_cliente = $4 RETURNING *';
    const values = [nome, telefone, matricula, id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "Cliente não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function deletar(id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'DELETE FROM clientes WHERE id_cliente = $1 RETURNING *';
    const values = [id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "cliente não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}


module.exports={listar,inserir,buscarPorNome, atualizar, deletar}
