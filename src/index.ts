import { QrivxnClient } from './Structures/QrivxnClient';
import { config } from './config';

new QrivxnClient(config)
	.start(config.token)
	.catch(console.error);
