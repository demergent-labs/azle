## Current benchmarks Azle version: 0.25.0

| Execution | Method Name                  | Instructions | Change                         |
| --------- | ---------------------------- | ------------ | ------------------------------ |
| 0         | getRandomnessDirectly        | 1_402_854    | <font color="green">-81</font> |
| 1         | getRandomnessIndirectly      | 1_330_741    | <font color="red">+81</font>   |
| 2         | getRandomnessSuperIndirectly | 1_373_551    | <font color="green">-35</font> |
| 3         | returnPromiseVoid            | 1_314_702    | <font color="red">+127</font>  |

## Baseline benchmarks Azle version: 0.24.1

| Execution | Method Name                  | Instructions |
| --------- | ---------------------------- | ------------ |
| 0         | getRandomnessDirectly        | 1_402_935    |
| 1         | getRandomnessIndirectly      | 1_330_660    |
| 2         | getRandomnessSuperIndirectly | 1_373_586    |
| 3         | returnPromiseVoid            | 1_314_575    |
