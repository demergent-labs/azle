# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | getBalance               | 9_144_460    | 4_247_784 | $0.0000056482 | $5.64             | <font color="green">-799</font> |
| 1   | getUtxos                 | 11_260_214   | 5_094_085 | $0.0000067735 | $6.77             | <font color="green">-972</font> |
| 2   | getCurrentFeePercentiles | 5_420_496    | 2_758_198 | $0.0000036675 | $3.66             | <font color="green">-524</font> |
| 3   | sendTransaction          | 7_052_369    | 3_410_947 | $0.0000045354 | $4.53             | <font color="green">-719</font> |
| 4   | getCurrentFeePercentiles | 5_418_866    | 2_757_546 | $0.0000036666 | $3.66             | <font color="green">-503</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_145_259    | 4_248_103 | $0.0000056486 | $5.64             |
| 1   | getUtxos                 | 11_261_186   | 5_094_474 | $0.0000067740 | $6.77             |
| 2   | getCurrentFeePercentiles | 5_421_020    | 2_758_408 | $0.0000036678 | $3.66             |
| 3   | sendTransaction          | 7_053_088    | 3_411_235 | $0.0000045358 | $4.53             |
| 4   | getCurrentFeePercentiles | 5_419_369    | 2_757_747 | $0.0000036669 | $3.66             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
