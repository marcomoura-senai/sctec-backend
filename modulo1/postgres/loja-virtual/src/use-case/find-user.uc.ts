import { Usuario } from "../domain/usuario";
import { UsuarioRepository } from "../infra/repositories/usuario/usuario.repository";

export class FindUserUseCase {
    constructor(private readonly repository: UsuarioRepository) {}

    async execute(id: number): Promise<Usuario | null> {
        return this.repository.findById(id);
    }
}