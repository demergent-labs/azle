# Helpful Resources

[EMCA-262 13th edition](https://262.ecma-international.org/13.0)

## [16.2.2 Import Syntax](https://262.ecma-international.org/13.0/#sec-imports)

## [16.2.3 Export Syntax](https://262.ecma-international.org/13.0/#sec-exports)

Looking directly at the docs linked above will be more thorough but here is a
quick overview

### ExportDeclaration :

```
export ExportFromClause FromClause ;
export NamedExports ;
export VariableStatement[~Yield, +Await]
export Declaration[~Yield, +Await]
export default HoistableDeclaration[~Yield, +Await, +Default]
export default ClassDeclaration[~Yield, +Await, +Default]
export default [lookahead ∉ { function, async [no LineTerminator here] function, class }] AssignmentExpression[+In, ~Yield, +Await] ;
```

### ExportFromClause :

```
*
* as ModuleExportName
NamedExports
```

### NamedExports :

```
{ }
{ ExportsList }
{ ExportsList , }
```

### ExportsList :

```
ExportSpecifier
ExportsList , ExportSpecifier
```

### ExportSpecifier :

```
ModuleExportName
ModuleExportName as ModuleExportName
```

See also [Appendix A.5 (Grammar Summary for Scripts and Modules)](https://262.ecma-international.org/13.0/#sec-scripts-and-modules)
