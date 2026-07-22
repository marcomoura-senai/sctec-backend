import { Pool } from "pg";
import { Usuario, UsuarioWithPedidos } from "../../../../domain/usuario";
import { UsuarioRepository } from "../usuario.repository";

export class UsuarioPostgresRepository implements UsuarioRepository {

    constructor(private readonly pool: Pool){}

    async findUserByLogin(login: string): Promise<Usuario | null> {
        const result = await this.pool.query("SELECT * FROM usuario WHERE login = $1", [login])

        if(result.rowCount === 0) {
          return null
        }
        return {
            id: result.rows[0].id,
            password: result.rows[0].password,
            cpf: result.rows[0].cpf,
            email: result.rows[0].email,
            nome: result.rows[0].nome,
            login: result.rows[0].login,
        }
    }

    async findById(id: number): Promise<Usuario | null> {
        // const result = await this.pool.query("SELECT * FROM usuario JOIN endereco ON usuario.id = endereco.usuario_id WHERE usuario.id = $1", [id])
        const result = await this.pool.query("SELECT * FROM usuario WHERE usuario.id = $1", [id])

        if(result.rowCount === 0) {
          return null
        }


        // maneira 1: Agrupar id de usuário, populando os endereços para aquele id de usuário
        // Veja o exemplo no pedido-postgres.repository.ts
        

        // maneira 2: Faz duas queries separadas, uma pega o usuário, e a outra pega os endereços
        const enderecos = await this.pool.query("SELECT * FROM endereco WHERE usuario_id = $1", [id])
        
        return {
            id: result.rows[0].id,
            password: result.rows[0].password,
            cpf: result.rows[0].cpf,
            email: result.rows[0].email,
            nome: result.rows[0].nome,
            login: result.rows[0].login,
            endereco: enderecos.rows.map(e => ({
                bairro: e.bairro,
                cidade: e.cidade,
                cep: e.cep,
                estado: e.estado,
                logradouro: e.logradouro,
                uf: e.uf
            }))
        }
    }
}