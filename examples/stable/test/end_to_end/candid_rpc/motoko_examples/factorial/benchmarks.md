# Benchmarks for factorial

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_242_625    | 1_087_050 | $0.0000014454 | $1.44             | <font color="green">-28_563</font> |
| 1   | fac         | 1_246_035    | 1_088_414 | $0.0000014472 | $1.44             | <font color="green">-17_954</font> |
| 2   | fac         | 1_715_021    | 1_276_008 | $0.0000016967 | $1.69             | <font color="green">-17_335</font> |
| 3   | fac         | 2_966_378    | 1_776_551 | $0.0000023622 | $2.36             | <font color="green">-17_288</font> |
| 4   | fac         | 5_513_598    | 2_795_439 | $0.0000037170 | $3.71             | <font color="green">-12_045</font> |

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
