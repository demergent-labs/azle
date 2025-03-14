⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for async_await

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRandomnessDirectly        | 1_037_598    | 1_005_039 | $0.0000013364 | $1.33             | <font color="red">+51_094</font> |
| 1   | getRandomnessIndirectly      | 979_450      | 981_780   | $0.0000013054 | $1.30             | <font color="red">+50_118</font> |
| 2   | getRandomnessSuperIndirectly | 1_016_490    | 996_596   | $0.0000013251 | $1.32             | <font color="red">+49_314</font> |
| 3   | returnPromiseVoid            | 967_404      | 976_961   | $0.0000012990 | $1.29             | <font color="red">+51_267</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name                  | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 986_504      | 984_601 | $0.0000013092 | $1.30             |
| 1   | getRandomnessIndirectly      | 929_332      | 961_732 | $0.0000012788 | $1.27             |
| 2   | getRandomnessSuperIndirectly | 967_176      | 976_870 | $0.0000012989 | $1.29             |
| 3   | returnPromiseVoid            | 916_137      | 956_454 | $0.0000012718 | $1.27             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
