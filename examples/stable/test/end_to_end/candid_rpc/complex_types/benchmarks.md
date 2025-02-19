# Benchmarks for complex_types

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 19_705_803   | 8_472_321  | $0.0000112654 | $11.26            | <font color="green">-162_989</font> |
| 1   | createThread   | 20_958_837   | 8_973_534  | $0.0000119318 | $11.93            | <font color="green">-149_982</font> |
| 2   | createPost     | 23_499_053   | 9_989_621  | $0.0000132829 | $13.28            | <font color="green">-146_131</font> |
| 3   | createReaction | 26_580_068   | 11_222_027 | $0.0000149216 | $14.92            | <font color="green">-211_708</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 19_868_792   | 8_537_516  | $0.0000113521 | $11.35            |
| 1   | createThread   | 21_108_819   | 9_033_527  | $0.0000120116 | $12.01            |
| 2   | createPost     | 23_645_184   | 10_048_073 | $0.0000133606 | $13.36            |
| 3   | createReaction | 26_791_776   | 11_306_710 | $0.0000150342 | $15.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
