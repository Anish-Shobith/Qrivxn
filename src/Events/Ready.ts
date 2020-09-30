import { Listener } from 'discord-akairo';
import { Constants } from 'discord.js';
export default class Ready extends Listener {

	public constructor() {
		super(Constants.Events.CLIENT_READY, {
			emitter: 'client',
			event: 'ready',
			category: 'client',
			type: 'once'
		});
	}

	public exec(): void {
		console.log(`${this.client.user?.tag} is now online!`);
	}

}
