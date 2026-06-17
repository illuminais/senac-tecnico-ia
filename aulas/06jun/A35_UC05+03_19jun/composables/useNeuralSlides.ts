import { ref, computed, watch, onMounted } from "vue";
import type { Ref } from "vue";
import type {
  NeuralNodeSlide,
  NeuralNodeData,
  NeuralSlidesState,
} from "../types/neural-slides";

/**
 * Composable para gerenciar navegação e estado dos slides neurais
 */
export function useNeuralSlides(
  svgRef: Ref<SVGSVGElement | null>,
  slidesConfig: NeuralNodeSlide[],
) {
  // Estado reativo
  const state = ref<NeuralSlidesState>({
    currentSlideIndex: 0,
    slides: slidesConfig,
    nodesData: new Map(),
    svgDimensions: { width: 500, height: 500 },
  });

  // Slide atual
  const currentSlide = computed(
    () => state.value.slides[state.value.currentSlideIndex],
  );

  // Dados do nó atual
  const currentNodeData = computed(() =>
    currentSlide.value
      ? state.value.nodesData.get(currentSlide.value.id)
      : null,
  );

  /**
   * Extrai informações de um nó do SVG
   */
  const extractNodeData = (element: SVGElement): NeuralNodeData | null => {
    try {
      let x = 0,
        y = 0;

      // Extrair coordenadas baseado no tipo de elemento
      if (element.tagName === "circle") {
        x = parseFloat(element.getAttribute("cx") || "0");
        y = parseFloat(element.getAttribute("cy") || "0");
      } else if (element.tagName === "ellipse") {
        x = parseFloat(element.getAttribute("cx") || "0");
        y = parseFloat(element.getAttribute("cy") || "0");
      } else if (element.tagName === "path") {
        // Para paths, usar bounding box
        const bbox = (element as SVGGraphicsElement).getBBox();
        x = bbox.x + bbox.width / 2;
        y = bbox.y + bbox.height / 2;
      } else {
        const bbox = (element as SVGGraphicsElement).getBBox();
        x = bbox.x + bbox.width / 2;
        y = bbox.y + bbox.height / 2;
      }

      // Extrair estilos computados
      const computedStyle = window.getComputedStyle(element);

      return {
        x,
        y,
        fill: element.getAttribute("fill") || computedStyle.fill || "#ff8080",
        stroke:
          element.getAttribute("stroke") || computedStyle.stroke || "#e3e3e3",
        strokeWidth: parseFloat(
          element.getAttribute("stroke-width") ||
            computedStyle.strokeWidth ||
            "0.026",
        ),
        element,
      };
    } catch (error) {
      console.warn(`Erro ao extrair dados do nó ${element.id}:`, error);
      return null;
    }
  };

  /**
   * Inicializa os dados de todos os nós configurados
   */
  const initializeNodes = () => {
    if (!svgRef.value) return;

    // Extrair dimensões do SVG
    const viewBox = svgRef.value.getAttribute("viewBox");
    if (viewBox) {
      const [, , width, height] = viewBox.split(" ").map(Number);
      state.value.svgDimensions = { width, height };
    }

    // Extrair dados de cada nó configurado
    state.value.nodesData.clear();

    for (const slide of state.value.slides) {
      // Buscar elemento por ID
      let element = svgRef.value.querySelector(`#${slide.id}`);

      // Se não encontrar por ID, tentar por outros métodos
      if (!element) {
        // Tentar encontrar ellipse pela coordenada aproximada
        const allEllipses = svgRef.value.querySelectorAll("ellipse");
        // Aqui poderíamos implementar busca por proximidade
      }

      if (element instanceof SVGElement) {
        const nodeData = extractNodeData(element);
        if (nodeData) {
          state.value.nodesData.set(slide.id, nodeData);
        }
      } else {
        console.warn(`Nó não encontrado: ${slide.id}`);
      }
    }
  };

  /**
   * Aplica estilo ao nó ativo
   */
  const applyNodeStyle = (
    nodeId: string,
    style?: NeuralNodeSlide["nodeStyle"],
  ) => {
    const nodeData = state.value.nodesData.get(nodeId);
    if (!nodeData) return;

    const element = nodeData.element;

    if (style) {
      // Aplicar estilo customizado
      if (style.fill) element.setAttribute("fill", style.fill);
      if (style.stroke) element.setAttribute("stroke", style.stroke);
      if (style.strokeWidth !== undefined) {
        element.setAttribute("stroke-width", style.strokeWidth.toString());
      }

      // Aplicar glow se necessário
      if (style.glow) {
        const glowColor = style.glowColor || style.fill || "#00ffff";
        element.style.filter = `drop-shadow(0 0 8px ${glowColor})`;
      }
    } else {
      // Restaurar estilo original
      element.setAttribute("fill", nodeData.fill);
      element.setAttribute("stroke", nodeData.stroke);
      element.setAttribute("stroke-width", nodeData.strokeWidth.toString());
      element.style.filter = "";
    }
  };

  /**
   * Aplica opacidade ao background (resto da rede)
   */
  const applyBackgroundOpacity = (opacity: number = 0.3) => {
    if (!svgRef.value) return;

    // Aplicar opacidade a todos os elementos exceto o nó ativo
    const allElements = svgRef.value.querySelectorAll(
      "ellipse, circle, path, polygon",
    );
    const activeNodeId = currentSlide.value?.id;

    allElements.forEach((element) => {
      if (element.id !== activeNodeId) {
        (element as SVGElement).style.opacity = opacity.toString();
      } else {
        (element as SVGElement).style.opacity = "1";
      }
    });
  };

  /**
   * Calcula transformação para focar no nó
   */
  const getFocusTransform = () => {
    if (!currentSlide.value || !currentNodeData.value) {
      return { transform: "none", transformOrigin: "center" };
    }

    const zoom = currentSlide.value.zoom || 1;
    const offset = currentSlide.value.offset || { x: 0, y: 0 };
    const { x, y } = currentNodeData.value;
    const { width, height } = state.value.svgDimensions;

    // Calcular percentual da posição do nó
    const offsetX = ((x + (offset.x || 0)) / width) * 100;
    const offsetY = ((y + (offset.y || 0)) / height) * 100;

    return {
      transform: `scale(${zoom})`,
      transformOrigin: `${offsetX}% ${offsetY}%`,
    };
  };

  /**
   * Atualiza visualização quando o slide muda
   */
  const updateSlideView = () => {
    if (!currentSlide.value) return;

    // Resetar estilos de todos os nós
    state.value.nodesData.forEach((data, id) => {
      applyNodeStyle(id);
    });

    // Aplicar estilo ao nó ativo
    applyNodeStyle(currentSlide.value.id, currentSlide.value.nodeStyle);

    // Aplicar opacidade ao background
    const bgOpacity = currentSlide.value.backgroundOpacity ?? 0.3;
    applyBackgroundOpacity(bgOpacity);
  };

  /**
   * Navega para um slide específico
   */
  const goToSlide = (index: number) => {
    if (index >= 0 && index < state.value.slides.length) {
      state.value.currentSlideIndex = index;
    }
  };

  /**
   * Próximo slide
   */
  const nextSlide = () => {
    goToSlide(state.value.currentSlideIndex + 1);
  };

  /**
   * Slide anterior
   */
  const previousSlide = () => {
    goToSlide(state.value.currentSlideIndex - 1);
  };

  // Watchers
  watch(
    () => svgRef.value,
    (newValue) => {
      if (newValue) {
        initializeNodes();
        updateSlideView();
      }
    },
    { immediate: true },
  );

  watch(
    () => state.value.currentSlideIndex,
    () => {
      updateSlideView();
    },
  );

  onMounted(() => {
    if (svgRef.value) {
      initializeNodes();
      updateSlideView();
    }
  });

  return {
    state,
    currentSlide,
    currentNodeData,
    getFocusTransform,
    goToSlide,
    nextSlide,
    previousSlide,
    initializeNodes,
    updateSlideView,
  };
}
