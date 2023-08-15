/*
  Author(s): Vladyslav Moisieienkov
  License: GNU General Public License version 3 (GPL-3.0)
*/

import fs from 'fs';
import os from 'os';
import path from 'path';


function getFolderPath(): string {
    const home = os.homedir();
    const app_folders: { [key: string]: string } = {
        'linux': path.join(home, '.config/Signal'),
        'darwin': path.join(home, 'Library/Application Support/Signal'),
        'win32': path.join(home, 'AppData/Roaming/Signal'),
    }

    const platform = os.platform()

    if (Object.keys(app_folders).includes(platform)) {
        return app_folders[String(platform)];
    }
    // TODO: throw exception if other platform is used
}


export function getDBPath(): string {
    return path.join(getFolderPath(), 'sql/db.sqlite');
}


export function getDBKey(): string {
    const config = path.join(getFolderPath(), 'config.json');
    return JSON.parse(fs.readFileSync(config).toString())['key'];
}
