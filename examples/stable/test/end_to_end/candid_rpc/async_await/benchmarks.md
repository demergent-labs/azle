# Benchmarks for async_await

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                  | Instructions | Cycles  | USD           | USD/Million Calls | Change                              |
| --- | ---------------------------- | ------------ | ------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRandomnessDirectly        | 994_967      | 987_986 | $0.0000013137 | $1.31             | <font color="green">-508_805</font> |
| 1   | getRandomnessIndirectly      | 933_844      | 963_537 | $0.0000012812 | $1.28             | <font color="green">-517_398</font> |
| 2   | getRandomnessSuperIndirectly | 974_628      | 979_851 | $0.0000013029 | $1.30             | <font color="green">-514_899</font> |
| 3   | returnPromiseVoid            | 924_260      | 959_704 | $0.0000012761 | $1.27             | <font color="green">-515_172</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_503_772    | 1_191_508 | $0.0000015843 | $1.58             |
| 1   | getRandomnessIndirectly      | 1_451_242    | 1_170_496 | $0.0000015564 | $1.55             |
| 2   | getRandomnessSuperIndirectly | 1_489_527    | 1_185_810 | $0.0000015767 | $1.57             |
| 3   | returnPromiseVoid            | 1_439_432    | 1_165_772 | $0.0000015501 | $1.55             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
