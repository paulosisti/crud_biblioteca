const {Client} = require('pg');
const connection = {
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'1234',
    database:'crud_biblioteca'
}

function inserir (nome, pais, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'INSERT INTO autores (nome_autor, pais_autor) VALUES ($1,$2) RETURNING *';
    const values = [nome, pais];
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
    const sql = "SELECT * FROM autores";
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
    cliente.query(`SELECT * FROM autores WHERE nome_autor LIKE '%${nome}%'`,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let clientes = res.rows;
            callback(undefined, clientes)
        }
        else {
            const error = "Autor(a) não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function atualizar(nome, pais, id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'UPDATE autores SET nome_autor = $1, pais_autor = $2 WHERE id_autor = $3 RETURNING *';
    const values = [nome, pais, id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "Autor(a) não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function deletar(id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'DELETE FROM autores WHERE id_autor = $1 RETURNING *';
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
            const error = "Autor(a) não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}


module.exports={listar,inserir,buscarPorNome, atualizar, deletar}