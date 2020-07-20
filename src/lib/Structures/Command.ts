import { Args } from 'lexure';
import { PermissionString, Message } from 'discord.js';

import { QrivxnFile, QrivxnFileOptions } from './Base/QrivxnFile';
import type { CommandHandler } from 'Qrivxn';

interface CommandOptions extends QrivxnFileOptions {
	aliases?: string[];
	description: string;
	guildOnly?: boolean;
	ownerOnly?: boolean;
	argsCount?: number;
	clientPerms?: PermissionString | PermissionString[];
	userPerms?: PermissionString | PermissionString[];
}


export abstract class Command extends QrivxnFile implements CommandOptions {

	public name!: string;

	public aliases: CommandOptions['aliases'];

	public description!: string;

	public guildOnly: CommandOptions['guildOnly'];

	public ownerOnly: CommandOptions['ownerOnly'];

	public argsCount: CommandOptions['argsCount'];

	public clientPerms: CommandOptions['clientPerms'];

	public userPerms: CommandOptions['userPerms'];

	public constructor(handler: CommandHandler, options: CommandOptions) {
		super(handler, options);
		this.name = options.name;
		this.aliases = options.aliases ?? [];
		this.description = options.description;
		this.guildOnly = options.guildOnly ?? true;
		this.ownerOnly = options.ownerOnly ?? false;
		this.argsCount = options.argsCount ?? 0;
		this.clientPerms = options.clientPerms ?? undefined;
		this.userPerms = options.userPerms ?? undefined;

	}

	public abstract run(message: Message, args?: Args): Promise<any> | any;

}
