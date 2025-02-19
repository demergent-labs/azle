# Benchmarks for async_await

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRandomnessDirectly        | 151_080_860  | 61_022_344 | $0.0000811396 | $81.13            | <font color="green">-91_873</font>  |
| 1   | getRandomnessIndirectly      | 151_071_291  | 61_018_516 | $0.0000811345 | $81.13            | <font color="green">-270_601</font> |
| 2   | getRandomnessSuperIndirectly | 151_102_323  | 61_030_929 | $0.0000811510 | $81.15            | <font color="green">-165_888</font> |
| 3   | returnPromiseVoid            | 151_105_215  | 61_032_086 | $0.0000811525 | $81.15            | <font color="green">-127_056</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                  | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ---------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getRandomnessDirectly        | 151_172_733  | 61_059_093 | $0.0000811884 | $81.18            |
| 1   | getRandomnessIndirectly      | 151_341_892  | 61_126_756 | $0.0000812784 | $81.27            |
| 2   | getRandomnessSuperIndirectly | 151_268_211  | 61_097_284 | $0.0000812392 | $81.23            |
| 3   | returnPromiseVoid            | 151_232_271  | 61_082_908 | $0.0000812201 | $81.22            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
