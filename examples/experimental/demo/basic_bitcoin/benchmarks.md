# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 8_055_838_944 | 6_422_925_577 | $0.0085403715 | $8_540.37         | <font color="red">+62_402_447</font> |
| 1   | http_request_update | 172_876_675   | 69_740_670    | $0.0000927321 | $92.73            | <font color="green">-85_305</font>   |
| 2   | http_request_update | 172_927_874   | 69_761_149    | $0.0000927593 | $92.75            | <font color="red">+33_760</font>     |
| 3   | http_request_update | 173_316_154   | 69_916_461    | $0.0000929658 | $92.96            | <font color="red">+9_221</font>      |
| 4   | http_request_update | 172_873_093   | 69_739_237    | $0.0000927302 | $92.73            | <font color="green">-164_857</font>  |
| 5   | http_request_update | 172_924_548   | 69_759_819    | $0.0000927575 | $92.75            | <font color="green">-2_696</font>    |
| 6   | http_request_update | 173_322_904   | 69_919_161    | $0.0000929694 | $92.96            | <font color="red">+61_617</font>     |
| 7   | http_request_update | 172_895_629   | 69_748_251    | $0.0000927422 | $92.74            | <font color="green">-155_786</font>  |
| 8   | http_request_update | 175_207_732   | 70_673_092    | $0.0000939719 | $93.97            | <font color="green">-148_156</font>  |
| 9   | http_request_update | 171_634_232   | 69_243_692    | $0.0000920713 | $92.07            | <font color="green">-147_711</font>  |
| 10  | http_request_update | 173_378_322   | 69_941_328    | $0.0000929989 | $92.99            | <font color="green">-67_801</font>   |
| 11  | http_request_update | 180_181_432   | 72_662_572    | $0.0000966172 | $96.61            | <font color="green">-163_621</font>  |
| 12  | http_request_update | 173_329_902   | 69_921_960    | $0.0000929731 | $92.97            | <font color="green">-81_734</font>   |
| 13  | http_request_update | 172_851_404   | 69_730_561    | $0.0000927186 | $92.71            | <font color="green">-196_926</font>  |
| 14  | http_request_update | 173_302_854   | 69_911_141    | $0.0000929587 | $92.95            | <font color="green">-204_497</font>  |
| 15  | http_request_update | 171_691_943   | 69_266_777    | $0.0000921020 | $92.10            | <font color="red">+22_514</font>     |
| 16  | http_request_update | 173_851_350   | 70_130_540    | $0.0000932505 | $93.25            | <font color="green">-11_988</font>   |
| 17  | http_request_update | 173_480_096   | 69_982_038    | $0.0000930530 | $93.05            | <font color="green">-44_149</font>   |
| 18  | http_request_update | 173_095_793   | 69_828_317    | $0.0000928486 | $92.84            | <font color="green">-39_710</font>   |
| 19  | http_request_update | 173_595_946   | 70_028_378    | $0.0000931146 | $93.11            | <font color="green">-55_794</font>   |
| 20  | http_request_update | 171_704_414   | 69_271_765    | $0.0000921086 | $92.10            | <font color="green">-99_974</font>   |
| 21  | http_request_update | 171_696_865   | 69_268_746    | $0.0000921046 | $92.10            | <font color="green">-108_153</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_993_436_497 | 5_997_964_598 | $0.0079753136 | $7_975.31         |
| 1   | http_request_update | 172_961_980   | 69_774_792    | $0.0000927774 | $92.77            |
| 2   | http_request_update | 172_894_114   | 69_747_645    | $0.0000927414 | $92.74            |
| 3   | http_request_update | 173_306_933   | 69_912_773    | $0.0000929609 | $92.96            |
| 4   | http_request_update | 173_037_950   | 69_805_180    | $0.0000928179 | $92.81            |
| 5   | http_request_update | 172_927_244   | 69_760_897    | $0.0000927590 | $92.75            |
| 6   | http_request_update | 173_261_287   | 69_894_514    | $0.0000929366 | $92.93            |
| 7   | http_request_update | 173_051_415   | 69_810_566    | $0.0000928250 | $92.82            |
| 8   | http_request_update | 175_355_888   | 70_732_355    | $0.0000940507 | $94.05            |
| 9   | http_request_update | 171_781_943   | 69_302_777    | $0.0000921498 | $92.14            |
| 10  | http_request_update | 173_446_123   | 69_968_449    | $0.0000930349 | $93.03            |
| 11  | http_request_update | 180_345_053   | 72_728_021    | $0.0000967043 | $96.70            |
| 12  | http_request_update | 173_411_636   | 69_954_654    | $0.0000930166 | $93.01            |
| 13  | http_request_update | 173_048_330   | 69_809_332    | $0.0000928234 | $92.82            |
| 14  | http_request_update | 173_507_351   | 69_992_940    | $0.0000930675 | $93.06            |
| 15  | http_request_update | 171_669_429   | 69_257_771    | $0.0000920900 | $92.08            |
| 16  | http_request_update | 173_863_338   | 70_135_335    | $0.0000932569 | $93.25            |
| 17  | http_request_update | 173_524_245   | 69_999_698    | $0.0000930765 | $93.07            |
| 18  | http_request_update | 173_135_503   | 69_844_201    | $0.0000928697 | $92.86            |
| 19  | http_request_update | 173_651_740   | 70_050_696    | $0.0000931443 | $93.14            |
| 20  | http_request_update | 171_804_388   | 69_311_755    | $0.0000921618 | $92.16            |
| 21  | http_request_update | 171_805_018   | 69_312_007    | $0.0000921621 | $92.16            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
