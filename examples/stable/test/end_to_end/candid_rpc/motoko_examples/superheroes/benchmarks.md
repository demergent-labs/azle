# Benchmarks for superheroes

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | create      | 3_762_738    | 2_095_095 | $0.0000027858 | $2.78             | <font color="green">-130_183</font> |
| 1   | create      | 4_829_440    | 2_521_776 | $0.0000033531 | $3.35             | <font color="green">-137_511</font> |
| 2   | update      | 5_167_383    | 2_656_953 | $0.0000035329 | $3.53             | <font color="green">-150_327</font> |
| 3   | update      | 3_625_005    | 2_040_002 | $0.0000027125 | $2.71             | <font color="green">-127_910</font> |
| 4   | deleteHero  | 1_283_743    | 1_103_497 | $0.0000014673 | $1.46             | <font color="green">-12_772</font>  |
| 5   | deleteHero  | 1_273_486    | 1_099_394 | $0.0000014618 | $1.46             | <font color="green">-8_513</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_892_921    | 2_147_168 | $0.0000028550 | $2.85             |
| 1   | create      | 4_966_951    | 2_576_780 | $0.0000034263 | $3.42             |
| 2   | update      | 5_317_710    | 2_717_084 | $0.0000036128 | $3.61             |
| 3   | update      | 3_752_915    | 2_091_166 | $0.0000027806 | $2.78             |
| 4   | deleteHero  | 1_296_515    | 1_108_606 | $0.0000014741 | $1.47             |
| 5   | deleteHero  | 1_281_999    | 1_102_799 | $0.0000014664 | $1.46             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
