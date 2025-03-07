# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 48_826_512_733 | 38_731_195_093 | $0.0514997082 | $51_499.70        | <font color="green">-782_329</font> |
| 1   | http_request_update | 54_879_526     | 22_541_810     | $0.0000299732 | $29.97            | <font color="green">-12_272</font>  |
| 2   | http_request_update | 939_535_987    | 376_404_394    | $0.0005004936 | $500.49           | <font color="green">-117_432</font> |
| 3   | http_request_update | 6_823_144_014  | 5_129_847_605  | $0.0068210045 | $6_821.00         | <font color="red">+348_934</font>   |
| 4   | http_request_update | 6_669_003_120  | 5_068_191_248  | $0.0067390219 | $6_739.02         | <font color="red">+84_423</font>    |
| 5   | http_request_update | 12_390_740_869 | 9_756_886_347  | $0.0129734391 | $12_973.43        | <font color="green">-253_501</font> |
| 6   | http_request_update | 939_524_993    | 376_399_997    | $0.0005004878 | $500.48           | <font color="green">-36_082</font>  |
| 7   | http_request_update | 3_340_892_271  | 2_536_946_908  | $0.0033733022 | $3_373.30         | <font color="green">-603_242</font> |
| 8   | http_request_update | 11_327_709_020 | 8_931_673_608  | $0.0118761784 | $11_876.17        | <font color="green">-152_177</font> |
| 9   | http_request_update | 11_334_124_006 | 8_934_239_602  | $0.0118795904 | $11_879.59        | <font color="green">-600_175</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_827_295_062 | 38_731_508_024 | $0.0515001243 | $51_500.12        |
| 1   | http_request_update | 54_891_798     | 22_546_719     | $0.0000299797 | $29.97            |
| 2   | http_request_update | 939_653_419    | 376_451_367    | $0.0005005561 | $500.55           |
| 3   | http_request_update | 6_822_795_080  | 5_129_708_032  | $0.0068208189 | $6_820.81         |
| 4   | http_request_update | 6_668_918_697  | 5_068_157_478  | $0.0067389770 | $6_738.97         |
| 5   | http_request_update | 12_390_994_370 | 9_756_987_748  | $0.0129735739 | $12_973.57        |
| 6   | http_request_update | 939_561_075    | 376_414_430    | $0.0005005070 | $500.50           |
| 7   | http_request_update | 3_341_495_513  | 2_537_188_205  | $0.0033736230 | $3_373.62         |
| 8   | http_request_update | 11_327_861_197 | 8_931_734_478  | $0.0118762594 | $11_876.25        |
| 9   | http_request_update | 11_334_724_181 | 8_934_479_672  | $0.0118799096 | $11_879.90        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
