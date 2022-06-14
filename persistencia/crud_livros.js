const {Client} = require('pg');
const connection = {
    host:'localhost',
    port:'5432',
    user:'postgres',
    password:'1234',
    database:'crud_biblioteca'
}

function inserir (isbn, nome, autor, ano, editora, status, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'INSERT INTO livros (isbn, nome_livro, id_autor_livro, ano_livro, editora_livro, status_livro) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
    const values = [isbn, nome, autor, ano, editora, status];
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
    const sql = "SELECT * FROM livros";
    cliente.query(sql, (err, res) => {
        if(err) {
            callback(err.message, undefined);
        } 
        else {
            let livros = res.rows;
            callback(undefined, livros);
        }
        cliente.end();        
    })
}

function buscarPorNome(nome, callback){
    const cliente = new Client(connection);
    cliente.connect();
    // const sql = "SELECT * FROM livros WHERE nome_livro = $1";
    // const values = [nome];
    cliente.query(`SELECT * FROM livros WHERE nome_livro LIKE '%${nome}%'`,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let produto = res.rows;
            callback(undefined, produto)
        }
        else {
            const error = "Livro não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function buscarPorStatus(string,callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = "SELECT * FROM livros WHERE status_livro = $1";
    const values = [string];
    cliente.query(sql,values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let produto = res.rows;
            callback(undefined, produto)
        }
        cliente.end();        
    })
}

function atualizar(isbn, nome, autor, ano, editora, status, id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'UPDATE livros SET isbn = $1, nome_livro = $2, id_autor_livro = $3, ano_livro = $4, editora_livro = $5, status_livro = $6 WHERE id_livro = $7 RETURNING *';
    const values = [isbn, nome, autor, ano, editora, status, id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let produto = res.rows[0];
            callback(undefined, produto)
        }
        else {
            const error = "Livro não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}

function deletar(id, callback){
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'DELETE FROM livros WHERE id_livro = $1 RETURNING *';
    const values = [id];
    cliente.query(sql, values,(err, res) => {
        if(err) {
            callback(err.message,undefined);
        } 
        else if(res.rows && res.rows.length > 0){
            let livro = res.rows[0];
            callback(undefined, livro)
        }
        else {
            const error = "Livro não encontrado"
            callback(error, undefined)
        }
        cliente.end();        
    })
}


module.exports={listar,inserir,buscarPorNome, buscarPorStatus, atualizar, deletar}
