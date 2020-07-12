import { Message as DJSMessage } from 'discord.js';
import { Event, EventHandler } from 'Qrivxn';

export default class Message extends Event {

	public constructor(handler: EventHandler) {
		super(handler, {
			name: 'message'
		});
	}

	public run(message: DJSMessage): void {
		if (message.author.bot || !message.guild) return undefined;

		if (!message.content.startsWith(this.client.prefix)) return undefined;
		const [cmd] = message.content.slice(this.client.prefix.length).trim().split(/ +/g);
		const command = this.client.commands.get(cmd);
		if (command) {
			command.run(message);
		}
	}

}
