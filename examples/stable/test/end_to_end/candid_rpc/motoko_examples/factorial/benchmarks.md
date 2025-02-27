# Benchmarks for factorial

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | fac         | 1_330_855    | 1_122_342 | $0.0000014923 | $1.49             | <font color="green">-13_387</font> |
| 1   | fac         | 1_311_332    | 1_114_532 | $0.0000014820 | $1.48             | <font color="green">-7_612</font>  |
| 2   | fac         | 1_789_820    | 1_305_928 | $0.0000017365 | $1.73             | <font color="green">-8_870</font>  |
| 3   | fac         | 3_080_377    | 1_822_150 | $0.0000024229 | $2.42             | <font color="green">-20_187</font> |
| 4   | fac         | 5_686_067    | 2_864_426 | $0.0000038087 | $3.80             | <font color="green">-56_775</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_344_242    | 1_127_696 | $0.0000014995 | $1.49             |
| 1   | fac         | 1_318_944    | 1_117_577 | $0.0000014860 | $1.48             |
| 2   | fac         | 1_798_690    | 1_309_476 | $0.0000017412 | $1.74             |
| 3   | fac         | 3_100_564    | 1_830_225 | $0.0000024336 | $2.43             |
| 4   | fac         | 5_742_842    | 2_887_136 | $0.0000038389 | $3.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
