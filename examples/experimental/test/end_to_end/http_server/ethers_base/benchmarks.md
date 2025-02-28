# Benchmarks for server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_521_695_243 | 5_809_268_097 | $0.0077244095 | $7_724.40         | <font color="green">-133_518</font> |
| 1   | http_request_update | 173_340_199   | 69_926_079    | $0.0000929786 | $92.97            | <font color="red">+1_033_519</font> |
| 2   | http_request_update | 173_992_136   | 70_186_854    | $0.0000933254 | $93.32            | <font color="red">+1_221_893</font> |
| 3   | http_request_update | 213_183_407   | 85_863_362    | $0.0001141699 | $114.16           | <font color="red">+1_119_828</font> |
| 4   | http_request_update | 212_894_155   | 85_747_662    | $0.0001140161 | $114.01           | <font color="red">+790_902</font>   |
| 5   | http_request_update | 2_343_725_751 | 1_738_080_300 | $0.0023110732 | $2_311.07         | <font color="red">+815_779</font>   |
| 6   | http_request_update | 213_283_341   | 85_903_336    | $0.0001142231 | $114.22           | <font color="red">+1_032_682</font> |
| 7   | http_request_update | 193_799_536   | 78_109_814    | $0.0001038603 | $103.86           | <font color="red">+1_090_258</font> |
| 8   | http_request_update | 212_783_682   | 85_703_472    | $0.0001139573 | $113.95           | <font color="red">+919_424</font>   |
| 9   | http_request_update | 212_998_660   | 85_789_464    | $0.0001140717 | $114.07           | <font color="red">+1_160_526</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_521_828_761 | 5_809_321_504 | $0.0077244805 | $7_724.48         |
| 1   | http_request_update | 172_306_680   | 69_512_672    | $0.0000924289 | $92.42            |
| 2   | http_request_update | 172_770_243   | 69_698_097    | $0.0000926755 | $92.67            |
| 3   | http_request_update | 212_063_579   | 85_415_431    | $0.0001135743 | $113.57           |
| 4   | http_request_update | 212_103_253   | 85_431_301    | $0.0001135954 | $113.59           |
| 5   | http_request_update | 2_342_909_972 | 1_737_753_988 | $0.0023106393 | $2_310.63         |
| 6   | http_request_update | 212_250_659   | 85_490_263    | $0.0001136738 | $113.67           |
| 7   | http_request_update | 192_709_278   | 77_673_711    | $0.0001032804 | $103.28           |
| 8   | http_request_update | 211_864_258   | 85_335_703    | $0.0001134683 | $113.46           |
| 9   | http_request_update | 211_838_134   | 85_325_253    | $0.0001134544 | $113.45           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
