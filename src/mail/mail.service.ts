import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    console.log(options);
    this.sendEmail('hello', 'how are you?');
  }

  private async sendEmail(subject: string, template: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `jhoon5245@gmail.com`);
    form.append('subject', subject);
    form.append('template', template);
    form.append('v:username', 'peter ');
    form.append('v:code', 'asdf');

    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
        method: 'POST',
      },
    );
    console.log(response.body);
  }
}
