# Query Methods

You'll notice that `$query` and `$update` are not the traditional decorators that you might expect e.g. `@query` and `@update`. We are dealing with a limitation in TypeScript/JavaScript decorators which does not allow them to be used on functions, basically only within classes. We do not think introducing classes with their many drawbacks is worth it to the Azle API, and so we have come up with this interim solution. If in the future TypeScript/JavaScript introduce function decorators, it will be a quick and easy change for Azle projects.
