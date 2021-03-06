/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IProductConfiguration } from 'vs/platform/product/common/productService';
import { isWeb } from 'vs/base/common/platform';
import * as path from 'vs/base/common/path';
import { getPathFromAmdModule } from 'vs/base/common/amd';
import { env } from 'vs/base/common/process';

let product: IProductConfiguration;

// Web
if (isWeb) {

	// Built time configuration (do NOT modify)
	product = { /*BUILD->INSERT_PRODUCT_CONFIGURATION*/ } as IProductConfiguration;

	// Running out of sources
	if (Object.keys(product).length === 0) {
		Object.assign(product, {
			version: '1.17.0-dev',
			vscodeVersion: '1.48.0-dev',
			nameLong: 'Azure Data Studio Web Dev',
			nameShort: 'Azure Data Studio Web Dev',
			urlProtocol: 'azuredatastudio-oss',
			extensionAllowedProposedApi: [
				'ms-vscode.references-view',
				'ms-vscode.github-browser'
			],
		});
	}
}

// Node: AMD loader
else if (typeof require !== 'undefined' && typeof require.__$__nodeRequire === 'function') {

	// Obtain values from product.json and package.json
	const rootPath = path.dirname(getPathFromAmdModule(require, ''));

	product = require.__$__nodeRequire(path.join(rootPath, 'product.json'));
	const pkg = require.__$__nodeRequire(path.join(rootPath, 'package.json')) as { version: string; };

	// Running out of sources
	if (env['VSCODE_DEV']) {
		Object.assign(product, {
			nameShort: `${product.nameShort} Dev`,
			nameLong: `${product.nameLong} Dev`,
			dataFolderName: `${product.dataFolderName}-dev`
		});
	}

	Object.assign(product, {
		version: pkg.version
	});
}

// Unknown
else {
	throw new Error('Unable to resolve product configuration');
}

export default product;
