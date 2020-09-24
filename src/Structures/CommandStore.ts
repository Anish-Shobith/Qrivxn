import { CommandHandler } from 'discord-akairo';
import { join } from 'path';

import type { Message } from 'discord.js';
import type { QrivxnClient } from './QrivxnClient';

export class CommandStore extends CommandHandler {

	public constructor(client: QrivxnClient) {
		super(client,
			{
				directory: join(__dirname, '..', 'Commands'),
				prefix: client.options.prefix || ['q!', 'Q!'],
				allowMention: true,
				handleEdits: true,
				commandUtil: true,
				commandUtilLifetime: 3e5,
				defaultCooldown: 6e4,
				argumentDefaults: {
					prompt: {
						modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command...`,
						modifyRetry: (_: Message, str: string): string => `${str}\n\nType\`cancel\` to cancel the command...`,
						timeout: 'You took to long, the command has now been cancelled...',
						ended: 'You exceeded the max amount of tries, this command has been cancelled.',
						cancel: 'This command has been cancelled',
						retries: 3,
						time: 3e4
					}
				}
			});
	}

}
