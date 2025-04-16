# Benchmarks for async_await

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | getRandomnessDirectly        | 1_033_017    | 1_003_206 | $0.0000013339 | $1.33             | <font color="green">-4_581</font> |
| 1   | getRandomnessIndirectly      | 979_774      | 981_909   | $0.0000013056 | $1.30             | <font color="red">+324</font>     |
| 2   | getRandomnessSuperIndirectly | 1_014_914    | 995_965   | $0.0000013243 | $1.32             | <font color="green">-1_576</font> |
| 3   | returnPromiseVoid            | 965_867      | 976_346   | $0.0000012982 | $1.29             | <font color="green">-1_537</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_037_598    | 1_005_039 | $0.0000013364 | $1.33             |
| 1   | getRandomnessIndirectly      | 979_450      | 981_780   | $0.0000013054 | $1.30             |
| 2   | getRandomnessSuperIndirectly | 1_016_490    | 996_596   | $0.0000013251 | $1.32             |
| 3   | returnPromiseVoid            | 967_404      | 976_961   | $0.0000012990 | $1.29             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
