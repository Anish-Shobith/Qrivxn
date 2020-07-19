import { Event, Constructor, Handler, QrivxnClient } from 'Qrivxn';

export class EventHandler extends Handler<Event> {

	public readonly client: QrivxnClient;

	public constructor(client: QrivxnClient) {
		super(client, 'Events', Event as Constructor<Event>);
		this.client = client;
	}

}