import { UploadFileNamePipe } from './upload-file-name.pipe';

describe('UploadFileNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UploadFileNamePipe();
    expect(pipe).toBeTruthy();
  });
});
