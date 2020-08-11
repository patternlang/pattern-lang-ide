/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IKeymapInfo } from 'vs/workbench/services/keybinding/common/keymapInfo';

export class KeyboardLayoutContribution {
	public static readonly INSTANCE: KeyboardLayoutContribution = new KeyboardLayoutContribution();

	private _layoutInfos: IKeymapInfo[] = [];

	get layoutInfos() {
		return this._layoutInfos;
	}

	private constructor() {
	}

	registerKeyboardLayout(layout: IKeymapInfo) {
		this._layoutInfos.push(layout);
	}
}