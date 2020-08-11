/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Code } from './code';

export abstract class Viewlet {

	constructor(protected code: Code) { }

	async waitForTitle(fn: (title: string) => boolean): Promise<void> {
		await this.code.waitForTextContent('.monaco-workbench .part.sidebar > .title > .title-label > h2', undefined, fn);
	}
}
