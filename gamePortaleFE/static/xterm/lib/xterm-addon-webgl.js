!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.WebglAddon = t() : e.WebglAddon = t()
}(self, (function() {
    return (()=>{
        "use strict";
        var e = {
            965: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.GlyphRenderer = void 0;
                const s = i(381)
                  , r = i(855)
                  , o = i(859)
                  , n = i(374)
                  , a = i(509)
                  , h = 11
                  , l = h * Float32Array.BYTES_PER_ELEMENT;
                let c, d = 0, _ = 0, u = 0;
                class g extends o.Disposable {
                    constructor(e, t, i) {
                        super(),
                        this._terminal = e,
                        this._gl = t,
                        this._dimensions = i,
                        this._activeBuffer = 0,
                        this._vertices = {
                            count: 0,
                            attributes: new Float32Array(0),
                            attributesBuffers: [new Float32Array(0), new Float32Array(0)]
                        };
                        const r = this._gl;
                        void 0 === a.TextureAtlas.maxAtlasPages && (a.TextureAtlas.maxAtlasPages = Math.min(32, (0,
                        n.throwIfFalsy)(r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS))),
                        a.TextureAtlas.maxTextureSize = (0,
                        n.throwIfFalsy)(r.getParameter(r.MAX_TEXTURE_SIZE))),
                        this._program = (0,
                        n.throwIfFalsy)((0,
                        s.createProgram)(r, "#version 300 es\nlayout (location = 0) in vec2 a_unitquad;\nlayout (location = 1) in vec2 a_cellpos;\nlayout (location = 2) in vec2 a_offset;\nlayout (location = 3) in vec2 a_size;\nlayout (location = 4) in float a_texpage;\nlayout (location = 5) in vec2 a_texcoord;\nlayout (location = 6) in vec2 a_texsize;\n\nuniform mat4 u_projection;\nuniform vec2 u_resolution;\n\nout vec2 v_texcoord;\nflat out int v_texpage;\n\nvoid main() {\n  vec2 zeroToOne = (a_offset / u_resolution) + a_cellpos + (a_unitquad * a_size);\n  gl_Position = u_projection * vec4(zeroToOne, 0.0, 1.0);\n  v_texpage = int(a_texpage);\n  v_texcoord = a_texcoord + a_unitquad * a_texsize;\n}", function(e) {
                            let t = "";
                            for (let i = 1; i < e; i++)
                                t += ` else if (v_texpage == ${i}) { outColor = texture(u_texture[${i}], v_texcoord); }`;
                            return `#version 300 es\nprecision lowp float;\n\nin vec2 v_texcoord;\nflat in int v_texpage;\n\nuniform sampler2D u_texture[${e}];\n\nout vec4 outColor;\n\nvoid main() {\n  if (v_texpage == 0) {\n    outColor = texture(u_texture[0], v_texcoord);\n  } ${t}\n}`
                        }(a.TextureAtlas.maxAtlasPages))),
                        this.register((0,
                        o.toDisposable)((()=>r.deleteProgram(this._program)))),
                        this._projectionLocation = (0,
                        n.throwIfFalsy)(r.getUniformLocation(this._program, "u_projection")),
                        this._resolutionLocation = (0,
                        n.throwIfFalsy)(r.getUniformLocation(this._program, "u_resolution")),
                        this._textureLocation = (0,
                        n.throwIfFalsy)(r.getUniformLocation(this._program, "u_texture")),
                        this._vertexArrayObject = r.createVertexArray(),
                        r.bindVertexArray(this._vertexArrayObject);
                        const h = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])
                          , c = r.createBuffer();
                        this.register((0,
                        o.toDisposable)((()=>r.deleteBuffer(c)))),
                        r.bindBuffer(r.ARRAY_BUFFER, c),
                        r.bufferData(r.ARRAY_BUFFER, h, r.STATIC_DRAW),
                        r.enableVertexAttribArray(0),
                        r.vertexAttribPointer(0, 2, this._gl.FLOAT, !1, 0, 0);
                        const d = new Uint8Array([0, 1, 2, 3])
                          , _ = r.createBuffer();
                        this.register((0,
                        o.toDisposable)((()=>r.deleteBuffer(_)))),
                        r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, _),
                        r.bufferData(r.ELEMENT_ARRAY_BUFFER, d, r.STATIC_DRAW),
                        this._attributesBuffer = (0,
                        n.throwIfFalsy)(r.createBuffer()),
                        this.register((0,
                        o.toDisposable)((()=>r.deleteBuffer(this._attributesBuffer)))),
                        r.bindBuffer(r.ARRAY_BUFFER, this._attributesBuffer),
                        r.enableVertexAttribArray(2),
                        r.vertexAttribPointer(2, 2, r.FLOAT, !1, l, 0),
                        r.vertexAttribDivisor(2, 1),
                        r.enableVertexAttribArray(3),
                        r.vertexAttribPointer(3, 2, r.FLOAT, !1, l, 2 * Float32Array.BYTES_PER_ELEMENT),
                        r.vertexAttribDivisor(3, 1),
                        r.enableVertexAttribArray(4),
                        r.vertexAttribPointer(4, 1, r.FLOAT, !1, l, 4 * Float32Array.BYTES_PER_ELEMENT),
                        r.vertexAttribDivisor(4, 1),
                        r.enableVertexAttribArray(5),
                        r.vertexAttribPointer(5, 2, r.FLOAT, !1, l, 5 * Float32Array.BYTES_PER_ELEMENT),
                        r.vertexAttribDivisor(5, 1),
                        r.enableVertexAttribArray(6),
                        r.vertexAttribPointer(6, 2, r.FLOAT, !1, l, 7 * Float32Array.BYTES_PER_ELEMENT),
                        r.vertexAttribDivisor(6, 1),
                        r.enableVertexAttribArray(1),
                        r.vertexAttribPointer(1, 2, r.FLOAT, !1, l, 9 * Float32Array.BYTES_PER_ELEMENT),
                        r.vertexAttribDivisor(1, 1),
                        r.useProgram(this._program);
                        const u = new Int32Array(a.TextureAtlas.maxAtlasPages);
                        for (let e = 0; e < a.TextureAtlas.maxAtlasPages; e++)
                            u[e] = e;
                        r.uniform1iv(this._textureLocation, u),
                        r.uniformMatrix4fv(this._projectionLocation, !1, s.PROJECTION_MATRIX),
                        this._atlasTextures = [];
                        for (let e = 0; e < a.TextureAtlas.maxAtlasPages; e++) {
                            const t = new s.GLTexture((0,
                            n.throwIfFalsy)(r.createTexture()));
                            this.register((0,
                            o.toDisposable)((()=>r.deleteTexture(t.texture)))),
                            r.activeTexture(r.TEXTURE0 + e),
                            r.bindTexture(r.TEXTURE_2D, t.texture),
                            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE),
                            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE),
                            r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, 1, 1, 0, r.RGBA, r.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])),
                            this._atlasTextures[e] = t
                        }
                        r.enable(r.BLEND),
                        r.blendFunc(r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA),
                        this.handleResize()
                    }
                    beginFrame() {
                        return !this._atlas || this._atlas.beginFrame()
                    }
                    updateCell(e, t, i, s, r, o, n, a) {
                        this._updateCell(this._vertices.attributes, e, t, i, s, r, o, n, a)
                    }
                    _updateCell(e, t, i, s, o, n, a, l, g) {
                        d = (i * this._terminal.cols + t) * h,
                        s !== r.NULL_CELL_CODE && void 0 !== s ? this._atlas && (c = l && l.length > 1 ? this._atlas.getRasterizedGlyphCombinedChar(l, o, n, a) : this._atlas.getRasterizedGlyph(s, o, n, a),
                        _ = Math.floor((this._dimensions.device.cell.width - this._dimensions.device.char.width) / 2),
                        o !== g && c.offset.x > _ ? (u = c.offset.x - _,
                        e[d] = -(c.offset.x - u) + this._dimensions.device.char.left,
                        e[d + 1] = -c.offset.y + this._dimensions.device.char.top,
                        e[d + 2] = (c.size.x - u) / this._dimensions.device.canvas.width,
                        e[d + 3] = c.size.y / this._dimensions.device.canvas.height,
                        e[d + 4] = c.texturePage,
                        e[d + 5] = c.texturePositionClipSpace.x + u / this._atlas.pages[c.texturePage].canvas.width,
                        e[d + 6] = c.texturePositionClipSpace.y,
                        e[d + 7] = c.sizeClipSpace.x - u / this._atlas.pages[c.texturePage].canvas.width,
                        e[d + 8] = c.sizeClipSpace.y) : (e[d] = -c.offset.x + this._dimensions.device.char.left,
                        e[d + 1] = -c.offset.y + this._dimensions.device.char.top,
                        e[d + 2] = c.size.x / this._dimensions.device.canvas.width,
                        e[d + 3] = c.size.y / this._dimensions.device.canvas.height,
                        e[d + 4] = c.texturePage,
                        e[d + 5] = c.texturePositionClipSpace.x,
                        e[d + 6] = c.texturePositionClipSpace.y,
                        e[d + 7] = c.sizeClipSpace.x,
                        e[d + 8] = c.sizeClipSpace.y)) : e.fill(0, d, d + h - 1 - 2)
                    }
                    clear() {
                        const e = this._terminal
                          , t = e.cols * e.rows * h;
                        this._vertices.count !== t ? this._vertices.attributes = new Float32Array(t) : this._vertices.attributes.fill(0);
                        let i = 0;
                        for (; i < this._vertices.attributesBuffers.length; i++)
                            this._vertices.count !== t ? this._vertices.attributesBuffers[i] = new Float32Array(t) : this._vertices.attributesBuffers[i].fill(0);
                        this._vertices.count = t,
                        i = 0;
                        for (let t = 0; t < e.rows; t++)
                            for (let s = 0; s < e.cols; s++)
                                this._vertices.attributes[i + 9] = s / e.cols,
                                this._vertices.attributes[i + 10] = t / e.rows,
                                i += h
                    }
                    handleResize() {
                        const e = this._gl;
                        e.viewport(0, 0, e.canvas.width, e.canvas.height),
                        e.uniform2f(this._resolutionLocation, e.canvas.width, e.canvas.height),
                        this.clear()
                    }
                    render(e) {
                        if (!this._atlas)
                            return;
                        const t = this._gl;
                        t.useProgram(this._program),
                        t.bindVertexArray(this._vertexArrayObject),
                        this._activeBuffer = (this._activeBuffer + 1) % 2;
                        const i = this._vertices.attributesBuffers[this._activeBuffer];
                        let s = 0;
                        for (let t = 0; t < e.lineLengths.length; t++) {
                            const r = t * this._terminal.cols * h
                              , o = this._vertices.attributes.subarray(r, r + e.lineLengths[t] * h);
                            i.set(o, s),
                            s += o.length
                        }
                        t.bindBuffer(t.ARRAY_BUFFER, this._attributesBuffer),
                        t.bufferData(t.ARRAY_BUFFER, i.subarray(0, s), t.STREAM_DRAW);
                        for (let e = 0; e < this._atlas.pages.length; e++)
                            this._atlas.pages[e].version !== this._atlasTextures[e].version && this._bindAtlasPageTexture(t, this._atlas, e);
                        t.drawElementsInstanced(t.TRIANGLE_STRIP, 4, t.UNSIGNED_BYTE, 0, s / h)
                    }
                    setAtlas(e) {
                        this._atlas = e;
                        for (const e of this._atlasTextures)
                            e.version = -1
                    }
                    _bindAtlasPageTexture(e, t, i) {
                        e.activeTexture(e.TEXTURE0 + i),
                        e.bindTexture(e.TEXTURE_2D, this._atlasTextures[i].texture),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
                        e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.pages[i].canvas),
                        e.generateMipmap(e.TEXTURE_2D),
                        this._atlasTextures[i].version = t.pages[i].version
                    }
                    setDimensions(e) {
                        this._dimensions = e
                    }
                }
                t.GlyphRenderer = g
            }
            ,
            742: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.RectangleRenderer = void 0;
                const s = i(381)
                  , r = i(310)
                  , o = i(859)
                  , n = i(237)
                  , a = i(374)
                  , h = 8 * Float32Array.BYTES_PER_ELEMENT;
                let l = 0
                  , c = !1
                  , d = 0
                  , _ = 0
                  , u = 0
                  , g = 0
                  , v = 0
                  , f = 0;
                class C extends o.Disposable {
                    constructor(e, t, i, r) {
                        super(),
                        this._terminal = e,
                        this._gl = t,
                        this._dimensions = i,
                        this._themeService = r,
                        this._vertices = {
                            count: 0,
                            attributes: new Float32Array(160)
                        };
                        const n = this._gl;
                        this._program = (0,
                        a.throwIfFalsy)((0,
                        s.createProgram)(n, "#version 300 es\nlayout (location = 0) in vec2 a_position;\nlayout (location = 1) in vec2 a_size;\nlayout (location = 2) in vec4 a_color;\nlayout (location = 3) in vec2 a_unitquad;\n\nuniform mat4 u_projection;\n\nout vec4 v_color;\n\nvoid main() {\n  vec2 zeroToOne = a_position + (a_unitquad * a_size);\n  gl_Position = u_projection * vec4(zeroToOne, 0.0, 1.0);\n  v_color = a_color;\n}", "#version 300 es\nprecision lowp float;\n\nin vec4 v_color;\n\nout vec4 outColor;\n\nvoid main() {\n  outColor = v_color;\n}")),
                        this.register((0,
                        o.toDisposable)((()=>n.deleteProgram(this._program)))),
                        this._projectionLocation = (0,
                        a.throwIfFalsy)(n.getUniformLocation(this._program, "u_projection")),
                        this._vertexArrayObject = n.createVertexArray(),
                        n.bindVertexArray(this._vertexArrayObject);
                        const l = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])
                          , c = n.createBuffer();
                        this.register((0,
                        o.toDisposable)((()=>n.deleteBuffer(c)))),
                        n.bindBuffer(n.ARRAY_BUFFER, c),
                        n.bufferData(n.ARRAY_BUFFER, l, n.STATIC_DRAW),
                        n.enableVertexAttribArray(3),
                        n.vertexAttribPointer(3, 2, this._gl.FLOAT, !1, 0, 0);
                        const d = new Uint8Array([0, 1, 2, 3])
                          , _ = n.createBuffer();
                        this.register((0,
                        o.toDisposable)((()=>n.deleteBuffer(_)))),
                        n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, _),
                        n.bufferData(n.ELEMENT_ARRAY_BUFFER, d, n.STATIC_DRAW),
                        this._attributesBuffer = (0,
                        a.throwIfFalsy)(n.createBuffer()),
                        this.register((0,
                        o.toDisposable)((()=>n.deleteBuffer(this._attributesBuffer)))),
                        n.bindBuffer(n.ARRAY_BUFFER, this._attributesBuffer),
                        n.enableVertexAttribArray(0),
                        n.vertexAttribPointer(0, 2, n.FLOAT, !1, h, 0),
                        n.vertexAttribDivisor(0, 1),
                        n.enableVertexAttribArray(1),
                        n.vertexAttribPointer(1, 2, n.FLOAT, !1, h, 2 * Float32Array.BYTES_PER_ELEMENT),
                        n.vertexAttribDivisor(1, 1),
                        n.enableVertexAttribArray(2),
                        n.vertexAttribPointer(2, 4, n.FLOAT, !1, h, 4 * Float32Array.BYTES_PER_ELEMENT),
                        n.vertexAttribDivisor(2, 1),
                        this._updateCachedColors(r.colors),
                        this.register(this._themeService.onChangeColors((e=>{
                            this._updateCachedColors(e),
                            this._updateViewportRectangle()
                        }
                        )))
                    }
                    render() {
                        const e = this._gl;
                        e.useProgram(this._program),
                        e.bindVertexArray(this._vertexArrayObject),
                        e.uniformMatrix4fv(this._projectionLocation, !1, s.PROJECTION_MATRIX),
                        e.bindBuffer(e.ARRAY_BUFFER, this._attributesBuffer),
                        e.bufferData(e.ARRAY_BUFFER, this._vertices.attributes, e.DYNAMIC_DRAW),
                        e.drawElementsInstanced(this._gl.TRIANGLE_STRIP, 4, e.UNSIGNED_BYTE, 0, this._vertices.count)
                    }
                    handleResize() {
                        this._updateViewportRectangle()
                    }
                    setDimensions(e) {
                        this._dimensions = e
                    }
                    _updateCachedColors(e) {
                        this._bgFloat = this._colorToFloat32Array(e.background)
                    }
                    _updateViewportRectangle() {
                        this._addRectangleFloat(this._vertices.attributes, 0, 0, 0, this._terminal.cols * this._dimensions.device.cell.width, this._terminal.rows * this._dimensions.device.cell.height, this._bgFloat)
                    }
                    updateBackgrounds(e) {
                        const t = this._terminal
                          , i = this._vertices;
                        let s, o, n, a, h, l, c, d, _, u, g, v = 1;
                        for (s = 0; s < t.rows; s++) {
                            for (n = -1,
                            a = 0,
                            h = 0,
                            l = !1,
                            o = 0; o < t.cols; o++)
                                c = (s * t.cols + o) * r.RENDER_MODEL_INDICIES_PER_CELL,
                                d = e.cells[c + r.RENDER_MODEL_BG_OFFSET],
                                _ = e.cells[c + r.RENDER_MODEL_FG_OFFSET],
                                u = !!(67108864 & _),
                                (d !== a || _ !== h && (l || u)) && ((0 !== a || l && 0 !== h) && (g = 8 * v++,
                                this._updateRectangle(i, g, h, a, n, o, s)),
                                n = o,
                                a = d,
                                h = _,
                                l = u);
                            (0 !== a || l && 0 !== h) && (g = 8 * v++,
                            this._updateRectangle(i, g, h, a, n, t.cols, s))
                        }
                        i.count = v
                    }
                    _updateRectangle(e, t, i, r, o, a, h) {
                        if (c = !1,
                        67108864 & i)
                            switch (50331648 & i) {
                            case 16777216:
                            case 33554432:
                                l = this._themeService.colors.ansi[255 & i].rgba;
                                break;
                            case 50331648:
                                l = (16777215 & i) << 8;
                                break;
                            default:
                                l = this._themeService.colors.foreground.rgba
                            }
                        else
                            switch (50331648 & r) {
                            case 16777216:
                            case 33554432:
                                l = this._themeService.colors.ansi[255 & r].rgba;
                                break;
                            case 50331648:
                                l = (16777215 & r) << 8;
                                break;
                            default:
                                l = this._themeService.colors.background.rgba,
                                c = !0
                            }
                        e.attributes.length < t + 4 && (e.attributes = (0,
                        s.expandFloat32Array)(e.attributes, this._terminal.rows * this._terminal.cols * 8)),
                        d = o * this._dimensions.device.cell.width,
                        _ = h * this._dimensions.device.cell.height,
                        u = (l >> 24 & 255) / 255,
                        g = (l >> 16 & 255) / 255,
                        v = (l >> 8 & 255) / 255,
                        f = !c && 134217728 & r ? n.DIM_OPACITY : 1,
                        this._addRectangle(e.attributes, t, d, _, (a - o) * this._dimensions.device.cell.width, this._dimensions.device.cell.height, u, g, v, f)
                    }
                    _addRectangle(e, t, i, s, r, o, n, a, h, l) {
                        e[t] = i / this._dimensions.device.canvas.width,
                        e[t + 1] = s / this._dimensions.device.canvas.height,
                        e[t + 2] = r / this._dimensions.device.canvas.width,
                        e[t + 3] = o / this._dimensions.device.canvas.height,
                        e[t + 4] = n,
                        e[t + 5] = a,
                        e[t + 6] = h,
                        e[t + 7] = l
                    }
                    _addRectangleFloat(e, t, i, s, r, o, n) {
                        e[t] = i / this._dimensions.device.canvas.width,
                        e[t + 1] = s / this._dimensions.device.canvas.height,
                        e[t + 2] = r / this._dimensions.device.canvas.width,
                        e[t + 3] = o / this._dimensions.device.canvas.height,
                        e[t + 4] = n[0],
                        e[t + 5] = n[1],
                        e[t + 6] = n[2],
                        e[t + 7] = n[3]
                    }
                    _colorToFloat32Array(e) {
                        return new Float32Array([(e.rgba >> 24 & 255) / 255, (e.rgba >> 16 & 255) / 255, (e.rgba >> 8 & 255) / 255, (255 & e.rgba) / 255])
                    }
                }
                t.RectangleRenderer = C
            }
            ,
            310: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.RenderModel = t.COMBINED_CHAR_BIT_MASK = t.RENDER_MODEL_EXT_OFFSET = t.RENDER_MODEL_FG_OFFSET = t.RENDER_MODEL_BG_OFFSET = t.RENDER_MODEL_INDICIES_PER_CELL = void 0;
                const s = i(296);
                t.RENDER_MODEL_INDICIES_PER_CELL = 4,
                t.RENDER_MODEL_BG_OFFSET = 1,
                t.RENDER_MODEL_FG_OFFSET = 2,
                t.RENDER_MODEL_EXT_OFFSET = 3,
                t.COMBINED_CHAR_BIT_MASK = 2147483648,
                t.RenderModel = class {
                    constructor() {
                        this.cells = new Uint32Array(0),
                        this.lineLengths = new Uint32Array(0),
                        this.selection = (0,
                        s.createSelectionRenderModel)()
                    }
                    resize(e, i) {
                        const s = e * i * t.RENDER_MODEL_INDICIES_PER_CELL;
                        s !== this.cells.length && (this.cells = new Uint32Array(s),
                        this.lineLengths = new Uint32Array(i))
                    }
                    clear() {
                        this.cells.fill(0, 0),
                        this.lineLengths.fill(0, 0)
                    }
                }
            }
            ,
            666: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.JoinedCellData = t.WebglRenderer = void 0;
                const s = i(820)
                  , r = i(274)
                  , o = i(627)
                  , n = i(56)
                  , a = i(374)
                  , h = i(147)
                  , l = i(782)
                  , c = i(855)
                  , d = i(345)
                  , _ = i(859)
                  , u = i(965)
                  , g = i(742)
                  , v = i(461)
                  , f = i(733)
                  , C = i(310);
                class p extends _.Disposable {
                    constructor(e, t, i, h, c, u, g, p, m) {
                        super(),
                        this._terminal = e,
                        this._characterJoinerService = t,
                        this._charSizeService = i,
                        this._coreBrowserService = h,
                        this._decorationService = u,
                        this._optionsService = g,
                        this._themeService = p,
                        this._model = new C.RenderModel,
                        this._workCell = new l.CellData,
                        this._onChangeTextureAtlas = this.register(new d.EventEmitter),
                        this.onChangeTextureAtlas = this._onChangeTextureAtlas.event,
                        this._onAddTextureAtlasCanvas = this.register(new d.EventEmitter),
                        this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event,
                        this._onRemoveTextureAtlasCanvas = this.register(new d.EventEmitter),
                        this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event,
                        this._onRequestRedraw = this.register(new d.EventEmitter),
                        this.onRequestRedraw = this._onRequestRedraw.event,
                        this._onContextLoss = this.register(new d.EventEmitter),
                        this.onContextLoss = this._onContextLoss.event,
                        this.register(this._themeService.onChangeColors((()=>this._handleColorChange()))),
                        this._cellColorResolver = new r.CellColorResolver(this._terminal,this._model.selection,this._decorationService,this._coreBrowserService,this._themeService),
                        this._core = this._terminal._core,
                        this._renderLayers = [new f.LinkRenderLayer(this._core.screenElement,2,this._terminal,this._core.linkifier2,this._coreBrowserService,g,this._themeService), new v.CursorRenderLayer(e,this._core.screenElement,3,this._onRequestRedraw,this._coreBrowserService,c,g,this._themeService)],
                        this.dimensions = (0,
                        a.createRenderDimensions)(),
                        this._devicePixelRatio = this._coreBrowserService.dpr,
                        this._updateDimensions(),
                        this.register(g.onOptionChange((()=>this._handleOptionsChanged()))),
                        this._canvas = document.createElement("canvas");
                        const x = {
                            antialias: !1,
                            depth: !1,
                            preserveDrawingBuffer: m
                        };
                        if (this._gl = this._canvas.getContext("webgl2", x),
                        !this._gl)
                            throw new Error("WebGL2 not supported " + this._gl);
                        this.register((0,
                        s.addDisposableDomListener)(this._canvas, "webglcontextlost", (e=>{
                            console.log("webglcontextlost event received"),
                            e.preventDefault(),
                            this._contextRestorationTimeout = setTimeout((()=>{
                                this._contextRestorationTimeout = void 0,
                                console.warn("webgl context not restored; firing onContextLoss"),
                                this._onContextLoss.fire(e)
                            }
                            ), 3e3)
                        }
                        ))),
                        this.register((0,
                        s.addDisposableDomListener)(this._canvas, "webglcontextrestored", (e=>{
                            console.warn("webglcontextrestored event received"),
                            clearTimeout(this._contextRestorationTimeout),
                            this._contextRestorationTimeout = void 0,
                            (0,
                            o.removeTerminalFromCache)(this._terminal),
                            this._initializeWebGLState(),
                            this._requestRedrawViewport()
                        }
                        ))),
                        this.register((0,
                        n.observeDevicePixelDimensions)(this._canvas, this._coreBrowserService.window, ((e,t)=>this._setCanvasDevicePixelDimensions(e, t)))),
                        this._core.screenElement.appendChild(this._canvas),
                        [this._rectangleRenderer,this._glyphRenderer] = this._initializeWebGLState(),
                        this._isAttached = this._coreBrowserService.window.document.body.contains(this._core.screenElement),
                        this.register((0,
                        _.toDisposable)((()=>{
                            var e;
                            for (const e of this._renderLayers)
                                e.dispose();
                            null === (e = this._canvas.parentElement) || void 0 === e || e.removeChild(this._canvas),
                            (0,
                            o.removeTerminalFromCache)(this._terminal)
                        }
                        )))
                    }
                    get textureAtlas() {
                        var e;
                        return null === (e = this._charAtlas) || void 0 === e ? void 0 : e.pages[0].canvas
                    }
                    _handleColorChange() {
                        this._refreshCharAtlas(),
                        this._clearModel(!0)
                    }
                    handleDevicePixelRatioChange() {
                        this._devicePixelRatio !== this._coreBrowserService.dpr && (this._devicePixelRatio = this._coreBrowserService.dpr,
                        this.handleResize(this._terminal.cols, this._terminal.rows))
                    }
                    handleResize(e, t) {
                        this._updateDimensions(),
                        this._model.resize(this._terminal.cols, this._terminal.rows);
                        for (const e of this._renderLayers)
                            e.resize(this._terminal, this.dimensions);
                        this._canvas.width = this.dimensions.device.canvas.width,
                        this._canvas.height = this.dimensions.device.canvas.height,
                        this._canvas.style.width = `${this.dimensions.css.canvas.width}px`,
                        this._canvas.style.height = `${this.dimensions.css.canvas.height}px`,
                        this._core.screenElement.style.width = `${this.dimensions.css.canvas.width}px`,
                        this._core.screenElement.style.height = `${this.dimensions.css.canvas.height}px`,
                        this._rectangleRenderer.setDimensions(this.dimensions),
                        this._rectangleRenderer.handleResize(),
                        this._glyphRenderer.setDimensions(this.dimensions),
                        this._glyphRenderer.handleResize(),
                        this._refreshCharAtlas(),
                        this._clearModel(!1)
                    }
                    handleCharSizeChanged() {
                        this.handleResize(this._terminal.cols, this._terminal.rows)
                    }
                    handleBlur() {
                        for (const e of this._renderLayers)
                            e.handleBlur(this._terminal);
                        this._requestRedrawViewport()
                    }
                    handleFocus() {
                        for (const e of this._renderLayers)
                            e.handleFocus(this._terminal);
                        this._requestRedrawViewport()
                    }
                    handleSelectionChanged(e, t, i) {
                        for (const s of this._renderLayers)
                            s.handleSelectionChanged(this._terminal, e, t, i);
                        this._model.selection.update(this._terminal, e, t, i),
                        this._requestRedrawViewport()
                    }
                    handleCursorMove() {
                        for (const e of this._renderLayers)
                            e.handleCursorMove(this._terminal)
                    }
                    _handleOptionsChanged() {
                        this._updateDimensions(),
                        this._refreshCharAtlas()
                    }
                    _initializeWebGLState() {
                        var e, t;
                        return null === (e = this._rectangleRenderer) || void 0 === e || e.dispose(),
                        null === (t = this._glyphRenderer) || void 0 === t || t.dispose(),
                        this._rectangleRenderer = this.register(new g.RectangleRenderer(this._terminal,this._gl,this.dimensions,this._themeService)),
                        this._glyphRenderer = this.register(new u.GlyphRenderer(this._terminal,this._gl,this.dimensions)),
                        this.handleCharSizeChanged(),
                        [this._rectangleRenderer, this._glyphRenderer]
                    }
                    _refreshCharAtlas() {
                        var e;
                        if (this.dimensions.device.char.width <= 0 && this.dimensions.device.char.height <= 0)
                            return void (this._isAttached = !1);
                        const t = (0,
                        o.acquireTextureAtlas)(this._terminal, this._optionsService.rawOptions, this._themeService.colors, this.dimensions.device.cell.width, this.dimensions.device.cell.height, this.dimensions.device.char.width, this.dimensions.device.char.height, this._coreBrowserService.dpr);
                        this._charAtlas !== t && (null === (e = this._charAtlasDisposable) || void 0 === e || e.dispose(),
                        this._onChangeTextureAtlas.fire(t.pages[0].canvas),
                        this._charAtlasDisposable = (0,
                        _.getDisposeArrayDisposable)([(0,
                        d.forwardEvent)(t.onAddTextureAtlasCanvas, this._onAddTextureAtlasCanvas), (0,
                        d.forwardEvent)(t.onRemoveTextureAtlasCanvas, this._onRemoveTextureAtlasCanvas)])),
                        this._charAtlas = t,
                        this._charAtlas.warmUp(),
                        this._glyphRenderer.setAtlas(this._charAtlas)
                    }
                    _clearModel(e) {
                        this._model.clear(),
                        e && this._glyphRenderer.clear()
                    }
                    clearTextureAtlas() {
                        var e;
                        null === (e = this._charAtlas) || void 0 === e || e.clearTexture(),
                        this._clearModel(!0),
                        this._requestRedrawViewport()
                    }
                    clear() {
                        this._clearModel(!0);
                        for (const e of this._renderLayers)
                            e.reset(this._terminal)
                    }
                    registerCharacterJoiner(e) {
                        return -1
                    }
                    deregisterCharacterJoiner(e) {
                        return !1
                    }
                    renderRows(e, t) {
                        if (!this._isAttached) {
                            if (!(this._coreBrowserService.window.document.body.contains(this._core.screenElement) && this._charSizeService.width && this._charSizeService.height))
                                return;
                            this._updateDimensions(),
                            this._refreshCharAtlas(),
                            this._isAttached = !0
                        }
                        for (const i of this._renderLayers)
                            i.handleGridChanged(this._terminal, e, t);
                        this._glyphRenderer.beginFrame() && this._clearModel(!0),
                        this._updateModel(e, t),
                        this._rectangleRenderer.render(),
                        this._glyphRenderer.render(this._model)
                    }
                    _updateModel(e, t) {
                        const i = this._core;
                        let s, r, o, n, a, h, l, d, _, u, g, v, f, p = this._workCell;
                        for (r = e; r <= t && (o = r + i.buffer.ydisp,
                        n = i.buffer.lines.get(o),
                        n); r++)
                            for (this._model.lineLengths[r] = 0,
                            a = this._characterJoinerService.getJoinedCharacters(o),
                            v = 0; v < i.cols; v++)
                                if (s = this._cellColorResolver.result.bg,
                                n.loadCell(v, p),
                                0 === v && (s = this._cellColorResolver.result.bg),
                                h = !1,
                                l = v,
                                a.length > 0 && v === a[0][0] && (h = !0,
                                d = a.shift(),
                                p = new m(p,n.translateToString(!0, d[0], d[1]),d[1] - d[0]),
                                l = d[1] - 1),
                                _ = p.getChars(),
                                u = p.getCode(),
                                g = (r * i.cols + v) * C.RENDER_MODEL_INDICIES_PER_CELL,
                                this._cellColorResolver.resolve(p, v, o),
                                u !== c.NULL_CELL_CODE && (this._model.lineLengths[r] = v + 1),
                                (this._model.cells[g] !== u || this._model.cells[g + C.RENDER_MODEL_BG_OFFSET] !== this._cellColorResolver.result.bg || this._model.cells[g + C.RENDER_MODEL_FG_OFFSET] !== this._cellColorResolver.result.fg || this._model.cells[g + C.RENDER_MODEL_EXT_OFFSET] !== this._cellColorResolver.result.ext) && (_.length > 1 && (u |= C.COMBINED_CHAR_BIT_MASK),
                                this._model.cells[g] = u,
                                this._model.cells[g + C.RENDER_MODEL_BG_OFFSET] = this._cellColorResolver.result.bg,
                                this._model.cells[g + C.RENDER_MODEL_FG_OFFSET] = this._cellColorResolver.result.fg,
                                this._model.cells[g + C.RENDER_MODEL_EXT_OFFSET] = this._cellColorResolver.result.ext,
                                this._glyphRenderer.updateCell(v, r, u, this._cellColorResolver.result.bg, this._cellColorResolver.result.fg, this._cellColorResolver.result.ext, _, s),
                                h))
                                    for (p = this._workCell,
                                    v++; v < l; v++)
                                        f = (r * i.cols + v) * C.RENDER_MODEL_INDICIES_PER_CELL,
                                        this._glyphRenderer.updateCell(v, r, c.NULL_CELL_CODE, 0, 0, 0, c.NULL_CELL_CHAR, 0),
                                        this._model.cells[f] = c.NULL_CELL_CODE,
                                        this._model.cells[f + C.RENDER_MODEL_BG_OFFSET] = this._cellColorResolver.result.bg,
                                        this._model.cells[f + C.RENDER_MODEL_FG_OFFSET] = this._cellColorResolver.result.fg,
                                        this._model.cells[f + C.RENDER_MODEL_EXT_OFFSET] = this._cellColorResolver.result.ext;
                        this._rectangleRenderer.updateBackgrounds(this._model)
                    }
                    _updateDimensions() {
                        this._charSizeService.width && this._charSizeService.height && (this.dimensions.device.char.width = Math.floor(this._charSizeService.width * this._devicePixelRatio),
                        this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * this._devicePixelRatio),
                        this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight),
                        this.dimensions.device.char.top = 1 === this._optionsService.rawOptions.lineHeight ? 0 : Math.round((this.dimensions.device.cell.height - this.dimensions.device.char.height) / 2),
                        this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing),
                        this.dimensions.device.char.left = Math.floor(this._optionsService.rawOptions.letterSpacing / 2),
                        this.dimensions.device.canvas.height = this._terminal.rows * this.dimensions.device.cell.height,
                        this.dimensions.device.canvas.width = this._terminal.cols * this.dimensions.device.cell.width,
                        this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / this._devicePixelRatio),
                        this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / this._devicePixelRatio),
                        this.dimensions.css.cell.height = this.dimensions.device.cell.height / this._devicePixelRatio,
                        this.dimensions.css.cell.width = this.dimensions.device.cell.width / this._devicePixelRatio)
                    }
                    _setCanvasDevicePixelDimensions(e, t) {
                        this._canvas.width === e && this._canvas.height === t || (this._canvas.width = e,
                        this._canvas.height = t,
                        this._requestRedrawViewport())
                    }
                    _requestRedrawViewport() {
                        this._onRequestRedraw.fire({
                            start: 0,
                            end: this._terminal.rows - 1
                        })
                    }
                }
                t.WebglRenderer = p;
                class m extends h.AttributeData {
                    constructor(e, t, i) {
                        super(),
                        this.content = 0,
                        this.combinedData = "",
                        this.fg = e.fg,
                        this.bg = e.bg,
                        this.combinedData = t,
                        this._width = i
                    }
                    isCombined() {
                        return 2097152
                    }
                    getWidth() {
                        return this._width
                    }
                    getChars() {
                        return this.combinedData
                    }
                    getCode() {
                        return 2097151
                    }
                    setFromCharData(e) {
                        throw new Error("not implemented")
                    }
                    getAsCharData() {
                        return [this.fg, this.getChars(), this.getWidth(), this.getCode()]
                    }
                }
                t.JoinedCellData = m
            }
            ,
            381: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.GLTexture = t.expandFloat32Array = t.createShader = t.createProgram = t.PROJECTION_MATRIX = void 0;
                const s = i(374);
                function r(e, t, i) {
                    const r = (0,
                    s.throwIfFalsy)(e.createShader(t));
                    if (e.shaderSource(r, i),
                    e.compileShader(r),
                    e.getShaderParameter(r, e.COMPILE_STATUS))
                        return r;
                    console.error(e.getShaderInfoLog(r)),
                    e.deleteShader(r)
                }
                t.PROJECTION_MATRIX = new Float32Array([2, 0, 0, 0, 0, -2, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1]),
                t.createProgram = function(e, t, i) {
                    const o = (0,
                    s.throwIfFalsy)(e.createProgram());
                    if (e.attachShader(o, (0,
                    s.throwIfFalsy)(r(e, e.VERTEX_SHADER, t))),
                    e.attachShader(o, (0,
                    s.throwIfFalsy)(r(e, e.FRAGMENT_SHADER, i))),
                    e.linkProgram(o),
                    e.getProgramParameter(o, e.LINK_STATUS))
                        return o;
                    console.error(e.getProgramInfoLog(o)),
                    e.deleteProgram(o)
                }
                ,
                t.createShader = r,
                t.expandFloat32Array = function(e, t) {
                    const i = Math.min(2 * e.length, t)
                      , s = new Float32Array(i);
                    for (let t = 0; t < e.length; t++)
                        s[t] = e[t];
                    return s
                }
                ,
                t.GLTexture = class {
                    constructor(e) {
                        this.texture = e,
                        this.version = -1
                    }
                }
            }
            ,
            592: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.BaseRenderLayer = void 0;
                const s = i(627)
                  , r = i(237)
                  , o = i(374)
                  , n = i(859);
                class a extends n.Disposable {
                    constructor(e, t, i, s, r, o, a, h) {
                        super(),
                        this._container = t,
                        this._alpha = r,
                        this._coreBrowserService = o,
                        this._optionsService = a,
                        this._themeService = h,
                        this._deviceCharWidth = 0,
                        this._deviceCharHeight = 0,
                        this._deviceCellWidth = 0,
                        this._deviceCellHeight = 0,
                        this._deviceCharLeft = 0,
                        this._deviceCharTop = 0,
                        this._canvas = document.createElement("canvas"),
                        this._canvas.classList.add(`xterm-${i}-layer`),
                        this._canvas.style.zIndex = s.toString(),
                        this._initCanvas(),
                        this._container.appendChild(this._canvas),
                        this.register(this._themeService.onChangeColors((t=>{
                            this._refreshCharAtlas(e, t),
                            this.reset(e)
                        }
                        ))),
                        this.register((0,
                        n.toDisposable)((()=>{
                            var e;
                            this._canvas.remove(),
                            null === (e = this._charAtlas) || void 0 === e || e.dispose()
                        }
                        )))
                    }
                    _initCanvas() {
                        this._ctx = (0,
                        o.throwIfFalsy)(this._canvas.getContext("2d", {
                            alpha: this._alpha
                        })),
                        this._alpha || this._clearAll()
                    }
                    handleBlur(e) {}
                    handleFocus(e) {}
                    handleCursorMove(e) {}
                    handleGridChanged(e, t, i) {}
                    handleSelectionChanged(e, t, i, s=!1) {}
                    _setTransparency(e, t) {
                        if (t === this._alpha)
                            return;
                        const i = this._canvas;
                        this._alpha = t,
                        this._canvas = this._canvas.cloneNode(),
                        this._initCanvas(),
                        this._container.replaceChild(this._canvas, i),
                        this._refreshCharAtlas(e, this._themeService.colors),
                        this.handleGridChanged(e, 0, e.rows - 1)
                    }
                    _refreshCharAtlas(e, t) {
                        this._deviceCharWidth <= 0 && this._deviceCharHeight <= 0 || (this._charAtlas = (0,
                        s.acquireTextureAtlas)(e, this._optionsService.rawOptions, t, this._deviceCellWidth, this._deviceCellHeight, this._deviceCharWidth, this._deviceCharHeight, this._coreBrowserService.dpr),
                        this._charAtlas.warmUp())
                    }
                    resize(e, t) {
                        this._deviceCellWidth = t.device.cell.width,
                        this._deviceCellHeight = t.device.cell.height,
                        this._deviceCharWidth = t.device.char.width,
                        this._deviceCharHeight = t.device.char.height,
                        this._deviceCharLeft = t.device.char.left,
                        this._deviceCharTop = t.device.char.top,
                        this._canvas.width = t.device.canvas.width,
                        this._canvas.height = t.device.canvas.height,
                        this._canvas.style.width = `${t.css.canvas.width}px`,
                        this._canvas.style.height = `${t.css.canvas.height}px`,
                        this._alpha || this._clearAll(),
                        this._refreshCharAtlas(e, this._themeService.colors)
                    }
                    _fillCells(e, t, i, s) {
                        this._ctx.fillRect(e * this._deviceCellWidth, t * this._deviceCellHeight, i * this._deviceCellWidth, s * this._deviceCellHeight)
                    }
                    _fillBottomLineAtCells(e, t, i=1) {
                        this._ctx.fillRect(e * this._deviceCellWidth, (t + 1) * this._deviceCellHeight - this._coreBrowserService.dpr - 1, i * this._deviceCellWidth, this._coreBrowserService.dpr)
                    }
                    _fillLeftLineAtCell(e, t, i) {
                        this._ctx.fillRect(e * this._deviceCellWidth, t * this._deviceCellHeight, this._coreBrowserService.dpr * i, this._deviceCellHeight)
                    }
                    _strokeRectAtCell(e, t, i, s) {
                        this._ctx.lineWidth = this._coreBrowserService.dpr,
                        this._ctx.strokeRect(e * this._deviceCellWidth + this._coreBrowserService.dpr / 2, t * this._deviceCellHeight + this._coreBrowserService.dpr / 2, i * this._deviceCellWidth - this._coreBrowserService.dpr, s * this._deviceCellHeight - this._coreBrowserService.dpr)
                    }
                    _clearAll() {
                        this._alpha ? this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height) : (this._ctx.fillStyle = this._themeService.colors.background.css,
                        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height))
                    }
                    _clearCells(e, t, i, s) {
                        this._alpha ? this._ctx.clearRect(e * this._deviceCellWidth, t * this._deviceCellHeight, i * this._deviceCellWidth, s * this._deviceCellHeight) : (this._ctx.fillStyle = this._themeService.colors.background.css,
                        this._ctx.fillRect(e * this._deviceCellWidth, t * this._deviceCellHeight, i * this._deviceCellWidth, s * this._deviceCellHeight))
                    }
                    _fillCharTrueColor(e, t, i, s) {
                        this._ctx.font = this._getFont(e, !1, !1),
                        this._ctx.textBaseline = r.TEXT_BASELINE,
                        this._clipCell(i, s, t.getWidth()),
                        this._ctx.fillText(t.getChars(), i * this._deviceCellWidth + this._deviceCharLeft, s * this._deviceCellHeight + this._deviceCharTop + this._deviceCharHeight)
                    }
                    _clipCell(e, t, i) {
                        this._ctx.beginPath(),
                        this._ctx.rect(e * this._deviceCellWidth, t * this._deviceCellHeight, i * this._deviceCellWidth, this._deviceCellHeight),
                        this._ctx.clip()
                    }
                    _getFont(e, t, i) {
                        return `${i ? "italic" : ""} ${t ? e.options.fontWeightBold : e.options.fontWeight} ${e.options.fontSize * this._coreBrowserService.dpr}px ${e.options.fontFamily}`
                    }
                }
                t.BaseRenderLayer = a
            }
            ,
            461: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.CursorRenderLayer = void 0;
                const s = i(592)
                  , r = i(782)
                  , o = i(859);
                class n extends s.BaseRenderLayer {
                    constructor(e, t, i, s, n, a, h, l) {
                        super(e, t, "cursor", i, !0, n, h, l),
                        this._onRequestRefreshRowsEvent = s,
                        this._coreService = a,
                        this._cell = new r.CellData,
                        this._state = {
                            x: 0,
                            y: 0,
                            isFocused: !1,
                            style: "",
                            width: 0
                        },
                        this._cursorRenderers = {
                            bar: this._renderBarCursor.bind(this),
                            block: this._renderBlockCursor.bind(this),
                            underline: this._renderUnderlineCursor.bind(this)
                        },
                        this._handleOptionsChanged(e),
                        this.register(h.onOptionChange((()=>this._handleOptionsChanged(e)))),
                        this.register((0,
                        o.toDisposable)((()=>{
                            var e;
                            null === (e = this._cursorBlinkStateManager) || void 0 === e || e.dispose(),
                            this._cursorBlinkStateManager = void 0
                        }
                        )))
                    }
                    resize(e, t) {
                        super.resize(e, t),
                        this._state = {
                            x: 0,
                            y: 0,
                            isFocused: !1,
                            style: "",
                            width: 0
                        }
                    }
                    reset(e) {
                        var t;
                        this._clearCursor(),
                        null === (t = this._cursorBlinkStateManager) || void 0 === t || t.restartBlinkAnimation(e),
                        this._handleOptionsChanged(e)
                    }
                    handleBlur(e) {
                        var t;
                        null === (t = this._cursorBlinkStateManager) || void 0 === t || t.pause(),
                        this._onRequestRefreshRowsEvent.fire({
                            start: e.buffer.active.cursorY,
                            end: e.buffer.active.cursorY
                        })
                    }
                    handleFocus(e) {
                        var t;
                        null === (t = this._cursorBlinkStateManager) || void 0 === t || t.resume(e),
                        this._onRequestRefreshRowsEvent.fire({
                            start: e.buffer.active.cursorY,
                            end: e.buffer.active.cursorY
                        })
                    }
                    _handleOptionsChanged(e) {
                        var t;
                        e.options.cursorBlink ? this._cursorBlinkStateManager || (this._cursorBlinkStateManager = new a((()=>{
                            this._render(e, !0)
                        }
                        ),this._coreBrowserService)) : (null === (t = this._cursorBlinkStateManager) || void 0 === t || t.dispose(),
                        this._cursorBlinkStateManager = void 0),
                        this._onRequestRefreshRowsEvent.fire({
                            start: e.buffer.active.cursorY,
                            end: e.buffer.active.cursorY
                        })
                    }
                    handleCursorMove(e) {
                        var t;
                        null === (t = this._cursorBlinkStateManager) || void 0 === t || t.restartBlinkAnimation(e)
                    }
                    handleGridChanged(e, t, i) {
                        !this._cursorBlinkStateManager || this._cursorBlinkStateManager.isPaused ? this._render(e, !1) : this._cursorBlinkStateManager.restartBlinkAnimation(e)
                    }
                    _render(e, t) {
                        if (!this._coreService.isCursorInitialized || this._coreService.isCursorHidden)
                            return void this._clearCursor();
                        const i = e.buffer.active.baseY + e.buffer.active.cursorY
                          , s = i - e.buffer.active.viewportY
                          , r = Math.min(e.buffer.active.cursorX, e.cols - 1);
                        if (s < 0 || s >= e.rows)
                            this._clearCursor();
                        else if (e._core.buffer.lines.get(i).loadCell(r, this._cell),
                        void 0 !== this._cell.content) {
                            if (!this._coreBrowserService.isFocused) {
                                this._clearCursor(),
                                this._ctx.save(),
                                this._ctx.fillStyle = this._themeService.colors.cursor.css;
                                const t = e.options.cursorStyle;
                                return t && "block" !== t ? this._cursorRenderers[t](e, r, s, this._cell) : this._renderBlurCursor(e, r, s, this._cell),
                                this._ctx.restore(),
                                this._state.x = r,
                                this._state.y = s,
                                this._state.isFocused = !1,
                                this._state.style = t,
                                void (this._state.width = this._cell.getWidth())
                            }
                            if (!this._cursorBlinkStateManager || this._cursorBlinkStateManager.isCursorVisible) {
                                if (this._state) {
                                    if (this._state.x === r && this._state.y === s && this._state.isFocused === this._coreBrowserService.isFocused && this._state.style === e.options.cursorStyle && this._state.width === this._cell.getWidth())
                                        return;
                                    this._clearCursor()
                                }
                                this._ctx.save(),
                                this._cursorRenderers[e.options.cursorStyle || "block"](e, r, s, this._cell),
                                this._ctx.restore(),
                                this._state.x = r,
                                this._state.y = s,
                                this._state.isFocused = !1,
                                this._state.style = e.options.cursorStyle,
                                this._state.width = this._cell.getWidth()
                            } else
                                this._clearCursor()
                        }
                    }
                    _clearCursor() {
                        this._state && (this._coreBrowserService.dpr < 1 ? this._clearAll() : this._clearCells(this._state.x, this._state.y, this._state.width, 1),
                        this._state = {
                            x: 0,
                            y: 0,
                            isFocused: !1,
                            style: "",
                            width: 0
                        })
                    }
                    _renderBarCursor(e, t, i, s) {
                        this._ctx.save(),
                        this._ctx.fillStyle = this._themeService.colors.cursor.css,
                        this._fillLeftLineAtCell(t, i, this._optionsService.rawOptions.cursorWidth),
                        this._ctx.restore()
                    }
                    _renderBlockCursor(e, t, i, s) {
                        this._ctx.save(),
                        this._ctx.fillStyle = this._themeService.colors.cursor.css,
                        this._fillCells(t, i, s.getWidth(), 1),
                        this._ctx.fillStyle = this._themeService.colors.cursorAccent.css,
                        this._fillCharTrueColor(e, s, t, i),
                        this._ctx.restore()
                    }
                    _renderUnderlineCursor(e, t, i, s) {
                        this._ctx.save(),
                        this._ctx.fillStyle = this._themeService.colors.cursor.css,
                        this._fillBottomLineAtCells(t, i),
                        this._ctx.restore()
                    }
                    _renderBlurCursor(e, t, i, s) {
                        this._ctx.save(),
                        this._ctx.strokeStyle = this._themeService.colors.cursor.css,
                        this._strokeRectAtCell(t, i, s.getWidth(), 1),
                        this._ctx.restore()
                    }
                }
                t.CursorRenderLayer = n;
                class a {
                    constructor(e, t) {
                        this._renderCallback = e,
                        this._coreBrowserService = t,
                        this.isCursorVisible = !0,
                        this._coreBrowserService.isFocused && this._restartInterval()
                    }
                    get isPaused() {
                        return !(this._blinkStartTimeout || this._blinkInterval)
                    }
                    dispose() {
                        this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval),
                        this._blinkInterval = void 0),
                        this._blinkStartTimeout && (this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout),
                        this._blinkStartTimeout = void 0),
                        this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),
                        this._animationFrame = void 0)
                    }
                    restartBlinkAnimation(e) {
                        this.isPaused || (this._animationTimeRestarted = Date.now(),
                        this.isCursorVisible = !0,
                        this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((()=>{
                            this._renderCallback(),
                            this._animationFrame = void 0
                        }
                        ))))
                    }
                    _restartInterval(e=600) {
                        this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval),
                        this._blinkInterval = void 0),
                        this._blinkStartTimeout = this._coreBrowserService.window.setTimeout((()=>{
                            if (this._animationTimeRestarted) {
                                const e = 600 - (Date.now() - this._animationTimeRestarted);
                                if (this._animationTimeRestarted = void 0,
                                e > 0)
                                    return void this._restartInterval(e)
                            }
                            this.isCursorVisible = !1,
                            this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((()=>{
                                this._renderCallback(),
                                this._animationFrame = void 0
                            }
                            )),
                            this._blinkInterval = this._coreBrowserService.window.setInterval((()=>{
                                if (this._animationTimeRestarted) {
                                    const e = 600 - (Date.now() - this._animationTimeRestarted);
                                    return this._animationTimeRestarted = void 0,
                                    void this._restartInterval(e)
                                }
                                this.isCursorVisible = !this.isCursorVisible,
                                this._animationFrame = this._coreBrowserService.window.requestAnimationFrame((()=>{
                                    this._renderCallback(),
                                    this._animationFrame = void 0
                                }
                                ))
                            }
                            ), 600)
                        }
                        ), e)
                    }
                    pause() {
                        this.isCursorVisible = !0,
                        this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval),
                        this._blinkInterval = void 0),
                        this._blinkStartTimeout && (this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout),
                        this._blinkStartTimeout = void 0),
                        this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame),
                        this._animationFrame = void 0)
                    }
                    resume(e) {
                        this.pause(),
                        this._animationTimeRestarted = void 0,
                        this._restartInterval(),
                        this.restartBlinkAnimation(e)
                    }
                }
            }
            ,
            733: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.LinkRenderLayer = void 0;
                const s = i(197)
                  , r = i(237)
                  , o = i(592);
                class n extends o.BaseRenderLayer {
                    constructor(e, t, i, s, r, o, n) {
                        super(i, e, "link", t, !0, r, o, n),
                        this.register(s.onShowLinkUnderline((e=>this._handleShowLinkUnderline(e)))),
                        this.register(s.onHideLinkUnderline((e=>this._handleHideLinkUnderline(e))))
                    }
                    resize(e, t) {
                        super.resize(e, t),
                        this._state = void 0
                    }
                    reset(e) {
                        this._clearCurrentLink()
                    }
                    _clearCurrentLink() {
                        if (this._state) {
                            this._clearCells(this._state.x1, this._state.y1, this._state.cols - this._state.x1, 1);
                            const e = this._state.y2 - this._state.y1 - 1;
                            e > 0 && this._clearCells(0, this._state.y1 + 1, this._state.cols, e),
                            this._clearCells(0, this._state.y2, this._state.x2, 1),
                            this._state = void 0
                        }
                    }
                    _handleShowLinkUnderline(e) {
                        if (e.fg === r.INVERTED_DEFAULT_COLOR ? this._ctx.fillStyle = this._themeService.colors.background.css : void 0 !== e.fg && (0,
                        s.is256Color)(e.fg) ? this._ctx.fillStyle = this._themeService.colors.ansi[e.fg].css : this._ctx.fillStyle = this._themeService.colors.foreground.css,
                        e.y1 === e.y2)
                            this._fillBottomLineAtCells(e.x1, e.y1, e.x2 - e.x1);
                        else {
                            this._fillBottomLineAtCells(e.x1, e.y1, e.cols - e.x1);
                            for (let t = e.y1 + 1; t < e.y2; t++)
                                this._fillBottomLineAtCells(0, t, e.cols);
                            this._fillBottomLineAtCells(0, e.y2, e.x2)
                        }
                        this._state = e
                    }
                    _handleHideLinkUnderline(e) {
                        this._clearCurrentLink()
                    }
                }
                t.LinkRenderLayer = n
            }
            ,
            820: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.addDisposableDomListener = void 0,
                t.addDisposableDomListener = function(e, t, i, s) {
                    e.addEventListener(t, i, s);
                    let r = !1;
                    return {
                        dispose: ()=>{
                            r || (r = !0,
                            e.removeEventListener(t, i, s))
                        }
                    }
                }
            }
            ,
            274: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.CellColorResolver = void 0;
                let i, s = 0, r = 0, o = !1, n = !1, a = !1;
                t.CellColorResolver = class {
                    constructor(e, t, i, s, r) {
                        this._terminal = e,
                        this._selectionRenderModel = t,
                        this._decorationService = i,
                        this._coreBrowserService = s,
                        this._themeService = r,
                        this.result = {
                            fg: 0,
                            bg: 0,
                            ext: 0
                        }
                    }
                    resolve(e, t, h) {
                        this.result.bg = e.bg,
                        this.result.fg = e.fg,
                        this.result.ext = 268435456 & e.bg ? e.extended.ext : 0,
                        r = 0,
                        s = 0,
                        n = !1,
                        o = !1,
                        a = !1,
                        i = this._themeService.colors,
                        this._decorationService.forEachDecorationAtCell(t, h, "bottom", (e=>{
                            e.backgroundColorRGB && (r = e.backgroundColorRGB.rgba >> 8 & 16777215,
                            n = !0),
                            e.foregroundColorRGB && (s = e.foregroundColorRGB.rgba >> 8 & 16777215,
                            o = !0)
                        }
                        )),
                        a = this._selectionRenderModel.isCellSelected(this._terminal, t, h),
                        a && (r = (this._coreBrowserService.isFocused ? i.selectionBackgroundOpaque : i.selectionInactiveBackgroundOpaque).rgba >> 8 & 16777215,
                        n = !0,
                        i.selectionForeground && (s = i.selectionForeground.rgba >> 8 & 16777215,
                        o = !0)),
                        this._decorationService.forEachDecorationAtCell(t, h, "top", (e=>{
                            e.backgroundColorRGB && (r = e.backgroundColorRGB.rgba >> 8 & 16777215,
                            n = !0),
                            e.foregroundColorRGB && (s = e.foregroundColorRGB.rgba >> 8 & 16777215,
                            o = !0)
                        }
                        )),
                        n && (r = a ? -16777216 & e.bg & -134217729 | r | 50331648 : -16777216 & e.bg | r | 50331648),
                        o && (s = -16777216 & e.fg & -67108865 | s | 50331648),
                        67108864 & this.result.fg && (n && !o && (s = 0 == (50331648 & this.result.bg) ? -134217728 & this.result.fg | 16777215 & i.background.rgba >> 8 | 50331648 : -134217728 & this.result.fg | 67108863 & this.result.bg,
                        o = !0),
                        !n && o && (r = 0 == (50331648 & this.result.fg) ? -67108864 & this.result.bg | 16777215 & i.foreground.rgba >> 8 | 50331648 : -67108864 & this.result.bg | 67108863 & this.result.fg,
                        n = !0)),
                        i = void 0,
                        this.result.bg = n ? r : this.result.bg,
                        this.result.fg = o ? s : this.result.fg
                    }
                }
            }
            ,
            627: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.removeTerminalFromCache = t.acquireTextureAtlas = void 0;
                const s = i(509)
                  , r = i(197)
                  , o = [];
                t.acquireTextureAtlas = function(e, t, i, n, a, h, l, c) {
                    const d = (0,
                    r.generateConfig)(n, a, h, l, t, i, c);
                    for (let t = 0; t < o.length; t++) {
                        const i = o[t]
                          , s = i.ownedBy.indexOf(e);
                        if (s >= 0) {
                            if ((0,
                            r.configEquals)(i.config, d))
                                return i.atlas;
                            1 === i.ownedBy.length ? (i.atlas.dispose(),
                            o.splice(t, 1)) : i.ownedBy.splice(s, 1);
                            break
                        }
                    }
                    for (let t = 0; t < o.length; t++) {
                        const i = o[t];
                        if ((0,
                        r.configEquals)(i.config, d))
                            return i.ownedBy.push(e),
                            i.atlas
                    }
                    const _ = e._core
                      , u = {
                        atlas: new s.TextureAtlas(document,d,_.unicodeService),
                        config: d,
                        ownedBy: [e]
                    };
                    return o.push(u),
                    u.atlas
                }
                ,
                t.removeTerminalFromCache = function(e) {
                    for (let t = 0; t < o.length; t++) {
                        const i = o[t].ownedBy.indexOf(e);
                        if (-1 !== i) {
                            1 === o[t].ownedBy.length ? (o[t].atlas.dispose(),
                            o.splice(t, 1)) : o[t].ownedBy.splice(i, 1);
                            break
                        }
                    }
                }
            }
            ,
            197: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.is256Color = t.configEquals = t.generateConfig = void 0;
                const s = i(160);
                t.generateConfig = function(e, t, i, r, o, n, a) {
                    const h = {
                        foreground: n.foreground,
                        background: n.background,
                        cursor: s.NULL_COLOR,
                        cursorAccent: s.NULL_COLOR,
                        selectionForeground: s.NULL_COLOR,
                        selectionBackgroundTransparent: s.NULL_COLOR,
                        selectionBackgroundOpaque: s.NULL_COLOR,
                        selectionInactiveBackgroundTransparent: s.NULL_COLOR,
                        selectionInactiveBackgroundOpaque: s.NULL_COLOR,
                        ansi: n.ansi.slice(),
                        contrastCache: n.contrastCache
                    };
                    return {
                        customGlyphs: o.customGlyphs,
                        devicePixelRatio: a,
                        letterSpacing: o.letterSpacing,
                        lineHeight: o.lineHeight,
                        deviceCellWidth: e,
                        deviceCellHeight: t,
                        deviceCharWidth: i,
                        deviceCharHeight: r,
                        fontFamily: o.fontFamily,
                        fontSize: o.fontSize,
                        fontWeight: o.fontWeight,
                        fontWeightBold: o.fontWeightBold,
                        allowTransparency: o.allowTransparency,
                        drawBoldTextInBrightColors: o.drawBoldTextInBrightColors,
                        minimumContrastRatio: o.minimumContrastRatio,
                        colors: h
                    }
                }
                ,
                t.configEquals = function(e, t) {
                    for (let i = 0; i < e.colors.ansi.length; i++)
                        if (e.colors.ansi[i].rgba !== t.colors.ansi[i].rgba)
                            return !1;
                    return e.devicePixelRatio === t.devicePixelRatio && e.customGlyphs === t.customGlyphs && e.lineHeight === t.lineHeight && e.letterSpacing === t.letterSpacing && e.fontFamily === t.fontFamily && e.fontSize === t.fontSize && e.fontWeight === t.fontWeight && e.fontWeightBold === t.fontWeightBold && e.allowTransparency === t.allowTransparency && e.deviceCharWidth === t.deviceCharWidth && e.deviceCharHeight === t.deviceCharHeight && e.drawBoldTextInBrightColors === t.drawBoldTextInBrightColors && e.minimumContrastRatio === t.minimumContrastRatio && e.colors.foreground.rgba === t.colors.foreground.rgba && e.colors.background.rgba === t.colors.background.rgba
                }
                ,
                t.is256Color = function(e) {
                    return 16777216 == (50331648 & e) || 33554432 == (50331648 & e)
                }
            }
            ,
            237: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.TEXT_BASELINE = t.DIM_OPACITY = t.INVERTED_DEFAULT_COLOR = void 0;
                const s = i(399);
                t.INVERTED_DEFAULT_COLOR = 257,
                t.DIM_OPACITY = .5,
                t.TEXT_BASELINE = s.isFirefox || s.isLegacyEdge ? "bottom" : "ideographic"
            }
            ,
            860: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.tryDrawCustomChar = t.powerlineDefinitions = t.boxDrawingDefinitions = t.blockElementDefinitions = void 0;
                const s = i(374);
                t.blockElementDefinitions = {
                    "▀": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 4
                    }],
                    "▁": [{
                        x: 0,
                        y: 7,
                        w: 8,
                        h: 1
                    }],
                    "▂": [{
                        x: 0,
                        y: 6,
                        w: 8,
                        h: 2
                    }],
                    "▃": [{
                        x: 0,
                        y: 5,
                        w: 8,
                        h: 3
                    }],
                    "▄": [{
                        x: 0,
                        y: 4,
                        w: 8,
                        h: 4
                    }],
                    "▅": [{
                        x: 0,
                        y: 3,
                        w: 8,
                        h: 5
                    }],
                    "▆": [{
                        x: 0,
                        y: 2,
                        w: 8,
                        h: 6
                    }],
                    "▇": [{
                        x: 0,
                        y: 1,
                        w: 8,
                        h: 7
                    }],
                    "█": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 8
                    }],
                    "▉": [{
                        x: 0,
                        y: 0,
                        w: 7,
                        h: 8
                    }],
                    "▊": [{
                        x: 0,
                        y: 0,
                        w: 6,
                        h: 8
                    }],
                    "▋": [{
                        x: 0,
                        y: 0,
                        w: 5,
                        h: 8
                    }],
                    "▌": [{
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 8
                    }],
                    "▍": [{
                        x: 0,
                        y: 0,
                        w: 3,
                        h: 8
                    }],
                    "▎": [{
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 8
                    }],
                    "▏": [{
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "▐": [{
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 8
                    }],
                    "▔": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 1
                    }],
                    "▕": [{
                        x: 7,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "▖": [{
                        x: 0,
                        y: 4,
                        w: 4,
                        h: 4
                    }],
                    "▗": [{
                        x: 4,
                        y: 4,
                        w: 4,
                        h: 4
                    }],
                    "▘": [{
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 4
                    }],
                    "▙": [{
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 8
                    }, {
                        x: 0,
                        y: 4,
                        w: 8,
                        h: 4
                    }],
                    "▚": [{
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 4
                    }, {
                        x: 4,
                        y: 4,
                        w: 4,
                        h: 4
                    }],
                    "▛": [{
                        x: 0,
                        y: 0,
                        w: 4,
                        h: 8
                    }, {
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 4
                    }],
                    "▜": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 4
                    }, {
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 8
                    }],
                    "▝": [{
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 4
                    }],
                    "▞": [{
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 4
                    }, {
                        x: 0,
                        y: 4,
                        w: 4,
                        h: 4
                    }],
                    "▟": [{
                        x: 4,
                        y: 0,
                        w: 4,
                        h: 8
                    }, {
                        x: 0,
                        y: 4,
                        w: 8,
                        h: 4
                    }],
                    "🭰": [{
                        x: 1,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭱": [{
                        x: 2,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭲": [{
                        x: 3,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭳": [{
                        x: 4,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭴": [{
                        x: 5,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭵": [{
                        x: 6,
                        y: 0,
                        w: 1,
                        h: 8
                    }],
                    "🭶": [{
                        x: 0,
                        y: 1,
                        w: 8,
                        h: 1
                    }],
                    "🭷": [{
                        x: 0,
                        y: 2,
                        w: 8,
                        h: 1
                    }],
                    "🭸": [{
                        x: 0,
                        y: 3,
                        w: 8,
                        h: 1
                    }],
                    "🭹": [{
                        x: 0,
                        y: 4,
                        w: 8,
                        h: 1
                    }],
                    "🭺": [{
                        x: 0,
                        y: 5,
                        w: 8,
                        h: 1
                    }],
                    "🭻": [{
                        x: 0,
                        y: 6,
                        w: 8,
                        h: 1
                    }],
                    "🭼": [{
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 8
                    }, {
                        x: 0,
                        y: 7,
                        w: 8,
                        h: 1
                    }],
                    "🭽": [{
                        x: 0,
                        y: 0,
                        w: 1,
                        h: 8
                    }, {
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 1
                    }],
                    "🭾": [{
                        x: 7,
                        y: 0,
                        w: 1,
                        h: 8
                    }, {
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 1
                    }],
                    "🭿": [{
                        x: 7,
                        y: 0,
                        w: 1,
                        h: 8
                    }, {
                        x: 0,
                        y: 7,
                        w: 8,
                        h: 1
                    }],
                    "🮀": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 1
                    }, {
                        x: 0,
                        y: 7,
                        w: 8,
                        h: 1
                    }],
                    "🮁": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 1
                    }, {
                        x: 0,
                        y: 2,
                        w: 8,
                        h: 1
                    }, {
                        x: 0,
                        y: 4,
                        w: 8,
                        h: 1
                    }, {
                        x: 0,
                        y: 7,
                        w: 8,
                        h: 1
                    }],
                    "🮂": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 2
                    }],
                    "🮃": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 3
                    }],
                    "🮄": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 5
                    }],
                    "🮅": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 6
                    }],
                    "🮆": [{
                        x: 0,
                        y: 0,
                        w: 8,
                        h: 7
                    }],
                    "🮇": [{
                        x: 6,
                        y: 0,
                        w: 2,
                        h: 8
                    }],
                    "🮈": [{
                        x: 5,
                        y: 0,
                        w: 3,
                        h: 8
                    }],
                    "🮉": [{
                        x: 3,
                        y: 0,
                        w: 5,
                        h: 8
                    }],
                    "🮊": [{
                        x: 2,
                        y: 0,
                        w: 6,
                        h: 8
                    }],
                    "🮋": [{
                        x: 1,
                        y: 0,
                        w: 7,
                        h: 8
                    }],
                    "🮕": [{
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 2
                    }, {
                        x: 4,
                        y: 0,
                        w: 2,
                        h: 2
                    }, {
                        x: 2,
                        y: 2,
                        w: 2,
                        h: 2
                    }, {
                        x: 6,
                        y: 2,
                        w: 2,
                        h: 2
                    }, {
                        x: 0,
                        y: 4,
                        w: 2,
                        h: 2
                    }, {
                        x: 4,
                        y: 4,
                        w: 2,
                        h: 2
                    }, {
                        x: 2,
                        y: 6,
                        w: 2,
                        h: 2
                    }, {
                        x: 6,
                        y: 6,
                        w: 2,
                        h: 2
                    }],
                    "🮖": [{
                        x: 2,
                        y: 0,
                        w: 2,
                        h: 2
                    }, {
                        x: 6,
                        y: 0,
                        w: 2,
                        h: 2
                    }, {
                        x: 0,
                        y: 2,
                        w: 2,
                        h: 2
                    }, {
                        x: 4,
                        y: 2,
                        w: 2,
                        h: 2
                    }, {
                        x: 2,
                        y: 4,
                        w: 2,
                        h: 2
                    }, {
                        x: 6,
                        y: 4,
                        w: 2,
                        h: 2
                    }, {
                        x: 0,
                        y: 6,
                        w: 2,
                        h: 2
                    }, {
                        x: 4,
                        y: 6,
                        w: 2,
                        h: 2
                    }],
                    "🮗": [{
                        x: 0,
                        y: 2,
                        w: 8,
                        h: 2
                    }, {
                        x: 0,
                        y: 6,
                        w: 8,
                        h: 2
                    }]
                };
                const r = {
                    "░": [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
                    "▒": [[1, 0], [0, 0], [0, 1], [0, 0]],
                    "▓": [[0, 1], [1, 1], [1, 0], [1, 1]]
                };
                t.boxDrawingDefinitions = {
                    "─": {
                        1: "M0,.5 L1,.5"
                    },
                    "━": {
                        3: "M0,.5 L1,.5"
                    },
                    "│": {
                        1: "M.5,0 L.5,1"
                    },
                    "┃": {
                        3: "M.5,0 L.5,1"
                    },
                    "┌": {
                        1: "M0.5,1 L.5,.5 L1,.5"
                    },
                    "┏": {
                        3: "M0.5,1 L.5,.5 L1,.5"
                    },
                    "┐": {
                        1: "M0,.5 L.5,.5 L.5,1"
                    },
                    "┓": {
                        3: "M0,.5 L.5,.5 L.5,1"
                    },
                    "└": {
                        1: "M.5,0 L.5,.5 L1,.5"
                    },
                    "┗": {
                        3: "M.5,0 L.5,.5 L1,.5"
                    },
                    "┘": {
                        1: "M.5,0 L.5,.5 L0,.5"
                    },
                    "┛": {
                        3: "M.5,0 L.5,.5 L0,.5"
                    },
                    "├": {
                        1: "M.5,0 L.5,1 M.5,.5 L1,.5"
                    },
                    "┣": {
                        3: "M.5,0 L.5,1 M.5,.5 L1,.5"
                    },
                    "┤": {
                        1: "M.5,0 L.5,1 M.5,.5 L0,.5"
                    },
                    "┫": {
                        3: "M.5,0 L.5,1 M.5,.5 L0,.5"
                    },
                    "┬": {
                        1: "M0,.5 L1,.5 M.5,.5 L.5,1"
                    },
                    "┳": {
                        3: "M0,.5 L1,.5 M.5,.5 L.5,1"
                    },
                    "┴": {
                        1: "M0,.5 L1,.5 M.5,.5 L.5,0"
                    },
                    "┻": {
                        3: "M0,.5 L1,.5 M.5,.5 L.5,0"
                    },
                    "┼": {
                        1: "M0,.5 L1,.5 M.5,0 L.5,1"
                    },
                    "╋": {
                        3: "M0,.5 L1,.5 M.5,0 L.5,1"
                    },
                    "╴": {
                        1: "M.5,.5 L0,.5"
                    },
                    "╸": {
                        3: "M.5,.5 L0,.5"
                    },
                    "╵": {
                        1: "M.5,.5 L.5,0"
                    },
                    "╹": {
                        3: "M.5,.5 L.5,0"
                    },
                    "╶": {
                        1: "M.5,.5 L1,.5"
                    },
                    "╺": {
                        3: "M.5,.5 L1,.5"
                    },
                    "╷": {
                        1: "M.5,.5 L.5,1"
                    },
                    "╻": {
                        3: "M.5,.5 L.5,1"
                    },
                    "═": {
                        1: (e,t)=>`M0,${.5 - t} L1,${.5 - t} M0,${.5 + t} L1,${.5 + t}`
                    },
                    "║": {
                        1: (e,t)=>`M${.5 - e},0 L${.5 - e},1 M${.5 + e},0 L${.5 + e},1`
                    },
                    "╒": {
                        1: (e,t)=>`M.5,1 L.5,${.5 - t} L1,${.5 - t} M.5,${.5 + t} L1,${.5 + t}`
                    },
                    "╓": {
                        1: (e,t)=>`M${.5 - e},1 L${.5 - e},.5 L1,.5 M${.5 + e},.5 L${.5 + e},1`
                    },
                    "╔": {
                        1: (e,t)=>`M1,${.5 - t} L${.5 - e},${.5 - t} L${.5 - e},1 M1,${.5 + t} L${.5 + e},${.5 + t} L${.5 + e},1`
                    },
                    "╕": {
                        1: (e,t)=>`M0,${.5 - t} L.5,${.5 - t} L.5,1 M0,${.5 + t} L.5,${.5 + t}`
                    },
                    "╖": {
                        1: (e,t)=>`M${.5 + e},1 L${.5 + e},.5 L0,.5 M${.5 - e},.5 L${.5 - e},1`
                    },
                    "╗": {
                        1: (e,t)=>`M0,${.5 + t} L${.5 - e},${.5 + t} L${.5 - e},1 M0,${.5 - t} L${.5 + e},${.5 - t} L${.5 + e},1`
                    },
                    "╘": {
                        1: (e,t)=>`M.5,0 L.5,${.5 + t} L1,${.5 + t} M.5,${.5 - t} L1,${.5 - t}`
                    },
                    "╙": {
                        1: (e,t)=>`M1,.5 L${.5 - e},.5 L${.5 - e},0 M${.5 + e},.5 L${.5 + e},0`
                    },
                    "╚": {
                        1: (e,t)=>`M1,${.5 - t} L${.5 + e},${.5 - t} L${.5 + e},0 M1,${.5 + t} L${.5 - e},${.5 + t} L${.5 - e},0`
                    },
                    "╛": {
                        1: (e,t)=>`M0,${.5 + t} L.5,${.5 + t} L.5,0 M0,${.5 - t} L.5,${.5 - t}`
                    },
                    "╜": {
                        1: (e,t)=>`M0,.5 L${.5 + e},.5 L${.5 + e},0 M${.5 - e},.5 L${.5 - e},0`
                    },
                    "╝": {
                        1: (e,t)=>`M0,${.5 - t} L${.5 - e},${.5 - t} L${.5 - e},0 M0,${.5 + t} L${.5 + e},${.5 + t} L${.5 + e},0`
                    },
                    "╞": {
                        1: (e,t)=>`M.5,0 L.5,1 M.5,${.5 - t} L1,${.5 - t} M.5,${.5 + t} L1,${.5 + t}`
                    },
                    "╟": {
                        1: (e,t)=>`M${.5 - e},0 L${.5 - e},1 M${.5 + e},0 L${.5 + e},1 M${.5 + e},.5 L1,.5`
                    },
                    "╠": {
                        1: (e,t)=>`M${.5 - e},0 L${.5 - e},1 M1,${.5 + t} L${.5 + e},${.5 + t} L${.5 + e},1 M1,${.5 - t} L${.5 + e},${.5 - t} L${.5 + e},0`
                    },
                    "╡": {
                        1: (e,t)=>`M.5,0 L.5,1 M0,${.5 - t} L.5,${.5 - t} M0,${.5 + t} L.5,${.5 + t}`
                    },
                    "╢": {
                        1: (e,t)=>`M0,.5 L${.5 - e},.5 M${.5 - e},0 L${.5 - e},1 M${.5 + e},0 L${.5 + e},1`
                    },
                    "╣": {
                        1: (e,t)=>`M${.5 + e},0 L${.5 + e},1 M0,${.5 + t} L${.5 - e},${.5 + t} L${.5 - e},1 M0,${.5 - t} L${.5 - e},${.5 - t} L${.5 - e},0`
                    },
                    "╤": {
                        1: (e,t)=>`M0,${.5 - t} L1,${.5 - t} M0,${.5 + t} L1,${.5 + t} M.5,${.5 + t} L.5,1`
                    },
                    "╥": {
                        1: (e,t)=>`M0,.5 L1,.5 M${.5 - e},.5 L${.5 - e},1 M${.5 + e},.5 L${.5 + e},1`
                    },
                    "╦": {
                        1: (e,t)=>`M0,${.5 - t} L1,${.5 - t} M0,${.5 + t} L${.5 - e},${.5 + t} L${.5 - e},1 M1,${.5 + t} L${.5 + e},${.5 + t} L${.5 + e},1`
                    },
                    "╧": {
                        1: (e,t)=>`M.5,0 L.5,${.5 - t} M0,${.5 - t} L1,${.5 - t} M0,${.5 + t} L1,${.5 + t}`
                    },
                    "╨": {
                        1: (e,t)=>`M0,.5 L1,.5 M${.5 - e},.5 L${.5 - e},0 M${.5 + e},.5 L${.5 + e},0`
                    },
                    "╩": {
                        1: (e,t)=>`M0,${.5 + t} L1,${.5 + t} M0,${.5 - t} L${.5 - e},${.5 - t} L${.5 - e},0 M1,${.5 - t} L${.5 + e},${.5 - t} L${.5 + e},0`
                    },
                    "╪": {
                        1: (e,t)=>`M.5,0 L.5,1 M0,${.5 - t} L1,${.5 - t} M0,${.5 + t} L1,${.5 + t}`
                    },
                    "╫": {
                        1: (e,t)=>`M0,.5 L1,.5 M${.5 - e},0 L${.5 - e},1 M${.5 + e},0 L${.5 + e},1`
                    },
                    "╬": {
                        1: (e,t)=>`M0,${.5 + t} L${.5 - e},${.5 + t} L${.5 - e},1 M1,${.5 + t} L${.5 + e},${.5 + t} L${.5 + e},1 M0,${.5 - t} L${.5 - e},${.5 - t} L${.5 - e},0 M1,${.5 - t} L${.5 + e},${.5 - t} L${.5 + e},0`
                    },
                    "╱": {
                        1: "M1,0 L0,1"
                    },
                    "╲": {
                        1: "M0,0 L1,1"
                    },
                    "╳": {
                        1: "M1,0 L0,1 M0,0 L1,1"
                    },
                    "╼": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,.5 L1,.5"
                    },
                    "╽": {
                        1: "M.5,.5 L.5,0",
                        3: "M.5,.5 L.5,1"
                    },
                    "╾": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,.5 L0,.5"
                    },
                    "╿": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,.5 L.5,0"
                    },
                    "┍": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,.5 L1,.5"
                    },
                    "┎": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "┑": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,.5 L0,.5"
                    },
                    "┒": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "┕": {
                        1: "M.5,.5 L.5,0",
                        3: "M.5,.5 L1,.5"
                    },
                    "┖": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,.5 L.5,0"
                    },
                    "┙": {
                        1: "M.5,.5 L.5,0",
                        3: "M.5,.5 L0,.5"
                    },
                    "┚": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,.5 L.5,0"
                    },
                    "┝": {
                        1: "M.5,0 L.5,1",
                        3: "M.5,.5 L1,.5"
                    },
                    "┞": {
                        1: "M0.5,1 L.5,.5 L1,.5",
                        3: "M.5,.5 L.5,0"
                    },
                    "┟": {
                        1: "M.5,0 L.5,.5 L1,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "┠": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,0 L.5,1"
                    },
                    "┡": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,0 L.5,.5 L1,.5"
                    },
                    "┢": {
                        1: "M.5,.5 L.5,0",
                        3: "M0.5,1 L.5,.5 L1,.5"
                    },
                    "┥": {
                        1: "M.5,0 L.5,1",
                        3: "M.5,.5 L0,.5"
                    },
                    "┦": {
                        1: "M0,.5 L.5,.5 L.5,1",
                        3: "M.5,.5 L.5,0"
                    },
                    "┧": {
                        1: "M.5,0 L.5,.5 L0,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "┨": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,0 L.5,1"
                    },
                    "┩": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,0 L.5,.5 L0,.5"
                    },
                    "┪": {
                        1: "M.5,.5 L.5,0",
                        3: "M0,.5 L.5,.5 L.5,1"
                    },
                    "┭": {
                        1: "M0.5,1 L.5,.5 L1,.5",
                        3: "M.5,.5 L0,.5"
                    },
                    "┮": {
                        1: "M0,.5 L.5,.5 L.5,1",
                        3: "M.5,.5 L1,.5"
                    },
                    "┯": {
                        1: "M.5,.5 L.5,1",
                        3: "M0,.5 L1,.5"
                    },
                    "┰": {
                        1: "M0,.5 L1,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "┱": {
                        1: "M.5,.5 L1,.5",
                        3: "M0,.5 L.5,.5 L.5,1"
                    },
                    "┲": {
                        1: "M.5,.5 L0,.5",
                        3: "M0.5,1 L.5,.5 L1,.5"
                    },
                    "┵": {
                        1: "M.5,0 L.5,.5 L1,.5",
                        3: "M.5,.5 L0,.5"
                    },
                    "┶": {
                        1: "M.5,0 L.5,.5 L0,.5",
                        3: "M.5,.5 L1,.5"
                    },
                    "┷": {
                        1: "M.5,.5 L.5,0",
                        3: "M0,.5 L1,.5"
                    },
                    "┸": {
                        1: "M0,.5 L1,.5",
                        3: "M.5,.5 L.5,0"
                    },
                    "┹": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,0 L.5,.5 L0,.5"
                    },
                    "┺": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,0 L.5,.5 L1,.5"
                    },
                    "┽": {
                        1: "M.5,0 L.5,1 M.5,.5 L1,.5",
                        3: "M.5,.5 L0,.5"
                    },
                    "┾": {
                        1: "M.5,0 L.5,1 M.5,.5 L0,.5",
                        3: "M.5,.5 L1,.5"
                    },
                    "┿": {
                        1: "M.5,0 L.5,1",
                        3: "M0,.5 L1,.5"
                    },
                    "╀": {
                        1: "M0,.5 L1,.5 M.5,.5 L.5,1",
                        3: "M.5,.5 L.5,0"
                    },
                    "╁": {
                        1: "M.5,.5 L.5,0 M0,.5 L1,.5",
                        3: "M.5,.5 L.5,1"
                    },
                    "╂": {
                        1: "M0,.5 L1,.5",
                        3: "M.5,0 L.5,1"
                    },
                    "╃": {
                        1: "M0.5,1 L.5,.5 L1,.5",
                        3: "M.5,0 L.5,.5 L0,.5"
                    },
                    "╄": {
                        1: "M0,.5 L.5,.5 L.5,1",
                        3: "M.5,0 L.5,.5 L1,.5"
                    },
                    "╅": {
                        1: "M.5,0 L.5,.5 L1,.5",
                        3: "M0,.5 L.5,.5 L.5,1"
                    },
                    "╆": {
                        1: "M.5,0 L.5,.5 L0,.5",
                        3: "M0.5,1 L.5,.5 L1,.5"
                    },
                    "╇": {
                        1: "M.5,.5 L.5,1",
                        3: "M.5,.5 L.5,0 M0,.5 L1,.5"
                    },
                    "╈": {
                        1: "M.5,.5 L.5,0",
                        3: "M0,.5 L1,.5 M.5,.5 L.5,1"
                    },
                    "╉": {
                        1: "M.5,.5 L1,.5",
                        3: "M.5,0 L.5,1 M.5,.5 L0,.5"
                    },
                    "╊": {
                        1: "M.5,.5 L0,.5",
                        3: "M.5,0 L.5,1 M.5,.5 L1,.5"
                    },
                    "╌": {
                        1: "M.1,.5 L.4,.5 M.6,.5 L.9,.5"
                    },
                    "╍": {
                        3: "M.1,.5 L.4,.5 M.6,.5 L.9,.5"
                    },
                    "┄": {
                        1: "M.0667,.5 L.2667,.5 M.4,.5 L.6,.5 M.7333,.5 L.9333,.5"
                    },
                    "┅": {
                        3: "M.0667,.5 L.2667,.5 M.4,.5 L.6,.5 M.7333,.5 L.9333,.5"
                    },
                    "┈": {
                        1: "M.05,.5 L.2,.5 M.3,.5 L.45,.5 M.55,.5 L.7,.5 M.8,.5 L.95,.5"
                    },
                    "┉": {
                        3: "M.05,.5 L.2,.5 M.3,.5 L.45,.5 M.55,.5 L.7,.5 M.8,.5 L.95,.5"
                    },
                    "╎": {
                        1: "M.5,.1 L.5,.4 M.5,.6 L.5,.9"
                    },
                    "╏": {
                        3: "M.5,.1 L.5,.4 M.5,.6 L.5,.9"
                    },
                    "┆": {
                        1: "M.5,.0667 L.5,.2667 M.5,.4 L.5,.6 M.5,.7333 L.5,.9333"
                    },
                    "┇": {
                        3: "M.5,.0667 L.5,.2667 M.5,.4 L.5,.6 M.5,.7333 L.5,.9333"
                    },
                    "┊": {
                        1: "M.5,.05 L.5,.2 M.5,.3 L.5,.45 L.5,.55 M.5,.7 L.5,.95"
                    },
                    "┋": {
                        3: "M.5,.05 L.5,.2 M.5,.3 L.5,.45 L.5,.55 M.5,.7 L.5,.95"
                    },
                    "╭": {
                        1: (e,t)=>`M.5,1 L.5,${.5 + t / .15 * .5} C.5,${.5 + t / .15 * .5},.5,.5,1,.5`
                    },
                    "╮": {
                        1: (e,t)=>`M.5,1 L.5,${.5 + t / .15 * .5} C.5,${.5 + t / .15 * .5},.5,.5,0,.5`
                    },
                    "╯": {
                        1: (e,t)=>`M.5,0 L.5,${.5 - t / .15 * .5} C.5,${.5 - t / .15 * .5},.5,.5,0,.5`
                    },
                    "╰": {
                        1: (e,t)=>`M.5,0 L.5,${.5 - t / .15 * .5} C.5,${.5 - t / .15 * .5},.5,.5,1,.5`
                    }
                },
                t.powerlineDefinitions = {
                    "": {
                        d: "M0,0 L1,.5 L0,1",
                        type: 0,
                        rightPadding: 2
                    },
                    "": {
                        d: "M-1,-.5 L1,.5 L-1,1.5",
                        type: 1,
                        leftPadding: 1,
                        rightPadding: 1
                    },
                    "": {
                        d: "M1,0 L0,.5 L1,1",
                        type: 0,
                        leftPadding: 2
                    },
                    "": {
                        d: "M2,-.5 L0,.5 L2,1.5",
                        type: 1,
                        leftPadding: 1,
                        rightPadding: 1
                    },
                    "": {
                        d: "M0,0 L0,1 C0.552,1,1,0.776,1,.5 C1,0.224,0.552,0,0,0",
                        type: 0,
                        rightPadding: 1
                    },
                    "": {
                        d: "M0,1 C0.552,1,1,0.776,1,.5 C1,0.224,0.552,0,0,0",
                        type: 1,
                        rightPadding: 1
                    },
                    "": {
                        d: "M1,0 L1,1 C0.448,1,0,0.776,0,.5 C0,0.224,0.448,0,1,0",
                        type: 0,
                        leftPadding: 1
                    },
                    "": {
                        d: "M1,1 C0.448,1,0,0.776,0,.5 C0,0.224,0.448,0,1,0",
                        type: 1,
                        leftPadding: 1
                    },
                    "": {
                        d: "M-.5,-.5 L1.5,1.5 L-.5,1.5",
                        type: 0
                    },
                    "": {
                        d: "M-.5,-.5 L1.5,1.5",
                        type: 1,
                        leftPadding: 1,
                        rightPadding: 1
                    },
                    "": {
                        d: "M1.5,-.5 L-.5,1.5 L1.5,1.5",
                        type: 0
                    },
                    "": {
                        d: "M1.5,-.5 L-.5,1.5 L-.5,-.5",
                        type: 0
                    },
                    "": {
                        d: "M1.5,-.5 L-.5,1.5",
                        type: 1,
                        leftPadding: 1,
                        rightPadding: 1
                    },
                    "": {
                        d: "M-.5,-.5 L1.5,1.5 L1.5,-.5",
                        type: 0
                    }
                },
                t.powerlineDefinitions[""] = t.powerlineDefinitions[""],
                t.powerlineDefinitions[""] = t.powerlineDefinitions[""],
                t.tryDrawCustomChar = function(e, i, n, l, c, d, _, u) {
                    const g = t.blockElementDefinitions[i];
                    if (g)
                        return function(e, t, i, s, r, o) {
                            for (let n = 0; n < t.length; n++) {
                                const a = t[n]
                                  , h = r / 8
                                  , l = o / 8;
                                e.fillRect(i + a.x * h, s + a.y * l, a.w * h, a.h * l)
                            }
                        }(e, g, n, l, c, d),
                        !0;
                    const v = r[i];
                    if (v)
                        return function(e, t, i, r, n, a) {
                            let h = o.get(t);
                            h || (h = new Map,
                            o.set(t, h));
                            const l = e.fillStyle;
                            if ("string" != typeof l)
                                throw new Error(`Unexpected fillStyle type "${l}"`);
                            let c = h.get(l);
                            if (!c) {
                                const i = t[0].length
                                  , r = t.length
                                  , o = document.createElement("canvas");
                                o.width = i,
                                o.height = r;
                                const n = (0,
                                s.throwIfFalsy)(o.getContext("2d"))
                                  , a = new ImageData(i,r);
                                let d, _, u, g;
                                if (l.startsWith("#"))
                                    d = parseInt(l.slice(1, 3), 16),
                                    _ = parseInt(l.slice(3, 5), 16),
                                    u = parseInt(l.slice(5, 7), 16),
                                    g = l.length > 7 && parseInt(l.slice(7, 9), 16) || 1;
                                else {
                                    if (!l.startsWith("rgba"))
                                        throw new Error(`Unexpected fillStyle color format "${l}" when drawing pattern glyph`);
                                    [d,_,u,g] = l.substring(5, l.length - 1).split(",").map((e=>parseFloat(e)))
                                }
                                for (let e = 0; e < r; e++)
                                    for (let s = 0; s < i; s++)
                                        a.data[4 * (e * i + s)] = d,
                                        a.data[4 * (e * i + s) + 1] = _,
                                        a.data[4 * (e * i + s) + 2] = u,
                                        a.data[4 * (e * i + s) + 3] = t[e][s] * (255 * g);
                                n.putImageData(a, 0, 0),
                                c = (0,
                                s.throwIfFalsy)(e.createPattern(o, null)),
                                h.set(l, c)
                            }
                            e.fillStyle = c,
                            e.fillRect(i, r, n, a)
                        }(e, v, n, l, c, d),
                        !0;
                    const f = t.boxDrawingDefinitions[i];
                    if (f)
                        return function(e, t, i, s, r, o, n) {
                            e.strokeStyle = e.fillStyle;
                            for (const [l,c] of Object.entries(t)) {
                                let t;
                                e.beginPath(),
                                e.lineWidth = n * Number.parseInt(l),
                                t = "function" == typeof c ? c(.15, .15 / o * r) : c;
                                for (const l of t.split(" ")) {
                                    const t = l[0]
                                      , c = a[t];
                                    if (!c) {
                                        console.error(`Could not find drawing instructions for "${t}"`);
                                        continue
                                    }
                                    const d = l.substring(1).split(",");
                                    d[0] && d[1] && c(e, h(d, r, o, i, s, !0, n))
                                }
                                e.stroke(),
                                e.closePath()
                            }
                        }(e, f, n, l, c, d, u),
                        !0;
                    const C = t.powerlineDefinitions[i];
                    return !!C && (function(e, t, i, s, r, o, n, l) {
                        var c, d;
                        const _ = new Path2D;
                        _.rect(i, s, r, o),
                        e.clip(_),
                        e.beginPath();
                        const u = n / 12;
                        e.lineWidth = l * u;
                        for (const n of t.d.split(" ")) {
                            const _ = n[0]
                              , g = a[_];
                            if (!g) {
                                console.error(`Could not find drawing instructions for "${_}"`);
                                continue
                            }
                            const v = n.substring(1).split(",");
                            v[0] && v[1] && g(e, h(v, r, o, i, s, !1, l, (null !== (c = t.leftPadding) && void 0 !== c ? c : 0) * (u / 2), (null !== (d = t.rightPadding) && void 0 !== d ? d : 0) * (u / 2)))
                        }
                        1 === t.type ? (e.strokeStyle = e.fillStyle,
                        e.stroke()) : e.fill(),
                        e.closePath()
                    }(e, C, n, l, c, d, _, u),
                    !0)
                }
                ;
                const o = new Map;
                function n(e, t, i=0) {
                    return Math.max(Math.min(e, t), i)
                }
                const a = {
                    C: (e,t)=>e.bezierCurveTo(t[0], t[1], t[2], t[3], t[4], t[5]),
                    L: (e,t)=>e.lineTo(t[0], t[1]),
                    M: (e,t)=>e.moveTo(t[0], t[1])
                };
                function h(e, t, i, s, r, o, a, h=0, l=0) {
                    const c = e.map((e=>parseFloat(e) || parseInt(e)));
                    if (c.length < 2)
                        throw new Error("Too few arguments for instruction");
                    for (let e = 0; e < c.length; e += 2)
                        c[e] *= t - h * a - l * a,
                        o && 0 !== c[e] && (c[e] = n(Math.round(c[e] + .5) - .5, t, 0)),
                        c[e] += s + h * a;
                    for (let e = 1; e < c.length; e += 2)
                        c[e] *= i,
                        o && 0 !== c[e] && (c[e] = n(Math.round(c[e] + .5) - .5, i, 0)),
                        c[e] += r;
                    return c
                }
            }
            ,
            56: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.observeDevicePixelDimensions = void 0;
                const s = i(859);
                t.observeDevicePixelDimensions = function(e, t, i) {
                    let r = new t.ResizeObserver((t=>{
                        const s = t.find((t=>t.target === e));
                        if (!s)
                            return;
                        if (!("devicePixelContentBoxSize"in s))
                            return null == r || r.disconnect(),
                            void (r = void 0);
                        const o = s.devicePixelContentBoxSize[0].inlineSize
                          , n = s.devicePixelContentBoxSize[0].blockSize;
                        o > 0 && n > 0 && i(o, n)
                    }
                    ));
                    try {
                        r.observe(e, {
                            box: ["device-pixel-content-box"]
                        })
                    } catch (e) {
                        r.disconnect(),
                        r = void 0
                    }
                    return (0,
                    s.toDisposable)((()=>null == r ? void 0 : r.disconnect()))
                }
            }
            ,
            374: (e,t)=>{
                function i(e) {
                    return 57508 <= e && e <= 57558
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.createRenderDimensions = t.excludeFromContrastRatioDemands = t.isRestrictedPowerlineGlyph = t.isPowerlineGlyph = t.throwIfFalsy = void 0,
                t.throwIfFalsy = function(e) {
                    if (!e)
                        throw new Error("value must not be falsy");
                    return e
                }
                ,
                t.isPowerlineGlyph = i,
                t.isRestrictedPowerlineGlyph = function(e) {
                    return 57520 <= e && e <= 57527
                }
                ,
                t.excludeFromContrastRatioDemands = function(e) {
                    return i(e) || function(e) {
                        return 9472 <= e && e <= 9631
                    }(e)
                }
                ,
                t.createRenderDimensions = function() {
                    return {
                        css: {
                            canvas: {
                                width: 0,
                                height: 0
                            },
                            cell: {
                                width: 0,
                                height: 0
                            }
                        },
                        device: {
                            canvas: {
                                width: 0,
                                height: 0
                            },
                            cell: {
                                width: 0,
                                height: 0
                            },
                            char: {
                                width: 0,
                                height: 0,
                                left: 0,
                                top: 0
                            }
                        }
                    }
                }
            }
            ,
            296: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.createSelectionRenderModel = void 0;
                class i {
                    constructor() {
                        this.clear()
                    }
                    clear() {
                        this.hasSelection = !1,
                        this.columnSelectMode = !1,
                        this.viewportStartRow = 0,
                        this.viewportEndRow = 0,
                        this.viewportCappedStartRow = 0,
                        this.viewportCappedEndRow = 0,
                        this.startCol = 0,
                        this.endCol = 0,
                        this.selectionStart = void 0,
                        this.selectionEnd = void 0
                    }
                    update(e, t, i, s=!1) {
                        if (this.selectionStart = t,
                        this.selectionEnd = i,
                        !t || !i || t[0] === i[0] && t[1] === i[1])
                            return void this.clear();
                        const r = t[1] - e.buffer.active.viewportY
                          , o = i[1] - e.buffer.active.viewportY
                          , n = Math.max(r, 0)
                          , a = Math.min(o, e.rows - 1);
                        n >= e.rows || a < 0 ? this.clear() : (this.hasSelection = !0,
                        this.columnSelectMode = s,
                        this.viewportStartRow = r,
                        this.viewportEndRow = o,
                        this.viewportCappedStartRow = n,
                        this.viewportCappedEndRow = a,
                        this.startCol = t[0],
                        this.endCol = i[0])
                    }
                    isCellSelected(e, t, i) {
                        return !!this.hasSelection && (i -= e.buffer.active.viewportY,
                        this.columnSelectMode ? this.startCol <= this.endCol ? t >= this.startCol && i >= this.viewportCappedStartRow && t < this.endCol && i <= this.viewportCappedEndRow : t < this.startCol && i >= this.viewportCappedStartRow && t >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && t >= this.startCol && t < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && t < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && t >= this.startCol)
                    }
                }
                t.createSelectionRenderModel = function() {
                    return new i
                }
            }
            ,
            509: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.TextureAtlas = void 0;
                const s = i(237)
                  , r = i(855)
                  , o = i(147)
                  , n = i(160)
                  , a = i(860)
                  , h = i(374)
                  , l = i(485)
                  , c = i(385)
                  , d = i(345)
                  , _ = {
                    texturePage: 0,
                    texturePosition: {
                        x: 0,
                        y: 0
                    },
                    texturePositionClipSpace: {
                        x: 0,
                        y: 0
                    },
                    offset: {
                        x: 0,
                        y: 0
                    },
                    size: {
                        x: 0,
                        y: 0
                    },
                    sizeClipSpace: {
                        x: 0,
                        y: 0
                    }
                };
                let u;
                class g {
                    constructor(e, t, i) {
                        this._document = e,
                        this._config = t,
                        this._unicodeService = i,
                        this._didWarmUp = !1,
                        this._cacheMap = new l.FourKeyMap,
                        this._cacheMapCombined = new l.FourKeyMap,
                        this._pages = [],
                        this._activePages = [],
                        this._workBoundingBox = {
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        },
                        this._workAttributeData = new o.AttributeData,
                        this._textureSize = 512,
                        this._onAddTextureAtlasCanvas = new d.EventEmitter,
                        this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event,
                        this._onRemoveTextureAtlasCanvas = new d.EventEmitter,
                        this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event,
                        this._requestClearModel = !1,
                        this._createNewPage(),
                        this._tmpCanvas = C(e, 4 * this._config.deviceCellWidth + 4, this._config.deviceCellHeight + 4),
                        this._tmpCtx = (0,
                        h.throwIfFalsy)(this._tmpCanvas.getContext("2d", {
                            alpha: this._config.allowTransparency,
                            willReadFrequently: !0
                        }))
                    }
                    get pages() {
                        return this._pages
                    }
                    dispose() {
                        for (const e of this.pages)
                            e.canvas.remove();
                        this._onAddTextureAtlasCanvas.dispose()
                    }
                    warmUp() {
                        this._didWarmUp || (this._doWarmUp(),
                        this._didWarmUp = !0)
                    }
                    _doWarmUp() {
                        const e = new c.IdleTaskQueue;
                        for (let t = 33; t < 126; t++)
                            e.enqueue((()=>{
                                if (!this._cacheMap.get(t, r.DEFAULT_COLOR, r.DEFAULT_COLOR, r.DEFAULT_EXT)) {
                                    const e = this._drawToCache(t, r.DEFAULT_COLOR, r.DEFAULT_COLOR, r.DEFAULT_EXT);
                                    this._cacheMap.set(t, r.DEFAULT_COLOR, r.DEFAULT_COLOR, r.DEFAULT_EXT, e)
                                }
                            }
                            ))
                    }
                    beginFrame() {
                        return this._requestClearModel
                    }
                    clearTexture() {
                        if (0 !== this._pages[0].currentRow.x || 0 !== this._pages[0].currentRow.y) {
                            for (const e of this._pages)
                                e.clear();
                            this._cacheMap.clear(),
                            this._cacheMapCombined.clear(),
                            this._didWarmUp = !1
                        }
                    }
                    _createNewPage() {
                        g.maxAtlasPages && this._pages.length >= Math.max(4, g.maxAtlasPages / 2) && queueMicrotask((()=>{
                            const e = this._pages.filter((e=>2 * e.canvas.width <= (g.maxTextureSize || 4096))).sort(((e,t)=>t.canvas.width !== e.canvas.width ? t.canvas.width - e.canvas.width : t.percentageUsed - e.percentageUsed));
                            let t = -1
                              , i = 0;
                            for (let s = 0; s < e.length; s++)
                                if (e[s].canvas.width !== i)
                                    t = s,
                                    i = e[s].canvas.width;
                                else if (s - t == 3)
                                    break;
                            const s = e.slice(t, t + 4)
                              , r = s.map((e=>e.glyphs[0].texturePage)).sort(((e,t)=>e > t ? 1 : -1))
                              , o = r[0]
                              , n = this._mergePages(s, o);
                            n.version++,
                            this._pages[o] = n;
                            for (let e = r.length - 1; e >= 1; e--)
                                this._deletePage(r[e]);
                            this._requestClearModel = !0,
                            this._onAddTextureAtlasCanvas.fire(n.canvas)
                        }
                        ));
                        const e = new v(this._document,this._textureSize);
                        return this._pages.push(e),
                        this._activePages.push(e),
                        this._onAddTextureAtlasCanvas.fire(e.canvas),
                        e
                    }
                    _mergePages(e, t) {
                        const i = 2 * e[0].canvas.width
                          , s = new v(this._document,i,e);
                        for (const [r,o] of e.entries()) {
                            const e = r * o.canvas.width % i
                              , n = Math.floor(r / 2) * o.canvas.height;
                            s.ctx.drawImage(o.canvas, e, n);
                            for (const s of o.glyphs)
                                s.texturePage = t,
                                s.sizeClipSpace.x = s.size.x / i,
                                s.sizeClipSpace.y = s.size.y / i,
                                s.texturePosition.x += e,
                                s.texturePosition.y += n,
                                s.texturePositionClipSpace.x = s.texturePosition.x / i,
                                s.texturePositionClipSpace.y = s.texturePosition.y / i;
                            this._onRemoveTextureAtlasCanvas.fire(o.canvas);
                            const a = this._activePages.indexOf(o);
                            -1 !== a && this._activePages.splice(a, 1)
                        }
                        return s
                    }
                    _deletePage(e) {
                        this._pages.splice(e, 1);
                        for (let t = e; t < this._pages.length; t++) {
                            const e = this._pages[t];
                            for (const t of e.glyphs)
                                t.texturePage--;
                            e.version++
                        }
                    }
                    getRasterizedGlyphCombinedChar(e, t, i, s) {
                        return this._getFromCacheMap(this._cacheMapCombined, e, t, i, s)
                    }
                    getRasterizedGlyph(e, t, i, s) {
                        return this._getFromCacheMap(this._cacheMap, e, t, i, s)
                    }
                    _getFromCacheMap(e, t, i, s, r) {
                        return u = e.get(t, i, s, r),
                        u || (u = this._drawToCache(t, i, s, r),
                        e.set(t, i, s, r, u)),
                        u
                    }
                    _getColorFromAnsiIndex(e) {
                        if (e >= this._config.colors.ansi.length)
                            throw new Error("No color found for idx " + e);
                        return this._config.colors.ansi[e]
                    }
                    _getBackgroundColor(e, t, i, r) {
                        if (this._config.allowTransparency)
                            return n.NULL_COLOR;
                        let a;
                        switch (e) {
                        case 16777216:
                        case 33554432:
                            a = this._getColorFromAnsiIndex(t);
                            break;
                        case 50331648:
                            const e = o.AttributeData.toColorRGB(t);
                            a = n.rgba.toColor(e[0], e[1], e[2]);
                            break;
                        default:
                            a = i ? this._config.colors.foreground : this._config.colors.background
                        }
                        return r && (a = n.color.blend(this._config.colors.background, n.color.multiplyOpacity(a, s.DIM_OPACITY))),
                        a
                    }
                    _getForegroundColor(e, t, i, r, a, h, l, c, d, _) {
                        const u = this._getMinimumContrastColor(e, t, i, r, a, h, !1, d, _);
                        if (u)
                            return u;
                        let g;
                        switch (a) {
                        case 16777216:
                        case 33554432:
                            this._config.drawBoldTextInBrightColors && d && h < 8 && (h += 8),
                            g = this._getColorFromAnsiIndex(h);
                            break;
                        case 50331648:
                            const e = o.AttributeData.toColorRGB(h);
                            g = n.rgba.toColor(e[0], e[1], e[2]);
                            break;
                        default:
                            g = l ? this._config.colors.background : this._config.colors.foreground
                        }
                        return this._config.allowTransparency && (g = n.color.opaque(g)),
                        c && (g = n.color.multiplyOpacity(g, s.DIM_OPACITY)),
                        g
                    }
                    _resolveBackgroundRgba(e, t, i) {
                        switch (e) {
                        case 16777216:
                        case 33554432:
                            return this._getColorFromAnsiIndex(t).rgba;
                        case 50331648:
                            return t << 8;
                        default:
                            return i ? this._config.colors.foreground.rgba : this._config.colors.background.rgba
                        }
                    }
                    _resolveForegroundRgba(e, t, i, s) {
                        switch (e) {
                        case 16777216:
                        case 33554432:
                            return this._config.drawBoldTextInBrightColors && s && t < 8 && (t += 8),
                            this._getColorFromAnsiIndex(t).rgba;
                        case 50331648:
                            return t << 8;
                        default:
                            return i ? this._config.colors.background.rgba : this._config.colors.foreground.rgba
                        }
                    }
                    _getMinimumContrastColor(e, t, i, s, r, o, a, h, l) {
                        if (1 === this._config.minimumContrastRatio || l)
                            return;
                        const c = this._config.colors.contrastCache.getColor(e, s);
                        if (void 0 !== c)
                            return c || void 0;
                        const d = this._resolveBackgroundRgba(t, i, a)
                          , _ = this._resolveForegroundRgba(r, o, a, h)
                          , u = n.rgba.ensureContrastRatio(d, _, this._config.minimumContrastRatio);
                        if (!u)
                            return void this._config.colors.contrastCache.setColor(e, s, null);
                        const g = n.rgba.toColor(u >> 24 & 255, u >> 16 & 255, u >> 8 & 255);
                        return this._config.colors.contrastCache.setColor(e, s, g),
                        g
                    }
                    _drawToCache(e, t, i, r) {
                        const n = "number" == typeof e ? String.fromCharCode(e) : e
                          , l = this._config.deviceCellWidth * Math.max(n.length, 2) + 4;
                        this._tmpCanvas.width < l && (this._tmpCanvas.width = l);
                        const c = this._config.deviceCellHeight + 8;
                        if (this._tmpCanvas.height < c && (this._tmpCanvas.height = c),
                        this._tmpCtx.save(),
                        this._workAttributeData.fg = i,
                        this._workAttributeData.bg = t,
                        this._workAttributeData.extended.ext = r,
                        this._workAttributeData.isInvisible())
                            return _;
                        const d = !!this._workAttributeData.isBold()
                          , u = !!this._workAttributeData.isInverse()
                          , g = !!this._workAttributeData.isDim()
                          , v = !!this._workAttributeData.isItalic()
                          , C = !!this._workAttributeData.isUnderline()
                          , p = !!this._workAttributeData.isStrikethrough();
                        let m = this._workAttributeData.getFgColor()
                          , x = this._workAttributeData.getFgColorMode()
                          , L = this._workAttributeData.getBgColor()
                          , w = this._workAttributeData.getBgColorMode();
                        if (u) {
                            const e = m;
                            m = L,
                            L = e;
                            const t = x;
                            x = w,
                            w = t
                        }
                        const b = this._getBackgroundColor(w, L, u, g);
                        this._tmpCtx.globalCompositeOperation = "copy",
                        this._tmpCtx.fillStyle = b.css,
                        this._tmpCtx.fillRect(0, 0, this._tmpCanvas.width, this._tmpCanvas.height),
                        this._tmpCtx.globalCompositeOperation = "source-over";
                        const M = d ? this._config.fontWeightBold : this._config.fontWeight
                          , R = v ? "italic" : "";
                        this._tmpCtx.font = `${R} ${M} ${this._config.fontSize * this._config.devicePixelRatio}px ${this._config.fontFamily}`,
                        this._tmpCtx.textBaseline = s.TEXT_BASELINE;
                        const y = 1 === n.length && (0,
                        h.isPowerlineGlyph)(n.charCodeAt(0))
                          , A = 1 === n.length && (0,
                        h.isRestrictedPowerlineGlyph)(n.charCodeAt(0))
                          , E = this._getForegroundColor(t, w, L, i, x, m, u, g, d, (0,
                        h.excludeFromContrastRatioDemands)(n.charCodeAt(0)));
                        this._tmpCtx.fillStyle = E.css;
                        const T = A ? 0 : 4;
                        let S = !1;
                        !1 !== this._config.customGlyphs && (S = (0,
                        a.tryDrawCustomChar)(this._tmpCtx, n, T, T, this._config.deviceCellWidth, this._config.deviceCellHeight, this._config.fontSize, this._config.devicePixelRatio));
                        let D, B = !y;
                        if (D = "number" == typeof e ? this._unicodeService.wcwidth(e) : this._unicodeService.getStringCellWidth(e),
                        C) {
                            this._tmpCtx.save();
                            const e = Math.max(1, Math.floor(this._config.fontSize * this._config.devicePixelRatio / 15))
                              , t = e % 2 == 1 ? .5 : 0;
                            if (this._tmpCtx.lineWidth = e,
                            this._workAttributeData.isUnderlineColorDefault())
                                this._tmpCtx.strokeStyle = this._tmpCtx.fillStyle;
                            else if (this._workAttributeData.isUnderlineColorRGB())
                                B = !1,
                                this._tmpCtx.strokeStyle = `rgb(${o.AttributeData.toColorRGB(this._workAttributeData.getUnderlineColor()).join(",")})`;
                            else {
                                B = !1;
                                let e = this._workAttributeData.getUnderlineColor();
                                this._config.drawBoldTextInBrightColors && this._workAttributeData.isBold() && e < 8 && (e += 8),
                                this._tmpCtx.strokeStyle = this._getColorFromAnsiIndex(e).css
                            }
                            this._tmpCtx.beginPath();
                            const i = T
                              , s = Math.ceil(T + this._config.deviceCharHeight) - t
                              , r = T + this._config.deviceCharHeight + e - t
                              , a = Math.ceil(T + this._config.deviceCharHeight + 2 * e) - t;
                            for (let o = 0; o < D; o++) {
                                this._tmpCtx.save();
                                const n = i + o * this._config.deviceCellWidth
                                  , h = i + (o + 1) * this._config.deviceCellWidth
                                  , l = n + this._config.deviceCellWidth / 2;
                                switch (this._workAttributeData.extended.underlineStyle) {
                                case 2:
                                    this._tmpCtx.moveTo(n, s),
                                    this._tmpCtx.lineTo(h, s),
                                    this._tmpCtx.moveTo(n, a),
                                    this._tmpCtx.lineTo(h, a);
                                    break;
                                case 3:
                                    const i = e <= 1 ? a : Math.ceil(T + this._config.deviceCharHeight - e / 2) - t
                                      , o = e <= 1 ? s : Math.ceil(T + this._config.deviceCharHeight + e / 2) - t
                                      , c = new Path2D;
                                    c.rect(n, s, this._config.deviceCellWidth, a - s),
                                    this._tmpCtx.clip(c),
                                    this._tmpCtx.moveTo(n - this._config.deviceCellWidth / 2, r),
                                    this._tmpCtx.bezierCurveTo(n - this._config.deviceCellWidth / 2, o, n, o, n, r),
                                    this._tmpCtx.bezierCurveTo(n, i, l, i, l, r),
                                    this._tmpCtx.bezierCurveTo(l, o, h, o, h, r),
                                    this._tmpCtx.bezierCurveTo(h, i, h + this._config.deviceCellWidth / 2, i, h + this._config.deviceCellWidth / 2, r);
                                    break;
                                case 4:
                                    this._tmpCtx.setLineDash([2 * this._config.devicePixelRatio, this._config.devicePixelRatio]),
                                    this._tmpCtx.moveTo(n, s),
                                    this._tmpCtx.lineTo(h, s);
                                    break;
                                case 5:
                                    this._tmpCtx.setLineDash([4 * this._config.devicePixelRatio, 3 * this._config.devicePixelRatio]),
                                    this._tmpCtx.moveTo(n, s),
                                    this._tmpCtx.lineTo(h, s);
                                    break;
                                default:
                                    this._tmpCtx.moveTo(n, s),
                                    this._tmpCtx.lineTo(h, s)
                                }
                                this._tmpCtx.stroke(),
                                this._tmpCtx.restore()
                            }
                            if (this._tmpCtx.restore(),
                            !S && this._config.fontSize >= 12 && !this._config.allowTransparency && " " !== n) {
                                this._tmpCtx.save(),
                                this._tmpCtx.textBaseline = "alphabetic";
                                const t = this._tmpCtx.measureText(n);
                                if (this._tmpCtx.restore(),
                                "actualBoundingBoxDescent"in t && t.actualBoundingBoxDescent > 0) {
                                    this._tmpCtx.save();
                                    const t = new Path2D;
                                    t.rect(i, s - Math.ceil(e / 2), this._config.deviceCellWidth, a - s + Math.ceil(e / 2)),
                                    this._tmpCtx.clip(t),
                                    this._tmpCtx.lineWidth = 3 * this._config.devicePixelRatio,
                                    this._tmpCtx.strokeStyle = b.css,
                                    this._tmpCtx.strokeText(n, T, T + this._config.deviceCharHeight),
                                    this._tmpCtx.restore()
                                }
                            }
                        }
                        if (S || this._tmpCtx.fillText(n, T, T + this._config.deviceCharHeight),
                        "_" === n && !this._config.allowTransparency) {
                            let e = f(this._tmpCtx.getImageData(T, T, this._config.deviceCellWidth, this._config.deviceCellHeight), b, E, B);
                            if (e)
                                for (let t = 1; t <= 5 && (this._tmpCtx.save(),
                                this._tmpCtx.fillStyle = b.css,
                                this._tmpCtx.fillRect(0, 0, this._tmpCanvas.width, this._tmpCanvas.height),
                                this._tmpCtx.restore(),
                                this._tmpCtx.fillText(n, T, T + this._config.deviceCharHeight - t),
                                e = f(this._tmpCtx.getImageData(T, T, this._config.deviceCellWidth, this._config.deviceCellHeight), b, E, B),
                                e); t++)
                                    ;
                        }
                        if (p) {
                            const e = Math.max(1, Math.floor(this._config.fontSize * this._config.devicePixelRatio / 10))
                              , t = this._tmpCtx.lineWidth % 2 == 1 ? .5 : 0;
                            this._tmpCtx.lineWidth = e,
                            this._tmpCtx.strokeStyle = this._tmpCtx.fillStyle,
                            this._tmpCtx.beginPath(),
                            this._tmpCtx.moveTo(T, T + Math.floor(this._config.deviceCharHeight / 2) - t),
                            this._tmpCtx.lineTo(T + this._config.deviceCharWidth * D, T + Math.floor(this._config.deviceCharHeight / 2) - t),
                            this._tmpCtx.stroke()
                        }
                        this._tmpCtx.restore();
                        const P = this._tmpCtx.getImageData(0, 0, this._tmpCanvas.width, this._tmpCanvas.height);
                        let F;
                        if (F = this._config.allowTransparency ? function(e) {
                            for (let t = 0; t < e.data.length; t += 4)
                                if (e.data[t + 3] > 0)
                                    return !1;
                            return !0
                        }(P) : f(P, b, E, B),
                        F)
                            return _;
                        const I = this._findGlyphBoundingBox(P, this._workBoundingBox, l, A, S, T);
                        let$, k;
                        for (; ; ) {
                            if (0 === this._activePages.length) {
                                const e = this._createNewPage();
                                $ = e,
                                k = e.currentRow,
                                k.height = I.size.y;
                                break
                            }
                            $ = this._activePages[this._activePages.length - 1],
                            k = $.currentRow;
                            for (const e of this._activePages)
                                I.size.y <= e.currentRow.height && ($ = e,
                                k = e.currentRow);
                            for (let e = this._activePages.length - 1; e >= 0; e--)
                                for (const t of this._activePages[e].fixedRows)
                                    t.height <= k.height && I.size.y <= t.height && ($ = this._activePages[e],
                                    k = t);
                            if (k.y + I.size.y >= $.canvas.height || k.height > I.size.y + 2) {
                                let e = !1;
                                if ($.currentRow.y + $.currentRow.height + I.size.y >= $.canvas.height) {
                                    let t;
                                    for (const e of this._activePages)
                                        if (e.currentRow.y + e.currentRow.height + I.size.y < e.canvas.height) {
                                            t = e;
                                            break
                                        }
                                    if (t)
                                        $ = t;
                                    else {
                                        const t = this._createNewPage();
                                        $ = t,
                                        k = t.currentRow,
                                        k.height = I.size.y,
                                        e = !0
                                    }
                                }
                                e || ($.currentRow.height > 0 && $.fixedRows.push($.currentRow),
                                k = {
                                    x: 0,
                                    y: $.currentRow.y + $.currentRow.height,
                                    height: I.size.y
                                },
                                $.fixedRows.push(k),
                                $.currentRow = {
                                    x: 0,
                                    y: k.y + k.height,
                                    height: 0
                                })
                            }
                            if (k.x + I.size.x <= $.canvas.width)
                                break;
                            k === $.currentRow ? (k.x = 0,
                            k.y += k.height,
                            k.height = 0) : $.fixedRows.splice($.fixedRows.indexOf(k), 1)
                        }
                        return I.texturePage = this._pages.indexOf($),
                        I.texturePosition.x = k.x,
                        I.texturePosition.y = k.y,
                        I.texturePositionClipSpace.x = k.x / $.canvas.width,
                        I.texturePositionClipSpace.y = k.y / $.canvas.height,
                        I.sizeClipSpace.x /= $.canvas.width,
                        I.sizeClipSpace.y /= $.canvas.height,
                        k.height = Math.max(k.height, I.size.y),
                        k.x += I.size.x,
                        $.ctx.putImageData(P, I.texturePosition.x - this._workBoundingBox.left, I.texturePosition.y - this._workBoundingBox.top, this._workBoundingBox.left, this._workBoundingBox.top, I.size.x, I.size.y),
                        $.addGlyph(I),
                        $.version++,
                        I
                    }
                    _findGlyphBoundingBox(e, t, i, s, r, o) {
                        t.top = 0;
                        const n = s ? this._config.deviceCellHeight : this._tmpCanvas.height
                          , a = s ? this._config.deviceCellWidth : i;
                        let h = !1;
                        for (let i = 0; i < n; i++) {
                            for (let s = 0; s < a; s++) {
                                const r = i * this._tmpCanvas.width * 4 + 4 * s + 3;
                                if (0 !== e.data[r]) {
                                    t.top = i,
                                    h = !0;
                                    break
                                }
                            }
                            if (h)
                                break
                        }
                        t.left = 0,
                        h = !1;
                        for (let i = 0; i < o + a; i++) {
                            for (let s = 0; s < n; s++) {
                                const r = s * this._tmpCanvas.width * 4 + 4 * i + 3;
                                if (0 !== e.data[r]) {
                                    t.left = i,
                                    h = !0;
                                    break
                                }
                            }
                            if (h)
                                break
                        }
                        t.right = a,
                        h = !1;
                        for (let i = o + a - 1; i >= o; i--) {
                            for (let s = 0; s < n; s++) {
                                const r = s * this._tmpCanvas.width * 4 + 4 * i + 3;
                                if (0 !== e.data[r]) {
                                    t.right = i,
                                    h = !0;
                                    break
                                }
                            }
                            if (h)
                                break
                        }
                        t.bottom = n,
                        h = !1;
                        for (let i = n - 1; i >= 0; i--) {
                            for (let s = 0; s < a; s++) {
                                const r = i * this._tmpCanvas.width * 4 + 4 * s + 3;
                                if (0 !== e.data[r]) {
                                    t.bottom = i,
                                    h = !0;
                                    break
                                }
                            }
                            if (h)
                                break
                        }
                        return {
                            texturePage: 0,
                            texturePosition: {
                                x: 0,
                                y: 0
                            },
                            texturePositionClipSpace: {
                                x: 0,
                                y: 0
                            },
                            size: {
                                x: t.right - t.left + 1,
                                y: t.bottom - t.top + 1
                            },
                            sizeClipSpace: {
                                x: t.right - t.left + 1,
                                y: t.bottom - t.top + 1
                            },
                            offset: {
                                x: -t.left + o + (s || r ? Math.floor((this._config.deviceCellWidth - this._config.deviceCharWidth) / 2) : 0),
                                y: -t.top + o + (s || r ? 1 === this._config.lineHeight ? 0 : Math.round((this._config.deviceCellHeight - this._config.deviceCharHeight) / 2) : 0)
                            }
                        }
                    }
                }
                t.TextureAtlas = g;
                class v {
                    constructor(e, t, i) {
                        if (this._usedPixels = 0,
                        this._glyphs = [],
                        this.version = 0,
                        this.currentRow = {
                            x: 0,
                            y: 0,
                            height: 0
                        },
                        this.fixedRows = [],
                        i)
                            for (const e of i)
                                this._glyphs.push(...e.glyphs),
                                this._usedPixels += e._usedPixels;
                        this.canvas = C(e, t, t),
                        this.ctx = (0,
                        h.throwIfFalsy)(this.canvas.getContext("2d", {
                            alpha: !0
                        }))
                    }
                    get percentageUsed() {
                        return this._usedPixels / (this.canvas.width * this.canvas.height)
                    }
                    get glyphs() {
                        return this._glyphs
                    }
                    addGlyph(e) {
                        this._glyphs.push(e),
                        this._usedPixels += e.size.x * e.size.y
                    }
                    clear() {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                        this.currentRow.x = 0,
                        this.currentRow.y = 0,
                        this.currentRow.height = 0,
                        this.fixedRows.length = 0,
                        this.version++
                    }
                }
                function f(e, t, i, s) {
                    const r = t.rgba >>> 24
                      , o = t.rgba >>> 16 & 255
                      , n = t.rgba >>> 8 & 255
                      , a = i.rgba >>> 24
                      , h = i.rgba >>> 16 & 255
                      , l = i.rgba >>> 8 & 255
                      , c = Math.floor((Math.abs(r - a) + Math.abs(o - h) + Math.abs(n - l)) / 12);
                    let d = !0;
                    for (let t = 0; t < e.data.length; t += 4)
                        e.data[t] === r && e.data[t + 1] === o && e.data[t + 2] === n || s && Math.abs(e.data[t] - r) + Math.abs(e.data[t + 1] - o) + Math.abs(e.data[t + 2] - n) < c ? e.data[t + 3] = 0 : d = !1;
                    return d
                }
                function C(e, t, i) {
                    const s = e.createElement("canvas");
                    return s.width = t,
                    s.height = i,
                    s
                }
            }
            ,
            160: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.contrastRatio = t.toPaddedHex = t.rgba = t.rgb = t.css = t.color = t.channels = t.NULL_COLOR = void 0;
                const s = i(399);
                let r = 0
                  , o = 0
                  , n = 0
                  , a = 0;
                var h, l, c;
                function d(e) {
                    const t = e.toString(16);
                    return t.length < 2 ? "0" + t : t
                }
                function _(e, t) {
                    return e < t ? (t + .05) / (e + .05) : (e + .05) / (t + .05)
                }
                t.NULL_COLOR = {
                    css: "#00000000",
                    rgba: 0
                },
                function(e) {
                    e.toCss = function(e, t, i, s) {
                        return void 0 !== s ? `#${d(e)}${d(t)}${d(i)}${d(s)}` : `#${d(e)}${d(t)}${d(i)}`
                    }
                    ,
                    e.toRgba = function(e, t, i, s=255) {
                        return (e << 24 | t << 16 | i << 8 | s) >>> 0
                    }
                }(h = t.channels || (t.channels = {})),
                function(e) {
                    function t(e, t) {
                        return a = Math.round(255 * t),
                        [r,o,n] = c.toChannels(e.rgba),
                        {
                            css: h.toCss(r, o, n, a),
                            rgba: h.toRgba(r, o, n, a)
                        }
                    }
                    e.blend = function(e, t) {
                        if (a = (255 & t.rgba) / 255,
                        1 === a)
                            return {
                                css: t.css,
                                rgba: t.rgba
                            };
                        const i = t.rgba >> 24 & 255
                          , s = t.rgba >> 16 & 255
                          , l = t.rgba >> 8 & 255
                          , c = e.rgba >> 24 & 255
                          , d = e.rgba >> 16 & 255
                          , _ = e.rgba >> 8 & 255;
                        return r = c + Math.round((i - c) * a),
                        o = d + Math.round((s - d) * a),
                        n = _ + Math.round((l - _) * a),
                        {
                            css: h.toCss(r, o, n),
                            rgba: h.toRgba(r, o, n)
                        }
                    }
                    ,
                    e.isOpaque = function(e) {
                        return 255 == (255 & e.rgba)
                    }
                    ,
                    e.ensureContrastRatio = function(e, t, i) {
                        const s = c.ensureContrastRatio(e.rgba, t.rgba, i);
                        if (s)
                            return c.toColor(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255)
                    }
                    ,
                    e.opaque = function(e) {
                        const t = (255 | e.rgba) >>> 0;
                        return [r,o,n] = c.toChannels(t),
                        {
                            css: h.toCss(r, o, n),
                            rgba: t
                        }
                    }
                    ,
                    e.opacity = t,
                    e.multiplyOpacity = function(e, i) {
                        return a = 255 & e.rgba,
                        t(e, a * i / 255)
                    }
                    ,
                    e.toColorRGB = function(e) {
                        return [e.rgba >> 24 & 255, e.rgba >> 16 & 255, e.rgba >> 8 & 255]
                    }
                }(t.color || (t.color = {})),
                function(e) {
                    let t, i;
                    if (!s.isNode) {
                        const e = document.createElement("canvas");
                        e.width = 1,
                        e.height = 1;
                        const s = e.getContext("2d", {
                            willReadFrequently: !0
                        });
                        s && (t = s,
                        t.globalCompositeOperation = "copy",
                        i = t.createLinearGradient(0, 0, 1, 1))
                    }
                    e.toColor = function(e) {
                        if (e.match(/#[\da-f]{3,8}/i))
                            switch (e.length) {
                            case 4:
                                return r = parseInt(e.slice(1, 2).repeat(2), 16),
                                o = parseInt(e.slice(2, 3).repeat(2), 16),
                                n = parseInt(e.slice(3, 4).repeat(2), 16),
                                c.toColor(r, o, n);
                            case 5:
                                return r = parseInt(e.slice(1, 2).repeat(2), 16),
                                o = parseInt(e.slice(2, 3).repeat(2), 16),
                                n = parseInt(e.slice(3, 4).repeat(2), 16),
                                a = parseInt(e.slice(4, 5).repeat(2), 16),
                                c.toColor(r, o, n, a);
                            case 7:
                                return {
                                    css: e,
                                    rgba: (parseInt(e.slice(1), 16) << 8 | 255) >>> 0
                                };
                            case 9:
                                return {
                                    css: e,
                                    rgba: parseInt(e.slice(1), 16) >>> 0
                                }
                            }
                        const s = e.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
                        if (s)
                            return r = parseInt(s[1]),
                            o = parseInt(s[2]),
                            n = parseInt(s[3]),
                            a = Math.round(255 * (void 0 === s[5] ? 1 : parseFloat(s[5]))),
                            c.toColor(r, o, n, a);
                        if (!t || !i)
                            throw new Error("css.toColor: Unsupported css format");
                        if (t.fillStyle = i,
                        t.fillStyle = e,
                        "string" != typeof t.fillStyle)
                            throw new Error("css.toColor: Unsupported css format");
                        if (t.fillRect(0, 0, 1, 1),
                        [r,o,n,a] = t.getImageData(0, 0, 1, 1).data,
                        255 !== a)
                            throw new Error("css.toColor: Unsupported css format");
                        return {
                            rgba: h.toRgba(r, o, n, a),
                            css: e
                        }
                    }
                }(t.css || (t.css = {})),
                function(e) {
                    function t(e, t, i) {
                        const s = e / 255
                          , r = t / 255
                          , o = i / 255;
                        return .2126 * (s <= .03928 ? s / 12.92 : Math.pow((s + .055) / 1.055, 2.4)) + .7152 * (r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4)) + .0722 * (o <= .03928 ? o / 12.92 : Math.pow((o + .055) / 1.055, 2.4))
                    }
                    e.relativeLuminance = function(e) {
                        return t(e >> 16 & 255, e >> 8 & 255, 255 & e)
                    }
                    ,
                    e.relativeLuminance2 = t
                }(l = t.rgb || (t.rgb = {})),
                function(e) {
                    function t(e, t, i) {
                        const s = e >> 24 & 255
                          , r = e >> 16 & 255
                          , o = e >> 8 & 255;
                        let n = t >> 24 & 255
                          , a = t >> 16 & 255
                          , h = t >> 8 & 255
                          , c = _(l.relativeLuminance2(n, a, h), l.relativeLuminance2(s, r, o));
                        for (; c < i && (n > 0 || a > 0 || h > 0); )
                            n -= Math.max(0, Math.ceil(.1 * n)),
                            a -= Math.max(0, Math.ceil(.1 * a)),
                            h -= Math.max(0, Math.ceil(.1 * h)),
                            c = _(l.relativeLuminance2(n, a, h), l.relativeLuminance2(s, r, o));
                        return (n << 24 | a << 16 | h << 8 | 255) >>> 0
                    }
                    function i(e, t, i) {
                        const s = e >> 24 & 255
                          , r = e >> 16 & 255
                          , o = e >> 8 & 255;
                        let n = t >> 24 & 255
                          , a = t >> 16 & 255
                          , h = t >> 8 & 255
                          , c = _(l.relativeLuminance2(n, a, h), l.relativeLuminance2(s, r, o));
                        for (; c < i && (n < 255 || a < 255 || h < 255); )
                            n = Math.min(255, n + Math.ceil(.1 * (255 - n))),
                            a = Math.min(255, a + Math.ceil(.1 * (255 - a))),
                            h = Math.min(255, h + Math.ceil(.1 * (255 - h))),
                            c = _(l.relativeLuminance2(n, a, h), l.relativeLuminance2(s, r, o));
                        return (n << 24 | a << 16 | h << 8 | 255) >>> 0
                    }
                    e.ensureContrastRatio = function(e, s, r) {
                        const o = l.relativeLuminance(e >> 8)
                          , n = l.relativeLuminance(s >> 8);
                        if (_(o, n) < r) {
                            if (n < o) {
                                const n = t(e, s, r)
                                  , a = _(o, l.relativeLuminance(n >> 8));
                                if (a < r) {
                                    const t = i(e, s, r);
                                    return a > _(o, l.relativeLuminance(t >> 8)) ? n : t
                                }
                                return n
                            }
                            const a = i(e, s, r)
                              , h = _(o, l.relativeLuminance(a >> 8));
                            if (h < r) {
                                const i = t(e, s, r);
                                return h > _(o, l.relativeLuminance(i >> 8)) ? a : i
                            }
                            return a
                        }
                    }
                    ,
                    e.reduceLuminance = t,
                    e.increaseLuminance = i,
                    e.toChannels = function(e) {
                        return [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e]
                    }
                    ,
                    e.toColor = function(e, t, i, s) {
                        return {
                            css: h.toCss(e, t, i, s),
                            rgba: h.toRgba(e, t, i, s)
                        }
                    }
                }(c = t.rgba || (t.rgba = {})),
                t.toPaddedHex = d,
                t.contrastRatio = _
            }
            ,
            345: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.forwardEvent = t.EventEmitter = void 0,
                t.EventEmitter = class {
                    constructor() {
                        this._listeners = [],
                        this._disposed = !1
                    }
                    get event() {
                        return this._event || (this._event = e=>(this._listeners.push(e),
                        {
                            dispose: ()=>{
                                if (!this._disposed)
                                    for (let t = 0; t < this._listeners.length; t++)
                                        if (this._listeners[t] === e)
                                            return void this._listeners.splice(t, 1)
                            }
                        })),
                        this._event
                    }
                    fire(e, t) {
                        const i = [];
                        for (let e = 0; e < this._listeners.length; e++)
                            i.push(this._listeners[e]);
                        for (let s = 0; s < i.length; s++)
                            i[s].call(void 0, e, t)
                    }
                    dispose() {
                        this._listeners && (this._listeners.length = 0),
                        this._disposed = !0
                    }
                }
                ,
                t.forwardEvent = function(e, t) {
                    return e((e=>t.fire(e)))
                }
            }
            ,
            859: (e,t)=>{
                function i(e) {
                    for (const t of e)
                        t.dispose();
                    e.length = 0
                }
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.getDisposeArrayDisposable = t.disposeArray = t.toDisposable = t.Disposable = void 0,
                t.Disposable = class {
                    constructor() {
                        this._disposables = [],
                        this._isDisposed = !1
                    }
                    dispose() {
                        this._isDisposed = !0;
                        for (const e of this._disposables)
                            e.dispose();
                        this._disposables.length = 0
                    }
                    register(e) {
                        return this._disposables.push(e),
                        e
                    }
                    unregister(e) {
                        const t = this._disposables.indexOf(e);
                        -1 !== t && this._disposables.splice(t, 1)
                    }
                }
                ,
                t.toDisposable = function(e) {
                    return {
                        dispose: e
                    }
                }
                ,
                t.disposeArray = i,
                t.getDisposeArrayDisposable = function(e) {
                    return {
                        dispose: ()=>i(e)
                    }
                }
            }
            ,
            485: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.FourKeyMap = t.TwoKeyMap = void 0;
                class i {
                    constructor() {
                        this._data = {}
                    }
                    set(e, t, i) {
                        this._data[e] || (this._data[e] = {}),
                        this._data[e][t] = i
                    }
                    get(e, t) {
                        return this._data[e] ? this._data[e][t] : void 0
                    }
                    clear() {
                        this._data = {}
                    }
                }
                t.TwoKeyMap = i,
                t.FourKeyMap = class {
                    constructor() {
                        this._data = new i
                    }
                    set(e, t, s, r, o) {
                        this._data.get(e, t) || this._data.set(e, t, new i),
                        this._data.get(e, t).set(s, r, o)
                    }
                    get(e, t, i, s) {
                        var r;
                        return null === (r = this._data.get(e, t)) || void 0 === r ? void 0 : r.get(i, s)
                    }
                    clear() {
                        this._data.clear()
                    }
                }
            }
            ,
            399: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.isChromeOS = t.isLinux = t.isWindows = t.isIphone = t.isIpad = t.isMac = t.getSafariVersion = t.isSafari = t.isLegacyEdge = t.isFirefox = t.isNode = void 0,
                t.isNode = "undefined" == typeof navigator;
                const i = t.isNode ? "node" : navigator.userAgent
                  , s = t.isNode ? "node" : navigator.platform;
                t.isFirefox = i.includes("Firefox"),
                t.isLegacyEdge = i.includes("Edge"),
                t.isSafari = /^((?!chrome|android).)*safari/i.test(i),
                t.getSafariVersion = function() {
                    if (!t.isSafari)
                        return 0;
                    const e = i.match(/Version\/(\d+)/);
                    return null === e || e.length < 2 ? 0 : parseInt(e[1])
                }
                ,
                t.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(s),
                t.isIpad = "iPad" === s,
                t.isIphone = "iPhone" === s,
                t.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(s),
                t.isLinux = s.indexOf("Linux") >= 0,
                t.isChromeOS = /\bCrOS\b/.test(i)
            }
            ,
            385: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.DebouncedIdleTask = t.IdleTaskQueue = t.PriorityTaskQueue = void 0;
                const s = i(399);
                class r {
                    constructor() {
                        this._tasks = [],
                        this._i = 0
                    }
                    enqueue(e) {
                        this._tasks.push(e),
                        this._start()
                    }
                    flush() {
                        for (; this._i < this._tasks.length; )
                            this._tasks[this._i]() || this._i++;
                        this.clear()
                    }
                    clear() {
                        this._idleCallback && (this._cancelCallback(this._idleCallback),
                        this._idleCallback = void 0),
                        this._i = 0,
                        this._tasks.length = 0
                    }
                    _start() {
                        this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)))
                    }
                    _process(e) {
                        this._idleCallback = void 0;
                        let t = 0
                          , i = 0
                          , s = e.timeRemaining()
                          , r = 0;
                        for (; this._i < this._tasks.length; ) {
                            if (t = Date.now(),
                            this._tasks[this._i]() || this._i++,
                            t = Math.max(1, Date.now() - t),
                            i = Math.max(t, i),
                            r = e.timeRemaining(),
                            1.5 * i > r)
                                return s - t < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s - t))}ms`),
                                void this._start();
                            s = r
                        }
                        this.clear()
                    }
                }
                class o extends r {
                    _requestCallback(e) {
                        return setTimeout((()=>e(this._createDeadline(16))))
                    }
                    _cancelCallback(e) {
                        clearTimeout(e)
                    }
                    _createDeadline(e) {
                        const t = Date.now() + e;
                        return {
                            timeRemaining: ()=>Math.max(0, t - Date.now())
                        }
                    }
                }
                t.PriorityTaskQueue = o,
                t.IdleTaskQueue = !s.isNode && "requestIdleCallback"in window ? class extends r {
                    _requestCallback(e) {
                        return requestIdleCallback(e)
                    }
                    _cancelCallback(e) {
                        cancelIdleCallback(e)
                    }
                }
                : o,
                t.DebouncedIdleTask = class {
                    constructor() {
                        this._queue = new t.IdleTaskQueue
                    }
                    set(e) {
                        this._queue.clear(),
                        this._queue.enqueue(e)
                    }
                    flush() {
                        this._queue.flush()
                    }
                }
            }
            ,
            147: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.ExtendedAttrs = t.AttributeData = void 0;
                class i {
                    constructor() {
                        this.fg = 0,
                        this.bg = 0,
                        this.extended = new s
                    }
                    static toColorRGB(e) {
                        return [e >>> 16 & 255, e >>> 8 & 255, 255 & e]
                    }
                    static fromColorRGB(e) {
                        return (255 & e[0]) << 16 | (255 & e[1]) << 8 | 255 & e[2]
                    }
                    clone() {
                        const e = new i;
                        return e.fg = this.fg,
                        e.bg = this.bg,
                        e.extended = this.extended.clone(),
                        e
                    }
                    isInverse() {
                        return 67108864 & this.fg
                    }
                    isBold() {
                        return 134217728 & this.fg
                    }
                    isUnderline() {
                        return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg
                    }
                    isBlink() {
                        return 536870912 & this.fg
                    }
                    isInvisible() {
                        return 1073741824 & this.fg
                    }
                    isItalic() {
                        return 67108864 & this.bg
                    }
                    isDim() {
                        return 134217728 & this.bg
                    }
                    isStrikethrough() {
                        return 2147483648 & this.fg
                    }
                    isProtected() {
                        return 536870912 & this.bg
                    }
                    getFgColorMode() {
                        return 50331648 & this.fg
                    }
                    getBgColorMode() {
                        return 50331648 & this.bg
                    }
                    isFgRGB() {
                        return 50331648 == (50331648 & this.fg)
                    }
                    isBgRGB() {
                        return 50331648 == (50331648 & this.bg)
                    }
                    isFgPalette() {
                        return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg)
                    }
                    isBgPalette() {
                        return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg)
                    }
                    isFgDefault() {
                        return 0 == (50331648 & this.fg)
                    }
                    isBgDefault() {
                        return 0 == (50331648 & this.bg)
                    }
                    isAttributeDefault() {
                        return 0 === this.fg && 0 === this.bg
                    }
                    getFgColor() {
                        switch (50331648 & this.fg) {
                        case 16777216:
                        case 33554432:
                            return 255 & this.fg;
                        case 50331648:
                            return 16777215 & this.fg;
                        default:
                            return -1
                        }
                    }
                    getBgColor() {
                        switch (50331648 & this.bg) {
                        case 16777216:
                        case 33554432:
                            return 255 & this.bg;
                        case 50331648:
                            return 16777215 & this.bg;
                        default:
                            return -1
                        }
                    }
                    hasExtendedAttrs() {
                        return 268435456 & this.bg
                    }
                    updateExtended() {
                        this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456
                    }
                    getUnderlineColor() {
                        if (268435456 & this.bg && ~this.extended.underlineColor)
                            switch (50331648 & this.extended.underlineColor) {
                            case 16777216:
                            case 33554432:
                                return 255 & this.extended.underlineColor;
                            case 50331648:
                                return 16777215 & this.extended.underlineColor;
                            default:
                                return this.getFgColor()
                            }
                        return this.getFgColor()
                    }
                    getUnderlineColorMode() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode()
                    }
                    isUnderlineColorRGB() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB()
                    }
                    isUnderlineColorPalette() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette()
                    }
                    isUnderlineColorDefault() {
                        return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault()
                    }
                    getUnderlineStyle() {
                        return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0
                    }
                }
                t.AttributeData = i;
                class s {
                    constructor(e=0, t=0) {
                        this._ext = 0,
                        this._urlId = 0,
                        this._ext = e,
                        this._urlId = t
                    }
                    get ext() {
                        return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext
                    }
                    set ext(e) {
                        this._ext = e
                    }
                    get underlineStyle() {
                        return this._urlId ? 5 : (469762048 & this._ext) >> 26
                    }
                    set underlineStyle(e) {
                        this._ext &= -469762049,
                        this._ext |= e << 26 & 469762048
                    }
                    get underlineColor() {
                        return 67108863 & this._ext
                    }
                    set underlineColor(e) {
                        this._ext &= -67108864,
                        this._ext |= 67108863 & e
                    }
                    get urlId() {
                        return this._urlId
                    }
                    set urlId(e) {
                        this._urlId = e
                    }
                    clone() {
                        return new s(this._ext,this._urlId)
                    }
                    isEmpty() {
                        return 0 === this.underlineStyle && 0 === this._urlId
                    }
                }
                t.ExtendedAttrs = s
            }
            ,
            782: (e,t,i)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.CellData = void 0;
                const s = i(133)
                  , r = i(855)
                  , o = i(147);
                class n extends o.AttributeData {
                    constructor() {
                        super(...arguments),
                        this.content = 0,
                        this.fg = 0,
                        this.bg = 0,
                        this.extended = new o.ExtendedAttrs,
                        this.combinedData = ""
                    }
                    static fromCharData(e) {
                        const t = new n;
                        return t.setFromCharData(e),
                        t
                    }
                    isCombined() {
                        return 2097152 & this.content
                    }
                    getWidth() {
                        return this.content >> 22
                    }
                    getChars() {
                        return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0,
                        s.stringFromCodePoint)(2097151 & this.content) : ""
                    }
                    getCode() {
                        return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content
                    }
                    setFromCharData(e) {
                        this.fg = e[r.CHAR_DATA_ATTR_INDEX],
                        this.bg = 0;
                        let t = !1;
                        if (e[r.CHAR_DATA_CHAR_INDEX].length > 2)
                            t = !0;
                        else if (2 === e[r.CHAR_DATA_CHAR_INDEX].length) {
                            const i = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                            if (55296 <= i && i <= 56319) {
                                const s = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                                56320 <= s && s <= 57343 ? this.content = 1024 * (i - 55296) + s - 56320 + 65536 | e[r.CHAR_DATA_WIDTH_INDEX] << 22 : t = !0
                            } else
                                t = !0
                        } else
                            this.content = e[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e[r.CHAR_DATA_WIDTH_INDEX] << 22;
                        t && (this.combinedData = e[r.CHAR_DATA_CHAR_INDEX],
                        this.content = 2097152 | e[r.CHAR_DATA_WIDTH_INDEX] << 22)
                    }
                    getAsCharData() {
                        return [this.fg, this.getChars(), this.getWidth(), this.getCode()]
                    }
                }
                t.CellData = n
            }
            ,
            855: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.WHITESPACE_CELL_CODE = t.WHITESPACE_CELL_WIDTH = t.WHITESPACE_CELL_CHAR = t.NULL_CELL_CODE = t.NULL_CELL_WIDTH = t.NULL_CELL_CHAR = t.CHAR_DATA_CODE_INDEX = t.CHAR_DATA_WIDTH_INDEX = t.CHAR_DATA_CHAR_INDEX = t.CHAR_DATA_ATTR_INDEX = t.DEFAULT_EXT = t.DEFAULT_ATTR = t.DEFAULT_COLOR = void 0,
                t.DEFAULT_COLOR = 0,
                t.DEFAULT_ATTR = 256 | t.DEFAULT_COLOR << 9,
                t.DEFAULT_EXT = 0,
                t.CHAR_DATA_ATTR_INDEX = 0,
                t.CHAR_DATA_CHAR_INDEX = 1,
                t.CHAR_DATA_WIDTH_INDEX = 2,
                t.CHAR_DATA_CODE_INDEX = 3,
                t.NULL_CELL_CHAR = "",
                t.NULL_CELL_WIDTH = 1,
                t.NULL_CELL_CODE = 0,
                t.WHITESPACE_CELL_CHAR = " ",
                t.WHITESPACE_CELL_WIDTH = 1,
                t.WHITESPACE_CELL_CODE = 32
            }
            ,
            133: (e,t)=>{
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }),
                t.Utf8ToUtf32 = t.StringToUtf32 = t.utf32ToString = t.stringFromCodePoint = void 0,
                t.stringFromCodePoint = function(e) {
                    return e > 65535 ? (e -= 65536,
                    String.fromCharCode(55296 + (e >> 10)) + String.fromCharCode(e % 1024 + 56320)) : String.fromCharCode(e)
                }
                ,
                t.utf32ToString = function(e, t=0, i=e.length) {
                    let s = "";
                    for (let r = t; r < i; ++r) {
                        let t = e[r];
                        t > 65535 ? (t -= 65536,
                        s += String.fromCharCode(55296 + (t >> 10)) + String.fromCharCode(t % 1024 + 56320)) : s += String.fromCharCode(t)
                    }
                    return s
                }
                ,
                t.StringToUtf32 = class {
                    constructor() {
                        this._interim = 0
                    }
                    clear() {
                        this._interim = 0
                    }
                    decode(e, t) {
                        const i = e.length;
                        if (!i)
                            return 0;
                        let s = 0
                          , r = 0;
                        if (this._interim) {
                            const i = e.charCodeAt(r++);
                            56320 <= i && i <= 57343 ? t[s++] = 1024 * (this._interim - 55296) + i - 56320 + 65536 : (t[s++] = this._interim,
                            t[s++] = i),
                            this._interim = 0
                        }
                        for (let o = r; o < i; ++o) {
                            const r = e.charCodeAt(o);
                            if (55296 <= r && r <= 56319) {
                                if (++o >= i)
                                    return this._interim = r,
                                    s;
                                const n = e.charCodeAt(o);
                                56320 <= n && n <= 57343 ? t[s++] = 1024 * (r - 55296) + n - 56320 + 65536 : (t[s++] = r,
                                t[s++] = n)
                            } else
                                65279 !== r && (t[s++] = r)
                        }
                        return s
                    }
                }
                ,
                t.Utf8ToUtf32 = class {
                    constructor() {
                        this.interim = new Uint8Array(3)
                    }
                    clear() {
                        this.interim.fill(0)
                    }
                    decode(e, t) {
                        const i = e.length;
                        if (!i)
                            return 0;
                        let s, r, o, n, a = 0, h = 0, l = 0;
                        if (this.interim[0]) {
                            let s = !1
                              , r = this.interim[0];
                            r &= 192 == (224 & r) ? 31 : 224 == (240 & r) ? 15 : 7;
                            let o, n = 0;
                            for (; (o = 63 & this.interim[++n]) && n < 4; )
                                r <<= 6,
                                r |= o;
                            const h = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4
                              , c = h - n;
                            for (; l < c; ) {
                                if (l >= i)
                                    return 0;
                                if (o = e[l++],
                                128 != (192 & o)) {
                                    l--,
                                    s = !0;
                                    break
                                }
                                this.interim[n++] = o,
                                r <<= 6,
                                r |= 63 & o
                            }
                            s || (2 === h ? r < 128 ? l-- : t[a++] = r : 3 === h ? r < 2048 || r >= 55296 && r <= 57343 || 65279 === r || (t[a++] = r) : r < 65536 || r > 1114111 || (t[a++] = r)),
                            this.interim.fill(0)
                        }
                        const c = i - 4;
                        let d = l;
                        for (; d < i; ) {
                            for (; !(!(d < c) || 128 & (s = e[d]) || 128 & (r = e[d + 1]) || 128 & (o = e[d + 2]) || 128 & (n = e[d + 3])); )
                                t[a++] = s,
                                t[a++] = r,
                                t[a++] = o,
                                t[a++] = n,
                                d += 4;
                            if (s = e[d++],
                            s < 128)
                                t[a++] = s;
                            else if (192 == (224 & s)) {
                                if (d >= i)
                                    return this.interim[0] = s,
                                    a;
                                if (r = e[d++],
                                128 != (192 & r)) {
                                    d--;
                                    continue
                                }
                                if (h = (31 & s) << 6 | 63 & r,
                                h < 128) {
                                    d--;
                                    continue
                                }
                                t[a++] = h
                            } else if (224 == (240 & s)) {
                                if (d >= i)
                                    return this.interim[0] = s,
                                    a;
                                if (r = e[d++],
                                128 != (192 & r)) {
                                    d--;
                                    continue
                                }
                                if (d >= i)
                                    return this.interim[0] = s,
                                    this.interim[1] = r,
                                    a;
                                if (o = e[d++],
                                128 != (192 & o)) {
                                    d--;
                                    continue
                                }
                                if (h = (15 & s) << 12 | (63 & r) << 6 | 63 & o,
                                h < 2048 || h >= 55296 && h <= 57343 || 65279 === h)
                                    continue;
                                t[a++] = h
                            } else if (240 == (248 & s)) {
                                if (d >= i)
                                    return this.interim[0] = s,
                                    a;
                                if (r = e[d++],
                                128 != (192 & r)) {
                                    d--;
                                    continue
                                }
                                if (d >= i)
                                    return this.interim[0] = s,
                                    this.interim[1] = r,
                                    a;
                                if (o = e[d++],
                                128 != (192 & o)) {
                                    d--;
                                    continue
                                }
                                if (d >= i)
                                    return this.interim[0] = s,
                                    this.interim[1] = r,
                                    this.interim[2] = o,
                                    a;
                                if (n = e[d++],
                                128 != (192 & n)) {
                                    d--;
                                    continue
                                }
                                if (h = (7 & s) << 18 | (63 & r) << 12 | (63 & o) << 6 | 63 & n,
                                h < 65536 || h > 1114111)
                                    continue;
                                t[a++] = h
                            }
                        }
                        return a
                    }
                }
            }
        }
          , t = {};
        function i(s) {
            var r = t[s];
            if (void 0 !== r)
                return r.exports;
            var o = t[s] = {
                exports: {}
            };
            return e[s](o, o.exports, i),
            o.exports
        }
        var s = {};
        return (()=>{
            var e = s;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.WebglAddon = void 0;
            const t = i(345)
              , r = i(859)
              , o = i(399)
              , n = i(666);
            class a extends r.Disposable {
                constructor(e) {
                    if (o.isSafari && (0,
                    o.getSafariVersion)() < 16)
                        throw new Error("Webgl2 is only supported on Safari 16 and above");
                    super(),
                    this._preserveDrawingBuffer = e,
                    this._onChangeTextureAtlas = this.register(new t.EventEmitter),
                    this.onChangeTextureAtlas = this._onChangeTextureAtlas.event,
                    this._onAddTextureAtlasCanvas = this.register(new t.EventEmitter),
                    this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event,
                    this._onRemoveTextureAtlasCanvas = this.register(new t.EventEmitter),
                    this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event,
                    this._onContextLoss = this.register(new t.EventEmitter),
                    this.onContextLoss = this._onContextLoss.event
                }
                activate(e) {
                    const i = e._core;
                    if (!e.element)
                        return void this.register(i.onWillOpen((()=>this.activate(e))));
                    this._terminal = e;
                    const s = i.coreService
                      , o = i.optionsService
                      , a = i
                      , h = a._renderService
                      , l = a._characterJoinerService
                      , c = a._charSizeService
                      , d = a._coreBrowserService
                      , _ = a._decorationService
                      , u = a._themeService;
                    this._renderer = this.register(new n.WebglRenderer(e,l,c,d,s,_,o,u,this._preserveDrawingBuffer)),
                    this.register((0,
                    t.forwardEvent)(this._renderer.onContextLoss, this._onContextLoss)),
                    this.register((0,
                    t.forwardEvent)(this._renderer.onChangeTextureAtlas, this._onChangeTextureAtlas)),
                    this.register((0,
                    t.forwardEvent)(this._renderer.onAddTextureAtlasCanvas, this._onAddTextureAtlasCanvas)),
                    this.register((0,
                    t.forwardEvent)(this._renderer.onRemoveTextureAtlasCanvas, this._onRemoveTextureAtlasCanvas)),
                    h.setRenderer(this._renderer),
                    this.register((0,
                    r.toDisposable)((()=>{
                        const t = this._terminal._core._renderService;
                        t.setRenderer(this._terminal._core._createRenderer()),
                        t.handleResize(e.cols, e.rows)
                    }
                    )))
                }
                get textureAtlas() {
                    var e;
                    return null === (e = this._renderer) || void 0 === e ? void 0 : e.textureAtlas
                }
                clearTextureAtlas() {
                    var e;
                    null === (e = this._renderer) || void 0 === e || e.clearTextureAtlas()
                }
            }
            e.WebglAddon = a
        }
        )(),
        s
    }
    )()
}
));
//# sourceMappingURL=xterm-addon-webgl.js.map
