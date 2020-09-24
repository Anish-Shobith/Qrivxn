import { ListenerHandler } from 'discord-akairo';
import { join } from 'path';

import type { QrivxnClient } from './QrivxnClient';

export class EventStore extends ListenerHandler {

	public constructor(client: QrivxnClient) {
		super(client, {
			directory: join(__dirname, '..', 'Events')
		});
	}

}
