import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import pkg from '../package.json'

function entry (input, output) {
  return {
    input,
    output,
    watch: {
      include: '../src/**'
    },
    plugins: [
      peerDepsExternal(),
      json(),
      resolve(),
      commonjs(),
      typescript({
        tsconfigDefaults: {
          extendedDiagnostics: process.env.NODE_ENV === 'production'
        },
        useTsconfigDeclarationDir: true,
        // objectHashIgnoreUnknownHack: true,
      }),
    ].concat(process.env.NODE_ENV === 'production'
      ? [
        sourceMaps(),
        terser(),
        analyze({
          summaryOnly: true
        })
      ]
      : [])
  }
}

export default [
  entry('src/main.ts', [
    {
      dir: 'dist',
      name: pkg.name,
      format: 'cjs',
      sourcemap: process.env.NODE_ENV !== 'production'
    }
  ])
]
