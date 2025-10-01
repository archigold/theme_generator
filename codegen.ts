import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Use your Vendure backend's Shop API URL
  schema: 'https://stablecommerce.ai/mgmt/shop-api',
  documents: 'src/**/*.ts', // Adjust to match your project file structure
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        scalars: {
          Money: 'number',
        },
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
};

export default config;
