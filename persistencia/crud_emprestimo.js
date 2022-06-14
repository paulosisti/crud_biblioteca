const { Client } = require('pg');
const connection = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '1234',
    database: 'crud_biblioteca'
}

function inserir(idCliente, idLivro, callback) {
    validarEmprestimo(idCliente).then((resp) => {
        if (resp.ok == true) {
            const cliente = new Client(connection);
            cliente.connect();
            const sql = 'INSERT INTO emprestimo (cliente_emprestimo, livro_emprestimo, data_emprestimo, data_devolucao) VALUES ($1,$2,$3,$4) RETURNING *';
            let dataEmprestimo = new Date();
            let dataDevolucao = dataDevolucaoLivro();
            const values = [idCliente, idLivro, dataEmprestimo, dataDevolucao];
            cliente.query(sql, values, (err, res) => {
                if (err) {
                    callback(err.message, undefined);
                } else {
                    callback(undefined, res.rows[0])
                }
                cliente.end();
            })
        }
    }).catch((resp) => {
        console.log(">> Não foi possível emprestar este livro");
    });
}


function listar(callback) {
    const cliente = new Client(connection);
    cliente.connect();
    const sql = "SELECT * FROM relatorios";
    cliente.query(sql, (err, res) => {
        if (err) {
            callback(err.message, undefined);
        }
        else {
            let clientes = res.rows;
            callback(undefined, clientes);
        }
        cliente.end();
    })
}

function buscarPorId(livroId, callback) {
    const cliente = new Client(connection);
    cliente.connect();
    const sql = "SELECT id_emprestimo,data_emprestimo,data_devolucao,nome_cliente,nome_livro,nome_autor,ano_livro,editora_livro,status_livro FROM emprestimo, livros, clientes, autores WHERE livros.id_livro = emprestimo.livro_emprestimo AND emprestimo.cliente_emprestimo = clientes.id_cliente AND livros.id_autor_livro = autores.id_autor AND livro_emprestimo = $1";
    const values = [livroId];
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err.message, undefined);
        }
        else if (res.rows && res.rows.length > 0) {
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "Registro não encontrado"
            callback(error, undefined)
        }
        cliente.end();
    })
}

function atualizar(idCliente, idLivro, dataEmprestimo, dataDevolucao, idEmprestimo, callback) {
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'UPDATE emprestimo SET cliente_emprestimo = $1, livro_emprestimo = $2, data_emprestimo = $3, data_devolucao = $4 WHERE id_emprestimo = $5 RETURNING *';
    const values = [idCliente, idLivro, dataEmprestimo, dataDevolucao,idEmprestimo];
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err.message, undefined);
        }
        else if (res.rows && res.rows.length > 0) {
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "Registro não encontrado"
            callback(error, undefined)
        }
        cliente.end();
    })
}

function deletar(id, callback) {
    const cliente = new Client(connection);
    cliente.connect();
    const sql = 'DELETE FROM emprestimo WHERE id_emprestimo = $1 RETURNING *';
    const values = [id];
    cliente.query(sql, values, (err, res) => {
        if (err) {
            callback(err.message, undefined);
        }
        else if (res.rows && res.rows.length > 0) {
            let clientes = res.rows[0];
            callback(undefined, clientes)
        }
        else {
            const error = "Registro não encontrado"
            callback(error, undefined)
        }
        cliente.end();
    })
}


module.exports = { listar, inserir, buscarPorId, atualizar, deletar, validarEmprestimo }


function dataDevolucaoLivro() {
    let data = new Date(),
        dia = (data.getDate() + 3).toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'),
        ano = data.getFullYear();
    return `${ano}-${mes}-${dia}`;
}

function validarEmprestimo(id) {
    return new Promise((resolve, reject) => {
        const cliente = new Client(connection);
        cliente.connect();
        const sql = "SELECT cliente_emprestimo, status_livro, count(*) FROM emprestimo, livros WHERE id_livro = livro_emprestimo AND cliente_emprestimo = $1 GROUP BY cliente_emprestimo, status_livro";
        const values = [id]
        cliente.query(sql, values, (err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                let clientes = res.rows;
                clientes.forEach(item => {
                    if (item.count >= 3) {
                        const error = new Error();
                        console.log(error.name = "Limite de empréstimo excedido");
                        reject({
                            ok: false
                        });
                    } else if (item.status_livro == "Indisponível"){
                        const error = new Error();
                        console.log(error.name = "Livro Indisponível");
                        reject({
                            ok: false
                        });
                    }
                }); resolve({
                    ok: true
                });
            }
            cliente.end();
            resolve({
                ok: true
            });
        })
    });
}