# Benchmarks for async_await

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getRandomnessDirectly        | 1_358_618    | 1_133_447 | $0.0000015071 | $1.50             | <font color="green">-30_150</font> |
| 1   | getRandomnessIndirectly      | 1_323_027    | 1_119_210 | $0.0000014882 | $1.48             | <font color="green">-15_700</font> |
| 2   | getRandomnessSuperIndirectly | 1_358_444    | 1_133_377 | $0.0000015070 | $1.50             | <font color="green">-14_072</font> |
| 3   | returnPromiseVoid            | 1_310_637    | 1_114_254 | $0.0000014816 | $1.48             | <font color="green">-15_455</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name                  | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 1_388_768    | 1_145_507 | $0.0000015231 | $1.52             |
| 1   | getRandomnessIndirectly      | 1_338_727    | 1_125_490 | $0.0000014965 | $1.49             |
| 2   | getRandomnessSuperIndirectly | 1_372_516    | 1_139_006 | $0.0000015145 | $1.51             |
| 3   | returnPromiseVoid            | 1_326_092    | 1_120_436 | $0.0000014898 | $1.48             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
