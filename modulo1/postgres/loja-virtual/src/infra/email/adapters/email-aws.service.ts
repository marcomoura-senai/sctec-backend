import { EmailService } from "../email.service";

export class EmailAwsService implements EmailService {
    send(to: string, subject: string, body: string): Promise<void> {
        console.log(`Sending email to ${to} with subject ${subject} and body ${body}`);
        return Promise.resolve();
    }
}