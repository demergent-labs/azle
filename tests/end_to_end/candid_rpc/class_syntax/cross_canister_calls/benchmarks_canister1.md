## Current benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           |
| --------- | ---------------- | ------------ | --------- | ------------- |
| 0         | balance          | 2,297,063    | 1,508,825 | $0.0000020167 |
| 1         | account          | 3,635,050    | 2,044,020 | $0.0000027321 |
| 2         | balance          | 2,217,475    | 1,476,990 | $0.0000019742 |
| 3         | account          | 3,614,703    | 2,035,881 | $0.0000027212 |
| 4         | accounts         | 1,654,333    | 1,251,733 | $0.0000016731 |
| 5         | transfer         | 3,564,397    | 2,015,759 | $0.0000026943 |
| 6         | balance          | 2,215,122    | 1,476,049 | $0.0000019729 |
| 7         | account          | 3,613,781    | 2,035,512 | $0.0000027207 |
| 8         | balance          | 2,208,167    | 1,473,267 | $0.0000019692 |
| 9         | account          | 3,607,272    | 2,032,909 | $0.0000027172 |
| 10        | accounts         | 1,651,338    | 1,250,535 | $0.0000016715 |
| 11        | trap             | 1,623,830    | 1,239,532 | $0.0000016568 |
| 12        | sendNotification | 2,648,666    | 1,649,466 | $0.0000022047 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

## Baseline benchmarks Azle version: 0.25.0
