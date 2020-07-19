import { QrivxnClient } from './QrivxnClient';
import { QrivxnFile, QrivxnFileOptions } from './Base/QrivxnFile';

import type { EventEmitter } from 'events';
import type { EventHandler } from 'Qrivxn';

interface EventOptions extends QrivxnFileOptions {
	once?: boolean;
	emitter?: EventEmitter | keyof QrivxnClient;
}


export abstract class Event extends QrivxnFile implements EventOptions {

	public name!: string;

	public type: EventOptions['once'];

	public emitter: EventEmitter;

	public constructor(handler: EventHandler, options: EventOptions) {
		super(handler, options);
		this.name = options.name;
		this.type = options.once ?? false;
		this.emitter = (typeof options.emitter === 'string') ? this.client[options.emitter] as EventEmitter : options.emitter ?? this.client;
	}

	public abstract run(...args: unknown[]): unknown;

}