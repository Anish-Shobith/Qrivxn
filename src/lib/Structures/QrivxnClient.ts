import { Client, ClientOptions } from 'discord.js';
import { dirname } from 'path';
import { CommandHandler } from './CommandHandler';

export class QrivxnClient extends Client {

	public prefix: string;

	public owner?: string | string[];

	public readonly commands: CommandHandler;

	public token: string;

	public userBaseDirectory = dirname((require.main as NodeJS.Module).filename);

	public constructor(options: QrivxnClientOptions) {
		super(options);
		this.prefix = options.prefix;
		this.token = options.token as string;
		this.commands = new CommandHandler(this);
		this.owner = this.fetchApplication().then(app => app.owner?.id) as unknown as string | string[];
	}

	async start(): Promise<string> {
		await this.commands.loadFiles();
		return super.login(this.token);
	}

}

export interface QrivxnClientOptions extends ClientOptions {
	prefix: string;
	token: string | null;
}
