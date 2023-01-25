import iconv from 'iconv-lite';

const decodeString = (buf: string) => {
  return iconv.decode(Buffer.from(buf, 'binary'), 'cp1251').toString();
};

export default decodeString;
