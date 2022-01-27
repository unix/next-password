import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import babel from 'rollup-plugin-babel'
import { join } from 'path'

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const paths = {
  middleware: join(__dirname, '../', 'libs/middleware.ts'),
  components: join(__dirname, '../', 'libs/index.ts'),
}

const makePlugins = (isComponent = false) => [
  babel({
    exclude: 'node_modules/**',
    extensions,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    ...(isComponent
      ? {
          runtimeHelpers: true,
        }
      : {
          babelrc: false,
        }),
  }),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
  visualizer(),
]

const external = id => /^react|react-dom|next\/server|next\/head/.test(id)

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

export default [
  {
    input: paths.middleware,
    output: [
      {
        entryFileNames: 'middleware.js',
        format: 'cjs',
        exports: 'named',
        dir: 'dist',
        globals,
      },
    ],
    external,
    plugins: makePlugins(),
  },
  {
    input: paths.components,
    output: [
      {
        entryFileNames: 'index.js',
        format: 'cjs',
        exports: 'named',
        dir: 'dist',
        globals,
      },
    ],
    external,
    plugins: makePlugins(true),
  },
]
