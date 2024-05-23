import { ActorSubclass } from '@dfinity/agent';
import { jsonStringify } from 'azle';
import { equals, Test, test } from 'azle/test';

import { _SERVICE } from './dfx_generated/audio_recorder/audio_recorder.did';

// TODO to be more thorough we could test all of the error cases as well

type Context = {
    user: any;
    recording: any;
};

export function get_tests(
    audio_recorder_canister: ActorSubclass<_SERVICE>
): Test<Context>[] {
    return [
        {
            name: 'create_user',
            test: async (context) => {
                const user =
                    await audio_recorder_canister.createUser('lastmjs');

                const expectedUsername = 'lastmjs';
                const expectedRecordingCount = 0;

                return test<Context>(
                    () =>
                        user.username === expectedUsername &&
                        user.recordingIds.length === expectedRecordingCount,
                    `Expected user to have username: ${expectedUsername} and ${expectedRecordingCount}; received: ${jsonStringify(
                        user
                    )}`,
                    {
                        ...context, // TODO is this dishonest? That is context is for sure undefined at this point... But it lets me get away with not having user and recording typed as possibly undefined
                        user
                    }
                );
            }
        },
        {
            name: 'create_recording',
            test: async (context) => {
                const result = await audio_recorder_canister.createRecording(
                    Uint8Array.from([0, 1, 2, 3, 4]),
                    'First recording',
                    context.user.id
                );

                if ('Err' in result) {
                    return {
                        Err: JSON.stringify(result.Err, null, 2)
                    };
                }

                const recording = result.Ok;

                return test<Context>(
                    () =>
                        recording.audio.length === 5 &&
                        recording.name === 'First recording' &&
                        recording.userId.toText() === context.user.id.toText(),
                    `Expected `,
                    { ...context, recording }
                );
            }
        },
        {
            name: 'read_users',
            test: async (context) => {
                const result = await audio_recorder_canister.readUsers();

                return equals(result, [context.user]);
            }
        },
        {
            name: 'read_recordings',
            test: async (context) => {
                const result = await audio_recorder_canister.readRecordings();

                return equals(result, [context.recording]);
            }
        },
        {
            name: 'read_user_by_id',
            test: async (context) => {
                const result = await audio_recorder_canister.readUserById(
                    context.user.id
                );

                return equals(result, [context.user]);
            }
        },
        {
            name: 'read_recording_by_id',
            test: async (context) => {
                const result = await audio_recorder_canister.readRecordingById(
                    context.recording.id
                );

                return equals(result, [context.recording]);
            }
        },
        {
            name: 'delete_recording',
            test: async (context) => {
                const delete_recording_result =
                    await audio_recorder_canister.deleteRecording(
                        context.recording.id
                    );

                if ('Err' in delete_recording_result) {
                    return {
                        Err: JSON.stringify(
                            delete_recording_result.Err,
                            null,
                            2
                        )
                    };
                }

                const read_recordings_result =
                    await audio_recorder_canister.readRecordings();
                const read_users_result =
                    await audio_recorder_canister.readUsers();

                return test(
                    () => {
                        return (
                            read_recordings_result.length === 0 &&
                            read_users_result[0].recordingIds.length === 0
                        );
                    },
                    `Expected recording to be deleted; received: ${jsonStringify(
                        read_recordings_result
                    )} ${jsonStringify(read_recordings_result)}`
                );
            }
        },
        {
            name: 'delete_user',
            test: async (context) => {
                const create_recording_result =
                    await audio_recorder_canister.createRecording(
                        Uint8Array.from([]),
                        'second recording',
                        context.user.id
                    );

                if ('Err' in create_recording_result) {
                    return {
                        Err: JSON.stringify(create_recording_result, null, 2)
                    };
                }

                const read_users_before_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_before_result =
                    await audio_recorder_canister.readRecordings();

                const delete_user_result =
                    await audio_recorder_canister.deleteUser(context.user.id);

                if ('Err' in delete_user_result) {
                    return {
                        Err: JSON.stringify(delete_user_result, null, 2)
                    };
                }

                const read_users_after_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_after_result =
                    await audio_recorder_canister.readRecordings();

                return test(() => {
                    return (
                        read_users_before_result[0].recordingIds.length === 1 &&
                        read_recordings_before_result[0].userId.toText() ===
                            context.user.id.toText() &&
                        read_users_after_result.length === 0 &&
                        read_recordings_after_result.length === 0
                    );
                }, `Expected user ${context.user.id.toText()} to be deleted. Received: ${read_users_after_result}`);
            }
        }
    ];
}
