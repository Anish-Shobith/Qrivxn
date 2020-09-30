import { QrivxnClient } from './Structures/QrivxnClient';
import { config } from './config';

const client = new QrivxnClient({ token: config.token });

client.start().catch(console.error);
