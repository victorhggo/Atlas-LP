# Refaz js/vendor/prism-orb/prism-orb.min.js a partir do pacote prism-orb (MIT) do sistema Atlas,
# com o patch de compilação do shader em paralelo (KHR_parallel_shader_compile).
# Uso: python ferramentas/prism-orb-patch.py  (precisa de Atlas/web/node_modules com prism-orb e esbuild)
import os, shutil, subprocess, tempfile
WEB = os.path.join(os.path.expanduser('~'), 'Desktop', 'Atlas', 'web')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP = tempfile.mkdtemp()
for f in ('chunk-GP25WUVA.js', 'vanilla.js'):
    shutil.copy(os.path.join(WEB, 'node_modules', 'prism-orb', 'dist', f), TMP)
p = os.path.join(TMP, 'chunk-GP25WUVA.js')
s = open(p, encoding='utf8').read()
def troca(a, b):
    global s
    assert s.count(a) == 1, a[:70]
    s = s.replace(a, b)

troca('''function createProgram(gl, vert, frag) {
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {''', '''function startProgram(gl, vert, frag) {
  const shader = (type, src) => { const sh = gl.createShader(type); gl.shaderSource(sh, src); gl.compileShader(sh); return sh; };
  const vs = shader(gl.VERTEX_SHADER, vert);
  const fs = shader(gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return { program, vs, fs, loc: null };
}
function finishProgram(gl, p) {
  const { program, vs, fs } = p;
  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {
    const log = (gl.getShaderInfoLog(vs) || "") + (gl.getShaderInfoLog(fs) || "") + (gl.getProgramInfoLog(program) || "");
    throw new Error(`[orb] program link failed:
${log}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  p.loc = createProgramLocations(gl, program);
  return p;
}
function createProgramLocations(gl, program) {
  const loc = {};
  for (const name of UNIFORM_NAMES) {
    loc[name] = gl.getUniformLocation(program, ARRAYS.has(name) ? `${name}[0]` : name);
  }
  return loc;
}
function createProgram(gl, vert, frag) {
  const vs = compile(gl, gl.VERTEX_SHADER, vert);
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {''')

troca('''  setupGl() {
    const gl = this.gl;''', '''  setupGl() {
    const gl = this.gl;
    this.parallel = gl.getExtension("KHR_parallel_shader_compile");''')

troca('''  program(inst) {
    const cached = this.programs.get(inst.programKey);
    if (cached !== void 0) return cached;
    let p = null;
    try {
      p = createProgram(this.gl, VERT, fragmentSource(inst.noise, inst.field));
    } catch (e) {
      console.error(e);
    }
    this.programs.set(inst.programKey, p);
    return p;
  }''', '''  program(inst) {
    const gl = this.gl;
    const cached = this.programs.get(inst.programKey);
    if (cached !== void 0) {
      if (cached && !cached.loc) {
        if (this.parallel && !gl.getProgramParameter(cached.program, this.parallel.COMPLETION_STATUS_KHR)) return null;
        try {
          finishProgram(gl, cached);
        } catch (e) {
          console.error(e);
          this.programs.set(inst.programKey, null);
          return null;
        }
      }
      return cached;
    }
    let p = null;
    try {
      p = startProgram(gl, VERT, fragmentSource(inst.noise, inst.field));
    } catch (e) {
      console.error(e);
    }
    this.programs.set(inst.programKey, p);
    return p ? this.program(inst) : null;
  }''')
open(p, 'w', encoding='utf8', newline='\n').write(s)
banner = '/*! prism-orb 1.0.0 | MIT (c) Tanmay Makode | licença em js/vendor/prism-orb/LICENSE. Patch local do Atlas: compilação do shader em paralelo (KHR_parallel_shader_compile), para o primeiro desenho não travar a página. */'
saida = os.path.join(SITE, 'js', 'vendor', 'prism-orb', 'prism-orb.min.js')
subprocess.run(['node', os.path.join(WEB, 'node_modules', 'esbuild', 'bin', 'esbuild'), os.path.join(TMP, 'vanilla.js'), '--bundle', '--format=esm', '--minify',
                '--legal-comments=inline', '--target=es2020', '--banner:js=' + banner, '--outfile=' + saida], check=True)
shutil.copy(os.path.join(WEB, 'node_modules', 'prism-orb', 'LICENSE'), os.path.join(SITE, 'js', 'vendor', 'prism-orb', 'LICENSE'))
print('ok', saida)
