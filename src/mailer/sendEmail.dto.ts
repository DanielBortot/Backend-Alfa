/* eslint-disable prettier/prettier */
import { Address } from "nodemailer/lib/mailer"

/* eslint-disable prettier/prettier */
export type sendEmailDto = {
    from?: Address,
    recipients: Address[],
    subject: string;
    html: string;
    text?:string;
    placeholderReplacements?: Record<string,string>
}