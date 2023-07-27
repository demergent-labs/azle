# Declarative Checklist

1. No mutations
2. If there are mutations they should be justified
3. Functions should serve a single high-level purpose
4. Functions should read like a sentence by being composed of multiple simple statements
5. Related groupings of statements should be pulled out into their own functions if their parent function contains more than a handful of unrelated statements
6. Functions should never have more than one level of branching
7. Fully qualify function/variable names with their module path if the names are not stand-alone descriptive
8. Favor descriptive directory, file, function, and variable names over shorter less descriptive names
9. Prefer recursion over iteration
10. Prefer higher-order array operations (map, filter, reduce, etc) versus loops with mutations (for, while, etc)
11. Higher-order array operation lambdas should be pulled out into their own functions if sufficiently complex
12. Compound conditional statements should be given a name through variable assignment
