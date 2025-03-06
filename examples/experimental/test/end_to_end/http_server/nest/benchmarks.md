# Benchmarks for api

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 11_845_239_159 | 9_138_685_663 | $0.0121514362 | $12_151.43        | <font color="red">+5_515_672</font> |
| 1   | http_request_update | 44_512_769     | 18_395_107    | $0.0000244594 | $24.45            | <font color="red">+28_062</font>    |
| 2   | http_request_update | 44_341_206     | 18_326_482    | $0.0000243682 | $24.36            | <font color="green">-26_819</font>  |
| 3   | http_request_update | 43_483_163     | 17_983_265    | $0.0000239118 | $23.91            | <font color="red">+53_560</font>    |
| 4   | http_request_update | 53_167_971     | 21_857_188    | $0.0000290628 | $29.06            | <font color="red">+22_424</font>    |
| 5   | http_request_update | 45_059_200     | 18_613_680    | $0.0000247501 | $24.75            | <font color="green">-29_268</font>  |
| 6   | http_request_update | 44_960_510     | 18_574_204    | $0.0000246976 | $24.69            | <font color="green">-28_661</font>  |
| 7   | http_request_update | 44_120_187     | 18_238_074    | $0.0000242506 | $24.25            | <font color="green">-23_219</font>  |
| 8   | http_request_update | 47_386_011     | 19_544_404    | $0.0000259876 | $25.98            | <font color="green">-26_085</font>  |
| 9   | http_request_update | 44_853_936     | 18_531_574    | $0.0000246409 | $24.64            | <font color="red">+28_453</font>    |
| 10  | http_request_update | 44_745_445     | 18_488_178    | $0.0000245832 | $24.58            | <font color="red">+18_558</font>    |
| 11  | http_request_update | 43_902_713     | 18_151_085    | $0.0000241350 | $24.13            | <font color="green">-5_076</font>   |
| 12  | http_request_update | 47_192_051     | 19_466_820    | $0.0000258844 | $25.88            | <font color="green">-14_569</font>  |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_839_723_487 | 9_136_479_394 | $0.0121485026 | $12_148.50        |
| 1   | http_request_update | 44_484_707     | 18_383_882    | $0.0000244445 | $24.44            |
| 2   | http_request_update | 44_368_025     | 18_337_210    | $0.0000243824 | $24.38            |
| 3   | http_request_update | 43_429_603     | 17_961_841    | $0.0000238833 | $23.88            |
| 4   | http_request_update | 53_145_547     | 21_848_218    | $0.0000290509 | $29.05            |
| 5   | http_request_update | 45_088_468     | 18_625_387    | $0.0000247656 | $24.76            |
| 6   | http_request_update | 44_989_171     | 18_585_668    | $0.0000247128 | $24.71            |
| 7   | http_request_update | 44_143_406     | 18_247_362    | $0.0000242630 | $24.26            |
| 8   | http_request_update | 47_412_096     | 19_554_838    | $0.0000260015 | $26.00            |
| 9   | http_request_update | 44_825_483     | 18_520_193    | $0.0000246257 | $24.62            |
| 10  | http_request_update | 44_726_887     | 18_480_754    | $0.0000245733 | $24.57            |
| 11  | http_request_update | 43_907_789     | 18_153_115    | $0.0000241377 | $24.13            |
| 12  | http_request_update | 47_206_620     | 19_472_648    | $0.0000258922 | $25.89            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
