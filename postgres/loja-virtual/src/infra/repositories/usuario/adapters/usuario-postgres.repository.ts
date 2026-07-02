import { Pool } from "pg";
import { Usuario } from "../../../../domain/usuario";
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

}