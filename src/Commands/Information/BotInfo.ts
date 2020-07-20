import { Message, TextChannel } from 'discord.js';
import { Command, CommandHandler } from 'Qrivxn';

export default class BotInfo extends Command {

	public constructor(handler: CommandHandler) {
		super(handler, {
			name: 'botinfo',
			description: 'Gives information about the bot'
		});
	}

	public run(message: Message): void {
		console.log((message.channel as TextChannel).name);
	}

}
