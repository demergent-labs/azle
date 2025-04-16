# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBalance               | 9_211_071    | 4_274_428 | $0.0000056836 | $5.68             | <font color="red">+13_201</font>   |
| 1   | getUtxos                 | 11_308_673   | 5_113_469 | $0.0000067992 | $6.79             | <font color="red">+14_221</font>   |
| 2   | getCurrentFeePercentiles | 5_465_069    | 2_776_027 | $0.0000036912 | $3.69             | <font color="red">+331</font>      |
| 3   | sendTransaction          | 7_102_145    | 3_430_858 | $0.0000045619 | $4.56             | <font color="green">-1_759</font>  |
| 4   | getCurrentFeePercentiles | 5_472_999    | 2_779_199 | $0.0000036954 | $3.69             | <font color="green">-19_621</font> |

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
