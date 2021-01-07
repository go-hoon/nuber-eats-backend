import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  async sendEmail(subject: string, template: string, emailVars: EmailVar[]) {
    const form = new FormData();
    form.append(
      'from',
      `Peter from Nuber Eats <mailgun@${this.options.domain}>`,
    );
    form.append('to', `jhoon5245@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));

    try {
      got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }
  }

  public sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify your email', 'confirm', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
