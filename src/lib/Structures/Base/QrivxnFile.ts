import { QrivxnClient } from '../QrivxnClient';
import type { Handler } from './Handler';

export class QrivxnFile {

	public readonly client: QrivxnClient;

	public readonly handler: Handler<QrivxnFile>;

	public name: string;

	public enabled: boolean;

	public constructor(handler: Handler<QrivxnFile>, options?: QrivxnFileOptions) {
		this.client = handler.client;
		this.handler = handler as Handler<this>;
		this.name = options!.name;
		this.enabled = options!.enabled ?? true;
	}

}

export interface QrivxnFileOptions {
	name: string;
	enabled?: boolean;
}
