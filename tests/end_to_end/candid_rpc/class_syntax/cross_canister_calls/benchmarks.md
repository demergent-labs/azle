# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           | USD/Thousand Calls | Change                          |
| --------- | ---------------- | ------------ | --------- | ------------- | ------------------ | ------------------------------- |
| 0         | balance          | 2,297,304    | 1,508,921 | $0.0000020168 | $0.0020            | <font color="green">-23</font>  |
| 1         | account          | 3,636,725    | 2,044,690 | $0.0000027330 | $0.0027            | <font color="red">+46</font>    |
| 2         | balance          | 2,221,320    | 1,478,528 | $0.0000019762 | $0.0020            | <font color="green">-58</font>  |
| 3         | account          | 3,623,775    | 2,039,510 | $0.0000027260 | $0.0027            | <font color="green">-127</font> |
| 4         | accounts         | 1,655,007    | 1,252,002 | $0.0000016734 | $0.0017            | <font color="green">-81</font>  |
| 5         | transfer         | 3,566,250    | 2,016,500 | $0.0000026953 | $0.0027            | <font color="red">+46</font>    |
| 6         | balance          | 2,215,280    | 1,476,112 | $0.0000019730 | $0.0020            | <font color="green">-162</font> |
| 7         | account          | 3,614,144    | 2,035,657 | $0.0000027209 | $0.0027            | <font color="green">-115</font> |
| 8         | balance          | 2,213,066    | 1,475,226 | $0.0000019718 | $0.0020            | <font color="red">+69</font>    |
| 9         | account          | 3,615,205    | 2,036,082 | $0.0000027214 | $0.0027            | <font color="green">-92</font>  |
| 10        | accounts         | 1,653,350    | 1,251,340 | $0.0000016726 | $0.0017            | <font color="red">+23</font>    |
| 11        | trap             | 1,625,392    | 1,240,156 | $0.0000016576 | $0.0017            | <font color="red">+12</font>    |
| 12        | sendNotification | 2,650,327    | 1,650,130 | $0.0000022056 | $0.0022            | <font color="red">0</font>      |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           | USD/Thousand Calls |
| --------- | ---------------- | ------------ | --------- | ------------- | ------------------ |
| 0         | balance          | 2,297,327    | 1,508,930 | $0.0000020169 | $0.0020            |
| 1         | account          | 3,636,679    | 2,044,671 | $0.0000027329 | $0.0027            |
| 2         | balance          | 2,221,378    | 1,478,551 | $0.0000019762 | $0.0020            |
| 3         | account          | 3,623,902    | 2,039,560 | $0.0000027261 | $0.0027            |
| 4         | accounts         | 1,655,088    | 1,252,035 | $0.0000016735 | $0.0017            |
| 5         | transfer         | 3,566,204    | 2,016,481 | $0.0000026952 | $0.0027            |
| 6         | balance          | 2,215,442    | 1,476,176 | $0.0000019731 | $0.0020            |
| 7         | account          | 3,614,259    | 2,035,703 | $0.0000027209 | $0.0027            |
| 8         | balance          | 2,212,997    | 1,475,198 | $0.0000019718 | $0.0020            |
| 9         | account          | 3,615,297    | 2,036,118 | $0.0000027215 | $0.0027            |
| 10        | accounts         | 1,653,327    | 1,251,330 | $0.0000016725 | $0.0017            |
| 11        | trap             | 1,625,380    | 1,240,152 | $0.0000016576 | $0.0017            |
| 12        | sendNotification | 2,650,327    | 1,650,130 | $0.0000022056 | $0.0022            |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name         | Instructions | Cycles    | USD           | USD/Thousand Calls | Change                     |
| --------- | ------------------- | ------------ | --------- | ------------- | ------------------ | -------------------------- |
| 0         | transfer            | 2,163,515    | 1,455,406 | $0.0000019453 | $0.0019            | <font color="red">0</font> |
| 1         | receiveNotification | 1,384,165    | 1,143,666 | $0.0000015286 | $0.0015            | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name         | Instructions | Cycles    | USD           | USD/Thousand Calls |
| --------- | ------------------- | ------------ | --------- | ------------- | ------------------ |
| 0         | transfer            | 2,163,515    | 1,455,406 | $0.0000019453 | $0.0019            |
| 1         | receiveNotification | 1,384,165    | 1,143,666 | $0.0000015286 | $0.0015            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
