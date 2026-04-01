import React, { useEffect, useRef, useState, useCallback } from 'react';

// ========== 类型定义 ==========
export type MemoryType = 'insight' | 'photo' | 'quote' | 'recommend' | 'thought';
export type Category = 'life' | 'career' | 'tech' | 'philosophy' | 'creative';

interface MemoryNode {
  id: string;
  type: MemoryType;
  category: Category;
  content: string;
  source?: string;
  link?: string;
  imageUrl?: string;
  angle: number;      // 浮动动画角度
  distance: number;   // 保留但不再用于位置计算
  size: number;       // 节点大小
  orbitSpeed: number; // 浮动速度
  x: number;          // 归一化 x 位置 (0-1)
  y: number;          // 归一化 y 位置 (0-1)
  baseX: number;      // 基础 x 位置
  baseY: number;      // 基础 y 位置
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  phase: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  ringAngle: number;
  particles: { angle: number; distance: number; size: number }[];
}

// ========== 配色系统 ==========
const CATEGORY_COLORS: Record<Category, { main: string; glow: string; orbit: string }> = {
  life: { main: '#f4a261', glow: 'rgba(244, 162, 97, 0.8)', orbit: 'rgba(244, 162, 97, 0.2)' },
  career: { main: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.8)', orbit: 'rgba(42, 157, 143, 0.2)' },
  tech: { main: '#3a86ff', glow: 'rgba(58, 134, 255, 0.8)', orbit: 'rgba(58, 134, 255, 0.2)' },
  philosophy: { main: '#e9c46a', glow: 'rgba(233, 196, 106, 0.8)', orbit: 'rgba(233, 196, 106, 0.2)' },
  creative: { main: '#9b5de5', glow: 'rgba(155, 93, 229, 0.8)', orbit: 'rgba(155, 93, 229, 0.2)' },
};

// ========== 示例记忆数据 ==========
const MEMORY_DATA: Omit<MemoryNode, 'angle' | 'distance' | 'size' | 'orbitSpeed' | 'x' | 'y' | 'baseX' | 'baseY'>[] = [
  { id: '1', type: 'photo', category: 'life', content: '毕业那天，阳光正好', imageUrl: '/memories/graduation.jpg' },
  { id: '2', type: 'insight', category: 'career', content: '从商科到代码，转行的勇气是一步步积累的' },
  { id: '3', type: 'quote', category: 'philosophy', content: '"The only way to do great work is to love what you do."', source: 'Steve Jobs' },
  { id: '4', type: 'photo', category: 'life', content: '小狗说：今天也要开心' },
  { id: '5', type: 'thought', category: 'creative', content: '深夜写代码的时候，窗外有只猫一直在看' },
  { id: '6', type: 'recommend', category: 'tech', content: '最好用的 AI 工具', link: 'claude.ai' },
  { id: '7', type: 'insight', category: 'philosophy', content: '技术只是手段，解决问题才是目的' },
  { id: '8', type: 'recommend', category: 'tech', content: '设计灵感网站', link: 'are.na' },
  { id: '9', type: 'quote', category: 'philosophy', content: '"Stay hungry, stay foolish."', source: 'Whole Earth Catalog' },
  { id: '10', type: 'thought', category: 'life', content: '下雨天最适合读博尔赫斯' },
  { id: '11', type: 'recommend', category: 'creative', content: '最爱的播客：忽左忽右', link: 'xiaoyuzhoufm.com' },
  { id: '12', type: 'insight', category: 'career', content: 'MBA 教会我的：用商业思维写代码' },
];

const CosmosMemory: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<MemoryNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<MemoryNode[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetZoom: 1 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // 初始化宇宙
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 初始化记忆节点（按分类聚类，更分散）
    const categoryCenters: Record<Category, { x: number; y: number }> = {
      life: { x: 0.15, y: 0.25 },      // 左上
      career: { x: 0.85, y: 0.25 },    // 右上
      tech: { x: 0.75, y: 0.75 },      // 右下
      philosophy: { x: 0.25, y: 0.75 }, // 左下
      creative: { x: 0.5, y: 0.5 },    // 中心
    };

    nodesRef.current = MEMORY_DATA.map((data, index) => {
      const center = categoryCenters[data.category];
      // 在分类中心周围随机分布，距离更远更分散
      const angle = Math.random() * Math.PI * 2;
      const distance = 0.08 + Math.random() * 0.15; // 分散范围更大
      
      return {
        ...data,
        angle: Math.random() * Math.PI * 2, // 用于浮动动画
        distance: 0, // 不再使用轨道距离
        x: center.x + Math.cos(angle) * distance,
        y: center.y + Math.sin(angle) * distance,
        baseX: center.x + Math.cos(angle) * distance, // 保存原始位置
        baseY: center.y + Math.sin(angle) * distance,
        size: 4 + Math.random() * 4,
        orbitSpeed: (0.0003 + Math.random() * 0.0004) * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    // 初始化星云
    nebulasRef.current = [
      { x: centerX * 0.3, y: centerY * 0.4, radius: 200, color: '#9b5de5', opacity: 0.15, phase: 0 },
      { x: centerX * 1.7, y: centerY * 0.6, radius: 250, color: '#3a86ff', opacity: 0.12, phase: Math.PI / 3 },
      { x: centerX * 0.8, y: centerY * 1.5, radius: 180, color: '#f4a261', opacity: 0.14, phase: Math.PI * 2 / 3 },
      { x: centerX * 1.2, y: centerY * 0.3, radius: 220, color: '#2a9d8f', opacity: 0.1, phase: Math.PI },
    ];

    // 初始化星球（由大量小粒子组成）
    planetsRef.current = [
      { 
        x: centerX * 0.2, 
        y: centerY * 0.8, 
        radius: 40, 
        color: '#e9c46a',
        ringAngle: Math.PI / 6,
        particles: Array.from({ length: 80 }, () => ({
          angle: Math.random() * Math.PI * 2,
          distance: 0.3 + Math.random() * 0.7,
          size: 1 + Math.random() * 2,
        }))
      },
      { 
        x: centerX * 1.8, 
        y: centerY * 0.4, 
        radius: 50, 
        color: '#9b5de5',
        ringAngle: -Math.PI / 4,
        particles: Array.from({ length: 100 }, () => ({
          angle: Math.random() * Math.PI * 2,
          distance: 0.3 + Math.random() * 0.7,
          size: 1 + Math.random() * 2,
        }))
      },
      { 
        x: centerX, 
        y: centerY * 1.6, 
        radius: 35, 
        color: '#3a86ff',
        ringAngle: Math.PI / 3,
        particles: Array.from({ length: 60 }, () => ({
          angle: Math.random() * Math.PI * 2,
          distance: 0.3 + Math.random() * 0.7,
          size: 1 + Math.random() * 2,
        }))
      },
    ];
  }, []);

  // 绘制函数
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    // 更新相机（鼠标视差 + 自动漂移）
    const targetX = (mouseRef.current.x - canvas.width / 2) * 0.05;
    const targetY = (mouseRef.current.y - canvas.height / 2) * 0.05;
    cameraRef.current.x += (targetX - cameraRef.current.x) * 0.02;
    cameraRef.current.y += (targetY - cameraRef.current.y) * 0.02;
    cameraRef.current.zoom += (cameraRef.current.targetZoom - cameraRef.current.zoom) * 0.05;

    const camX = cameraRef.current.x;
    const camY = cameraRef.current.y;
    const zoom = cameraRef.current.zoom;

    // 清除画布（拖尾效果）
    ctx.fillStyle = 'rgba(2, 2, 5, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 保存上下文
    ctx.save();
    ctx.translate(camX, camY);
    ctx.scale(zoom, zoom);

    // ========== 绘制星云 ==========
    nebulasRef.current.forEach(nebula => {
      const breathe = Math.sin(time * 0.5 + nebula.phase) * 0.1 + 1;
      const gradient = ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.radius * breathe
      );
      gradient.addColorStop(0, nebula.color + Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, nebula.color + Math.floor(nebula.opacity * 0.5 * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(nebula.x, nebula.y, nebula.radius * breathe, 0, Math.PI * 2);
      ctx.fill();
    });

    // ========== 绘制星球 ==========
    planetsRef.current.forEach((planet, planetIndex) => {
      // 星球本体光晕
      const planetGlow = ctx.createRadialGradient(
        planet.x, planet.y, 0,
        planet.x, planet.y, planet.radius * 2
      );
      planetGlow.addColorStop(0, planet.color + '60');
      planetGlow.addColorStop(0.5, planet.color + '20');
      planetGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = planetGlow;
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // 绘制星球粒子
      planet.particles.forEach((p, i) => {
        const particleAngle = p.angle + time * 0.1 * (i % 2 === 0 ? 1 : -1);
        const r = planet.radius * p.distance;
        const px = planet.x + Math.cos(particleAngle) * r;
        const py = planet.y + Math.sin(particleAngle) * r * 0.6; // 椭圆效果

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = planet.color + Math.floor((0.4 + Math.sin(time + i) * 0.3) * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // 星环
      ctx.save();
      ctx.translate(planet.x, planet.y);
      ctx.rotate(planet.ringAngle);
      ctx.scale(1, 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, planet.radius * 1.8, 0, Math.PI * 2);
      ctx.strokeStyle = planet.color + '40';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // 星球核心高亮
      const coreGradient = ctx.createRadialGradient(
        planet.x - planet.radius * 0.3, planet.y - planet.radius * 0.3, 0,
        planet.x, planet.y, planet.radius
      );
      coreGradient.addColorStop(0, planet.color);
      coreGradient.addColorStop(1, planet.color + '80');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // ========== 绘制分类聚类连线 ==========
    const categoryGroups: Record<string, MemoryNode[]> = {};
    nodesRef.current.forEach(node => {
      if (!categoryGroups[node.category]) categoryGroups[node.category] = [];
      categoryGroups[node.category].push(node);
    });

    // 同类节点之间的连线
    Object.values(categoryGroups).forEach(group => {
      group.forEach((node, i) => {
        const colors = CATEGORY_COLORS[node.category];
        // 与同组的其他节点连线
        group.slice(i + 1).forEach(other => {
          const nx = (node as any)._renderX;
          const ny = (node as any)._renderY;
          const ox = (other as any)._renderX;
          const oy = (other as any)._renderY;
          
          if (nx && ny && ox && oy) {
            const dist = Math.sqrt((nx - ox) ** 2 + (ny - oy) ** 2);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(nx, ny);
              ctx.lineTo(ox, oy);
              ctx.strokeStyle = colors.orbit.replace('0.2', (0.1 - dist / 1500).toString());
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
    });

    // ========== 绘制记忆节点 ==========
    nodesRef.current.forEach(node => {
      // 轻柔浮动效果
      node.angle += node.orbitSpeed;
      const floatX = Math.cos(node.angle) * 15;
      const floatY = Math.sin(node.angle) * 10;
      
      const x = centerX + node.x * canvas.width + floatX;
      const y = centerY + node.y * canvas.height + floatY;
      
      const colors = CATEGORY_COLORS[node.category];
      const isHovered = hoveredNode?.id === node.id;
      const pulse = Math.sin(time * 2 + parseInt(node.id)) * 0.2 + 1;

      // 保存当前位置供鼠标检测使用
      (node as any)._renderX = x;
      (node as any)._renderY = y;

      // 节点光晕
      if (isHovered) {
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 50);
        glow.addColorStop(0, colors.glow);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // 节点本体
      const size = node.size * (isHovered ? 1.5 : 1) * pulse;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = colors.main;
      ctx.fill();

      // 节点内核
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    });

    ctx.restore();
    animationRef.current = requestAnimationFrame(draw);
  }, [hoveredNode]);

  // 启动动画
  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // 鼠标交互
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMousePos({ x: e.clientX, y: e.clientY });

    // 检测悬停的节点
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const hovered = nodesRef.current.find(node => {
      const renderX = (node as any)._renderX;
      const renderY = (node as any)._renderY;
      if (!renderX || !renderY) return false;
      const dx = mouseRef.current.x - renderX;
      const dy = mouseRef.current.y - renderY;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setHoveredNode(hovered || null);
    cameraRef.current.targetZoom = hovered ? 1.1 : 1;
  };

  const handleClick = () => {
    if (hoveredNode) {
      // 点击后可以展开详情或跳转
      console.log('Clicked node:', hoveredNode);
    }
  };

  // 调整画布大小
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // 类型标签
  const getTypeIcon = (type: MemoryType): string => {
    const icons: Record<MemoryType, string> = {
      insight: '💡', photo: '📷', quote: '📖', recommend: '🔗', thought: '💭',
    };
    return icons[type];
  };

  const getTypeLabel = (type: MemoryType): string => {
    const labels: Record<MemoryType, string> = {
      insight: '感悟', photo: '瞬间', quote: '书摘', recommend: '推荐', thought: '碎碎念',
    };
    return labels[type];
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="cosmos-background"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          cursor: hoveredNode ? 'pointer' : 'default',
          background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #020203 50%, #000000 100%)',
        }}
      />
      
      {/* 悬停卡片 */}
      {hoveredNode && (
        <div
          className="memory-card cosmos-card"
          style={{
            position: 'fixed',
            left: Math.min(mousePos.x + 20, window.innerWidth - 340),
            top: Math.max(mousePos.y - 100, 20),
            zIndex: 100,
          }}
        >
          <div 
            className="memory-card-header"
            style={{ 
              borderColor: CATEGORY_COLORS[hoveredNode.category].main,
              background: CATEGORY_COLORS[hoveredNode.category].orbit,
            }}
          >
            <span className="memory-card-type">
              {getTypeIcon(hoveredNode.type)} {getTypeLabel(hoveredNode.type)}
            </span>
            <span 
              className="memory-card-category"
              style={{ color: CATEGORY_COLORS[hoveredNode.category].main }}
            >
              {hoveredNode.category}
            </span>
          </div>
          <div className="memory-card-content">
            {hoveredNode.imageUrl && (
              <div className="memory-card-image-placeholder">
                <span>📷 {hoveredNode.content.slice(0, 20)}...</span>
              </div>
            )}
            <p className="memory-card-text">{hoveredNode.content}</p>
            {hoveredNode.source && (
              <p className="memory-card-source">— {hoveredNode.source}</p>
            )}
            {hoveredNode.link && (
              <a 
                href={`https://${hoveredNode.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="memory-card-link"
                onClick={(e) => e.stopPropagation()}
              >
                {hoveredNode.link} ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="cosmos-legend">
        <div className="cosmos-legend-title">我的宇宙</div>
        {Object.entries(CATEGORY_COLORS).map(([cat, colors]) => (
          <div key={cat} className="cosmos-legend-item">
            <span className="cosmos-legend-dot" style={{ background: colors.main }} />
            <span className="cosmos-legend-label">{cat}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CosmosMemory;
