import regex from '../regex';
import getFilePostfix from './getFilePostfix';

export default function(file) {
  let postfix = getFilePostfix(file);
  return regex.IMAGE_TYPE_POSTFIX.test(postfix);
}