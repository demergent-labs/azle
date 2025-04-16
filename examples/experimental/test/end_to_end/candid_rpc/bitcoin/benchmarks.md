# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBalance               | 158_684_908  | 64_063_963 | $0.0000851839 | $85.18            | <font color="red">+144_008</font>  |
| 1   | getUtxos                 | 160_510_297  | 64_794_118 | $0.0000861548 | $86.15            | <font color="red">+84_660</font>   |
| 2   | getCurrentFeePercentiles | 156_761_019  | 63_294_407 | $0.0000841607 | $84.16            | <font color="green">-27_099</font> |
| 3   | sendTransaction          | 157_315_639  | 63_516_255 | $0.0000844557 | $84.45            | <font color="red">+30_137</font>   |
| 4   | getCurrentFeePercentiles | 156_746_687  | 63_288_674 | $0.0000841531 | $84.15            | <font color="green">-11_490</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 158_540_900  | 64_006_360 | $0.0000851073 | $85.10            |
| 1   | getUtxos                 | 160_425_637  | 64_760_254 | $0.0000861098 | $86.10            |
| 2   | getCurrentFeePercentiles | 156_788_118  | 63_305_247 | $0.0000841751 | $84.17            |
| 3   | sendTransaction          | 157_285_502  | 63_504_200 | $0.0000844396 | $84.43            |
| 4   | getCurrentFeePercentiles | 156_758_177  | 63_293_270 | $0.0000841592 | $84.15            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
