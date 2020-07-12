require('module-alias/register');
import { QrivxnClient } from './lib/Structures/QrivxnClient';
import { config } from './config';
new QrivxnClient(config)
	.start()
	.catch(err => console.error(err));
