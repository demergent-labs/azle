# Benchmarks for factorial

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_344_242    | 1_127_696 | $0.0000014995 | $1.49             | <font color="red">+4_817</font>    |
| 1   | fac         | 1_318_944    | 1_117_577 | $0.0000014860 | $1.48             | <font color="green">-11_695</font> |
| 2   | fac         | 1_798_690    | 1_309_476 | $0.0000017412 | $1.74             | <font color="green">-15_943</font> |
| 3   | fac         | 3_100_564    | 1_830_225 | $0.0000024336 | $2.43             | <font color="green">-8_645</font>  |
| 4   | fac         | 5_742_842    | 2_887_136 | $0.0000038389 | $3.83             | <font color="green">-16_953</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_339_425    | 1_125_770 | $0.0000014969 | $1.49             |
| 1   | fac         | 1_330_639    | 1_122_255 | $0.0000014922 | $1.49             |
| 2   | fac         | 1_814_633    | 1_315_853 | $0.0000017497 | $1.74             |
| 3   | fac         | 3_109_209    | 1_833_683 | $0.0000024382 | $2.43             |
| 4   | fac         | 5_759_795    | 2_893_918 | $0.0000038480 | $3.84             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
