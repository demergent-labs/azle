import { ok, Test } from 'azle/test';
import {
    Recording,
    _SERVICE,
    User
} from './dfx_generated/audio_recorder/audio_recorder.did';
import { ActorSubclass } from '@dfinity/agent';

// TODO to be more thorough we could test all of the error cases as well

let global_user: User;
let global_recording: Recording;

export function get_tests(
    audio_recorder_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'create_user',
            test: async () => {
                const result = await audio_recorder_canister.create_user(
                    'lastmjs'
                );

                if (!ok(result)) {
                    return {
                        err: JSON.stringify(result.Err, null, 2)
                    };
                }

                const user = result.Ok;

                global_user = user;

                return {
                    Ok:
                        user.username === 'lastmjs' &&
                        user.recording_ids.length === 0
                };
            }
        },
        {
            name: 'create_recording',
            test: async () => {
                const result = await audio_recorder_canister.create_recording(
                    Uint8Array.from([0, 1, 2, 3, 4]),
                    'First recording',
                    global_user.id
                );

                if (!ok(result)) {
                    return {
                        err: JSON.stringify(result.Err, null, 2)
                    };
                }

                const recording = result.Ok;

                global_recording = recording;

                return {
                    Ok:
                        recording.audio.length === 5 &&
                        recording.name === 'First recording' &&
                        recording.user_id.toText() === global_user.id.toText()
                };
            }
        },
        {
            name: 'read_users',
            test: async () => {
                const result = await audio_recorder_canister.read_users();
                const user = result[0];

                global_user = user;

                return {
                    Ok:
                        result.length === 1 &&
                        user.id.toText() === global_user.id.toText() &&
                        user.created_at === global_user.created_at &&
                        user.username === global_user.username
                };
            }
        },
        {
            name: 'read_recordings',
            test: async () => {
                const result = await audio_recorder_canister.read_recordings();
                const recording = result[0];

                return {
                    Ok:
                        result.length === 1 &&
                        recording.id.toText() ===
                            global_recording.id.toText() &&
                        recording.created_at === global_recording.created_at &&
                        recording.name === global_recording.name &&
                        recording.user_id.toText() ===
                            global_recording.user_id.toText()
                };
            }
        },
        {
            name: 'read_user_by_id',
            test: async () => {
                const result = await audio_recorder_canister.read_user_by_id(
                    global_user.id
                );
                const user = result[0];

                if (user === undefined) {
                    return {
                        err: 'User not found'
                    };
                }

                return {
                    Ok:
                        result.length === 1 &&
                        user.id.toText() === global_user.id.toText() &&
                        user.created_at === global_user.created_at &&
                        user.username === global_user.username &&
                        user.recording_ids.length === 1 &&
                        user.recording_ids[0].toText() ===
                            global_user.recording_ids[0].toText()
                };
            }
        },
        {
            name: 'read_recording_by_id',
            test: async () => {
                const result =
                    await audio_recorder_canister.read_recording_by_id(
                        global_recording.id
                    );
                const recording = result[0];

                if (recording === undefined) {
                    return {
                        err: 'Recording not found'
                    };
                }

                return {
                    Ok:
                        result.length === 1 &&
                        recording.id.toText() ===
                            global_recording.id.toText() &&
                        recording.created_at === global_recording.created_at &&
                        recording.name === global_recording.name &&
                        recording.user_id.toText() ===
                            global_recording.user_id.toText()
                };
            }
        },
        {
            name: 'delete_recording',
            test: async () => {
                const delete_recording_result =
                    await audio_recorder_canister.delete_recording(
                        global_recording.id
                    );

                if (!ok(delete_recording_result)) {
                    return {
                        Err: JSON.stringify(
                            delete_recording_result.Err,
                            null,
                            2
                        )
                    };
                }

                const read_recordings_result =
                    await audio_recorder_canister.read_recordings();
                const read_users_result =
                    await audio_recorder_canister.read_users();

                return {
                    ok:
                        read_recordings_result.length === 0 &&
                        read_users_result[0].recording_ids.length === 0
                };
            }
        },
        {
            name: 'delete_user',
            test: async () => {
                const create_recording_result =
                    await audio_recorder_canister.create_recording(
                        Uint8Array.from([]),
                        'second recording',
                        global_user.id
                    );

                if (!ok(create_recording_result)) {
                    return {
                        Err: JSON.stringify(create_recording_result, null, 2)
                    };
                }

                const read_users_before_result =
                    await audio_recorder_canister.read_users();
                const read_recordings_before_result =
                    await audio_recorder_canister.read_recordings();

                const delete_user_result =
                    await audio_recorder_canister.delete_user(global_user.id);

                if (!ok(delete_user_result)) {
                    return {
                        Err: JSON.stringify(delete_user_result, null, 2)
                    };
                }

                const read_users_after_result =
                    await audio_recorder_canister.read_users();
                const read_recordings_after_result =
                    await audio_recorder_canister.read_recordings();

                return {
                    Ok:
                        read_users_before_result[0].recording_ids.length ===
                            1 &&
                        read_recordings_before_result[0].user_id.toText() ===
                            global_user.id.toText() &&
                        read_users_after_result.length === 0 &&
                        read_recordings_after_result.length === 0
                };
            }
        }
    ];
}
