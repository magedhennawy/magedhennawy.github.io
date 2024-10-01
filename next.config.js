/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'i.redd.it' },
      { hostname: 'github.com' },
      { hostname: 'careers.publicissapient.com' },
      { hostname: 'media.licdn.com' },
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: '1000logos.net' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'www.cdnlogo.com' },
      { hostname: 'seeklogo.com' },
      { hostname: 'cdn4.iconfinder.com' },
      { hostname: 'diglib.org' },
      { hostname: 'pngimg.com' },
      { hostname: 'gwinnetttech.edu' },
      { hostname: '1526789230-files.gitbook.io' },
      { hostname: 'asset.brandfetch.io' },
    ],
  },
};

module.exports = nextConfig;
