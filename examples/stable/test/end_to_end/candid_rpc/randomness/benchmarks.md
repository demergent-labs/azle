# Benchmarks for randomness

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name  | Instructions | Cycles      | USD           | USD/Million Calls | Change                                 |
| --- | ------------ | ------------ | ----------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade  | 991_187_102  | 397_064_840 | $0.0005279652 | $527.96           | <font color="green">-14_327_316</font> |
| 1   | randomNumber | 1_131_205    | 1_042_482   | $0.0000013862 | $1.38             | <font color="green">-9_529</font>      |
| 2   | randomNumber | 1_108_851    | 1_033_540   | $0.0000013743 | $1.37             | <font color="green">-10_943</font>     |
| 3   | randomNumber | 1_109_889    | 1_033_955   | $0.0000013748 | $1.37             | <font color="green">-9_838</font>      |
| 4   | randomNumber | 1_109_080    | 1_033_632   | $0.0000013744 | $1.37             | <font color="green">-10_643</font>     |
| 5   | randomNumber | 1_108_808    | 1_033_523   | $0.0000013742 | $1.37             | <font color="green">-11_327</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name  | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------ | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade  | 1_005_514_418 | 802_795_767 | $0.0010674534 | $1_067.45         |
| 1   | randomNumber | 1_140_734     | 1_046_293   | $0.0000013912 | $1.39             |
| 2   | randomNumber | 1_119_794     | 1_037_917   | $0.0000013801 | $1.38             |
| 3   | randomNumber | 1_119_727     | 1_037_890   | $0.0000013801 | $1.38             |
| 4   | randomNumber | 1_119_723     | 1_037_889   | $0.0000013800 | $1.38             |
| 5   | randomNumber | 1_120_135     | 1_038_054   | $0.0000013803 | $1.38             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
