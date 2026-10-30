// Rasterises textured meshes on the GPU (like the SpineBones editor) so neighbouring triangles share
// their edges exactly: no see-through seams and no doubled bands. Canvas 2D can't do this because every
// triangle has to be drawn through its own anti-aliased clip path.
// One WebGL2 context is shared by every renderer; the result is copied into the caller's 2D canvas.

const VERTEX_SHADER = `#version 300 es
in vec2 a_pos;
in vec2 a_uv;
uniform vec2 u_size;
out vec2 v_uv;
void main() {
  v_uv = a_uv;
  gl_Position = vec4(a_pos.x / u_size.x * 2.0 - 1.0, 1.0 - a_pos.y / u_size.y * 2.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in vec2 v_uv;
uniform sampler2D u_tex;
out vec4 outColor;
void main() {
  outColor = texture(u_tex, v_uv);
}`;

type GlState = {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  sizeLocation: WebGLUniformLocation;
  positionBuffer: WebGLBuffer;
  uvBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  textures: WeakMap<HTMLImageElement, WebGLTexture>;
};

let state: GlState | null = null;
let unavailable = false;

const compileShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

const createState = (): GlState | null => {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, "a_pos");
  gl.bindAttribLocation(program, 1, "a_uv");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  const sizeLocation = gl.getUniformLocation(program, "u_size");
  const positionBuffer = gl.createBuffer();
  const uvBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  if (!sizeLocation || !positionBuffer || !uvBuffer || !indexBuffer) return null;

  gl.useProgram(program);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    state = null;
  });

  return {
    gl,
    canvas,
    sizeLocation,
    positionBuffer,
    uvBuffer,
    indexBuffer,
    textures: new WeakMap(),
  };
};

const getTexture = (glState: GlState, image: HTMLImageElement) => {
  const cached = glState.textures.get(image);
  if (cached) return cached;

  const { gl } = glState;
  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  glState.textures.set(image, texture);
  return texture;
};

/**
 * Draws the mesh into the shared WebGL canvas. `positions` are in device pixels relative to the
 * top-left of a `width`×`height` layer and `uvs` are normalised texture coordinates.
 * Returns the canvas holding the result in its top-left `width`×`height` region, or null when WebGL2
 * is unavailable (callers should fall back to Canvas 2D).
 */
export const rasterizeMesh = (
  image: HTMLImageElement,
  positions: Float32Array,
  uvs: Float32Array,
  indices: Uint16Array,
  width: number,
  height: number,
): HTMLCanvasElement | null => {
  if (unavailable) return null;
  if (!state) {
    state = createState();
    if (!state) {
      unavailable = true;
      return null;
    }
  }

  const { gl, canvas } = state;
  if (gl.isContextLost()) return null;

  if (canvas.width < width || canvas.height < height) {
    canvas.width = Math.max(canvas.width, width);
    canvas.height = Math.max(canvas.height, height);
  }

  const texture = getTexture(state, image);
  if (!texture) return null;

  // Keep the layer in the canvas' top-left corner (GL's origin is bottom-left).
  gl.viewport(0, canvas.height - height, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(state.sizeLocation, width, height);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, state.uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.DYNAMIC_DRAW);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.DYNAMIC_DRAW);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  return canvas;
};
