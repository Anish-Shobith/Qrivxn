import { Command, Constructor, Handler, QrivxnClient } from 'Qrivxn';

export class CommandHandler extends Handler<Command> {

	public readonly client: QrivxnClient;

	public constructor(client: QrivxnClient) {
		super(client, 'Commands', Command as Constructor<Command>);
		this.client = client;
	}

}