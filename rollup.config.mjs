import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
        }
    ],
    plugins: [
        replace({
            preventAssignment: true,
            'this': 'undefined',
        }),
        postcss({
            modules: false,
            extract: false,
            inject: true
        }),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' })
    ],
    external: ['react', 'react-dom', 'zustand', 'react-confetti', 'react-use', 'sonner', 'howler']
};
