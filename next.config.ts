// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // (A) Allow production builds to succeed even if there are ESLint errors.
  //     You can keep linting in CI or fix the issues later.
  eslint: {
    ignoreDuringBuilds: true,
  },


  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },


  // (B) Optional: silence Dart Sass legacy API warnings in the short term.
  //     This only hides the warning; the real fix is upgrading the toolchain.
  //     See: https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
  //     (Uncomment if you want to hide the warnings.)
  // sassOptions: {
  //   silenceDeprecations: ['legacy-js-api'],
  // },

  // (C) Webpack override to relax CSS Modules “purity” so :root is allowed in *.module.scss.
  webpack: (config) => {
    // Helper to normalize "use" to arrays
    const toArray = <T,>(maybe: T | T[] | undefined): T[] =>
      Array.isArray(maybe) ? maybe : maybe ? [maybe] : [];

    config.module?.rules?.forEach((rule: any) => {
      if (!rule?.oneOf) return;

      rule.oneOf.forEach((one: any) => {
        const usesArr = toArray(one.use);
        const maybeSingle = one.loader ? [{ loader: one.loader, options: one.options }] : [];
        const candidates = [...usesArr, ...maybeSingle];

        candidates.forEach((u: any) => {
          const loaderName =
            typeof u === 'string'
              ? u
              : typeof u?.loader === 'string'
              ? u.loader
              : '';

          if (loaderName && loaderName.includes('css-loader')) {
            // Only touch CSS Modules; leave global CSS alone.
            const mods = u.options?.modules;
            if (!mods) return;

            if (mods === true) {
              u.options.modules = {
                mode: 'local',        // relax purity checks
                exportGlobals: true,  // keep global blocks like :root
                namedExport: false,
              };
            } else if (typeof mods === 'object') {
              u.options.modules = {
                ...mods,              // keep existing options (e.g., getLocalIdent)
                mode: 'local',
                exportGlobals: true,
                namedExport: false,
              };
            }
          }
        });

        // Restore original "use" shape (array vs single object)
        if (usesArr.length) {
          if (!Array.isArray(one.use) && one.use) {
            one.use = usesArr[0];
          } else {
            one.use = usesArr;
          }
        }
      });
    });

    return config;
  },
};

export default nextConfig;