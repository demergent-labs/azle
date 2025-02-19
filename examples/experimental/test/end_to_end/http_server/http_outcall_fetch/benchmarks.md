# Benchmarks for server

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_634_634_475 | 5_854_443_790 | $0.0077844783 | $7_784.47         |
| 1   | http_request_update | 195_142_191   | 78_646_876    | $0.0001045744 | $104.57           |
| 2   | http_request_update | 195_020_414   | 78_598_165    | $0.0001045096 | $104.50           |
| 3   | http_request_update | 194_468_669   | 78_377_467    | $0.0001042162 | $104.21           |
| 4   | http_request_update | 190_885_366   | 76_944_146    | $0.0001023103 | $102.31           |
| 5   | http_request_update | 194_963_088   | 78_575_235    | $0.0001044791 | $104.47           |
| 6   | http_request_update | 191_404_099   | 77_151_639    | $0.0001025862 | $102.58           |
| 7   | http_request_update | 191_454_471   | 77_171_788    | $0.0001026130 | $102.61           |
| 8   | http_request_update | 191_337_324   | 77_124_929    | $0.0001025507 | $102.55           |
| 9   | http_request_update | 191_678_287   | 77_261_314    | $0.0001027321 | $102.73           |
| 10  | http_request_update | 191_463_300   | 77_175_320    | $0.0001026177 | $102.61           |
| 11  | http_request_update | 191_627_549   | 77_241_019    | $0.0001027051 | $102.70           |
| 12  | http_request_update | 191_653_035   | 77_251_214    | $0.0001027186 | $102.71           |
| 13  | http_request_update | 191_862_673   | 77_335_069    | $0.0001028301 | $102.83           |
| 14  | http_request_update | 196_468_848   | 79_177_539    | $0.0001052800 | $105.27           |
| 15  | http_request_update | 230_954_401   | 92_971_760    | $0.0001236218 | $123.62           |
| 16  | http_request_update | 193_343_842   | 77_927_536    | $0.0001036179 | $103.61           |
| 17  | http_request_update | 192_310_682   | 77_514_272    | $0.0001030684 | $103.06           |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
