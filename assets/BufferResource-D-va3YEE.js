var F=Object.defineProperty,E=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var g=(e,t,a)=>t in e?F(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,_=(e,t)=>{for(var a in t||(t={}))D.call(t,a)&&g(e,a,t[a]);if(y)for(var a of y(t))O.call(t,a)&&g(e,a,t[a]);return e},S=(e,t)=>E(e,M(t));import{w as T,g as I,d,u as A,B as U,e as m,E as k,f as p}from"./index-DmpmXgf3.js";const $={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;


        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},j={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}};function q(e,t){var a,f,n;for(const r in e.attributes){const i=e.attributes[r],o=t[r];o?((a=i.format)!=null||(i.format=o.format),(f=i.offset)!=null||(i.offset=o.offset),(n=i.instance)!=null||(i.instance=o.instance)):T(`Attribute ${r} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}w(e)}function w(e){var r,i;const{buffers:t,attributes:a}=e,f={},n={};for(const o in t){const s=t[o];f[s.uid]=0,n[s.uid]=0}for(const o in a){const s=a[o];f[s.buffer.uid]+=I(s.format).stride}for(const o in a){const s=a[o];(r=s.stride)!=null||(s.stride=f[s.buffer.uid]),(i=s.start)!=null||(s.start=n[s.buffer.uid]),n[s.buffer.uid]+=I(s.format).stride}}const l=[];l[d.NONE]=void 0;l[d.DISABLED]={stencilWriteMask:0,stencilReadMask:0};l[d.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};l[d.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};l[d.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};l[d.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};class z{constructor(t){this._syncFunctionHash=Object.create(null),this._adaptor=t,this._systemCheck()}_systemCheck(){if(!A())throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(t){const a=this.getUniformGroupData(t);t.buffer||(t.buffer=new U({data:new Float32Array(a.layout.size/4),usage:m.UNIFORM|m.COPY_DST}))}getUniformGroupData(t){return this._syncFunctionHash[t._signature]||this._initUniformGroup(t)}_initUniformGroup(t){const a=t._signature;let f=this._syncFunctionHash[a];if(!f){const n=Object.keys(t.uniformStructures).map(o=>t.uniformStructures[o]),r=this._adaptor.createUboElements(n),i=this._generateUboSync(r.uboElements);f=this._syncFunctionHash[a]={layout:r,syncFunction:i}}return this._syncFunctionHash[a]}_generateUboSync(t){return this._adaptor.generateUboSync(t)}syncUniformGroup(t,a,f){const n=this.getUniformGroupData(t);t.buffer||(t.buffer=new U({data:new Float32Array(n.layout.size/4),usage:m.UNIFORM|m.COPY_DST}));let r=null;return a||(a=t.buffer.data,r=t.buffer.dataInt32),f||(f=0),n.syncFunction(t.uniforms,a,r,f),!0}updateUniformGroup(t){if(t.isStatic&&!t._dirtyId)return!1;t._dirtyId=0;const a=this.syncUniformGroup(t);return t.buffer.update(),a}destroy(){this._syncFunctionHash=null}}const h=[{type:"mat3x3<f32>",test:e=>e.value.a!==void 0,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:e=>e.type==="vec4<f32>"&&e.size===1&&e.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:e=>e.type==="vec2<f32>"&&e.size===1&&e.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:e=>e.type==="vec4<f32>"&&e.size===1&&e.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:e=>e.type==="vec3<f32>"&&e.size===1&&e.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function H(e,t,a,f){const n=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `];let r=0;for(let o=0;o<e.length;o++){const s=e[o],b=s.data.name;let x=!1,u=0;for(let v=0;v<h.length;v++)if(h[v].test(s.data)){u=s.offset/4,n.push(`name = "${b}";`,`offset += ${u-r};`,h[v][t]||h[v].ubo),x=!0;break}if(!x)if(s.data.size>1)u=s.offset/4,n.push(a(s,u-r));else{const v=f[s.data.type];u=s.offset/4,n.push(`
                    v = uv.${b};
                    offset += ${u-r};
                    ${v};
                `)}r=u}const i=n.join(`
`);return new Function("uv","data","dataInt32","offset",i)}function c(e,t){return`
        for (let i = 0; i < ${e*t}; i++) {
            data[offset + (((i / ${e})|0) * 4) + (i % ${e})] = v[i];
        }
    `}const B={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":c(3,2),"mat4x2<f32>":c(4,2),"mat2x3<f32>":c(2,3),"mat4x3<f32>":c(4,3),"mat2x4<f32>":c(2,4),"mat3x4<f32>":c(3,4)},P=S(_({},B),{"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `});class V extends k{constructor({buffer:t,offset:a,size:f}){super(),this.uid=p("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=p("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=t,this.offset=a|0,this.size=f,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=p("resource"),this.emit("change",this)}destroy(t=!1){this.destroyed=!0,t&&this.buffer.destroy(),this.emit("change",this),this.buffer=null,this.removeAllListeners()}}export{V as B,l as G,z as U,B as a,h as b,H as c,j as d,q as e,$ as t,P as u};
