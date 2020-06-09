/**
 * Created by Jaron Long on 2019/10/21
 */
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import pkg from '../package.json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
const { entrysDir } = require('./entry')

const libraryName = 'HelperGdpUtils'

function entry(input, output) {
  return {
    input,
    output,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['window', 'document'],
    watch: {
      include: 'src/**'
    },
    plugins: [
      // Allow json resolution
      json(),
      peerDepsExternal(),
      // Compile TypeScript files
      typescript({
        tsconfigDefaults: {
          extendedDiagnostics: process.env.NODE_ENV === 'production'
        },
        useTsconfigDeclarationDir: true,
        objectHashIgnoreUnknownHack: true,
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        browser: true
      }),

      // Resolve source maps to the original source
      sourceMaps()
    ].concat(process.env.NODE_ENV === 'production'
      ? [
        // Minify
        terser(),
        analyze({
          summaryOnly: true
        })
      ]
      : [])
  }
}

export default [
  entry(entrysDir, [
    {
      dir: 'lib',
      name: libraryName,
      format: 'es',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].js',
      sourcemap: false // process.env.NODE_ENV !== 'production'
    }
  ])
]
