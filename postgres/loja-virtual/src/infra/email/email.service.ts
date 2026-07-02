export interface EmailService {
    send(to: string, subject: string, body: string): Promise<void>;
}