'use strict';

var h = require('node:child_process');
var t$1 = require('hexo-util');
var t$2 = require('node:fs');
var n$1 = require('node:vm');
var o$2 = require('node:path');

var o$1, i$1, e$1, d, l$1, n, v, t;
!((null === (i$1 = hexo.env) || void 0 === i$1 ? void 0 : null === (o$1 = i$1.cmd) || void 0 === o$1 ? void 0 : o$1.startsWith('n')) || (null === (d = hexo.env) || void 0 === d ? void 0 : null === (e$1 = d.cmd) || void 0 === e$1 ? void 0 : e$1.startsWith('c'))) && (((null === (l$1 = hexo.env) || void 0 === l$1 ? void 0 : l$1.cmd) === 's' || (null === (n = hexo.env) || void 0 === n ? void 0 : n.cmd) === 'server') && (hexo.log.info('Starting js watch changer...'), h.exec('pnpm watch', {
    cwd: './themes/SoSimple'
})), ((null === (v = hexo.env) || void 0 === v ? void 0 : v.cmd.startsWith('g')) || (null === (t = hexo.env) || void 0 === t ? void 0 : t.cmd.startsWith('d'))) && (hexo.log.info('Building js...'), h.execSync('pnpm build', {
    cwd: './themes/SoSimple',
    stdio: 'inherit'
}), hexo.log.info('Build successful!')));

hexo.extend.generator.register('searchpage', ()=>({
        path: 'search/',
        layout: [
            'search'
        ]
    })), hexo.extend.generator.register('tags', (e)=>({
        path: 'tags/',
        layout: [
            'tags'
        ],
        data: Object.assign({}, e, {
            __tags: !0
        })
    })), hexo.extend.generator.register('categories', (e)=>({
        path: 'categories/',
        layout: [
            'categories'
        ],
        data: Object.assign({}, e, {
            __categories: !0
        })
    }));

hexo.extend.generator.register('insight', (e)=>{
    function r(e) {
        var r;
        return {
            title: e.title,
            text: (r = e.content || "", t$1.stripHTML(r).trim().replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/&#x([\da-fA-F]+);/g, (t, e)=>String.fromCharCode(Number.parseInt(e, 16))).replace(/&#([\d]+);/g, (t, e)=>String.fromCharCode(e))),
            link: e.path || ""
        };
    }
    function a(t) {
        return {
            name: t.name,
            slug: t.slug,
            link: t.path || ""
        };
    }
    return {
        path: '/content.json',
        data: JSON.stringify({
            pages: e.pages.map(r),
            posts: e.posts.map(r),
            tags: e.tags.map(a),
            categories: e.categories.map(a)
        })
    };
});

var e, r$1;
let i = (null === (e = hexo.env) || void 0 === e ? void 0 : e.cmd) === 's' || (null === (r$1 = hexo.env) || void 0 === r$1 ? void 0 : r$1.cmd) === 'server';
function l(e) {
    return function(r) {
        let l = (function(e) {
            if (i) {
                let r = t$2.readFileSync(e).toString(), i = {
                    exports: {}
                }, l = i.exports, m = {
                    module: i,
                    exports: l,
                    require,
                    __dirname: o$2.dirname(e),
                    __filename: e,
                    console
                };
                return n$1.createContext(m), new n$1.Script(r).runInContext(m), i.exports;
            }
            return require(e);
        })(e.path)(r);
        return '<html' === l.slice(0, 5).toLowerCase() && (l = `<!DOCTYPE html>${l}`), l;
    };
}
function m(e, r) {
    return l(e)(r);
}
m.compile = l, m.disableNunjucks = !0, hexo.extend.renderer.register('jsx', 'html', m, !0);

var o, r;
(null === (r = hexo.env) || void 0 === r ? void 0 : null === (o = r.cmd) || void 0 === o ? void 0 : o.startsWith('n')) || hexo.log.info('SoSimple!');
