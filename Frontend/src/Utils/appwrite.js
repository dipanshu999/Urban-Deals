import { Client, Account } from 'appwrite';
let PROJECT_ID=import.meta.env.VITE_PROJECT_ID

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

    

export const account = new Account(client);
export { ID, Account } from 'appwrite';