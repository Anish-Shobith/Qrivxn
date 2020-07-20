import { Collection } from 'discord.js';
import klaw from 'klaw';
import { join, parse } from 'path';

import { QrivxnFile } from './QrivxnFile';
import { QrivxnClient } from '../QrivxnClient';

export type Constructor<K> = new (...args: ConstructorParameters<typeof QrivxnFile>) => K;

export abstract class Handler<T extends QrivxnFile> extends Collection<string, T> {

	public readonly client: QrivxnClient;

	public dirName: string;

	public dir: string;

	public holds: Constructor<T>;

	public constructor(client: QrivxnClient, dirName: string, holds: Constructor<T>) {
		super();
		this.client = client;
		this.dirName = dirName;
		this.dir = join(this.client.userBaseDirectory, this.dirName);
		this.holds = holds;
	}

	public loadFiles(): void {
		klaw(this.dir)
			.on('data', async item => {
				const file = parse(item.path);
				if (!file.ext || file.ext !== '.js') return;
				const loc = join(file.dir, file.base);
				const req = await import(loc) as { default: Constructor<T> } | Constructor<T>;
				const LoadedFile = 'default' in req ? req.default : req;
				this.load(new LoadedFile(this));
			})
			.on('end', () => this);
	}

	public load(file: T | null): T | null {
		if (!(file instanceof this.holds)) {
			console.error(`Only ${this} maybe stored this folder.`);
			return null;
		}
		super.delete(file.name);
		super.set(file.name, file);
		return file;
	}

}
