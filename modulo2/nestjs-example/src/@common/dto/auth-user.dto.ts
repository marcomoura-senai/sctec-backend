import { JwtPayload } from 'jsonwebtoken';

export interface AuthUserDto extends JwtPayload {
  data: {
    id: number;
    nome: string;
    especialidade: string;
    registro: string;
  };
}
