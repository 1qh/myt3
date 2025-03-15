import ts from 'typescript-eslint'
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order'

export default [
  {
    ignores: [
      '**/.*',
      '**/dist/*',
      '**/packages/ui/src/components/sidebar.tsx',
      '**/trpc/react.tsx',
      '**/trpc/server.tsx'
    ]
  },
  sortKeysCustomOrder.configs['flat/recommended'],
  ...ts.configs.stylistic
]
