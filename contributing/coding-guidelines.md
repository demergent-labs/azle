# Demergent Labs Coding Guidelines (WIP)

WORK IN PROGRESS (Basically we favor functional programming)

This document seeks to codify the opinion of Demergent Labs as it pertains to the source code of its umbrella projects. Code reviews will be subject to these guidelines. The document may change over time.

## Definitions

### favor

The intended meaning of favor is to use wherever practical. Always consider using the favored practice first before deeply considering alternatives. If there is a very good reason not to favor a practice, then be prepared to defend that claim.

## Basic Principles

1. Favor functional programming
    1. Favor pure functions
    2. Favor immutable data
    3. Manage side-effects and side-causes appropriately
2. Favor declarative programming
    1. Seek to describe what and not how
3. Favor descriptive directory, file, function, and variable names
4. Functions should never have more than one level of branching
5. Functions should be composed of multiple one-line statements
6. Prefer recursion over iteration
7. Prefer higher-order array operations (map, filter, reduce, etc) versus loops with mutations (for, while, etc)

## TypeScript

1. No classes
2. Declare named functions at the top level using the `function` keyword syntax
3. Never declare named functions within functions, always declare them at the top level
4. All anonymous functions should use the arrow syntax
5. Use const for variables and values intended to be immutable
6. Use let for variables and values intended to be mutable
7. Never use var
8. Don't throw errors, always return a value

## Rust

1. Be prepared to defend every use of `mut`

## Canisters

1. All mutations should be performed in the top-level canister method

## Code review checklist

### TypeScript

We'll see how many of these we can fix with prettier and a linter

1. No TypeScript errors
2. Imports in alphabetic order
3. Directories, files, modules, and functions appropriately declarative
    1. No more than one level of branching within a function
    2. Functions should be a series of single statements
    3. They should read like a simple sentence
    4. Repeated code is sufficiently generalized
