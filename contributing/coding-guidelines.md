# Demergent Labs Coding Guidelines (WIP)

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

## TypeScript

1. No classes

## Rust

1. Be prepared to defend every use of `mut`