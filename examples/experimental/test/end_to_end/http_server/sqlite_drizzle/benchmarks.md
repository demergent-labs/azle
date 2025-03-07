⚠️ **WARNING: Benchmark process failed for version 0.29.0**

⚠️ **WARNING: Benchmark process failed for version 0.28.0**

⚠️ **WARNING: Benchmark process failed for version 0.27.0**

⚠️ **WARNING: Benchmark process failed for version 0.26.0**

# Benchmarks for sqlite_drizzle

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | postUpgrade         | 13_327_269_224 | 10_531_497_689 | $0.0140034165 | $14_003.41        | <font color="red">+130_419_189</font> |
| 1   | http_request_update | 153_701_211    | 62_070_484     | $0.0000825333 | $82.53            | <font color="red">+47_821</font>      |
| 2   | http_request_update | 81_097_589     | 33_029_035     | $0.0000439177 | $43.91            | <font color="red">+33_035</font>      |
| 3   | http_request_update | 170_928_510    | 68_961_404     | $0.0000916959 | $91.69            | <font color="red">+242_837</font>     |
| 4   | http_request_update | 77_808_318     | 31_713_327     | $0.0000421683 | $42.16            | <font color="red">+92_064</font>      |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_196_850_035 | 10_479_330_014 | $0.0139340507 | $13_934.05        |
| 1   | http_request_update | 153_653_390    | 62_051_356     | $0.0000825078 | $82.50            |
| 2   | http_request_update | 81_064_554     | 33_015_821     | $0.0000439001 | $43.90            |
| 3   | http_request_update | 170_685_673    | 68_864_269     | $0.0000915668 | $91.56            |
| 4   | http_request_update | 77_716_254     | 31_676_501     | $0.0000421193 | $42.11            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
