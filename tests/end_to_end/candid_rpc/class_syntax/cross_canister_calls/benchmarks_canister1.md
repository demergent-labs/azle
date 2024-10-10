## Current benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           |
| --------- | ---------------- | ------------ | --------- | ------------- |
| 0         | balance          | 2,297,155    | 1,508,862 | $0.0000020168 |
| 1         | account          | 3,635,303    | 2,044,121 | $0.0000027322 |
| 2         | balance          | 2,217,498    | 1,476,999 | $0.0000019742 |
| 3         | account          | 3,614,819    | 2,035,927 | $0.0000027212 |
| 4         | accounts         | 1,654,437    | 1,251,774 | $0.0000016731 |
| 5         | transfer         | 3,564,397    | 2,015,758 | $0.0000026943 |
| 6         | balance          | 2,215,030    | 1,476,012 | $0.0000019729 |
| 7         | account          | 3,613,862    | 2,035,544 | $0.0000027207 |
| 8         | balance          | 2,208,190    | 1,473,276 | $0.0000019692 |
| 9         | account          | 3,607,099    | 2,032,839 | $0.0000027171 |
| 10        | accounts         | 1,651,246    | 1,250,498 | $0.0000016714 |
| 11        | trap             | 1,623,767    | 1,239,506 | $0.0000016567 |
| 12        | sendNotification | 2,648,598    | 1,649,439 | $0.0000022047 |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).

## Baseline benchmarks Azle version: 0.25.0
