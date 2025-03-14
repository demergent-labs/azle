⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | getBalance               | 9_197_870    | 4_269_148 | $0.0000056766 | $5.67             | <font color="red">+53_410</font> |
| 1   | getUtxos                 | 11_294_452   | 5_107_780 | $0.0000067917 | $6.79             | <font color="red">+34_238</font> |
| 2   | getCurrentFeePercentiles | 5_464_738    | 2_775_895 | $0.0000036910 | $3.69             | <font color="red">+44_242</font> |
| 3   | sendTransaction          | 7_103_904    | 3_431_561 | $0.0000045628 | $4.56             | <font color="red">+51_535</font> |
| 4   | getCurrentFeePercentiles | 5_492_620    | 2_787_048 | $0.0000037059 | $3.70             | <font color="red">+73_754</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_144_460    | 4_247_784 | $0.0000056482 | $5.64             |
| 1   | getUtxos                 | 11_260_214   | 5_094_085 | $0.0000067735 | $6.77             |
| 2   | getCurrentFeePercentiles | 5_420_496    | 2_758_198 | $0.0000036675 | $3.66             |
| 3   | sendTransaction          | 7_052_369    | 3_410_947 | $0.0000045354 | $4.53             |
| 4   | getCurrentFeePercentiles | 5_418_866    | 2_757_546 | $0.0000036666 | $3.66             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
