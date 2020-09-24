import { AkairoClient, AkairoOptions } from 'discord-akairo';
import { CommandStore } from './CommandStore';
import { EventStore } from './EventStore';

import type { ClientOptions } from 'discord.js';


export class QrivxnClient extends AkairoClient {

	/**
     * Events handler for Qrivxn
     */
	public events: EventStore;

	/**
     * Commands Hanler for Qrivxn
     */
	public commands: CommandStore;

	/**
     * @param options Options for the QrivxnClient
     */
	public constructor(public options: QrivxnClientOptions) {
		super(options);
		this.events = new EventStore(this);
		this.commands = new CommandStore(this);
	}

	async init(): Promise<void> {
		this.commands.useListenerHandler(this.events);
		this.events.setEmitters({
			commands: this.commands,
			events: this.events,
			process
		});

		const [commands, events] = await Promise.all([this.commands.loadAll(), this.events.loadAll()]);
		console.log([
			`[LOG] Loaded ${commands.modules.size} commands`,
			`[LOG] Loaded ${events.modules.size} events`
		].join('\n'));
	}

	async start(token = this.options.token): Promise<void> {
		await this.init();
		this.login(token).catch(console.error);
	}

}

export interface QrivxnClientOptions extends AkairoOptions, ClientOptions {
	token?: string;
	prefix?: string;
}

declare module 'discord-akairo' {
	export interface AkairoClient {
		commands: CommandStore;
		events: EventStore;
	}
}
