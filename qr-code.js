const logoImageFile = 'logo.png';

function createQrCodeWithLogoMarkup(url, size) {
  const qr = qrcode(0, 'H');
  qr.addData(url);
  qr.make();

  const moduleCount = qr.getModuleCount();
  let darkModulesPath = '';
  for (let row = 0; row < moduleCount; row++) {
    for (let column = 0; column < moduleCount; column++) {
      if (qr.isDark(row, column)) {
        darkModulesPath += `M${column} ${row}h1v1h-1z`;
      }
    }
  }

  const center = size / 2;
  const logoImageSize = size * 0.22;
  const logoBackingSize = logoImageSize * 1.2;

  return `
    <path d="${darkModulesPath}" fill="#000" shape-rendering="crispEdges"
          transform="scale(${size / moduleCount})"/>
    <rect x="${center - logoBackingSize / 2}" y="${center - logoBackingSize / 2}"
          width="${logoBackingSize}" height="${logoBackingSize}"
          rx="${logoBackingSize * 0.18}" fill="#fff"/>
    <image href="${logoImageFile}" x="${center - logoImageSize / 2}" y="${center - logoImageSize / 2}"
           width="${logoImageSize}" height="${logoImageSize}"/>`;
}
