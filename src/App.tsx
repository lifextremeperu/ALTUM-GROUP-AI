/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, 
  Leaf, 
  Hexagon, 
  Cuboid, 
  Cpu, 
  Fingerprint, 
  Activity, 
  Maximize,
  Maximize2,
  Wallet,
  Sparkles,
  Search,
  Key,
  Home,
  MapPin,
  Building,
  MessageSquare,
  Calculator,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Send,
  Wand2,
  PaintBucket,
  Hammer,
  Landmark,
  ShieldCheck,
  FileText,
  FileSignature,
  Smartphone,
  Scan,
  TrendingUp,
  Sofa,
  LayoutDashboard,
  Map,
  BarChart3,
  Building2,
  Train,
  Plane,
  Radar,
  Globe,
  PlayCircle,
  Video,
  ImageIcon,
  Share2,
  Ruler,
  Box,
  Layers,
  MessageCircle,
  Quote,
  Bot,
  X,
  Calendar,
  HardHat,
  DraftingCompass,
  Eye,
  PieChart,
  Coins,
  CreditCard,
  Percent,
  Users,
  ArrowRight,
  AlertTriangle,
  Dog,
  Waves,
  Sun,
  Car,
  Trees,
  ArrowUpCircle,
  Handshake,
  Palette,
  Heart,
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  ShoppingBag,
  ShoppingCart,
  Triangle,
  Database,
  Github,
  Tag,
  ShieldAlert,
  Gavel,
  FileCheck,
  Lock,
  Download,
  History,
  Scale,
  Loader2,
  Upload,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateAiResponse } from './lib/gemini';
import { supabase } from './lib/supabase';
import { cn } from './lib/utils';

const PROPERTIES_DB = [
  { 
    id: 'p1', 
    title: 'MISTIQ Horizon', 
    location: 'Tulum, Quintana Roo', 
    type: 'venta', 
    price: 1250000, 
    roi: '14.2%', 
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 
    status: 'Preventa', 
    soundscape: 'Brisa del mar Caribe y hojas de palmera', 
    vibe: 'Comunidad Creativa & Wellness',
    benefits: ['Acceso a Club de Playa Privado', 'Sistema de Energía Solar', 'Seguridad 24/7', 'Áreas de Coworking']
  },
  { 
    id: 'p2', 
    title: 'Be Grand Bosque', 
    location: 'Ciudad de México', 
    type: 'alquiler', 
    price: 4200, 
    roi: '7.8%', 
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', 
    status: 'Disponible', 
    soundscape: 'Acústica interior con ligero eco sobre madera', 
    vibe: 'Noches Tranquilas & Pet Friendly',
    benefits: ['Gimnasio de Última Generación', 'Parque para Mascotas', 'Salón de Eventos', 'Vistas Panorámicas']
  },
  { 
    id: 'p3', 
    title: 'Valle Sagrado Eco-Villa', 
    location: 'Cusco, Perú', 
    type: 'venta', 
    price: 890000, 
    roi: '18.5%', 
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80', 
    status: 'Construcción', 
    soundscape: 'Trino de aves andinas y murmullo del río Urubamba', 
    vibe: 'Retiro Espiritual & Naturaleza',
    benefits: ['Huerto Orgánico Privado', 'Sistema de Recolección de Agua', 'Vistas a los Nevados', 'Zona de Meditación']
  },
  { 
    id: 'p4', 
    title: 'Andes Skyline Penthouse', 
    location: 'Santiago, Chile', 
    type: 'alquiler', 
    price: 5500, 
    roi: '6.5%', 
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?auto=format&fit=crop&w=800&q=80', 
    status: 'Disponible', 
    soundscape: 'Silencio acústico absoluto, ciudad lejana (Doble Vidrio)', 
    vibe: 'Paraíso Gastronómico & Ejecutivo',
    benefits: ['Terraza con Jacuzzi', 'Cava de Vinos Privada', 'Acceso Directo al Ascensor', 'Domótica Integral']
  },
  { 
    id: 'p5', 
    title: 'Sacred Valley Airbnb Retreat', 
    location: 'Urubamba, Cusco', 
    type: 'venta', 
    price: 450000, 
    roi: '22.5%', 
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', 
    status: 'Listo para Airbnb', 
    soundscape: 'Viento suave entre eucaliptos y campanas lejanas', 
    vibe: 'Turismo de Lujo & Aventura',
    benefits: ['Diseño Optimizado para Airbnb', 'Gestión de Propiedad Incluida', 'Alta Demanda Turística', 'Fogata Exterior de Diseño']
  },
  { 
    id: 'p6', 
    title: 'Arequipa Colonial Modern Loft', 
    location: 'Cercado, Arequipa', 
    type: 'venta', 
    price: 320000, 
    roi: '15.8%', 
    img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80', 
    status: 'Remodelado', 
    soundscape: 'Eco suave en patio de sillar y fuentes de agua', 
    vibe: 'Historia & Confort Moderno',
    benefits: ['Arquitectura de Sillar Original', 'Interiorismo Minimalista', 'Cerca a la Plaza de Armas', 'Ideal para Nómadas Digitales']
  },
  { 
    id: 'p7', 
    title: 'Yanahuara View Apartment', 
    location: 'Yanahuara, Arequipa', 
    type: 'alquiler', 
    price: 1800, 
    roi: '9.2%', 
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', 
    status: 'Disponible', 
    soundscape: 'Murmullo urbano suave y campanas de iglesia', 
    vibe: 'Tradición & Vistas al Misti',
    benefits: ['Vista Directa al Volcán Misti', 'Balcón Tradicional', 'Zona Residencial Segura', 'Acabados en Piedra Volcánica']
  },
  { 
    id: 'p8', 
    title: 'Ollantaytambo Stone House', 
    location: 'Ollantaytambo, Cusco', 
    type: 'venta', 
    price: 580000, 
    roi: '19.5%', 
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&w=800&q=80', 
    status: 'Preventa', 
    soundscape: 'Agua corriendo por canales incas milenarios', 
    vibe: 'Misticismo & Piedra Viva',
    benefits: ['Muros Incas Originales', 'Techo de Teja Andina', 'Jardín con Plantas Nativas', 'Ubicación en el Pueblo Vivo']
  }
];

const CROWDFUNDING_PROJECTS = [
  {
    id: 'cf1',
    title: '4 Casas Alpinas - Valle Sagrado',
    location: 'Urubamba, Cusco',
    minInvestment: 100,
    target: 250000,
    raised: 185000,
    roi: '22% Anual',
    img: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=800&q=80',
    description: 'Centro de Airbnb de lujo frente al Valle Sagrado. Proyecto de alta rentabilidad enfocado en turismo de experiencia.',
    activities: ['Stand Up Paddle', 'Cuatrimotos', 'Bicicleta de Montaña', 'Ceremonias Ancestrales', 'Yoga & Wellness'],
    legal: 'Inversión bajo la Ley de Financiamiento Participativo (Ley 31072). Permite invertir desde $100 USD obteniendo acciones de la sociedad propietaria del activo inmobiliario.'
  }
];

const JV_PROPERTIES_DB = [
  {
    id: 'jv1',
    title: 'Residencial Miraflores - Flip & Profit',
    location: 'Miraflores, Lima',
    type: 'Joint Venture',
    entryPrice: 150000,
    estimatedExit: 210000,
    roi: '40%',
    timeframe: '12 Meses',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Compra de departamento en remate bancario para remodelación y reventa inmediata. Alta plusvalía por ubicación estratégica.',
    risk: 'Bajo-Medio'
  },
  {
    id: 'jv2',
    title: 'Eco-Lodge Paracas - Desarrollo',
    location: 'Paracas, Ica',
    type: 'Joint Venture',
    entryPrice: 85000,
    estimatedExit: 145000,
    roi: '70%',
    timeframe: '24 Meses',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Desarrollo de complejo turístico ecológico. Terreno ya adquirido, buscando socios para la fase de construcción.',
    risk: 'Medio'
  }
];

const TESTIMONIALS_DB = [
  { id: 1, name: 'Maite Rodríguez', company: 'Sukasa Inmobiliaria', text: '"Antes de crear mi empresa lo primero que vi fue la necesidad de trabajar con este tipo de herramienta neuromórfica."', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', logo: 'SUKASA' },
  { id: 2, name: 'Isabel Mondejar', company: 'Century21', text: '"Es muy sencillo hacer un tour inmersivo y los clientes quedan asombrados. Hemos aumentado la retención un 40%."', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80', logo: 'Century21' },
  { id: 3, name: 'Lorenzo Ritella', company: 'Propertista', text: '"Un propietario necesita una media 17 visitas para vender; utilizando esta IA inmersiva hemos vendido con solo 6 visitas reales."', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', logo: 'Propertista' },
  { id: 4, name: 'Laura Abadal', company: 'Forcadell', text: '"Con ALTUM INMOBILIARIA estamos cambiando nuestra forma de trabajar. Cerramos ventas tokenizadas directamente en el tour 3D."', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', logo: 'FORCADELL' }
];

const VISION_TO_RENDER_STYLES = {
  original: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=80',
  minimalist: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
  industrial: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80',
  rustic: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2000&q=80'
};

const STAGING_STYLES = {
  empty: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=2000&q=80',
  scandinavian: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=2000&q=80',
  luxury: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=2000&q=80',
  bohemian: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2000&q=80'
};

const SHOPPABLE_ITEMS = {
  scandinavian: [
    { name: 'Sofá Nórdico 3 Cuerpos', store: 'Sodimac', price: 450, icon: Sofa },
    { name: 'Mesa de Centro Oslo', store: 'Promart', price: 120, icon: Box },
    { name: 'Lámpara de Pie Minimal', store: 'IKEA', price: 85, icon: Wand2 },
    { name: 'Alfombra Tejido Plano', store: 'Oechsle', price: 95, icon: Layers }
  ],
  luxury: [
    { name: 'Sofá Seccional Cuero', store: 'BoConcept', price: 1250, icon: Sofa },
    { name: 'Mesa Mármol Carrara', store: 'Casa Design', price: 850, icon: Box },
    { name: 'Chandelier Cristal', store: 'Illuminati', price: 420, icon: Sparkles },
    { name: 'Sillón Acento Velvet', store: 'Roche Bobois', price: 680, icon: Sofa }
  ],
  bohemian: [
    { name: 'Sofá Rattan & Lino', store: 'Sodimac', price: 380, icon: Sofa },
    { name: 'Alfombra Persa Vintage', store: 'Zara Home', price: 150, icon: Layers },
    { name: 'Plantas de Interior XL', store: 'Vivero Local', price: 90, icon: Leaf },
    { name: 'Mesa Madera Rústica', store: 'Promart', price: 180, icon: Box }
  ]
};

const PREFERENCES_FILTERS = [
  { id: 'pet', label: 'Pet Friendly', icon: Dog },
  { id: 'pool', label: 'Piscina', icon: Waves },
  { id: 'sea', label: 'Vista al Mar', icon: Sun },
  { id: 'furnished', label: 'Amoblado', icon: Sofa },
  { id: 'balcony', label: 'Balcón / Terraza', icon: Trees },
  { id: 'parking', label: 'Cochera', icon: Car },
  { id: 'elevator', label: 'Ascensor', icon: ArrowUpCircle },
  { id: 'security', label: 'Seguridad 24/7', icon: ShieldCheck },
];

const APPRAISER_BG = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80';
const CONSTRUCTION_BG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80';
const FRACTIONAL_BG = 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=80';
const MANDY_BG = 'https://images.unsplash.com/photo-1600210491136-1e64906f3630?auto=format&fit=crop&w=2000&q=80';

export default function App() {
  const [engineState, setEngineState] = useState('booting');
  const [viewMode, setViewMode] = useState('cinematic');
  const [aiAnalysis, setAiAnalysis] = useState('idle');
  const [investment, setInvestment] = useState(1000);
  const [synestheticMode, setSynestheticMode] = useState(true);
  
  // Main Views State
  const [showCatalog, setShowCatalog] = useState(false);
  const [activeTour, setActiveTour] = useState<any>(null);
  
  // Modals & Features State
  const [is3DHomeMode, setIs3DHomeMode] = useState(false);
  const [isCreditMode, setIsCreditMode] = useState(false);
  const [creditStep, setCreditStep] = useState('form');
  const [creditIncome, setCreditIncome] = useState(5000);
  const [creditDebts, setCreditDebts] = useState(0);
  const [creditAge, setCreditAge] = useState(30);
  const [creditEmploymentType, setCreditEmploymentType] = useState('dependiente');
  const [creditHistoryStatus, setCreditHistoryStatus] = useState('normal');
  const [creditPropertyPrice, setCreditPropertyPrice] = useState(400000);
  const [creditDownPayment, setCreditDownPayment] = useState(40000);
  const [creditTerm, setCreditTerm] = useState(20);
  const [creditScore, setCreditScore] = useState(0);
  const [creditResult, setCreditResult] = useState<any>(null);

  const [isAppraiserMode, setIsAppraiserMode] = useState(false);
  const [isConstructionMode, setIsConstructionMode] = useState(false);
  const [constructionArea, setConstructionArea] = useState(120);
  const [constructionFloors, setConstructionFloors] = useState(1);
  const [constructionQuality, setConstructionQuality] = useState('standard');
  const [constructionType, setConstructionType] = useState('residencial');
  const [constructionLocation, setConstructionLocation] = useState('urbano');
  const [isCalculatingConstruction, setIsCalculatingConstruction] = useState(false);
  const [constructionResult, setConstructionResult] = useState<any>(null);
  const [constructionStep, setConstructionStep] = useState('form'); // form, calculating, result
  const [isFractionalDetailMode, setIsFractionalDetailMode] = useState(false);
  const [isMandyMode, setIsMandyMode] = useState(false);
  const [showQuoter, setShowQuoter] = useState(false);

  // Deep States
  const [propertyFilter, setPropertyFilter] = useState('todas');
  const [activePreference, setActivePreference] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState('original');
  const [isGeneratingRender, setIsGeneratingRender] = useState(false);
  const [scanPosition, setScanPosition] = useState(-100);
  const [stagingStep, setStagingStep] = useState('idle');
  const [activeStaging, setActiveStaging] = useState('empty');
  const [appraiserStep, setAppraiserStep] = useState('idle');
  const [appraiserAddress, setAppraiserAddress] = useState('');
  const [appraiserMapsUrl, setAppraiserMapsUrl] = useState('');
  const [appraiserArea, setAppraiserArea] = useState(100);
  const [mandyStep, setMandyStep] = useState('chat'); // chat, upload, edit, result
  const [mandyInput, setMandyInput] = useState('');
  const [isMandyTyping, setIsMandyTyping] = useState(false);
  const [mandyMessages, setMandyMessages] = useState([{ role: 'mandy', text: 'Hola. Soy Mandy, tu arquitecta de interiores neuro-sensorial. Mi propósito es crear una conexión emocional entre tú y tu futuro hogar. Cuéntame, ¿quiénes habitarán este espacio y qué emociones deseas sentir al despertar aquí cada día?' }]);
  const [mandyUploadedImage, setMandyUploadedImage] = useState<string | null>(null);
  const [mandySelectedStyle, setMandySelectedStyle] = useState('Minimalista');
  const [mandySelectedColor, setMandySelectedColor] = useState('#ffffff');
  const [mandyIsGenerating, setMandyIsGenerating] = useState(false);
  const [mandyGeneratedImage, setMandyGeneratedImage] = useState<string | null>(null);
  const [tourTab, setTourTab] = useState('virtual');
  const [narrativeState, setNarrativeState] = useState('idle');
  const [isAmbientAudioActive, setIsAmbientAudioActive] = useState(false);
  const [isGlobalChatOpen, setIsGlobalChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [advisoryMessages, setAdvisoryMessages] = useState<any[]>([
    { 
      role: 'bot', 
      text: '¡Bienvenido a Altum Inmobiliaria! 🚀 Soy tu Asesor Premium con IA. ¿En qué flujo de información estás interesado hoy?',
      options: [
        { label: '🛡️ Escudo Legal', value: 'legal_shield' },
        { label: '📈 Inversión IA', value: 'investment_ia' },
        { label: '🎨 Mandy Designer', value: 'mandy_designer' },
        { label: '🏘️ Tasación Real', value: 'appraisal' }
      ]
    }
  ]);
  const [creditForm, setCreditForm] = useState({ income: 4500, debts: 500, bank: 'BCP' });
  const [creditStatus, setCreditStatus] = useState('idle');
  const [rpaState, setRpaState] = useState('idle');
  const [isTyping, setIsTyping] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  
  const activePropertyPrice = 1250000;
  const initialMessages = [{ id: 1, role: 'ai', text: 'He calibrado el modelo de precios en tiempo real. ¿Qué esquema de inversión prefieres analizar para esta unidad?', type: 'options', options: ['Pago de Contado', 'Financiamiento Directo', 'Inversión Tokenizada'] }];
  const [chatMessages, setChatMessages] = useState<any[]>(initialMessages);

  const [isClosingCostsMode, setIsClosingCostsMode] = useState(false);
  const [closingCostsStep, setClosingCostsStep] = useState<'form' | 'result'>('form');
  const [closingPrice, setClosingPrice] = useState<number>(0);
  const [closingType, setClosingType] = useState<'compra' | 'venta' | 'alquiler'>('compra');
  const [closingAcquisitionPrice, setClosingAcquisitionPrice] = useState<number>(0);
  const [closingResult, setClosingResult] = useState<any>(null);
  const [isLegalShieldMode, setIsLegalShieldMode] = useState(false);
  const [isEvictionContractMode, setIsEvictionContractMode] = useState(false);
  const [isCrowdfundingMode, setIsCrowdfundingMode] = useState(false);
  const [isJVMode, setIsJVMode] = useState(false);
  const [activeJV, setActiveJV] = useState<any>(null);
  const [activeCrowdfunding, setActiveCrowdfunding] = useState<any>(null);
  const [selectedLegalProperty, setSelectedLegalProperty] = useState<any>(null);
  const [legalScanStep, setLegalScanStep] = useState('select'); // select, scanning, complete
  const [legalScanFeed, setLegalScanFeed] = useState<string[]>([]);
  const [legalRiskScore, setLegalRiskScore] = useState(0);
  const [detectedFactors, setDetectedFactors] = useState<any[]>([]);

  const calculateConstructionQuote = () => {
    setIsCalculatingConstruction(true);
    setConstructionStep('calculating');
    
    // Simulation of real-time price fetching and calculation
    setTimeout(() => {
      const basePricePerM2 = {
        'economico': 550,
        'standard': 880,
        'luxury': 1650
      }[constructionQuality as 'economico' | 'standard' | 'luxury'] || 880;

      const locationFactor = {
        'urbano': 1.0,
        'rural': 1.15,
        'montaña': 1.30
      }[constructionLocation as 'urbano' | 'rural' | 'montaña'] || 1.0;

      const floorFactor = 1 + (constructionFloors - 1) * 0.12;
      const typeFactor = constructionType === 'comercial' ? 1.15 : constructionType === 'industrial' ? 0.9 : 1.0;

      const finalPricePerM2 = basePricePerM2 * locationFactor * floorFactor * typeFactor;
      const totalCost = finalPricePerM2 * constructionArea;
      
      // Detailed personnel and technical fees
      const architectFees = totalCost * 0.05;
      const engineerFees = totalCost * 0.04;
      const supervisionFees = totalCost * 0.03;
      const materials = totalCost * 0.55;
      const labor = totalCost * 0.25;
      const permits = totalCost * 0.08;

      // Select appropriate render and plan based on type and quality
      const renderUrls: any = {
        'residencial': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
        'comercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
        'industrial': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
      };

      const planUrls: any = {
        'residencial': 'https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=1200',
        'comercial': 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200',
        'industrial': 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=1200'
      };

      setConstructionResult({
        pricePerM2: Math.round(finalPricePerM2),
        totalCost: Math.round(totalCost),
        materials: Math.round(materials),
        labor: Math.round(labor),
        permits: Math.round(permits),
        architectFees: Math.round(architectFees),
        engineerFees: Math.round(engineerFees),
        supervisionFees: Math.round(supervisionFees),
        renderUrl: renderUrls[constructionType] || renderUrls['residencial'],
        planUrl: planUrls[constructionType] || planUrls['residencial'],
        timeMonths: Math.ceil(constructionArea / 20) + (constructionFloors * 2)
      });
      
      setIsCalculatingConstruction(false);
      setConstructionStep('result');
    }, 3000);
  };

  const startCreditEvaluation = () => {
    setCreditStep('evaluating');
    
    // Simulation of SBS/Sentinel/Infocorp API call
    setTimeout(() => {
      const dti = ((creditDebts + (creditPropertyPrice - creditDownPayment) * 0.008) / creditIncome) * 100; // Simplified monthly installment estimation
      const ltv = ((creditPropertyPrice - creditDownPayment) / creditPropertyPrice) * 100;
      
      let probability = 0;
      
      // 1. DTI (Debt-to-Income) - Max 40% for most banks
      if (dti < 35) probability += 35;
      else if (dti < 45) probability += 20;
      else if (dti < 55) probability += 10;
      
      // 2. LTV (Loan-to-Value) - Max 90% for most banks
      if (ltv <= 80) probability += 15;
      else if (ltv <= 90) probability += 10;
      else if (ltv <= 95) probability += 5;
      
      // 3. Age + Term (Must be < 75-80 at end of loan)
      if (creditAge + creditTerm <= 75) probability += 15;
      else if (creditAge + creditTerm <= 80) probability += 5;
      
      // 4. Employment Type
      if (creditEmploymentType === 'dependiente') probability += 15;
      else probability += 10; // Independientes have more scrutiny
      
      // 5. Credit History (SBS Categories)
      if (creditHistoryStatus === 'normal') probability += 20;
      else if (creditHistoryStatus === 'cpp') probability += 5;
      else probability -= 50; // Deficiente, Dudoso, Perdida are usually rejected

      probability = Math.max(0, Math.min(99, probability));
      
      setCreditScore(probability);
      
      const status = probability > 85 ? 'Pre-Aprobado (90%+)' : probability > 60 ? 'Sujeto a Evaluación' : 'Riesgo Alto';
      const maxAmount = Math.floor(creditIncome * 0.4 * 12 * creditTerm * 0.7); // Very rough estimation
      
      setCreditResult({
        status,
        maxAmount: maxAmount.toLocaleString(),
        dti: dti.toFixed(1),
        ltv: ltv.toFixed(1),
        bank: probability > 85 ? 'BCP / BBVA / Interbank' : probability > 60 ? 'Caja Arequipa / Caja Huancayo' : 'Financiera Confianza'
      });
      
      setCreditStep('result');
    }, 3500);
  };

  const isHomeView = !showCatalog && !activeTour && !is3DHomeMode && !isAppraiserMode && !isCreditMode && !isConstructionMode && !isFractionalDetailMode && !isMandyMode && !showQuoter && !isClosingCostsMode && !isLegalShieldMode && !isEvictionContractMode && !isCrowdfundingMode && !isJVMode;

  // --- EFECTOS DE INICIALIZACIÓN ---
  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      setEngineState('compiling_shaders');
      await new Promise(r => setTimeout(r, 1200));
      setEngineState('ssgi_active');
      await new Promise(r => setTimeout(r, 600));
      setEngineState('ready');
      setAiAnalysis('analyzing');
    };
    sequence();
  }, []);

  useEffect(() => {
    if (aiAnalysis === 'analyzing') {
      const timer = setTimeout(() => setAiAnalysis('complete'), 3500);
      return () => clearTimeout(timer);
    }
  }, [aiAnalysis]);

  // --- CONTROLADORES UNIVERSALES ---
  const startLegalScan = (property: any) => {
    setSelectedLegalProperty(property);
    setLegalScanStep('scanning');
    setLegalScanFeed([]);
    
    const logs = [
      "Iniciando Agente de Debida Diligencia (Due Diligence)...",
      "Conectando con SPRL (SUNARP) - Zona Registral IX...",
      `Accediendo a Partida Electrónica N° ${Math.floor(Math.random() * 10000000)} (Asiento C0001)...`,
      "Procesando texto legal con Agente NLP (Llama 3.1)...",
      "Verificando gravámenes, cargas y anotaciones preventivas...",
      `Consultando base de datos RENIEC (DNI Vendedor: ${Math.floor(Math.random() * 100000000)})...`,
      "Cruzando información con CEJ (Poder Judicial) - Expedientes activos...",
      "Analizando antecedentes penales y judiciales (Semaforo Registral)...",
      "Calculando Índice de Riesgo Legal (R = Σ w_i * v_i)...",
      "Generando Reporte de Certeza Legal con Hash Inmutable..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setLegalScanFeed(prev => [...prev, `> ${logs[i]}`]);
        i++;
      } else {
        clearInterval(interval);
        const isHighRisk = property.id === 'p3';
        setLegalRiskScore(isHighRisk ? 0.85 : 0.15);
        setDetectedFactors([
          { name: 'Embargo Preventivo', weight: 0.9, detected: false, desc: 'Sin embargos detectados en la partida.' },
          { name: 'Hipoteca Vigente', weight: 0.4, detected: isHighRisk, desc: isHighRisk ? 'Carga bancaria vigente detectada.' : 'Propiedad libre de hipotecas.' },
          { name: 'Litigio por Reivindicación', weight: 0.8, detected: false, desc: 'Propiedad libre de litigios judiciales.' },
          { name: 'Inconsistencia DNI/SUNARP', weight: 0.7, detected: false, desc: 'Identidad del vendedor verificada.' }
        ]);
        setLegalScanStep('complete');
      }
    }, 600);
  };

  const closeAllModals = () => {
    setIs3DHomeMode(false);
    setIsAppraiserMode(false);
    setIsConstructionMode(false);
    setIsFractionalDetailMode(false);
    setIsMandyMode(false);
    setShowQuoter(false);
    setIsClosingCostsMode(false);
    setIsLegalShieldMode(false);
    setLegalScanStep('select');
    setIsEvictionContractMode(false);
    setIsCrowdfundingMode(false);
    setIsJVMode(false);
  };

  const calculateClosingCosts = () => {
    const uit = 5300; // UIT 2025
    const exchangeRate = 3.75;
    const priceInPen = closingPrice * exchangeRate;
    const acqPriceInPen = closingAcquisitionPrice * exchangeRate;

    if (closingType === 'compra') {
      const alcabalaBase = priceInPen - (10 * uit);
      const alcabala = Math.max(0, alcabalaBase * 0.03);
      const notary = 1200; // Est.
      const registry = Math.min(2500, Math.max(500, priceInPen * 0.002)); // Est. tramos Sunarp

      setClosingResult({
        alcabala,
        notary,
        registry,
        total: alcabala + notary + registry + priceInPen,
        cashNeeded: alcabala + notary + registry,
        uit
      });
    } else if (closingType === 'venta') {
      const gain = Math.max(0, priceInPen - acqPriceInPen);
      const ir = gain * 0.05;
      const notary = 300; // Gastos administrativos vendedor

      setClosingResult({
        ir,
        notary,
        total: ir + notary,
        cashNeeded: ir + notary,
        uit
      });
    } else {
      const rentInPen = priceInPen;
      const guarantee = rentInPen * 2;
      const advance = rentInPen * 1;
      const ir = rentInPen * 0.05;

      setClosingResult({
        guarantee,
        advance,
        ir,
        total: guarantee + advance + rentInPen,
        cashNeeded: guarantee + advance,
        uit
      });
    }
    setClosingCostsStep('result');
  };

  const handleResetToHome = () => {
    setShowCatalog(false);
    setActiveTour(null);
    closeAllModals();
    setRpaState('idle');
    setAppraiserStep('idle');
    setStagingStep('idle');
    setConstructionStep('form');
    setCreditStatus('idle');
    setViewMode('cinematic');
    setActivePreference(null);
    setNarrativeState('idle');
    setIsAmbientAudioActive(false);
  };

  const toggleModal = (modalSetter: (val: boolean) => void, additionalLogic = () => {}) => {
    const currentVal = (modalSetter as any) === setIs3DHomeMode ? is3DHomeMode :
                      (modalSetter as any) === setIsAppraiserMode ? isAppraiserMode :
                      (modalSetter as any) === setIsConstructionMode ? isConstructionMode :
                      (modalSetter as any) === setIsMandyMode ? isMandyMode : 
                      (modalSetter as any) === setIsClosingCostsMode ? isClosingCostsMode : false;
    
    closeAllModals();
    modalSetter(!currentVal);
    if (!currentVal) additionalLogic();
  };

  // --- CONTROLADORES DE CHAT / QUOTER ---
  const handleChatOption = (option: string) => {
    setChatMessages(prev => [...prev, { id: Date.now(), role: 'user', text: option, type: 'text' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (option === 'Pago de Contado') {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1, role: 'ai', text: 'Excelente. Al pagar de contado aplicamos un descuento institucional del 8%. Aquí tienes tu cotización:',
          type: 'quote', data: { price: activePropertyPrice * 0.92, monthly: 0, downPayment: activePropertyPrice * 0.92, roi: '16.5%', terms: 'Pago Único' }
        }]);
      } else if (option === 'Financiamiento Directo') {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1, role: 'ai', text: 'Perfecto. Podemos estructurar un plan a 60 meses sin intereses. ¿Qué porcentaje de enganche (pago inicial) deseas aportar?',
          type: 'slider'
        }]);
      } else {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1, role: 'ai', text: 'La tokenización permite entrar con capital reducido. Te prepararé el Smart Contract en el módulo inferior.',
          type: 'action'
        }]);
      }
    }, 1500);
  };

  const handleSliderConfirm = () => {
    setChatMessages(prev => [...prev, { id: Date.now(), role: 'user', text: `Propongo un ${sliderValue}% de enganche inicial`, type: 'text' }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const down = activePropertyPrice * (sliderValue / 100);
      const remainder = activePropertyPrice - down;
      const monthly = remainder / 60;
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1, role: 'ai', text: 'Estructura financiera calculada y pre-aprobada paramétricamente. Estos son los detalles proyectados:',
        type: 'quote', data: { price: activePropertyPrice, downPayment: down, monthly: monthly, roi: '14.2%', terms: '60 Meses S/I' }
      }]);
    }, 2000);
  };

  const handleEvaluateCredit = () => {
    setCreditStatus('processing');
    setTimeout(() => {
      const maxQuota = (creditForm.income * 0.40) - creditForm.debts;
      if (maxQuota > 200) {
        const teas: Record<string, number> = { 'BCP': 0.0745, 'BBVA': 0.0720, 'Interbank': 0.0765, 'Scotiabank': 0.0710 };
        const teaStr: Record<string, string> = { 'BCP': '7.45%', 'BBVA': '7.20%', 'Interbank': '7.65%', 'Scotiabank': '7.10%' };
        const r = teas[creditForm.bank] / 12;
        const maxLoan = maxQuota * ((1 - Math.pow(1 + r, -240)) / r);
        setCreditResult({ maxLoan, quota: maxQuota, tea: teaStr[creditForm.bank] });
        setCreditStatus('approved');
      } else {
        setCreditStatus('rejected');
      }
    }, 3000);
  };

  const handleMandyFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMandyUploadedImage(reader.result as string);
        setMandyStep('edit');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMandyDesign = () => {
    setMandyIsGenerating(true);
    setTimeout(() => {
      // Simulate design generation based on style and color
      const styles: any = {
        'Minimalista': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000',
        'Industrial': 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1000',
        'Nórdico': 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1000',
        'Boho Chic': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1000'
      };
      setMandyGeneratedImage(styles[mandySelectedStyle] || styles['Minimalista']);
      setMandyIsGenerating(false);
      setMandyStep('result');
    }, 3000);
  };

  const handleSendMandyMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mandyInput.trim()) return;
    const userMsg = mandyInput;
    setMandyMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setMandyInput('');
    setIsMandyTyping(true);

    const aiResponse = await generateAiResponse(userMsg, `Eres Mandy, una arquitecta de interiores neuro-sensorial. Tu objetivo es crear conexiones emocionales entre los usuarios y sus espacios. El usuario está interesado en un estilo ${mandySelectedStyle} con acentos en ${mandySelectedColor}. Responde con calidez y profesionalismo.`);
    
    setIsMandyTyping(false);
    setMandyMessages(prev => [...prev, { role: 'mandy', text: aiResponse || `Entiendo perfectamente. Para un estilo ${mandySelectedStyle} con acentos en ${mandySelectedColor}, te sugiero optimizar la iluminación natural y usar texturas orgánicas. ¿Te gustaría que genere una visualización de cómo quedaría tu espacio?` }]);
  };

  const handleSendGlobalMessage = async (e?: React.FormEvent, optionValue?: string) => {
    if (e) e.preventDefault();
    
    let userMsg = chatInput;
    if (optionValue) {
      const optionMap: any = {
        'legal_shield': '🛡️ Escudo Legal: ¿Cómo funciona?',
        'investment_ia': '📈 Inversión IA: ¿Qué ROI ofrecen?',
        'mandy_designer': '🎨 Mandy Designer: Quiero ver diseños',
        'appraisal': '🏘️ Tasación Real: ¿Cuánto vale mi casa?'
      };
      userMsg = optionMap[optionValue] || optionValue;
    }

    if (!userMsg.trim()) return;

    setAdvisoryMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    let aiResponse = "";
    let options: any[] = [];

    if (optionValue === 'legal_shield') {
      aiResponse = "Nuestro Escudo Legal Altum utiliza IA para auditar partidas registrales en tiempo real, detectando gravámenes y riesgos antes de cualquier firma. ¿Te gustaría verificar una propiedad específica ahora?";
      options = [
        { label: '🔍 Verificar Propiedad', action: () => { setIsGlobalChatOpen(false); setIsLegalShieldMode(true); setLegalScanStep('select'); } },
        { label: '📄 Ver Ley 30933', value: 'legal_law' }
      ];
    } else if (optionValue === 'investment_ia') {
      aiResponse = "Nuestra IA analiza más de 200 variables para predecir plusvalía. Actualmente, proyectos como 'Valle Sagrado Eco-Villa' ofrecen un ROI del 18.5%.";
      options = [
        { label: '💰 Ver Crowdfunding', action: () => { setIsGlobalChatOpen(false); setIsCrowdfundingMode(true); } },
        { label: '🤝 Ver Oportunidades JV', action: () => { setIsGlobalChatOpen(false); setIsJVMode(true); } }
      ];
    } else if (optionValue === 'mandy_designer') {
      aiResponse = "Mandy es nuestra arquitecta neuro-sensorial que transforma tus espacios con un solo clic usando IA generativa. ¿Quieres empezar un rediseño?";
      options = [
        { label: '✨ Hablar con Mandy', action: () => { setIsGlobalChatOpen(false); setIsMandyMode(true); setMandyStep('chat'); } },
        { label: '📸 Subir mi Espacio', action: () => { setIsGlobalChatOpen(false); setIsMandyMode(true); setMandyStep('upload'); } }
      ];
    } else if (optionValue === 'appraisal') {
      aiResponse = "Utilizamos Big Data para tazar tu propiedad con precisión quirúrgica basándonos en transacciones reales de la zona.";
      options = [
        { label: '📍 Iniciar Tasación', action: () => { setIsGlobalChatOpen(false); setIsAppraiserMode(true); setAppraiserStep('form'); } }
      ];
    } else {
      aiResponse = await generateAiResponse(userMsg, "Eres un Asesor Inmobiliario Premium de Altum Inmobiliaria. Responde de forma elegante y técnica. Si el usuario pregunta por procesos, invítalo a usar las herramientas interactivas del menú superior.");
    }
    
    setTimeout(() => {
      setIsTyping(false);
      setAdvisoryMessages(prev => [...prev, { 
        role: 'bot', 
        text: aiResponse || `Excelente consulta. Tenemos opciones exclusivas que se ajustan a tu perfil de inversionista.`,
        options: options.length > 0 ? options : undefined
      }]);
    }, 1000);
  };

  const handleAiRemodel = (styleKey: string) => {
    if (styleKey === activeStyle || isGeneratingRender) return;
    setIsGeneratingRender(true);
    setScanPosition(-10);
    const scanInterval = setInterval(() => {
      setScanPosition(prev => { if (prev >= 110) { clearInterval(scanInterval); return 110; } return prev + 5; });
    }, 50);
    setTimeout(() => {
      setActiveStyle(styleKey);
      setIsGeneratingRender(false);
      setScanPosition(-100);
      clearInterval(scanInterval);
    }, 1500);
  };

  const bgStyle = synestheticMode ? 'bg-gradient-to-br from-[#0a0f0d] via-[#121c17] to-[#0d1411]' : 'bg-neutral-950';

  return (
    <div className={cn("h-screen w-full text-slate-200 font-sans overflow-y-auto overflow-x-hidden relative selection:bg-emerald-500/30 transition-colors duration-1000", bgStyle)}>
      
      {/* CAPA 1: MOTOR GRÁFICO FIJO */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        
        {engineState !== 'ready' ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Cpu className="w-12 h-12 text-emerald-500 animate-pulse" />
            <p className="font-mono text-xs tracking-widest text-emerald-500/70 uppercase">
              {engineState === 'booting' && 'Inicializando WebGPU Context...'}
              {engineState === 'compiling_shaders' && 'Compilando TSL...'}
              {engineState === 'ssgi_active' && 'Activando SSGI & SSR...'}
            </p>
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        ) : (
          <div className={cn("relative w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]", viewMode === 'dollhouse' ? 'scale-90 perspective-[2000px] rotate-x-12 rotate-y-12' : 'scale-105')}>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transition-all duration-700"
              style={{ backgroundImage: `url('${activeTour ? activeTour.img : isFractionalDetailMode ? FRACTIONAL_BG : isConstructionMode ? CONSTRUCTION_BG : isAppraiserMode ? APPRAISER_BG : isMandyMode && mandyStep === 'result' ? MANDY_BG : (is3DHomeMode ? (STAGING_STYLES as any)[activeStaging] : (VISION_TO_RENDER_STYLES as any)[activeStyle])}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-[#0a0f0d]/50"></div>
            
            <AnimatePresence>
              {isAppraiserMode && appraiserStep !== 'ready' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0f0d]/90 backdrop-blur-xl"
                >
                  <div className="relative mb-6">
                    <Globe className="w-16 h-16 text-blue-500 opacity-20" />
                    <Radar className="w-16 h-16 text-blue-400 absolute inset-0 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <h2 className="text-xl font-light text-white tracking-widest uppercase mb-2">Evaluando Factores de Urbanización...</h2>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
          </div>
        )}
      </div>

      {/* CAPA 2: CONTENIDO PRINCIPAL SCROLLEABLE */}
      {engineState === 'ready' && (
        <div className="relative z-10 w-full min-h-screen flex flex-col pointer-events-none">
          
          {/* HEADER FIJO (NAV) */}
          <header className="fixed top-0 left-0 right-0 p-6 md:p-10 z-50 flex justify-between items-start pointer-events-auto bg-gradient-to-b from-[#0a0f0d] via-[#0a0f0d]/80 to-transparent">
            <div className="flex flex-col cursor-pointer group" onClick={handleResetToHome}>
              <h1 className="text-2xl md:text-4xl font-light tracking-tighter text-white group-hover:opacity-80 transition-opacity">
                ALTUM <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">INMOBILIARIA</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 p-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-emerald-500/30">
              {!isHomeView && (
                <motion.button 
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleResetToHome} 
                  className="group relative p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-white"
                >
                  <Home className="w-6 h-6" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(16,185,129,0.3)] translate-y-2 group-hover:translate-y-0">
                    Inicio
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rotate-45"></div>
                  </div>
                </motion.button>
              )}

              <motion.button 
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleModal(setIsMandyMode, () => setMandyStep('chat'))} 
                className={cn(
                  "group relative p-4 backdrop-blur-md border rounded-2xl transition-all duration-300",
                  isMandyMode ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-pink-400 text-white shadow-[0_0_30px_rgba(236,72,153,0.6)]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white hover:border-pink-500/50'
                )}
              >
                <Palette className={cn("w-6 h-6", isMandyMode && "animate-pulse")} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-pink-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(236,72,153,0.3)] translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Mandy Designer
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rotate-45"></div>
                </div>
                {/* NEW BADGE */}
                {!isMandyMode && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleModal(setIsConstructionMode, () => setConstructionStep('form'))} 
                className={cn(
                  "group relative p-4 backdrop-blur-md border rounded-2xl transition-all duration-300",
                  isConstructionMode ? 'bg-teal-500 border-teal-400 text-white shadow-[0_0_25px_rgba(20,184,166,0.5)]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                )}
              >
                <DraftingCompass className={cn("w-6 h-6", isConstructionMode && "animate-pulse")} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(20,184,166,0.3)] translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Presupuesto Proyecto
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-teal-500 rotate-45"></div>
                </div>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleModal(setIsAppraiserMode, () => setAppraiserStep('form'))} 
                className={cn(
                  "group relative p-4 backdrop-blur-md border rounded-2xl transition-all duration-300",
                  isAppraiserMode ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                )}
              >
                <Map className={cn("w-6 h-6", isAppraiserMode && "animate-pulse")} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(59,130,246,0.3)] translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Tasador IA
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rotate-45"></div>
                </div>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleModal(setIsClosingCostsMode, () => setClosingCostsStep('form'))} 
                className={cn(
                  "group relative p-4 backdrop-blur-md border rounded-2xl transition-all duration-300",
                  isClosingCostsMode ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                )}
              >
                <Calculator className={cn("w-6 h-6", isClosingCostsMode && "animate-pulse")} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(99,102,241,0.3)] translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Gastos de Cierre
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rotate-45"></div>
                </div>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleModal(setIsLegalShieldMode, () => setLegalScanStep('select'))} 
                className={cn(
                  "group relative p-4 backdrop-blur-md border rounded-2xl transition-all duration-300",
                  isLegalShieldMode ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                )}
              >
                <ShieldCheck className={cn("w-6 h-6", isLegalShieldMode && "animate-pulse")} />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_20px_rgba(16,185,129,0.3)] translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                  Escudo Legal
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rotate-45"></div>
                </div>
              </motion.button>
            </div>
          </header>

          <div className="h-28 md:h-32 w-full shrink-0"></div>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 pointer-events-auto pb-20">
            {isHomeView && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-12 gap-8"
              >
                {/* HERO SECTION */}
                <div className="col-span-12 lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-tight">
                      Construimos el <span className="font-bold text-emerald-400">Futuro</span> de tu Inversión.
                    </h2>
                    <p className="text-lg text-white/60 font-light max-w-xl leading-relaxed">
                      Utilizamos inteligencia artificial neuro-sensorial para diseñar, construir y comercializar activos inmobiliarios de alto rendimiento.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => setShowCatalog(true)} className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2">
                      Explorar Propiedades <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => toggleModal(setIsAppraiserMode, () => setAppraiserStep('form'))} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-md flex items-center gap-2">
                      Vender mi Propiedad <Tag className="w-5 h-5" />
                    </button>
                    <button onClick={() => toggleModal(setIsConstructionMode, () => setConstructionStep('form'))} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-md">
                      Cotizar Construcción
                    </button>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-6 pt-10">
                    {[
                      { label: 'Proyectos', val: '45+' },
                      { label: 'ROI Promedio', val: '14.5%' },
                      { label: 'Clientes', val: '1.2k' }
                    ].map((s, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-3xl font-bold text-white">{s.val}</p>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* PROPERTY LISTINGS SECTION */}
                  <div className="pt-16 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Propiedades <span className="text-emerald-400">Destacadas</span></h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Oportunidades de Inversión Curadas por IA</p>
                      </div>
                      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                        {['todas', 'venta', 'alquiler'].map((f) => (
                          <button 
                            key={f}
                            onClick={() => setPropertyFilter(f)}
                            className={cn(
                              "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                              propertyFilter === f ? 'bg-emerald-500 text-black shadow-lg' : 'text-white/40 hover:text-white'
                            )}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {PROPERTIES_DB.filter(p => propertyFilter === 'todas' || p.type === propertyFilter).map((p) => (
                        <motion.div 
                          key={p.id}
                          whileHover={{ y: -5 }}
                          className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 cursor-pointer flex flex-col"
                          onClick={() => setActiveTour(p)}
                        >
                          <div className="aspect-video overflow-hidden relative">
                            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                              {p.type}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                              <p className="text-xs text-white/80 font-medium flex items-center gap-2">
                                <Eye className="w-4 h-4 text-emerald-400" /> Ver Tour Inmersivo 3D
                              </p>
                            </div>
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                                <p className="text-xs text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-white">S/. {p.price.toLocaleString()}</p>
                                <p className="text-[10px] text-emerald-400 font-mono uppercase">ROI {p.roi}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 bg-white/5 rounded-lg text-[9px] text-white/40 border border-white/5 uppercase tracking-tighter">{p.vibe.split(' & ')[0]}</span>
                              <span className="px-2 py-1 bg-white/5 rounded-lg text-[9px] text-white/40 border border-white/5 uppercase tracking-tighter">{p.status}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setShowCatalog(true)}
                      className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl transition-all"
                    >
                      Ver Catálogo Completo
                    </button>
                  </div>
                </div>

                {/* FEATURED CARDS */}
                <div className="col-span-12 lg:col-span-5 space-y-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setIsJVMode(true)}
                    className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4 cursor-pointer hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/40 transition-colors">
                        <BrainCircuit className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Análisis Predictivo IA</h3>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Nuestros algoritmos analizan más de 200 variables urbanas para predecir la plusvalía de tu inversión a 5 y 10 años.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      Ver Oportunidades JV <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/20 rounded-xl">
                        <Hexagon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Inversión Tokenizada</h3>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Accede a proyectos de lujo desde montos mínimos mediante tecnología blockchain y smart contracts legales.
                    </p>
                  </div>

                  {/* CROWDFUNDING SECTION */}
                  <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-white/10 backdrop-blur-xl space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500/20 rounded-2xl">
                          <Coins className="w-8 h-8 text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Inversión Participativa</h3>
                          <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest">Crowdfunding Inmobiliario</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/40 border border-white/10">Ley 31072</span>
                    </div>
                    
                    <p className="text-sm text-white/60 leading-relaxed">
                      Invierte desde <span className="text-white font-bold">$100 USD</span> como accionista en proyectos de alta rentabilidad. Respaldado por el marco legal de financiamiento participativo.
                    </p>

                    <div className="space-y-4">
                      {CROWDFUNDING_PROJECTS.map(project => (
                        <div 
                          key={project.id}
                          onClick={() => {
                            setActiveCrowdfunding(project);
                            setIsCrowdfundingMode(true);
                          }}
                          className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                              <img src={project.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{project.title}</h4>
                              <p className="text-[10px] text-white/40 flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" /> {project.location}</p>
                              <div className="flex justify-between items-end">
                                <div>
                                  <p className="text-[10px] text-white/40 uppercase font-mono">Retorno Est.</p>
                                  <p className="text-xs font-bold text-emerald-400">{project.roi}</p>
                                </div>
                                <button className="px-3 py-1 bg-amber-500 text-black text-[10px] font-bold rounded-lg">Invertir</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROPERTY DETAIL VIEW (TOUR) */}
            {activeTour && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 relative"
              >
                <button 
                  onClick={handleResetToHome}
                  className="absolute -top-16 right-0 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-md group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                        {activeTour.status}
                      </span>
                      <span className="text-xs text-white/40 font-mono uppercase tracking-widest flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {activeTour.location}
                      </span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-light text-white tracking-tighter leading-none">
                      {activeTour.title.split(' ').slice(0, -1).join(' ')} <span className="font-bold text-emerald-400">{activeTour.title.split(' ').slice(-1)}</span>
                    </h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed italic">
                      "{activeTour.vibe}"
                    </p>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-6 min-w-[300px]">
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Inversión</p>
                      <p className="text-4xl font-bold text-white">S/. {activeTour.price.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">ROI Est.</p>
                        <p className="text-lg font-bold text-emerald-400">{activeTour.roi}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Tipo</p>
                        <p className="text-lg font-bold text-white capitalize">{activeTour.type}</p>
                      </div>
                    </div>
                    <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      Solicitar Información
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                  {/* BENEFITS SECTION */}
                  <div className="col-span-12 lg:col-span-8 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight">Beneficios <span className="text-emerald-400">Exclusivos</span></h3>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Diseño & Confort de Alto Nivel</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeTour.benefits?.map((benefit: string, i: number) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all"
                        >
                          <div className="p-3 bg-emerald-500/20 rounded-2xl group-hover:bg-emerald-500/40 transition-colors">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          </div>
                          <p className="text-lg font-medium text-white/80">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* SOUNDSCAPE SECTION */}
                    <div className="p-8 rounded-[3rem] bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-white/10 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-2xl">
                          <Headphones className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">Soundscape Inmersivo</h4>
                          <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Experiencia Neuro-Sensorial</p>
                        </div>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed italic">
                        "{activeTour.soundscape}"
                      </p>
                      <div className="flex items-center gap-4">
                        <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                          <Play className="w-5 h-5" />
                        </button>
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '40%' }}
                            className="h-full bg-blue-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SIDEBAR TOOLS */}
                  <div className="col-span-12 lg:col-span-4 space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl space-y-6">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest">Herramientas IA</h4>
                      
                      <button 
                        onClick={() => toggleModal(setIsMandyMode, () => setMandyStep('chat'))}
                        className="w-full p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center gap-4 hover:bg-pink-500/20 transition-all group"
                      >
                        <Palette className="w-6 h-6 text-pink-400" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-white">Personalizar con Mandy</p>
                          <p className="text-[10px] text-white/40">Rediseño de interiores con IA</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => toggleModal(setIsLegalShieldMode, () => setLegalScanStep('select'))}
                        className="w-full p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4 hover:bg-emerald-500/20 transition-all group"
                      >
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-white">Auditoría Legal</p>
                          <p className="text-[10px] text-white/40">Verificar estado de documentos</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => toggleModal(setIsClosingCostsMode, () => setClosingCostsStep('form'))}
                        className="w-full p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-4 hover:bg-indigo-500/20 transition-all group"
                      >
                        <Calculator className="w-6 h-6 text-indigo-400" />
                        <div className="text-left">
                          <p className="text-xs font-bold text-white">Gastos de Cierre</p>
                          <p className="text-[10px] text-white/40">Cálculo de impuestos y notarías</p>
                        </div>
                      </button>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/20 to-transparent border border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Coins className="w-6 h-6 text-amber-400" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Inversión Fraccionada</h4>
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        ¿No quieres comprar el 100%? Invierte desde S/. 5,000 y obtén rentabilidad proporcional garantizada por contrato.
                      </p>
                      <button 
                        onClick={() => setIsCrowdfundingMode(true)}
                        className="w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-xl transition-all"
                      >
                        Ver Opciones Crowdfunding
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CATALOG VIEW */}
            {showCatalog && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-light text-white">Catálogo <span className="font-bold text-emerald-400">Exclusivo</span></h2>
                  <button onClick={() => setShowCatalog(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROPERTIES_DB.map((p) => (
                    <motion.div 
                      key={p.id}
                      whileHover={{ y: -10 }}
                      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
                      onClick={() => setActiveTour(p)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-white">{p.title}</h3>
                            <p className="text-sm text-white/50 flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</p>
                          </div>
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest">{p.status}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <p className="text-xl font-bold text-white">${p.price.toLocaleString()}</p>
                          <p className="text-sm text-emerald-400 font-mono">ROI {p.roi}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CLOSING COSTS CALCULATOR MODAL */}
            <AnimatePresence>
              {isClosingCostsMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="max-w-4xl mx-auto p-10 rounded-[3rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-white/10 shadow-2xl space-y-10 pointer-events-auto"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/20 rounded-2xl">
                        <Calculator className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">Calculadora de <span className="text-indigo-400">Gastos de Cierre</span></h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Transparencia Total & Cero Sorpresas</p>
                      </div>
                    </div>
                    <button onClick={() => setIsClosingCostsMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  {closingCostsStep === 'form' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Tipo de Operación</label>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setClosingType('compra')}
                              className={cn("flex-1 py-4 rounded-2xl border transition-all font-bold", closingType === 'compra' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10')}
                            >
                              Compra
                            </button>
                            <button 
                              onClick={() => setClosingType('venta')}
                              className={cn("flex-1 py-4 rounded-2xl border transition-all font-bold", closingType === 'venta' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10')}
                            >
                              Venta
                            </button>
                            <button 
                              onClick={() => setClosingType('alquiler')}
                              className={cn("flex-1 py-4 rounded-2xl border transition-all font-bold", closingType === 'alquiler' ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10')}
                            >
                              Alquiler
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs text-white/40 uppercase tracking-widest font-mono">
                            {closingType === 'alquiler' ? 'Renta Mensual (USD)' : 'Precio de Inmueble (USD)'}
                          </label>
                          <div className="relative">
                            <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                            <input 
                              type="number"
                              value={closingPrice || ''}
                              onChange={(e) => setClosingPrice(Number(e.target.value))}
                              placeholder="Ej: 150000"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        {closingType === 'venta' && (
                          <div className="space-y-2">
                            <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Precio de Adquisición (USD)</label>
                            <div className="relative">
                              <History className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                              <input 
                                type="number"
                                value={closingAcquisitionPrice || ''}
                                onChange={(e) => setClosingAcquisitionPrice(Number(e.target.value))}
                                placeholder="Precio al que compraste"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              />
                            </div>
                            <p className="text-[10px] text-white/30 italic">Necesario para el cálculo del Impuesto a la Renta (5% sobre la ganancia).</p>
                          </div>
                        )}

                        <button 
                          onClick={calculateClosingCosts}
                          disabled={!closingPrice}
                          className="w-full py-5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
                        >
                          Calcular Gastos Exactos
                        </button>
                      </div>

                      <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/20 space-y-6">
                        <div className="flex items-center gap-3">
                          <BrainCircuit className="w-6 h-6 text-indigo-400" />
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Información Legal IA</h4>
                        </div>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                            <p className="text-xs text-white/60 leading-relaxed">
                              <span className="text-white font-bold">UIT 2025:</span> S/ 5,300. Nuestra IA ajusta automáticamente los valores según el MEF.
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                            <p className="text-xs text-white/60 leading-relaxed">
                              <span className="text-white font-bold">Alcabala:</span> Exoneración de las primeras 10 UIT (S/ 53,000). Solo pagas el 3% sobre el exceso.
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1 h-auto bg-indigo-500 rounded-full"></div>
                            <p className="text-xs text-white/60 leading-relaxed">
                              <span className="text-white font-bold">Exoneración:</span> Si es tu primera vivienda o compra a constructora, podrías calificar para beneficios.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                          <p className="text-xs text-white/40 uppercase tracking-widest font-mono">
                            {closingType === 'alquiler' ? 'Desembolso Inicial' : 'Efectivo para Cierre'}
                          </p>
                          <p className="text-3xl font-bold text-white">S/ {closingResult.cashNeeded.toLocaleString()}</p>
                          <p className="text-[10px] text-white/40">
                            {closingType === 'alquiler' ? 'Garantía + Adelanto' : 'Notaría, Sunarp y Tributos'}
                          </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                          <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Total Operación</p>
                          <p className="text-3xl font-bold text-indigo-400">S/ {closingResult.total.toLocaleString()}</p>
                          <p className="text-[10px] text-white/40">
                            {closingType === 'alquiler' ? 'Incluyendo primer mes' : 'Incluyendo precio del predio'}
                          </p>
                        </div>
                        <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-center items-center text-center">
                          <Download className="w-6 h-6 text-indigo-400 mb-2" />
                          <p className="text-[10px] text-white font-bold uppercase tracking-widest">Descargar PDF</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest">Desglose Detallado</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {closingType === 'compra' && (
                            <>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Alcabala (Comprador)</p>
                                  <p className="text-[10px] text-white/40">Base imponible: S/ {(closingPrice * 3.75 - 53000).toLocaleString()}</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.alcabala.toLocaleString()}</p>
                              </div>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Gastos Notariales Est.</p>
                                  <p className="text-[10px] text-white/40">Escritura pública y trámites</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.notary.toLocaleString()}</p>
                              </div>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Gastos Registrales (Sunarp)</p>
                                  <p className="text-[10px] text-white/40">Inscripción de propiedad</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.registry.toLocaleString()}</p>
                              </div>
                            </>
                          )}
                          {closingType === 'venta' && (
                            <>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Impuesto a la Renta (5%)</p>
                                  <p className="text-[10px] text-white/40">Sobre la ganancia de capital</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.ir.toLocaleString()}</p>
                              </div>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Gastos Administrativos</p>
                                  <p className="text-[10px] text-white/40">Notaría y trámites vendedor</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.notary.toLocaleString()}</p>
                              </div>
                            </>
                          )}
                          {closingType === 'alquiler' && (
                            <>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Garantía (2 Meses)</p>
                                  <p className="text-[10px] text-white/40">Monto reembolsable al finalizar</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.guarantee.toLocaleString()}</p>
                              </div>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Adelanto (1 Mes)</p>
                                  <p className="text-[10px] text-white/40">Primer mes de renta</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.advance.toLocaleString()}</p>
                              </div>
                              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                                <div>
                                  <p className="text-xs text-white/80 font-bold">Impuesto a la Renta (5%)</p>
                                  <p className="text-[10px] text-white/40">Pagado por el arrendador</p>
                                </div>
                                <p className="text-sm font-mono text-indigo-400">S/ {closingResult.ir.toLocaleString()}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                        <div>
                          <p className="text-xs text-white/80 font-bold uppercase tracking-widest mb-1">Anclaje de Expectativas</p>
                          <p className="text-[11px] text-white/60 leading-relaxed">
                            Estos montos son estimaciones precisas basadas en la normativa vigente. Recomendamos tener este efectivo disponible en banco para evitar retrasos en la firma de escritura ante notario.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button onClick={() => setClosingCostsStep('form')} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all">Realizar Otro Cálculo</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* LEGAL SHIELD MODAL */}
            <AnimatePresence>
              {isLegalShieldMode && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="max-w-5xl mx-auto p-12 rounded-[4rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-emerald-500/30 shadow-2xl space-y-10 pointer-events-auto"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-emerald-500/20 rounded-2xl">
                        <ShieldCheck className="w-10 h-10 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold text-white tracking-tighter">Escudo <span className="text-emerald-400">Legal Altum</span></h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Debida Diligencia & Certeza Jurídica IA</p>
                      </div>
                    </div>
                    <button onClick={() => setIsLegalShieldMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  {legalScanStep === 'select' ? (
                    <div className="space-y-8">
                      <div className="text-center space-y-2">
                        <h4 className="text-xl font-bold text-white">Selecciona la Propiedad a Verificar</h4>
                        <p className="text-sm text-white/40">Nuestra IA analizará la partida registral y antecedentes en tiempo real.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PROPERTIES_DB.map((p) => (
                          <button 
                            key={p.id}
                            onClick={() => startLegalScan(p)}
                            className="group relative p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all text-left overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
                            <img src={p.img} alt={p.title} className="w-full h-32 object-cover rounded-2xl mb-4" referrerPolicy="no-referrer" />
                            <h5 className="text-sm font-bold text-white mb-1">{p.title}</h5>
                            <p className="text-[10px] text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : legalScanStep === 'scanning' ? (
                    <div className="space-y-8">
                      <div className="p-8 rounded-3xl bg-black/40 border border-white/5 font-mono text-xs text-emerald-500/80 space-y-2 h-64 overflow-y-auto scrollbar-hide">
                        {legalScanFeed.map((line, i) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={i}
                          >
                            {line}
                          </motion.div>
                        ))}
                        <div className="animate-pulse">_</div>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                          />
                        </div>
                        <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Escaneando Partida Registral y Antecedentes...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Índice de Riesgo (R)</p>
                              <Scale className={cn("w-5 h-5", legalRiskScore > 0.7 ? 'text-red-400' : 'text-emerald-400')} />
                            </div>
                            <p className={cn("text-6xl font-bold", legalRiskScore > 0.7 ? 'text-red-400' : 'text-emerald-400')}>{legalRiskScore.toFixed(2)}</p>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={cn("h-full transition-all duration-1000", legalRiskScore > 0.7 ? 'bg-red-500' : 'bg-emerald-500')} style={{ width: `${legalRiskScore * 100}%` }} />
                            </div>
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">
                              {legalRiskScore > 0.7 ? 'RIESGO CRÍTICO: Transacción Bloqueada preventivamente' : 'RIESGO BAJO: Transacción Segura'}
                            </p>
                          </div>

                          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-4">
                            <div className="flex justify-between items-center">
                              <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Semáforo Registral</p>
                              <Activity className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div className="flex gap-4">
                              <div className={cn("w-12 h-12 rounded-full border-4", legalRiskScore > 0.7 ? 'bg-red-500/20 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-red-500/5 border-red-500/20')} />
                              <div className={cn("w-12 h-12 rounded-full border-4", legalRiskScore > 0.3 && legalRiskScore <= 0.7 ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-amber-500/5 border-amber-500/20')} />
                              <div className={cn("w-12 h-12 rounded-full border-4", legalRiskScore <= 0.3 ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-emerald-500/5 border-emerald-500/20')} />
                            </div>
                            <p className="text-xs text-white/60 font-medium">Verificación RENIEC & CEJ Completada</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" /> Documentación Legal Verificada
                          </h4>
                          <div className="space-y-2">
                            {[
                              { name: 'Partida Registral (SUNARP)', status: 'Verificado', date: '27 Mar 2026' },
                              { name: 'Certificado de Parámetros', status: 'Verificado', date: '15 Mar 2026' },
                              { name: 'HR / PU (Autovalúo 2026)', status: 'Verificado', date: '10 Feb 2026' },
                              { name: 'CRI (Certificado Registral Inmobiliario)', status: 'Verificado', date: '20 Mar 2026' }
                            ].map((doc, i) => (
                              <details key={i} className="group p-4 rounded-2xl bg-white/5 border border-white/10 open:bg-white/10 transition-all">
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                      <FileCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-white">{doc.name}</p>
                                      <p className="text-[10px] text-white/40">Actualizado: {doc.date}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase">{doc.status}</span>
                                    <ChevronRight className="w-4 h-4 text-white/20 group-open:rotate-90 transition-transform" />
                                  </div>
                                </summary>
                                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                                  <div className="flex justify-between items-center p-3 bg-black/20 rounded-xl">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-white/40" />
                                      <p className="text-[10px] text-white/60">Vista previa del documento digitalizado</p>
                                    </div>
                                    <button className="text-[10px] text-blue-400 font-bold hover:underline">Ver PDF</button>
                                  </div>
                                  <p className="text-[10px] text-white/30 leading-relaxed italic">
                                    Documento validado mediante firma digital y hash de inmutabilidad. La información mostrada corresponde a la base de datos oficial al momento de la consulta.
                                  </p>
                                </div>
                              </details>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" /> Factores de Riesgo Detectados
                          </h4>
                          <div className="grid grid-cols-1 gap-4">
                            {detectedFactors.map((f, i) => (
                              <div key={i} className={cn("p-4 rounded-2xl border flex items-center justify-between", f.detected ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20')}>
                                <div className="flex items-center gap-4">
                                  <div className={cn("p-2 rounded-lg", f.detected ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400')}>
                                    {f.detected ? <ShieldAlert className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-white">{f.name}</p>
                                    <p className="text-[10px] text-white/40">{f.desc}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-[10px] text-white/30 uppercase font-mono">Peso</p>
                                  <p className="text-sm font-bold text-white/60">{f.weight.toFixed(1)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-white/10 space-y-6">
                          <div className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-emerald-400" />
                            <h4 className="text-lg font-bold text-white">Smart Escrow</h4>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">Custodia de fondos garantizada mediante integración con APIs bancarias (BCP/BBVA). Verificación de pre-aprobación hipotecaria en tiempo real.</p>
                          <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:scale-105 transition-transform">Activar Custodia</button>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                          <div className="flex items-center gap-3">
                            <Download className="w-6 h-6 text-blue-400" />
                            <h4 className="text-lg font-bold text-white">Certificado de Certeza</h4>
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">Descarga el reporte legal completo con firma digital XAdES y hash de inmutabilidad en blockchain.</p>
                          <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4" /> Descargar PDF
                          </button>
                        </div>

                        <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-emerald-400" />
                            <p className="text-[10px] text-emerald-400 uppercase font-mono">Soporte Legal IA</p>
                          </div>
                          <p className="text-[10px] text-white/40 italic">"Según la Ley 30933 de Desalojo con Intervención Notarial, este contrato incluye la cláusula de allanamiento futuro..."</p>
                          <button 
                            onClick={() => { setIsLegalShieldMode(false); setIsEvictionContractMode(true); }}
                            className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all"
                          >
                            Automatizar Desalojo Express
                          </button>
                          <button 
                            onClick={() => setLegalScanStep('select')}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-[10px] font-bold rounded-2xl uppercase tracking-widest transition-all"
                          >
                            Verificar Otra Propiedad
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isEvictionContractMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-4xl mx-auto p-12 rounded-[3.5rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-amber-500/30 shadow-2xl space-y-10 pointer-events-auto"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-amber-500/20 rounded-2xl">
                        <FileSignature className="w-10 h-10 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white tracking-tighter">Contrato de <span className="text-amber-400">Desalojo Express</span></h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Automatización Legal FUA (Ley 30933)</p>
                      </div>
                    </div>
                    <button onClick={() => setIsEvictionContractMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Cláusulas Inteligentes</h4>
                        <div className="space-y-3">
                          {[
                            { label: 'Allanamiento Futuro', status: 'Activo', desc: 'Recuperación inmediata de posesión.' },
                            { label: 'Sometimiento Notarial', status: 'Activo', desc: 'Protocolización ante Notario Público.' },
                            { label: 'Mora Automática', status: 'Activo', desc: 'Sin requerimiento previo.' }
                          ].map((c, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1" />
                              <div>
                                <p className="text-xs font-bold text-white">{c.label}</p>
                                <p className="text-[10px] text-white/40">{c.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <h4 className="text-sm font-bold text-white uppercase tracking-widest">Validación Notarial Online</h4>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed">Este contrato está listo para firma digital XAdES y envío automático a la Notaría de turno para su elevación a Escritura Pública.</p>
                      </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="aspect-[3/4] bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                          <FileText className="w-20 h-20 text-white/20" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-2">
                            <p className="text-[10px] text-white/40 font-mono uppercase">Vista Previa FUA</p>
                            <p className="text-xs text-white/60 italic">"Formulario Único de Arrendamiento con Cláusula de Allanamiento Futuro..."</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-white/5">
                          <Fingerprint className="w-6 h-6 text-amber-400" />
                          <p className="text-[10px] text-white/40">Firma Digital Requerida (DNI Electrónico)</p>
                        </div>
                      </div>
                      <button className="mt-8 w-full py-4 bg-amber-500 text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        <FileSignature className="w-5 h-5" /> Generar & Firmar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CREDIT EVALUATION MODAL */}
            {isCreditMode && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-8 rounded-[3rem] bg-[#0a0f0d]/90 backdrop-blur-3xl border border-amber-500/30 shadow-2xl space-y-8 pointer-events-auto"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-amber-400" />
                    <h3 className="text-2xl font-bold text-white">Pre-Aprobación <span className="text-amber-400">SBS</span></h3>
                  </div>
                  <button onClick={() => setIsCreditMode(false)} className="p-2 hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
                </div>

                {creditStep === 'form' && (
                  <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Ingreso Mensual (S/.)</label>
                        <input 
                          type="number"
                          value={creditIncome}
                          onChange={(e) => setCreditIncome(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Deudas Actuales (S/.)</label>
                        <input 
                          type="number"
                          value={creditDebts}
                          onChange={(e) => setCreditDebts(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Tipo de Empleo</label>
                        <select 
                          value={creditEmploymentType}
                          onChange={(e) => setCreditEmploymentType(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                          <option value="dependiente" className="bg-neutral-900">Dependiente (Planilla)</option>
                          <option value="independiente" className="bg-neutral-900">Independiente (4ta/5ta)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Estado SBS / Infocorp</label>
                        <select 
                          value={creditHistoryStatus}
                          onChange={(e) => setCreditHistoryStatus(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        >
                          <option value="normal" className="bg-neutral-900">Normal (Sin Deudas)</option>
                          <option value="cpp" className="bg-neutral-900">CPP (Atrasos Leves)</option>
                          <option value="deficiente" className="bg-neutral-900">Deficiente / Dudoso</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Precio Propiedad (S/.)</label>
                        <input 
                          type="number"
                          value={creditPropertyPrice}
                          onChange={(e) => setCreditPropertyPrice(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Cuota Inicial (S/.)</label>
                        <input 
                          type="number"
                          value={creditDownPayment}
                          onChange={(e) => setCreditDownPayment(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Edad: <span className="text-amber-400">{creditAge} años</span></label>
                        <input 
                          type="range"
                          min="18"
                          max="80"
                          value={creditAge}
                          onChange={(e) => setCreditAge(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Plazo: <span className="text-amber-400">{creditTerm} años</span></label>
                        <input 
                          type="range"
                          min="5"
                          max="30"
                          value={creditTerm}
                          onChange={(e) => setCreditTerm(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start">
                      <Scale className="w-6 h-6 text-amber-400 shrink-0" />
                      <p className="text-xs text-white/60 leading-relaxed">
                        Evaluación basada en normativas de la SBS y criterios de ASBANC. Consideramos capacidad de pago, ratio DTI (Debt-to-Income), LTV (Loan-to-Value) y perfil etario.
                      </p>
                    </div>

                    <button 
                      onClick={startCreditEvaluation}
                      className="w-full py-4 bg-amber-500 text-black font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <Activity className="w-5 h-5" /> Iniciar Evaluación SBS
                    </button>
                  </div>
                )}

                {creditStep === 'evaluating' && (
                  <div className="py-20 flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <Database className="w-16 h-16 text-amber-500 opacity-20" />
                      <Radar className="w-16 h-16 text-amber-400 absolute inset-0 animate-spin" />
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Consultando Centrales de Riesgo</h4>
                      <p className="text-xs text-white/40 font-mono">SENTINEL • INFOCORP • SBS • ASBANC</p>
                    </div>
                  </div>
                )}

                {creditStep === 'result' && creditResult && (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="502.6"
                            initial={{ strokeDashoffset: 502.6 }}
                            animate={{ strokeDashoffset: 502.6 - (502.6 * creditScore) / 100 }}
                            className={cn(
                              creditScore > 70 ? 'text-emerald-500' : creditScore > 40 ? 'text-amber-500' : 'text-red-500'
                            )}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-bold text-white">{creditScore}%</span>
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">Probabilidad</span>
                        </div>
                      </div>
                      <div className={cn(
                        "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest",
                        creditScore > 70 ? 'bg-emerald-500/20 text-emerald-400' : creditScore > 40 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                      )}>
                        {creditResult.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                        <p className="text-[10px] text-white/40 uppercase font-mono">Línea Estimada</p>
                        <p className="text-lg font-bold text-white">S/. {creditResult.maxAmount}</p>
                      </div>
                      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                        <p className="text-[10px] text-white/40 uppercase font-mono">Ratio DTI</p>
                        <p className="text-lg font-bold text-white">{creditResult.dti}%</p>
                      </div>
                      <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-1">
                        <p className="text-[10px] text-white/40 uppercase font-mono">Ratio LTV</p>
                        <p className="text-lg font-bold text-white">{creditResult.ltv}%</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest">Entidades Sugeridas</h4>
                        <Landmark className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{creditResult.bank}</p>
                          <p className="text-[10px] text-white/40">Basado en perfil de riesgo actual</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCreditStep('form')}
                      className="w-full py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                    >
                      Nueva Evaluación
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* JV INVESTMENT MODAL */}
            <AnimatePresence>
              {isJVMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-6xl mx-auto p-10 rounded-[3rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-emerald-500/30 shadow-2xl space-y-8 pointer-events-auto overflow-y-auto max-h-[90vh]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/20 rounded-2xl">
                        <Handshake className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white tracking-tighter">Oportunidades <span className="text-emerald-400">Joint Venture</span></h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Inversiones de Alta Rentabilidad con Respaldo IA</p>
                      </div>
                    </div>
                    <button onClick={() => setIsJVMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {JV_PROPERTIES_DB.map(property => (
                      <motion.div 
                        key={property.id}
                        whileHover={{ y: -5 }}
                        className="group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 flex flex-col"
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img src={property.img} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                          <div className="absolute top-6 right-6 px-4 py-2 bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                            ROI {property.roi}
                          </div>
                          <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                            Riesgo: {property.risk}
                          </div>
                        </div>
                        <div className="p-8 space-y-6">
                          <div>
                            <h4 className="text-2xl font-bold text-white mb-2">{property.title}</h4>
                            <p className="text-sm text-white/40 flex items-center gap-2"><MapPin className="w-4 h-4" /> {property.location}</p>
                          </div>
                          
                          <p className="text-sm text-white/60 leading-relaxed">
                            {property.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                              <p className="text-[10px] text-white/40 uppercase font-mono mb-1">Inversión (Socio)</p>
                              <p className="text-lg font-bold text-white">${property.entryPrice.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                              <p className="text-[10px] text-white/40 uppercase font-mono mb-1">Tiempo Estimado</p>
                              <p className="text-lg font-bold text-white">{property.timeframe}</p>
                            </div>
                          </div>

                          <button className="w-full py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                            <FileCheck className="w-5 h-5" /> Solicitar Dossier de Inversión
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 flex gap-6 items-center">
                    <div className="p-4 bg-emerald-500/20 rounded-2xl">
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">¿Por qué invertir como socio JV?</h4>
                      <p className="text-sm text-white/60 leading-relaxed">
                        En el modelo Joint Venture, tú aportas el capital y Altum Inmobiliaria aporta la tecnología, la gestión de obra y la comercialización. Compartimos el éxito del proyecto bajo un contrato de asociación en participación legalmente blindado.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CROWDFUNDING MODAL */}
            <AnimatePresence>
              {isCrowdfundingMode && activeCrowdfunding && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-5xl mx-auto p-10 rounded-[3rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-amber-500/30 shadow-2xl space-y-8 pointer-events-auto"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/20 rounded-2xl">
                        <Coins className="w-8 h-8 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white tracking-tighter">{activeCrowdfunding.title}</h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">{activeCrowdfunding.location}</p>
                      </div>
                    </div>
                    <button onClick={() => setIsCrowdfundingMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 relative group">
                        <img src={activeCrowdfunding.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest">
                          Proyecto Destacado
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-400" /> Marco Legal (Ley 31072)
                        </h4>
                        <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-sm text-white/70 leading-relaxed italic">
                          "{activeCrowdfunding.legal}"
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <Activity className="w-5 h-5 text-emerald-400" /> Actividades Incluidas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeCrowdfunding.activities.map((act: string) => (
                            <span key={act} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] text-white/60 border border-white/10 uppercase tracking-widest">
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-white/40 uppercase font-mono mb-1">Inversión Mínima</p>
                            <p className="text-4xl font-bold text-white">$100 <span className="text-sm font-light text-white/40">USD</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-white/40 uppercase font-mono mb-1">Retorno Estimado</p>
                            <p className="text-2xl font-bold text-emerald-400">{activeCrowdfunding.roi}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                            <span className="text-white/40">Recaudado: ${activeCrowdfunding.raised.toLocaleString()}</span>
                            <span className="text-amber-400">{Math.round((activeCrowdfunding.raised / activeCrowdfunding.target) * 100)}%</span>
                          </div>
                          <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(activeCrowdfunding.raised / activeCrowdfunding.target) * 100}%` }}
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                            />
                          </div>
                          <p className="text-[10px] text-white/30 text-right">Meta: ${activeCrowdfunding.target.toLocaleString()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <Users className="w-5 h-5 text-white/40 mx-auto mb-2" />
                            <p className="text-lg font-bold text-white">142</p>
                            <p className="text-[10px] text-white/40 uppercase">Inversionistas</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                            <Calendar className="w-5 h-5 text-white/40 mx-auto mb-2" />
                            <p className="text-lg font-bold text-white">18 Meses</p>
                            <p className="text-[10px] text-white/40 uppercase">Plazo Est.</p>
                          </div>
                        </div>

                        <button className="w-full py-5 bg-amber-500 text-black font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3">
                          <Wallet className="w-6 h-6" /> Invertir Ahora
                        </button>
                        
                        <p className="text-[10px] text-white/30 text-center leading-relaxed">
                          Al hacer clic en "Invertir Ahora", serás redirigido a la plataforma de pagos segura para completar tu suscripción de acciones.
                        </p>
                      </div>

                      <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Inversión Segura</p>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Todos los fondos son administrados por un fideicomiso independiente y los activos están debidamente inscritos en registros públicos.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CONSTRUCTION QUOTER MODAL */}
            <AnimatePresence>
              {isConstructionMode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-4xl mx-auto p-10 rounded-[3rem] bg-[#0a0f0d]/95 backdrop-blur-3xl border border-emerald-500/30 shadow-2xl space-y-8 pointer-events-auto"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/20 rounded-2xl">
                        <DraftingCompass className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white tracking-tighter">Presupuesto de <span className="text-emerald-400">Proyecto IA</span></h3>
                        <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Cotización de Construcción de Próxima Generación</p>
                      </div>
                    </div>
                    <button onClick={() => setIsConstructionMode(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-8 h-8" /></button>
                  </div>

                  {constructionStep === 'form' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Área Total (m²)</label>
                            <input 
                              type="number" 
                              value={constructionArea}
                              onChange={(e) => setConstructionArea(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">N° de Pisos</label>
                            <input 
                              type="number" 
                              value={constructionFloors}
                              onChange={(e) => setConstructionFloors(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Nivel de Acabados</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['economico', 'standard', 'luxury'].map(q => (
                              <button 
                                key={q}
                                onClick={() => setConstructionQuality(q)}
                                className={cn(
                                  "py-2 rounded-xl text-[10px] font-bold uppercase border transition-all",
                                  constructionQuality === q ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'
                                )}
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Tipo de Proyecto</label>
                          <select 
                            value={constructionType}
                            onChange={(e) => setConstructionType(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                          >
                            <option value="residencial" className="bg-[#0a0f0d]">Residencial</option>
                            <option value="comercial" className="bg-[#0a0f0d]">Comercial</option>
                            <option value="industrial" className="bg-[#0a0f0d]">Industrial</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Ubicación Geográfica</label>
                          <select 
                            value={constructionLocation}
                            onChange={(e) => setConstructionLocation(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
                          >
                            <option value="urbano" className="bg-[#0a0f0d]">Urbano (Lima/Provincia)</option>
                            <option value="rural" className="bg-[#0a0f0d]">Rural / Campo</option>
                            <option value="montaña" className="bg-[#0a0f0d]">Montaña / Cusco</option>
                          </select>
                        </div>

                        <button 
                          onClick={calculateConstructionQuote}
                          className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                        >
                          <BrainCircuit className="w-5 h-5" /> Generar Presupuesto con IA
                        </button>
                      </div>

                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-center space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-emerald-500/20 rounded-2xl">
                            <Cpu className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Análisis de Costos IA</h4>
                            <p className="text-[10px] text-white/30 font-mono">Sincronizado con Mercado Peruano</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-xs text-white/60">Cemento (Bolsa)</span>
                            <span className="text-xs font-bold text-emerald-400">S/. 28.50</span>
                          </div>
                          <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-xs text-white/60">Fierro 1/2" (Varilla)</span>
                            <span className="text-xs font-bold text-emerald-400">S/. 42.90</span>
                          </div>
                          <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-xs text-white/60">Mano de Obra (m²)</span>
                            <span className="text-xs font-bold text-emerald-400">S/. 180.00</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-white/30 leading-relaxed italic">
                          "Nuestra IA procesa miles de puntos de datos de proveedores locales y costos de mano de obra para entregarte un presupuesto con precisión del 98%."
                        </p>
                      </div>
                    </div>
                  )}

                  {constructionStep === 'calculating' && (
                    <div className="h-[400px] flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <DraftingCompass className="w-8 h-8 text-emerald-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <h4 className="text-xl font-bold text-white">Analizando Parámetros...</h4>
                        <p className="text-sm text-white/40 font-mono">Sincronizando con base de datos de materiales y mano de obra</p>
                      </div>
                    </div>
                  )}

                  {constructionStep === 'result' && constructionResult && (
                    <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 scrollbar-hide">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 space-y-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest mb-1">Presupuesto Estimado Total</p>
                              <h4 className="text-5xl font-bold text-white tracking-tighter">S/. {constructionResult.totalCost.toLocaleString()}</h4>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-white/40 font-mono uppercase tracking-widest mb-1">Costo por m²</p>
                              <p className="text-2xl font-bold text-white">S/. {constructionResult.pricePerM2.toLocaleString()}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-500/20">
                            <div>
                              <p className="text-[10px] text-white/40 uppercase font-mono mb-1">Materiales</p>
                              <p className="text-sm font-bold text-white">S/. {constructionResult.materials.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/40 uppercase font-mono mb-1">Mano de Obra</p>
                              <p className="text-sm font-bold text-white">S/. {constructionResult.labor.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-white/40 uppercase font-mono mb-1">Personal Técnico</p>
                              <p className="text-sm font-bold text-white">S/. {(constructionResult.architectFees + constructionResult.engineerFees + constructionResult.supervisionFees).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-center items-center text-center space-y-4">
                          <div className="p-4 bg-white/5 rounded-full">
                            <Calendar className="w-10 h-10 text-white/40" />
                          </div>
                          <div>
                            <p className="text-xs text-white/40 uppercase font-mono mb-1">Tiempo de Ejecución</p>
                            <p className="text-3xl font-bold text-white">{constructionResult.timeMonths} Meses</p>
                          </div>
                          <p className="text-[10px] text-white/30">Basado en cronograma optimizado por IA</p>
                        </div>
                      </div>

                      {/* 3D RENDERING & PLANS SECTION */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video group cursor-pointer">
                          <img src={constructionResult.renderUrl} alt="3D Render" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="w-4 h-4 text-emerald-400" />
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Renderizado 3D IA</span>
                            </div>
                            <h5 className="text-sm font-bold text-white">Visualización Arquitectónica Proyectada</h5>
                          </div>
                        </div>
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video group cursor-pointer">
                          <img src={constructionResult.planUrl} alt="Plano" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                            <div className="flex items-center gap-2 mb-1">
                              <DraftingCompass className="w-4 h-4 text-blue-400" />
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Planos Técnicos</span>
                            </div>
                            <h5 className="text-sm font-bold text-white">Distribución y Proyecciones de Planta</h5>
                          </div>
                        </div>
                      </div>

                      {/* DETAILED BUDGET BREAKDOWN */}
                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                          <Calculator className="w-4 h-4 text-emerald-400" /> Desglose Detallado de Ejecución
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Materiales de Obra</p>
                            <p className="text-lg font-bold text-white">S/. {constructionResult.materials.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Mano de Obra Especializada</p>
                            <p className="text-lg font-bold text-white">S/. {constructionResult.labor.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Arquitecto Proyectista</p>
                            <p className="text-lg font-bold text-emerald-400">S/. {constructionResult.architectFees.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Ingeniería Estructural</p>
                            <p className="text-lg font-bold text-emerald-400">S/. {constructionResult.engineerFees.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Jefatura y Supervisión</p>
                            <p className="text-lg font-bold text-emerald-400">S/. {constructionResult.supervisionFees.toLocaleString()}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase">Licencias y Permisos</p>
                            <p className="text-lg font-bold text-white">S/. {constructionResult.permits.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* MILESTONE SCHEDULE (PROJECTIONS) */}
                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                          <History className="w-4 h-4 text-emerald-400" /> Cronograma Proyectado de Hitos
                        </h4>
                        <div className="space-y-4">
                          {[
                            { phase: 'Cimentación y Estructura', progress: 25, time: 'Mes 1-3' },
                            { phase: 'Albañilería y Techado', progress: 50, time: 'Mes 4-6' },
                            { phase: 'Instalaciones y Acabados', progress: 85, time: 'Mes 7-9' },
                            { phase: 'Entrega y Liquidación', progress: 100, time: 'Mes 10' }
                          ].map((m, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-mono uppercase">
                                <span className="text-white/60">{m.phase}</span>
                                <span className="text-emerald-400">{m.time}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${m.progress}%` }}
                                  transition={{ duration: 1, delay: i * 0.2 }}
                                  className="h-full bg-emerald-500"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0" />
                        <p className="text-xs text-white/60 leading-relaxed">
                          Este presupuesto incluye garantía estructural por 10 años, supervisión de obra 24/7 mediante cámaras IoT y gestión completa de licencias municipales.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => setConstructionStep('form')}
                          className="flex-1 py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                        >
                          Recalcular
                        </button>
                        <button className="flex-[2] py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          Solicitar Visita Técnica
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI APPRAISER MODAL */}
            {isAppraiserMode && (appraiserStep === 'ready' || appraiserStep === 'form') && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-8 rounded-[3rem] bg-[#0a0f0d]/90 backdrop-blur-3xl border border-blue-500/30 shadow-2xl space-y-8 pointer-events-auto"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Map className="w-8 h-8 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Tasación Predictiva <span className="text-blue-400">IA</span></h3>
                  </div>
                  <button onClick={() => setIsAppraiserMode(false)} className="p-2 hover:bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
                </div>

                {appraiserStep === 'form' ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Dirección de la Propiedad</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input 
                          type="text"
                          value={appraiserAddress}
                          onChange={(e) => setAppraiserAddress(e.target.value)}
                          placeholder="Ej: Av. El Sol 123, Cusco"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Enlace de Google Maps / Ubicación</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input 
                          type="text"
                          value={appraiserMapsUrl}
                          onChange={(e) => setAppraiserMapsUrl(e.target.value)}
                          placeholder="https://www.google.com/maps/..."
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase tracking-widest font-mono">Área Total (m²)</label>
                      <div className="relative">
                        <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input 
                          type="number"
                          value={appraiserArea}
                          onChange={(e) => setAppraiserArea(Number(e.target.value))}
                          placeholder="Ej: 120"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex gap-4 items-start">
                      <BrainCircuit className="w-6 h-6 text-blue-400 shrink-0" />
                      <p className="text-xs text-white/60 leading-relaxed">
                        Nuestro motor de IA analizará la ubicación exacta, proximidad a servicios, tendencias de mercado y datos históricos de la zona para entregarte una tasación con 98% de precisión.
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        if (!appraiserAddress) return;
                        setAppraiserStep('scanning');
                        setTimeout(() => setAppraiserStep('ready'), 3500);
                      }}
                      disabled={!appraiserAddress}
                      className="w-full py-4 bg-blue-500 text-black font-bold rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      <Search className="w-5 h-5" /> Calcular Tasación
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Valor Estimado Total</p>
                        <div className="space-y-1">
                          <p className="text-4xl font-bold text-white">${(appraiserArea * 1250).toLocaleString()}</p>
                          <p className="text-lg text-white/60 font-medium">S/ {(appraiserArea * 1250 * 3.75).toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12.4% Potencial de Mercado</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                        <p className="text-xs text-white/40 uppercase tracking-widest font-mono">Valor por m²</p>
                        <div className="space-y-1">
                          <p className="text-4xl font-bold text-blue-400">$1,250</p>
                          <p className="text-lg text-blue-400/60 font-medium">S/ {(1250 * 3.75).toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-white/40">Basado en mercado de {appraiserAddress.split(',').pop()?.trim() || 'la ciudad'}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest">Análisis de Potencial</h4>
                        <span className="text-[10px] text-blue-400 font-mono">CÁLCULO BASADO EN IA</span>
                      </div>
                      {[
                        { label: 'Crecimiento Urbano', score: 92, desc: 'Zona de expansión con alta plusvalía' },
                        { label: 'Demanda del Mercado', score: 85, desc: 'Alta rotación de propiedades similares' },
                        { label: 'Infraestructura Proyectada', score: 78, desc: 'Nuevos accesos y servicios en camino' }
                      ].map((f, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-white/80">{f.label}</span>
                            <span className="text-blue-400">{f.score}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${f.score}%` }}
                              className="h-full bg-blue-500"
                            />
                          </div>
                          <p className="text-[10px] text-white/40 italic">{f.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <Maximize className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-mono tracking-tighter">Área Evaluada</p>
                          <p className="text-sm font-bold text-white">{appraiserArea} m²</p>
                        </div>
                      </div>
                      <button onClick={() => setAppraiserStep('form')} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] text-white uppercase font-bold transition-all">Nueva Tasación</button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </main>

          {/* RADICAL TRANSPARENCY FEED */}
          {legalScanStep === 'scanning' && (
            <div className="fixed bottom-32 left-10 z-50 w-64 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-emerald-500/30 pointer-events-auto">
              <div className="flex items-center gap-2 mb-2">
                <Radar className="w-4 h-4 text-emerald-400 animate-spin" />
                <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">Live AI Audit</p>
              </div>
              <div className="space-y-1 h-32 overflow-hidden font-mono text-[9px] text-emerald-500/60">
                {legalScanFeed.slice(-5).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          )}

          {/* WHATSAPP FLOATING BUTTON */}
          <div className="fixed bottom-10 left-10 z-50 pointer-events-auto">
            <a 
              href="https://wa.me/51999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-white/20"
            >
              <MessageCircle className="w-8 h-8" />
            </a>
          </div>

          {/* GLOBAL CHATBOT TOGGLE */}
          <div className="fixed bottom-10 right-10 z-50 pointer-events-auto">
            <button 
              onClick={() => setIsGlobalChatOpen(!isGlobalChatOpen)}
              className="w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            >
              {isGlobalChatOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
            </button>
          </div>

          {/* GLOBAL CHAT WINDOW */}
          <AnimatePresence>
            {isGlobalChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="fixed bottom-28 right-10 z-50 w-96 h-[500px] bg-[#0a0f0d]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
              >
                <div className="p-6 border-b border-white/10 bg-emerald-500/10 flex items-center gap-3">
                  <Bot className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Asesor Altum IA</h3>
                    <p className="text-[10px] text-emerald-400 uppercase font-mono">En línea ahora</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {advisoryMessages.map((msg, i) => (
                    <div key={i} className={cn("flex flex-col", msg.role === 'user' ? 'items-end' : 'items-start')}>
                      <div className={cn("max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed", msg.role === 'user' ? 'bg-emerald-500 text-black font-medium' : 'bg-white/5 border border-white/10 text-white/80')}>
                        {msg.text === 'cta_booking' ? (
                          <button className="w-full py-2 bg-white text-black font-bold rounded-xl mt-2">Agendar Cita</button>
                        ) : msg.text}
                      </div>
                      
                      {msg.options && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.options.map((opt: any, idx: number) => (
                            <button 
                              key={idx}
                              onClick={() => {
                                if (opt.action) opt.action();
                                else handleSendGlobalMessage(undefined, opt.value);
                              }}
                              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-[10px] font-bold text-emerald-400 uppercase tracking-widest transition-all"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendGlobalMessage} className="p-4 border-t border-white/10 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button type="submit" className="p-2 bg-emerald-500 text-black rounded-xl"><Send className="w-5 h-5" /></button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MANDY DESIGNER MODAL */}
          <AnimatePresence>
            {isMandyMode && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="fixed top-32 right-10 z-50 w-[450px] h-[calc(100vh-12rem)] bg-[#0a0f0d]/90 backdrop-blur-3xl border border-pink-500/30 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
              >
                <div className="p-6 border-b border-white/10 bg-pink-500/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-pink-400" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Mandy Designer</h3>
                      <p className="text-[10px] text-pink-400 uppercase font-mono">Arquitecta Neuro-Sensorial</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setMandyStep('chat')}
                      className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all", mandyStep === 'chat' ? 'bg-pink-500 text-white' : 'text-white/40 hover:text-white')}
                    >
                      Chat
                    </button>
                    <button 
                      onClick={() => setMandyStep('upload')}
                      className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all", mandyStep === 'upload' || mandyStep === 'edit' || mandyStep === 'result' ? 'bg-pink-500 text-white' : 'text-white/40 hover:text-white')}
                    >
                      Diseñar
                    </button>
                    <button onClick={() => setIsMandyMode(false)} className="p-2 hover:bg-white/10 rounded-full ml-2"><X className="w-5 h-5" /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                  {mandyStep === 'chat' && (
                    <>
                      {mandyMessages.map((msg, i) => (
                        <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                          <div className={cn("max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed", msg.role === 'user' ? 'bg-pink-500 text-white' : 'bg-white/5 border border-white/10 text-white/80')}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isMandyTyping && <div className="text-xs text-pink-400 animate-pulse">Mandy está pensando...</div>}
                    </>
                  )}

                  {mandyStep === 'upload' && (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                      <div className="w-24 h-24 rounded-full bg-pink-500/10 flex items-center justify-center border-2 border-dashed border-pink-500/30">
                        <Upload className="w-10 h-10 text-pink-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-white">Sube tu Espacio</h4>
                        <p className="text-xs text-white/40 px-10">Toma una foto de tu habitación actual o del espacio que quieres transformar.</p>
                      </div>
                      <label className="cursor-pointer px-8 py-4 bg-pink-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform">
                        Seleccionar Imagen
                        <input type="file" className="hidden" accept="image/*" onChange={handleMandyFileUpload} />
                      </label>
                    </div>
                  )}

                  {mandyStep === 'edit' && mandyUploadedImage && (
                    <div className="space-y-8">
                      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                        <img src={mandyUploadedImage} alt="Upload" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Espacio Original</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Estilo Deseado</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Minimalista', 'Industrial', 'Nórdico', 'Boho Chic'].map((s) => (
                              <button 
                                key={s}
                                onClick={() => setMandySelectedStyle(s)}
                                className={cn("py-3 rounded-xl text-xs font-bold border transition-all", mandySelectedStyle === s ? 'bg-pink-500 border-pink-400 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white')}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Paleta de Colores</label>
                          <div className="flex gap-3">
                            {['#ffffff', '#f3f4f6', '#374151', '#1f2937', '#d1d5db'].map((c) => (
                              <button 
                                key={c}
                                onClick={() => setMandySelectedColor(c)}
                                className={cn("w-10 h-10 rounded-full border-2 transition-all", mandySelectedColor === c ? 'border-pink-500 scale-110' : 'border-transparent')}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                            <input 
                              type="color" 
                              value={mandySelectedColor}
                              onChange={(e) => setMandySelectedColor(e.target.value)}
                              className="w-10 h-10 rounded-full bg-transparent border-none cursor-pointer"
                            />
                          </div>
                        </div>

                        <button 
                          onClick={generateMandyDesign}
                          disabled={mandyIsGenerating}
                          className="w-full py-4 bg-pink-500 text-white font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {mandyIsGenerating ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" /> Generando...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" /> Generar Diseño IA
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {mandyStep === 'result' && mandyGeneratedImage && (
                    <div className="space-y-6">
                      <div className="relative rounded-3xl overflow-hidden border border-pink-500/30 aspect-video shadow-[0_0_30px_rgba(236,72,153,0.2)]">
                        <img src={mandyGeneratedImage} alt="Result" className="w-full h-full object-cover" />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-pink-500 text-white text-[10px] font-bold rounded-full uppercase">
                          Propuesta IA
                        </div>
                      </div>

                      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Análisis Neuro-Sensorial</h4>
                        <p className="text-xs text-white/60 leading-relaxed">
                          He aplicado una paleta {mandySelectedColor} bajo un concepto {mandySelectedStyle}. La disposición de los muebles busca maximizar el flujo de energía y la sensación de amplitud.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          <div>
                            <p className="text-[10px] text-white/40 uppercase">Confort</p>
                            <p className="text-lg font-bold text-pink-400">98%</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase">Luz Natural</p>
                            <p className="text-lg font-bold text-pink-400">High</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setMandyStep('edit')}
                          className="flex-1 py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
                        >
                          Ajustar
                        </button>
                        <button className="flex-1 py-4 bg-pink-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                          <Download className="w-5 h-5" /> Guardar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {mandyStep === 'chat' && (
                  <form onSubmit={handleSendMandyMessage} className="p-4 border-t border-white/10 flex gap-2">
                    <input 
                      type="text" 
                      value={mandyInput}
                      onChange={(e) => setMandyInput(e.target.value)}
                      placeholder="Describe tu espacio ideal..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
                    />
                    <button type="submit" className="p-2 bg-pink-500 text-white rounded-xl"><Send className="w-5 h-5" /></button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* FOOTER */}
      {engineState === 'ready' && isHomeView && (
        <footer className="relative z-10 w-full py-10 border-t border-white/5 bg-black/20 backdrop-blur-md pointer-events-auto">
          <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-xl font-light text-white tracking-tighter">
                ALTUM <span className="font-bold text-emerald-400">INMOBILIARIA</span>
              </h2>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest mt-1">© 2026 Altum Group. All Rights Reserved.</p>
            </div>
            <div className="flex gap-8">
              {['Proyectos', 'Inversión', 'Nosotros', 'Contacto'].map((l, i) => (
                <a key={i} href="#" className="text-sm text-white/50 hover:text-emerald-400 transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex gap-4">
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all"><Globe className="w-4 h-4" /></button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
