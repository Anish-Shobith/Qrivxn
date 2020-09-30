import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { join } from 'path';
import { config } from '../config';

import type { Message } from 'discord.js';
export class QrivxnClient extends AkairoClient {

	/**
     * Events handler for Qrivxn
     */
	public events: ListenerHandler;
	/**
     * Commands handler for Qrivxn
     */
	public commands: CommandHandler;
	/**
	 * Config for QrivxnClient
	 */
	public config: QrivxnClientOptions;

	public constructor(options: QrivxnClientOptions) {
		super({ ownerID: options.owners });

		this.events = new ListenerHandler(this, {
			directory: join(__dirname, '..', 'Events')
		});
		this.commands = new CommandHandler(this, {
			directory: join(__dirname, '..', 'Commands'),
			prefix: config.prefix || ['Q!', 'q!'],
			allowMention: true,
			handleEdits: true,
			commandUtil: true,
			commandUtilLifetime: 3e5,
			argumentDefaults: {
			  prompt: {
					modifyStart: (_: Message, str: string): string =>
				  `${str}\n\nType \`cancel\` to cancel the command`,
					modifyRetry: (_: Message, str: string): string =>
				  `${str}\n\nType \`cancel\` to cancel the command`,
					timeout: 'You took too long, th command has been canceled',
					ended: 'You exceeded the maximum amount of tries',
					cancel: 'Command cancelled',
					retries: 3,
					time: 3e4
			  },
			  otherwise: ''
			},
			ignorePermissions: config.owners,
			ignoreCooldown: config.owners
		  });
		this.config = options;
	}

	async init(): Promise<void> {
		this.commands.useListenerHandler(this.events);
		this.events.setEmitters({
			commands: this.commands,
			events: this.events,
			client: this,
			process
		});

		const [commands, events] = await Promise.all([this.commands.loadAll(), this.events.loadAll()]);
		console.log([
			`[LOG] Loaded ${commands.modules.size} commands`,
			`[LOG] Loaded ${events.modules.size} events`
		].join('\n'));
	}

	async start(): Promise<void> {
		await this.init();
		super.login(this.config.token).catch(console.error);
	}

}

export interface QrivxnClientOptions {
	token?: string;
	prefix?: string;
	owners?: string | string[];
}

declare module 'discord-akairo' {
	export interface AkairoClient {
		commands: CommandHandler;
		events: ListenerHandler;
	}
}
