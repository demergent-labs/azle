# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBalance               | 9_137_641    | 4_245_056 | $0.0000056445 | $5.64             | <font color="green">-60_229</font> |
| 1   | getUtxos                 | 11_240_379   | 5_086_151 | $0.0000067629 | $6.76             | <font color="green">-54_073</font> |
| 2   | getCurrentFeePercentiles | 5_400_146    | 2_750_058 | $0.0000036567 | $3.65             | <font color="green">-64_592</font> |
| 3   | sendTransaction          | 7_043_163    | 3_407_265 | $0.0000045305 | $4.53             | <font color="green">-60_741</font> |
| 4   | getCurrentFeePercentiles | 5_402_204    | 2_750_881 | $0.0000036578 | $3.65             | <font color="green">-90_416</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_197_870    | 4_269_148 | $0.0000056766 | $5.67             |
| 1   | getUtxos                 | 11_294_452   | 5_107_780 | $0.0000067917 | $6.79             |
| 2   | getCurrentFeePercentiles | 5_464_738    | 2_775_895 | $0.0000036910 | $3.69             |
| 3   | sendTransaction          | 7_103_904    | 3_431_561 | $0.0000045628 | $4.56             |
| 4   | getCurrentFeePercentiles | 5_492_620    | 2_787_048 | $0.0000037059 | $3.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
