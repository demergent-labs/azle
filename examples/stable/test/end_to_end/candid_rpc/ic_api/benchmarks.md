⚠️ **WARNING: Benchmark process failed for version 0.33.0**

# Benchmarks for ic_api

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | dataCertificateNull | 1_755_419    | 1_292_167 | $0.0000017182 | $1.71             | <font color="red">+10_131</font> |
| 1   | certifiedDataSet    | 1_241_425    | 1_086_570 | $0.0000014448 | $1.44             | <font color="green">-469</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | dataCertificateNull | 1_745_288    | 1_288_115 | $0.0000017128 | $1.71             |
| 1   | setCertifiedData    | 1_241_894    | 1_086_757 | $0.0000014450 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
