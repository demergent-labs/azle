import { uploadFiles } from './file_uploader';
import { getFilesToUpload } from './file_uploader/get_files_to_upload';

export async function runCommand(): Promise<void> {
    const canisterName = process.argv[3];
    const srcPath = process.argv[4];
    const destPath = process.argv[5];
    const filesToUpload = await getFilesToUpload(
        canisterName,
        srcPath,
        destPath
    );
    await uploadFiles(canisterName, filesToUpload);
}
