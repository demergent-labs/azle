# Benchmarks for async_await

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getRandomnessDirectly        | 1_036_000    | 1_004_400 | $0.0000013355 | $1.33             | <font color="red">+49_496</font> |
| 1   | getRandomnessIndirectly      | 977_393      | 980_957   | $0.0000013043 | $1.30             | <font color="red">+48_061</font> |
| 2   | getRandomnessSuperIndirectly | 1_015_597    | 996_238   | $0.0000013247 | $1.32             | <font color="red">+48_421</font> |
| 3   | returnPromiseVoid            | 964_868      | 975_947   | $0.0000012977 | $1.29             | <font color="red">+48_731</font> |

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
