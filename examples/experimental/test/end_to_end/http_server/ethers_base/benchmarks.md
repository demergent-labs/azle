# Benchmarks for server

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_521_828_761 | 5_809_321_504 | $0.0077244805 | $7_724.48         | <font color="green">-3_738_427</font> |
| 1   | http_request_update | 172_306_680   | 69_512_672    | $0.0000924289 | $92.42            | <font color="green">-1_719_366</font> |
| 2   | http_request_update | 172_770_243   | 69_698_097    | $0.0000926755 | $92.67            | <font color="green">-1_983_882</font> |
| 3   | http_request_update | 212_063_579   | 85_415_431    | $0.0001135743 | $113.57           | <font color="green">-1_593_221</font> |
| 4   | http_request_update | 212_103_253   | 85_431_301    | $0.0001135954 | $113.59           | <font color="green">-1_638_491</font> |
| 5   | http_request_update | 2_342_909_972 | 1_737_753_988 | $0.0023106393 | $2_310.63         | <font color="green">-3_629_989</font> |
| 6   | http_request_update | 212_250_659   | 85_490_263    | $0.0001136738 | $113.67           | <font color="green">-1_796_362</font> |
| 7   | http_request_update | 192_709_278   | 77_673_711    | $0.0001032804 | $103.28           | <font color="green">-1_878_985</font> |
| 8   | http_request_update | 211_864_258   | 85_335_703    | $0.0001134683 | $113.46           | <font color="green">-1_728_911</font> |
| 9   | http_request_update | 211_838_134   | 85_325_253    | $0.0001134544 | $113.45           | <font color="green">-2_064_378</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_525_567_188 | 5_810_816_875 | $0.0077264689 | $7_726.46         |
| 1   | http_request_update | 174_026_046   | 70_200_418    | $0.0000933434 | $93.34            |
| 2   | http_request_update | 174_754_125   | 70_491_650    | $0.0000937306 | $93.73            |
| 3   | http_request_update | 213_656_800   | 86_052_720    | $0.0001144217 | $114.42           |
| 4   | http_request_update | 213_741_744   | 86_086_697    | $0.0001144669 | $114.46           |
| 5   | http_request_update | 2_346_539_961 | 1_739_205_984 | $0.0023125700 | $2_312.57         |
| 6   | http_request_update | 214_047_021   | 86_208_808    | $0.0001146293 | $114.62           |
| 7   | http_request_update | 194_588_263   | 78_425_305    | $0.0001042798 | $104.27           |
| 8   | http_request_update | 213_593_169   | 86_027_267    | $0.0001143879 | $114.38           |
| 9   | http_request_update | 213_902_512   | 86_151_004    | $0.0001145524 | $114.55           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
