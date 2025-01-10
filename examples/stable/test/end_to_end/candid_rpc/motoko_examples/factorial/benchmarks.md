# Benchmarks for factorial

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | fac         | 1_339_425    | 1_125_770 | $0.0000014969 | $1.49             | <font color="red">+68_237</font>  |
| 1   | fac         | 1_330_639    | 1_122_255 | $0.0000014922 | $1.49             | <font color="red">+66_650</font>  |
| 2   | fac         | 1_814_633    | 1_315_853 | $0.0000017497 | $1.74             | <font color="red">+82_277</font>  |
| 3   | fac         | 3_109_209    | 1_833_683 | $0.0000024382 | $2.43             | <font color="red">+125_543</font> |
| 4   | fac         | 5_759_795    | 2_893_918 | $0.0000038480 | $3.84             | <font color="red">+234_152</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_271_188    | 1_098_475 | $0.0000014606 | $1.46             |
| 1   | fac         | 1_263_989    | 1_095_595 | $0.0000014568 | $1.45             |
| 2   | fac         | 1_732_356    | 1_282_942 | $0.0000017059 | $1.70             |
| 3   | fac         | 2_983_666    | 1_783_466 | $0.0000023714 | $2.37             |
| 4   | fac         | 5_525_643    | 2_800_257 | $0.0000037234 | $3.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
