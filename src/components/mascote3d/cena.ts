import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CanvasTexture,
  CapsuleGeometry,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
  type Object3D,
} from "three";

/* ============================================================
   Mini Eri 3D — personagem construído em código (Three.js).

   Esqueleto simples em grupos aninhados (quadril → coluna → ombro → cotovelo...),
   poses definidas como rotações-alvo de cada articulação e interpoladas suavemente.
   Por cima das poses entram o ciclo de caminhada (avançado pela rolagem),
   respiração, piscar, giro 360° e pulo.
   ============================================================ */

export type Pose = "parado" | "acena" | "aponta" | "joinha" | "comemora" | "celular" | "pensa";

type Rot = [number, number, number];
type Articulacao = "coluna" | "cabeca" | "ombroE" | "cotoveloE" | "ombroD" | "cotoveloD" | "quadrilE" | "joelhoE" | "quadrilD" | "joelhoD";
type Alvos = Partial<Record<Articulacao, Rot>>;

/** E = lado esquerdo da tela, D = lado direito (com o boneco de frente). */
function poses(lado: "esquerda" | "direita"): Record<Pose, Alvos> {
  // braço que aponta para o conteúdo
  const s = lado === "esquerda" ? 1 : -1;
  const apontaE: Alvos = { ombroE: [-0.25, 0, -1.45], cotoveloE: [0, 0, -0.05], cabeca: [0.05, 0.35, 0] };
  const apontaD: Alvos = { ombroD: [-0.25, 0, 1.45], cotoveloD: [0, 0, 0.05], cabeca: [0.05, -0.35, 0] };
  return {
    parado: { ombroE: [0, 0, -0.12], ombroD: [0, 0, 0.12], cotoveloE: [-0.15, 0, 0], cotoveloD: [-0.15, 0, 0] },
    acena: { ombroD: [0, 0, 2.55], cotoveloD: [0, 0, 0.35], ombroE: [0, 0, -0.12], cabeca: [0, -0.12, 0.08] },
    aponta: { ...(s === 1 ? apontaE : apontaD), ...(s === 1 ? { ombroD: [0, 0, 0.12] as Rot } : { ombroE: [0, 0, -0.12] as Rot }) },
    joinha: { ombroD: [-1.05, 0, 0.25], cotoveloD: [-1.55, 0, 0], ombroE: [0, 0, -0.12], cabeca: [0.08, -0.1, 0.06] },
    comemora: { ombroE: [0, 0, -2.6], ombroD: [0, 0, 2.6], cotoveloE: [0, 0, -0.3], cotoveloD: [0, 0, 0.3], cabeca: [-0.15, 0, 0] },
    celular: { ombroD: [0.3, -0.35, 0.5], cotoveloD: [-2.55, 0, 0], ombroE: [0, 0, -0.12], cabeca: [0, 0.12, -0.2] },
    pensa: { ombroD: [-1.2, 0.65, 0.12], cotoveloD: [-2.3, 0, 0], ombroE: [-0.35, 0, -0.25], cotoveloE: [-1.4, 0, 0], cabeca: [0.12, -0.2, 0.15] },
  };
}

export type Entrada = {
  /** fase do ciclo de caminhada (avança com a rolagem) */
  passo: number;
  /** 0..1 quanto da caminhada está ativa */
  andando: number;
  /** velocidade da rolagem (px/quadro, suavizada) */
  vel: number;
};

export class MascoteCena {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(28, 1, 0.1, 50);
  private raiz = new Group();
  private corpo = new Group();
  private j = {} as Record<Articulacao, Group>;
  private olhos: Object3D[] = [];
  private dedo!: Mesh;
  private polegar!: Mesh;
  private celular!: Group;
  private sombra!: Mesh;
  private alvos: Record<Pose, Alvos>;
  private pose: Pose = "acena";
  private atual = new Map<Articulacao, Rot>();
  private tempo = 0;
  private giro = 1; // progresso do giro 360° (1 = parado)
  private yaw = 0;
  private pulo = 0;
  private piscar = 3;
  private descartaveis: (BufferGeometry | Material | CanvasTexture)[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    private lado: "esquerda" | "direita",
  ) {
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.alvos = poses(lado);

    this.camera.position.set(0, 1.2, 7.3);
    this.camera.lookAt(0, 1.1, 0);

    // luz: céu/chão, principal quente, contorno azul da marca e preenchimento laranja
    this.scene.add(new HemisphereLight(0xe3eeff, 0x1a2a48, 1.1));
    const principal = new DirectionalLight(0xfff3e6, 2.4);
    principal.position.set(2.5, 3.5, 4);
    this.scene.add(principal);
    const contorno = new DirectionalLight(0x5b9bff, 2.6);
    contorno.position.set(-2, 2.5, -3);
    this.scene.add(contorno);
    const preenche = new DirectionalLight(0xf28a2b, 0.7);
    preenche.position.set(-3, 0.5, 2);
    this.scene.add(preenche);

    this.montar();
    this.scene.add(this.raiz);
  }

  private mat(cor: number, rugosidade = 0.6, metal = 0) {
    const m = new MeshStandardMaterial({ color: new Color(cor), roughness: rugosidade, metalness: metal });
    this.descartaveis.push(m);
    return m;
  }
  private geo<T extends BufferGeometry>(g: T) {
    this.descartaveis.push(g);
    return g;
  }
  private malha(g: BufferGeometry, m: Material, x = 0, y = 0, z = 0) {
    const mesh = new Mesh(g, m);
    mesh.position.set(x, y, z);
    return mesh;
  }
  private grupo(pai: Object3D, x = 0, y = 0, z = 0) {
    const g = new Group();
    g.position.set(x, y, z);
    pai.add(g);
    return g;
  }

  private montar() {
    const camisa = this.mat(0xa9cff6, 0.75);
    const camisaClara = this.mat(0xc9e2fb, 0.75);
    const calca = this.mat(0x1e2839, 0.8);
    const pele = this.mat(0xb8774a, 0.55);
    const peleEscura = this.mat(0xa1643b, 0.6);
    const cabelo = this.mat(0x15100d, 0.9);
    const sapato = this.mat(0x0d0d10, 0.35, 0.1);
    const preto = this.mat(0x111216, 0.4);
    const branco = this.mat(0xffffff, 0.3);
    const dourado = this.mat(0xd8b25a, 0.3, 0.7);
    const prata = this.mat(0xc7ccd3, 0.25, 0.8);
    const couro = this.mat(0x7a4a22, 0.6);
    const bochecha = this.mat(0xd98e66, 0.8);
    bochecha.transparent = true;
    bochecha.opacity = 0.45;

    this.raiz.add(this.corpo);

    // quadril
    const quadril = this.grupo(this.corpo, 0, 0.8, 0);
    quadril.add(this.malha(this.geo(new CapsuleGeometry(0.25, 0.06, 6, 16)), calca, 0, 0.02, 0));

    // pernas
    const perna = (lado: -1 | 1, nomeQ: Articulacao, nomeJ: Articulacao) => {
      const q = this.grupo(quadril, 0.13 * lado, -0.02, 0);
      q.add(this.malha(this.geo(new CapsuleGeometry(0.105, 0.26, 6, 14)), calca, 0, -0.2, 0));
      const jn = this.grupo(q, 0, -0.4, 0);
      jn.add(this.malha(this.geo(new SphereGeometry(0.098, 14, 10)), calca));
      jn.add(this.malha(this.geo(new CapsuleGeometry(0.092, 0.26, 6, 14)), calca, 0, -0.18, 0));
      const pe = this.malha(this.geo(new CapsuleGeometry(0.075, 0.13, 6, 12)), sapato, 0, -0.37, 0.06);
      pe.rotation.x = Math.PI / 2;
      jn.add(pe);
      this.j[nomeQ] = q;
      this.j[nomeJ] = jn;
    };
    perna(-1, "quadrilE", "joelhoE");
    perna(1, "quadrilD", "joelhoD");

    // coluna e tronco
    const coluna = this.grupo(quadril, 0, 0.1, 0);
    this.j.coluna = coluna;
    const tronco = this.malha(this.geo(new CapsuleGeometry(0.27, 0.34, 8, 20)), camisa, 0, 0.27, 0);
    tronco.scale.set(1, 1, 0.82);
    coluna.add(tronco);
    // cinto e fivela
    coluna.add(this.malha(this.geo(new CylinderGeometry(0.262, 0.262, 0.065, 24)), preto, 0, -0.02, 0));
    coluna.add(this.malha(this.geo(new BoxGeometry(0.075, 0.05, 0.02)), prata, 0, -0.02, 0.225));
    // colarinho, botões e crachá
    for (const lado of [-1, 1]) {
      const gola = this.malha(this.geo(new BoxGeometry(0.11, 0.05, 0.03)), camisaClara, 0.055 * lado, 0.6, 0.15);
      gola.rotation.z = -0.55 * lado;
      gola.rotation.x = -0.35;
      coluna.add(gola);
    }
    for (const y of [0.42, 0.28, 0.14]) coluna.add(this.malha(this.geo(new SphereGeometry(0.012, 8, 6)), branco, 0, y, 0.222));
    coluna.add(this.malha(this.geo(new BoxGeometry(0.11, 0.045, 0.015)), dourado, 0.12, 0.38, 0.21));

    // braços
    const braco = (lado: -1 | 1, nomeO: Articulacao, nomeC: Articulacao) => {
      const o = this.grupo(coluna, 0.33 * lado, 0.5, 0);
      o.add(this.malha(this.geo(new SphereGeometry(0.09, 14, 10)), camisa));
      o.add(this.malha(this.geo(new CapsuleGeometry(0.078, 0.2, 6, 12)), camisa, 0, -0.17, 0));
      const c = this.grupo(o, 0, -0.34, 0);
      c.add(this.malha(this.geo(new SphereGeometry(0.077, 14, 10)), camisa));
      c.add(this.malha(this.geo(new CapsuleGeometry(0.072, 0.18, 6, 12)), camisa, 0, -0.14, 0));
      c.add(this.malha(this.geo(new CylinderGeometry(0.078, 0.078, 0.05, 14)), camisaClara, 0, -0.27, 0));
      const mao = this.grupo(c, 0, -0.34, 0);
      mao.add(this.malha(this.geo(new SphereGeometry(0.078, 14, 10)), pele));
      this.j[nomeO] = o;
      this.j[nomeC] = c;
      return mao;
    };
    const maoE = braco(-1, "ombroE", "cotoveloE");
    const maoD = braco(1, "ombroD", "cotoveloD");

    // dedo indicador (aponta) em ambas as mãos, conforme o lado do conteúdo
    const dedoGeo = this.geo(new CapsuleGeometry(0.024, 0.08, 4, 8));
    this.dedo = this.malha(dedoGeo, pele, 0, -0.1, 0.01);
    (this.lado === "esquerda" ? maoE : maoD).add(this.dedo);
    // polegar (joinha) na mão direita da tela
    this.polegar = this.malha(this.geo(new CapsuleGeometry(0.025, 0.06, 4, 8)), pele, 0, 0, 0.09);
    this.polegar.rotation.x = Math.PI / 2;
    maoD.add(this.polegar);
    // relógio no pulso direito da tela
    const relogio = this.malha(this.geo(new TorusGeometry(0.074, 0.016, 8, 20)), couro, 0, -0.25, 0);
    relogio.rotation.x = Math.PI / 2;
    this.j.cotoveloD.add(relogio);
    this.j.cotoveloD.add(this.malha(this.geo(new CylinderGeometry(0.03, 0.03, 0.012, 16)), prata, 0, -0.25, 0.085).rotateX(Math.PI / 2));
    // celular
    this.celular = new Group();
    this.celular.add(this.malha(this.geo(new BoxGeometry(0.09, 0.17, 0.016)), preto));
    const tela = this.malha(this.geo(new PlaneGeometry(0.07, 0.13)), this.mat(0x25d366, 0.3), 0, 0, 0.009);
    this.celular.add(tela);
    this.celular.position.set(0, -0.04, 0.07);
    this.celular.rotation.set(0.2, 0, 0);
    maoD.add(this.celular);

    // pescoço e cabeça
    const pescoco = this.grupo(coluna, 0, 0.66, 0);
    pescoco.add(this.malha(this.geo(new CylinderGeometry(0.075, 0.085, 0.14, 14)), peleEscura, 0, 0.02, 0));
    const cabeca = this.grupo(pescoco, 0, 0.32, 0);
    this.j.cabeca = cabeca;
    const cranio = this.malha(this.geo(new SphereGeometry(0.31, 32, 24)), pele);
    cranio.scale.set(0.96, 1.06, 0.98);
    cabeca.add(cranio);
    // cabelo curto: calota no topo, um pouco inclinada para trás
    const topo = this.malha(this.geo(new SphereGeometry(0.325, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4)), cabelo, 0, 0.03, -0.015);
    topo.rotation.x = -0.32;
    topo.scale.set(0.98, 1.08, 1);
    cabeca.add(topo);
    const nuca = this.malha(this.geo(new SphereGeometry(0.318, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.55)), cabelo, 0, 0, -0.03);
    nuca.rotation.x = -1.25;
    cabeca.add(nuca);
    // orelhas
    for (const lado of [-1, 1]) cabeca.add(this.malha(this.geo(new SphereGeometry(0.06, 12, 10)), pele, 0.3 * lado, -0.01, 0));
    // olhos com brilho
    for (const lado of [-1, 1]) {
      const olho = this.grupo(cabeca, 0.105 * lado, 0.0, 0.27);
      olho.add(this.malha(this.geo(new SphereGeometry(0.04, 14, 10)), preto));
      olho.add(this.malha(this.geo(new SphereGeometry(0.012, 8, 6)), branco, 0.012, 0.014, 0.034));
      this.olhos.push(olho);
      const sobrancelha = this.malha(this.geo(new BoxGeometry(0.1, 0.022, 0.02)), cabelo, 0.11 * lado, 0.1, 0.275);
      sobrancelha.rotation.z = 0.12 * lado;
      cabeca.add(sobrancelha);
      const face = this.malha(this.geo(new SphereGeometry(0.05, 10, 8)), bochecha, 0.17 * lado, -0.09, 0.245);
      face.scale.set(1, 0.6, 0.4);
      cabeca.add(face);
    }
    // nariz
    cabeca.add(this.malha(this.geo(new SphereGeometry(0.035, 12, 10)), peleEscura, 0, -0.05, 0.3));
    // sorriso: meia-lua branca com contorno
    const dentes = this.malha(this.geo(new CircleGeometry(0.085, 24, Math.PI, Math.PI)), branco, 0, -0.12, 0.286);
    dentes.scale.set(1, 0.75, 1);
    cabeca.add(dentes);
    const labio = this.malha(this.geo(new TorusGeometry(0.085, 0.012, 6, 24, Math.PI)), this.mat(0x6b331d, 0.6), 0, -0.12, 0.284);
    labio.rotation.z = Math.PI;
    labio.scale.set(1, 0.75, 1);
    cabeca.add(labio);

    // sombra suave no chão
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(3,15,36,0.55)");
    g.addColorStop(1, "rgba(3,15,36,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new CanvasTexture(c);
    this.descartaveis.push(tex);
    const matSombra = new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
    this.descartaveis.push(matSombra);
    this.sombra = this.malha(this.geo(new PlaneGeometry(1.1, 1.1)), matSombra, 0, 0.002, 0);
    this.sombra.rotation.x = -Math.PI / 2;
    this.raiz.add(this.sombra);

    for (const nome of Object.keys(this.j) as Articulacao[]) this.atual.set(nome, [0, 0, 0]);
  }

  setPose(p: Pose) {
    this.pose = p;
  }
  girar() {
    this.giro = 0;
  }
  pular() {
    this.pulo = 1;
  }

  resize(w: number, h: number) {
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  /** dt em segundos */
  tick(dt: number, e: Entrada) {
    this.tempo += dt;
    const t = this.tempo;
    const k = 1 - Math.pow(0.0015, dt); // suavização independente da taxa de quadros
    const alvo = this.alvos[this.pose];
    const base = this.alvos.parado;

    // aceno e cintilação de pose
    const extra: Alvos = {};
    if (this.pose === "acena") extra.cotoveloD = [0, 0, 0.35 + Math.sin(t * 9) * 0.45];
    if (this.pose === "comemora") {
      extra.ombroE = [0, 0, -2.6 + Math.sin(t * 10) * 0.18];
      extra.ombroD = [0, 0, 2.6 - Math.sin(t * 10) * 0.18];
    }
    if (this.pose === "aponta") {
      const b = Math.sin(t * 5) * 0.06;
      if (this.lado === "esquerda") extra.ombroE = [-0.25, 0, -1.45 + b];
      else extra.ombroD = [-0.25, 0, 1.45 - b];
    }

    // caminhada (somada à pose; braços livres balançam)
    const w = e.andando;
    const fase = e.passo;
    const passoQ = Math.sin(fase) * 0.55 * w;
    const caminhada: Alvos = {
      quadrilE: [passoQ, 0, 0],
      quadrilD: [-passoQ, 0, 0],
      joelhoE: [Math.max(0, -Math.sin(fase)) * 0.9 * w, 0, 0],
      joelhoD: [Math.max(0, Math.sin(fase)) * 0.9 * w, 0, 0],
      coluna: [0.06 * w + Math.max(-0.25, Math.min(0.25, e.vel * 0.012)), Math.sin(fase) * 0.08 * w, 0],
    };

    for (const nome of Object.keys(this.j) as Articulacao[]) {
      const a = alvo[nome] ?? base[nome] ?? [0, 0, 0];
      const x = extra[nome] ?? a;
      const c = caminhada[nome] ?? [0, 0, 0];
      // braços que não fazem parte da pose balançam ao andar
      let balanco = 0;
      if (nome === "ombroE" && !alvo.ombroE) balanco = -Math.sin(fase) * 0.45 * w;
      if (nome === "ombroD" && !alvo.ombroD) balanco = Math.sin(fase) * 0.45 * w;
      const destino: Rot = [x[0] + c[0] + balanco, x[1] + c[1], x[2] + c[2]];
      const cur = this.atual.get(nome)!;
      for (let i = 0; i < 3; i++) cur[i] += (destino[i] - cur[i]) * k;
      this.j[nome].rotation.set(cur[0], cur[1], cur[2]);
    }

    // respiração e quique dos passos
    this.j.coluna.scale.setScalar(1 + Math.sin(t * 2.2) * 0.012);
    const quique = Math.abs(Math.sin(fase)) * 0.06 * w;

    // pulo
    let altura = 0;
    if (this.pulo > 0) {
      this.pulo = Math.max(0, this.pulo - dt * 1.8);
      altura = Math.sin((1 - this.pulo) * Math.PI) * 0.45;
    }
    this.corpo.position.y = quique + altura + Math.sin(t * 1.6) * 0.02;
    this.sombra.scale.setScalar(1 - altura * 0.8);

    // virada para o lado ao andar + giro 360° com aceleração e freada suaves
    const lateral = this.lado === "esquerda" ? -0.55 : 0.55;
    const viraAndando = lateral * w + Math.sin(t * 0.6) * 0.12 * (1 - w);
    this.yaw += (viraAndando - this.yaw) * k;
    let giroAtual = 0;
    if (this.giro < 1) {
      this.giro = Math.min(1, this.giro + dt * 1.1);
      const p = this.giro;
      giroAtual = (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2) * Math.PI * 2;
    }
    this.raiz.rotation.y = this.yaw + (this.giro < 1 ? giroAtual : 0);
    this.raiz.rotation.z = Math.max(-0.2, Math.min(0.2, -e.vel * 0.006));

    // olhos piscando
    this.piscar -= dt;
    const fechado = this.piscar < 0.12 && this.piscar > 0;
    for (const o of this.olhos) o.scale.y = fechado ? 0.1 : 1;
    if (this.piscar <= 0) this.piscar = 2.5 + Math.random() * 3;

    // acessórios por pose
    this.dedo.visible = this.pose === "aponta";
    this.polegar.visible = this.pose === "joinha";
    this.celular.visible = this.pose === "celular";

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    for (const d of this.descartaveis) d.dispose();
    this.renderer.dispose();
  }
}
