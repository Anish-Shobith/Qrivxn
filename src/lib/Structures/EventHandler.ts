import { Handler, Constructor } from './Base/Handler';
import { Event } from './Event';
import { QrivxnClient } from './QrivxnClient';

export class EventHandler extends Handler<Event> {

	public readonly client: QrivxnClient;

	public constructor(client: QrivxnClient) {
		super(client, 'Events', Event as Constructor<Event>);
		this.client = client;
	}

}
