# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 48_897_840_679 | 38_759_726_271 | $0.0515376452 | $51_537.64        | <font color="red">+71_327_946</font> |
| 1   | http_request_update | 55_013_286     | 22_595_314     | $0.0000300443 | $30.04            | <font color="red">+133_760</font>    |
| 2   | http_request_update | 939_659_454    | 376_453_781    | $0.0005005593 | $500.55           | <font color="red">+123_467</font>    |
| 3   | http_request_update | 6_822_927_817  | 5_129_761_126  | $0.0068208895 | $6_820.88         | <font color="green">-216_197</font>  |
| 4   | http_request_update | 6_669_391_296  | 5_068_346_518  | $0.0067392283 | $6_739.22         | <font color="red">+388_176</font>    |
| 5   | http_request_update | 12_391_535_250 | 9_757_204_100  | $0.0129738616 | $12_973.86        | <font color="red">+794_381</font>    |
| 6   | http_request_update | 939_597_027    | 376_428_810    | $0.0005005261 | $500.52           | <font color="red">+72_034</font>     |
| 7   | http_request_update | 3_341_472_350  | 2_537_178_940  | $0.0033736107 | $3_373.61         | <font color="red">+580_079</font>    |
| 8   | http_request_update | 11_328_048_745 | 8_931_809_498  | $0.0118763591 | $11_876.35        | <font color="red">+339_725</font>    |
| 9   | http_request_update | 11_334_842_542 | 8_934_527_016  | $0.0118799725 | $11_879.97        | <font color="red">+718_536</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_826_512_733 | 38_731_195_093 | $0.0514997082 | $51_499.70        |
| 1   | http_request_update | 54_879_526     | 22_541_810     | $0.0000299732 | $29.97            |
| 2   | http_request_update | 939_535_987    | 376_404_394    | $0.0005004936 | $500.49           |
| 3   | http_request_update | 6_823_144_014  | 5_129_847_605  | $0.0068210045 | $6_821.00         |
| 4   | http_request_update | 6_669_003_120  | 5_068_191_248  | $0.0067390219 | $6_739.02         |
| 5   | http_request_update | 12_390_740_869 | 9_756_886_347  | $0.0129734391 | $12_973.43        |
| 6   | http_request_update | 939_524_993    | 376_399_997    | $0.0005004878 | $500.48           |
| 7   | http_request_update | 3_340_892_271  | 2_536_946_908  | $0.0033733022 | $3_373.30         |
| 8   | http_request_update | 11_327_709_020 | 8_931_673_608  | $0.0118761784 | $11_876.17        |
| 9   | http_request_update | 11_334_124_006 | 8_934_239_602  | $0.0118795904 | $11_879.59        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
