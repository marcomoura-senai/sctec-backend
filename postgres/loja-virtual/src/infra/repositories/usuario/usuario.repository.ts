import { Usuario } from "../../../domain/usuario";

export interface UsuarioRepository {
    findUserByLogin(login: string): Promise<Usuario | null>;
}