import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    icon: './assets/icon',
    osxSign: {
      identity: 'Developer ID Application',
      optionsForFile: (filePath) => {
        return {
            entitlements: 'config/darwin.plist',
        }
      },
    },
    osxNotarize: {
      appleId: process.env.APPLE_ID || '',
      appleIdPassword: process.env.APPLE_APP_PASSWORD || '',
      teamId: process.env.APPLE_TEAM_ID || '',
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerZIP({}, ['darwin']),
    new MakerDMG({
      format: 'ULFO',
    }, ['darwin']),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/main/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
