# Signal Your Love Desktop app

## How to open Signal database locally?

Signal Your Love app has the same approach to opening local database as in [Signal-Desktop](https://github.com/signalapp/Signal-Desktop).

You need to install [better-sqlite3 package from Signal](https://github.com/signalapp/better-sqlite3). After, you can follow [this](https://github.com/signalapp/Signal-Desktop/blob/2a4166a8360e02e01f343723a65de6f7cb748701/ts/sql/Server.ts#L502) and [this](https://github.com/signalapp/Signal-Desktop/blob/2a4166a8360e02e01f343723a65de6f7cb748701/ts/sql/Server.ts#L442) lines of code to open a database.

This is another project (in Python) that extract messages. Some useful lines of code are [this](https://github.com/carderne/signal-export/blob/140777bd881e0c44743960ff2968145adcb07c53/sigexport/main.py#L40
) and [this](https://github.com/carderne/signal-export/blob/140777bd881e0c44743960ff2968145adcb07c53/sigexport/main.py#L503).
