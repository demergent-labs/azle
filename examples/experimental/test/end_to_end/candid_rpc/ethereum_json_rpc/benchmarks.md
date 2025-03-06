# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 5_092_783_385 | 4_037_703_354 | $0.0053688130 | $5_368.81         | <font color="red">+1_714_548</font> |
| 1   | ethGetBalance       | 180_938_296   | 72_965_318    | $0.0000970198 | $97.01            | <font color="red">+1_209_665</font> |
| 2   | ethGetBalance       | 180_845_327   | 72_928_130    | $0.0000969703 | $96.97            | <font color="red">+904_352</font>   |
| 3   | ethGetBalance       | 180_889_929   | 72_945_971    | $0.0000969941 | $96.99            | <font color="red">+1_137_998</font> |
| 4   | ethGetBlockByNumber | 179_657_910   | 72_453_164    | $0.0000963388 | $96.33            | <font color="red">+1_037_533</font> |
| 5   | ethGetBlockByNumber | 179_634_673   | 72_443_869    | $0.0000963264 | $96.32            | <font color="red">+1_121_552</font> |
| 6   | ethGetBlockByNumber | 179_691_416   | 72_466_566    | $0.0000963566 | $96.35            | <font color="red">+1_002_061</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_091_068_837 | 4_037_017_534 | $0.0053679011 | $5_367.90         |
| 1   | ethGetBalance       | 179_728_631   | 72_481_452    | $0.0000963764 | $96.37            |
| 2   | ethGetBalance       | 179_940_975   | 72_566_390    | $0.0000964894 | $96.48            |
| 3   | ethGetBalance       | 179_751_931   | 72_490_772    | $0.0000963888 | $96.38            |
| 4   | ethGetBlockByNumber | 178_620_377   | 72_038_150    | $0.0000957870 | $95.78            |
| 5   | ethGetBlockByNumber | 178_513_121   | 71_995_248    | $0.0000957299 | $95.72            |
| 6   | ethGetBlockByNumber | 178_689_355   | 72_065_742    | $0.0000958237 | $95.82            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
