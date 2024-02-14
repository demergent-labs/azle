# Debugging

Use lots of `console.log` and `try catches`. Log everything, trust nothing. Wrap everything in `try catches`. You'll often see the `no response` thing, if that happens then especially look for async code and wrap it in a try catch. Try to log just before and just after important things to track down the issues that you're facing.

If you have any problem during initial deployment or installation, `npx azle clean` can allow you to restart everything. In the worst case run that and also delete `node_modules` and do an npm install from the beginning.

TODO especially talk about try catch inside of Express or http server callbacks
