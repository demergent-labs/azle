import { acceptMessage } from './accept_message';
import { argDataRaw } from './arg_data_raw';
import { argDataRawSize } from './arg_data_raw_size';
import { call } from './call';
import { callRaw } from './call_raw';
import { callRaw128 } from './call_raw_128';
import { caller } from './caller';
import { candidDecode } from './candid_decode';
import { candidEncode } from './candid_encode';
import { canisterBalance } from './canister_balance';
import { canisterBalance128 } from './canister_balance_128';
import { canisterVersion } from './canister_version';
import { clearTimer } from './clear_timer';
import { dataCertificate } from './data_certificate';
import { id } from './id';
import { instructionCounter } from './instruction_counter';
import { isController } from './is_controller';
import { methodName } from './method_name';
import { msgCyclesAccept } from './msg_cycles_accept';
import { msgCyclesAccept128 } from './msg_cycles_accept_128';
import { msgCyclesAvailable } from './msg_cycles_available';
import { msgCyclesAvailable128 } from './msg_cycles_available_128';
import { msgCyclesRefunded } from './msg_cycles_refunded';
import { msgCyclesRefunded128 } from './msg_cycles_refunded_128';
import { notify } from './notify';
import { notifyRaw } from './notify_raw';
import { performanceCounter } from './performance_counter';
import { print } from './print';
import { reject } from './reject';
import { rejectCode } from './reject_code';
import { rejectMessage } from './reject_message';
import { reply } from './reply';
import { replyRaw } from './reply_raw';
import { setCertifiedData } from './set_certified_data';
import { setTimer } from './set_timer';
import { setTimerInterval } from './set_timer_interval';
import { stable64Grow } from './stable_64_grow';
import { stable64Read } from './stable_64_read';
import { stable64Size } from './stable_64_size';
import { stable64Write } from './stable_64_write';
import { stableBytes } from './stable_bytes';
import { stableGrow } from './stable_grow';
import { stableRead } from './stable_read';
import { stableSize } from './stable_size';
import { stableWrite } from './stable_write';
import { time } from './time';
import { trap } from './trap';

export * from './types';

/** API entrypoint for interacting with the Internet Computer */
export const ic = {
    acceptMessage,
    argDataRawSize,
    argDataRaw,
    call,
    callRaw,
    callRaw128,
    caller,
    candidDecode,
    candidEncode,
    canisterBalance,
    canisterBalance128,
    canisterVersion,
    clearTimer,
    dataCertificate,
    id,
    instructionCounter,
    isController,
    methodName,
    msgCyclesAccept,
    msgCyclesAccept128,
    msgCyclesAvailable,
    msgCyclesAvailable128,
    msgCyclesRefunded,
    msgCyclesRefunded128,
    notify,
    notifyRaw,
    performanceCounter,
    print,
    reject,
    rejectCode,
    rejectMessage,
    reply,
    replyRaw,
    setCertifiedData,
    setTimer,
    setTimerInterval,
    stableBytes,
    stableGrow,
    stableRead,
    stableSize,
    stableWrite,
    stable64Grow,
    stable64Read,
    stable64Size,
    stable64Write,
    time,
    trap
};
