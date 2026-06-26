export interface NeuralNodeSlide {
  /** ID do elemento dentro do SVG (ex: node-1, path1-5) */
  id: string;
  /** Nível de zoom aplicado (1 = sem zoom, 2 = 2x, etc) */
  zoom?: number;
  /** Deslocamento adicional do foco (em pixels) */
  offset?: {
    x?: number;
    y?: number;
  };
  /** Estilo customizado para o nó ativo (sobrescreve o original) */
  nodeStyle?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    glow?: boolean;
    glowColor?: string;
  };
  /** Opacidade do resto da rede (0-1, padrão: 0.3) */
  backgroundOpacity?: number;
  /** Conteúdo textual do slide */
  content?: {
    title?: string;
    description?: string;
  };
}

export interface NeuralNodeData {
  /** Coordenada X do centro do nó */
  x: number;
  /** Coordenada Y do centro do nó */
  y: number;
  /** Cor de preenchimento original */
  fill: string;
  /** Cor da borda original */
  stroke: string;
  /** Largura da borda original */
  strokeWidth: number;
  /** Referência ao elemento DOM */
  element: SVGElement;
}

export interface NeuralSlidesState {
  /** Índice do slide atual (baseado em 0) */
  currentSlideIndex: number;
  /** Configuração de todos os slides */
  slides: NeuralNodeSlide[];
  /** Dados extraídos dos nós do SVG */
  nodesData: Map<string, NeuralNodeData>;
  /** Dimensões do SVG (width, height) */
  svgDimensions: { width: number; height: number };
}
