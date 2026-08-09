/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  // Lets phones/other devices on the local network load dev-server JS
  // assets when testing via http://<your-computer's-LAN-IP>:3000
  allowedDevOrigins: ["192.168.1.88"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvayqag5w/**",
      },
    ],
  },
  experimental: {
    // Powers the native <ViewTransition> used in PageTransition. Aliases
    // React to the canary build that ships the component.
    viewTransition: true,
  },
};

export default nextConfig;
