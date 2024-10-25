# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 13_928_154_984 | 10_771_851_993 | $0.0143230084 | $14_323.00        |
| 1   | http_request_update | 164_249_606    | 66_289_842     | $0.0000881436 | $88.14            |
| 2   | http_request_update | 164_240_485    | 66_286_194     | $0.0000881388 | $88.13            |
| 3   | http_request_update | 164_899_706    | 66_549_882     | $0.0000884894 | $88.48            |
| 4   | http_request_update | 164_399_521    | 66_349_808     | $0.0000882233 | $88.22            |
| 5   | http_request_update | 164_240_550    | 66_286_220     | $0.0000881388 | $88.13            |
| 6   | http_request_update | 165_154_723    | 66_651_889     | $0.0000886250 | $88.62            |
| 7   | http_request_update | 164_345_794    | 66_328_317     | $0.0000881948 | $88.19            |
| 8   | http_request_update | 167_233_386    | 67_483_354     | $0.0000897306 | $89.73            |
| 9   | http_request_update | 163_104_007    | 65_831_602     | $0.0000875343 | $87.53            |
| 10  | http_request_update | 164_818_601    | 66_517_440     | $0.0000884462 | $88.44            |
| 11  | http_request_update | 172_419_400    | 69_557_760     | $0.0000924889 | $92.48            |
| 12  | http_request_update | 164_689_083    | 66_465_633     | $0.0000883774 | $88.37            |
| 13  | http_request_update | 164_362_301    | 66_334_920     | $0.0000882036 | $88.20            |
| 14  | http_request_update | 165_067_569    | 66_617_027     | $0.0000885787 | $88.57            |
| 15  | http_request_update | 163_032_220    | 65_802_888     | $0.0000874961 | $87.49            |
| 16  | http_request_update | 165_439_367    | 66_765_746     | $0.0000887764 | $88.77            |
| 17  | http_request_update | 164_744_899    | 66_487_959     | $0.0000884070 | $88.40            |
| 18  | http_request_update | 164_406_004    | 66_352_401     | $0.0000882268 | $88.22            |
| 19  | http_request_update | 165_104_048    | 66_631_619     | $0.0000885981 | $88.59            |
| 20  | http_request_update | 163_136_587    | 65_844_634     | $0.0000875516 | $87.55            |
| 21  | http_request_update | 163_037_498    | 65_804_999     | $0.0000874989 | $87.49            |

## Baseline benchmarks Azle version: 0.24.2-rc.60

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
