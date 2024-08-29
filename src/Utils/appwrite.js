import { Client, Account } from 'appwrite';
import { PROJECT_ID } from './constant';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

export const account = new Account(client);
export { ID } from 'appwrite';