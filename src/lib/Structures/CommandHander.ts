import { Handler, Constructor } from './Base/Handler';
import { Command } from './Command';
import { QrivxnClient } from './QrivxnClient';

export class CommandHandler extends Handler<Command> {

	public readonly client: QrivxnClient;

	public constructor(client: QrivxnClient) {
		super(client, 'Commands', Command as Constructor<Command>);
		this.client = client;
	}

}
