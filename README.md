# Signal Your Love

The desktop app that allows you to securely display a beautiful statistics of your Signal conversations.

## MacOS

### Signing the app

Available documentation:

- [ElectronJS docs](https://www.electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide#sign-apps-for-development)
- [Electron Forge docs](https://www.electronforge.io/guides/code-signing/code-signing-macos)

### Check entitelments for signed app

```bash
$ codesign --display --entitlements :- Signal\ Your\ Love.app
```

### Check if app is notarized

```bash
$ spctl -a -vvv -t install out/Signal\ Your\ Love-darwin-arm64/Signal\ Your\ Love.app
```

## How to open Signal database locally?

Refer to [the article on vmois.dev](https://vmois.dev/query-signal-desktop-messages-sqlite/) for more details.
