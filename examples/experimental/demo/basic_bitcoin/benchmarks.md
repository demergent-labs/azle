# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 7_799_912_203 | 5_920_554_881 | $0.0078723842 | $7_872.38         | <font color="green">-193_524_294</font> |
| 1   | http_request_update | 173_378_731   | 69_941_492    | $0.0000929991 | $92.99            | <font color="red">+416_751</font>       |
| 2   | http_request_update | 173_407_955   | 69_953_182    | $0.0000930146 | $93.01            | <font color="red">+513_841</font>       |
| 3   | http_request_update | 173_926_195   | 70_160_478    | $0.0000932903 | $93.29            | <font color="red">+619_262</font>       |
| 4   | http_request_update | 173_332_084   | 69_922_833    | $0.0000929743 | $92.97            | <font color="red">+294_134</font>       |
| 5   | http_request_update | 173_145_834   | 69_848_333    | $0.0000928752 | $92.87            | <font color="red">+218_590</font>       |
| 6   | http_request_update | 173_809_804   | 70_113_921    | $0.0000932284 | $93.22            | <font color="red">+548_517</font>       |
| 7   | http_request_update | 173_325_776   | 69_920_310    | $0.0000929709 | $92.97            | <font color="red">+274_361</font>       |
| 8   | http_request_update | 175_653_300   | 70_851_320    | $0.0000942089 | $94.20            | <font color="red">+297_412</font>       |
| 9   | http_request_update | 172_052_870   | 69_411_148    | $0.0000922939 | $92.29            | <font color="red">+270_927</font>       |
| 10  | http_request_update | 173_779_921   | 70_101_968    | $0.0000932125 | $93.21            | <font color="red">+333_798</font>       |
| 11  | http_request_update | 180_685_937   | 72_864_374    | $0.0000968856 | $96.88            | <font color="red">+340_884</font>       |
| 12  | http_request_update | 173_695_113   | 70_068_045    | $0.0000931674 | $93.16            | <font color="red">+283_477</font>       |
| 13  | http_request_update | 173_357_954   | 69_933_181    | $0.0000929881 | $92.98            | <font color="red">+309_624</font>       |
| 14  | http_request_update | 173_835_957   | 70_124_382    | $0.0000932423 | $93.24            | <font color="red">+328_606</font>       |
| 15  | http_request_update | 172_160_133   | 69_454_053    | $0.0000923510 | $92.35            | <font color="red">+490_704</font>       |
| 16  | http_request_update | 210_261_726   | 84_694_690    | $0.0001126160 | $112.61           | <font color="red">+36_398_388</font>    |
| 17  | http_request_update | 173_916_248   | 70_156_499    | $0.0000932850 | $93.28            | <font color="red">+392_003</font>       |
| 18  | http_request_update | 173_473_506   | 69_979_402    | $0.0000930495 | $93.04            | <font color="red">+338_003</font>       |
| 19  | http_request_update | 174_009_281   | 70_193_712    | $0.0000933345 | $93.33            | <font color="red">+357_541</font>       |
| 20  | http_request_update | 172_114_558   | 69_435_823    | $0.0000923267 | $92.32            | <font color="red">+310_170</font>       |
| 21  | http_request_update | 172_083_551   | 69_423_420    | $0.0000923102 | $92.31            | <font color="red">+278_533</font>       |

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
