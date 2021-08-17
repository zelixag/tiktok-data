import wrapDownloadUrl from './wrapDownloadUrl';

export default function wdu(originalDownloadUrl, xtenantid = 'xtenantid') {
  return wrapDownloadUrl(originalDownloadUrl, 'dsahjg', 'vmsxuid', xtenantid);
}