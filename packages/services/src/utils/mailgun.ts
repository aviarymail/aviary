import FormData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData).client({
  username: 'api',
  key: 'asd',
  public_key: 'asd',
});

export async function addDomain() {}

export async function verifyDomain() {}
