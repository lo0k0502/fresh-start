export const isMac = navigator.userAgent.includes('Mac OS X');

export const directions = ['left', 'right', 'up', 'down'] as const;

export const mimetypes = {
  pdf: ['application/pdf'],
  font: ['font/collection', 'font/otf', 'font/sfnt', 'font/ttf', 'font/woff', 'font/woff2'],
  image: ['image/avif', 'image/bmp', 'image/gif', 'image/vnd.microsoft.icon', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/tiff', 'image/webp'],
  video: ['video/x-msvideo', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/mp2t', 'video/webm', 'video/3gpp', 'video/3gpp2', 'video/quicktime'],
  text: ['text/plain'],
};

export const byteUnit = 1024;
export const byteQualifiers = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
