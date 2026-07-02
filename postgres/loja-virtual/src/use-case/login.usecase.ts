import { EmailService } from "../infra/email/email.service";
import { UsuarioRepository } from "../infra/repositories/usuario/usuario.repository";

export class LoginUseCase {
    constructor(private readonly repository: UsuarioRepository, private readonly emailService: EmailService) {}

    async execute(login: string, password: string): Promise<boolean> {
        const user = await this.repository.findUserByLogin(login);

        if (!user) {
            // TODO: Criar classe de erro de domínio e.g UserNotFoundError
           throw new Error("Login Unsuccessful");
        }

        await this.emailService.send(user.email, 'Novo login', 'Um novo login foi feito ')
        return user.password === password;
    }
}

