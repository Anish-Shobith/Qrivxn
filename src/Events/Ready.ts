import { Event, EventHandler } from 'Qrivxn';

export default class Ready extends Event {

	public constructor(handler: EventHandler) {
		super(handler, {
			name: 'ready',
			once: true
		});
	}

	public run(): void {
		console.log(`${this.client.user?.username} is Ready!`);
	}

}
