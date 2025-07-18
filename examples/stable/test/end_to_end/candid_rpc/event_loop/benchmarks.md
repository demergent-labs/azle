# Benchmarks for event_loop

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | testOrdering0  | 3_796_240    | 2_108_496 | $0.0000028036 | $2.80             |
| 1   | testOrdering2  | 3_747_275    | 2_088_910 | $0.0000027776 | $2.77             |
| 2   | testOrdering4  | 3_790_543    | 2_106_217 | $0.0000028006 | $2.80             |
| 3   | testOrdering6  | 719_940      | 877_976   | $0.0000011674 | $1.16             |
| 4   | testOrdering8  | 3_649_604    | 2_049_841 | $0.0000027256 | $2.72             |
| 5   | testOrdering10 | 764_335      | 895_734   | $0.0000011910 | $1.19             |
| 6   | testOrdering12 | 3_745_939    | 2_088_375 | $0.0000027768 | $2.77             |
| 7   | testOrdering13 | 628_214      | 841_285   | $0.0000011186 | $1.11             |
| 8   | testOrdering14 | 627_387      | 840_954   | $0.0000011182 | $1.11             |
| 9   | testOrdering15 | 630_139      | 842_055   | $0.0000011197 | $1.11             |
| 10  | testOrdering16 | 628_240      | 841_296   | $0.0000011186 | $1.11             |
| 11  | testOrdering17 | 656_579      | 852_631   | $0.0000011337 | $1.13             |
| 12  | testOrdering18 | 628_605      | 841_442   | $0.0000011188 | $1.11             |
| 13  | testOrdering19 | 738_559      | 885_423   | $0.0000011773 | $1.17             |
| 14  | testOrdering20 | 672_489      | 858_995   | $0.0000011422 | $1.14             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
