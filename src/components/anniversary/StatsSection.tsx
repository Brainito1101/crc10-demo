import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Building2, Trophy, BookOpen, Handshake, GraduationCap } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  description: string;
  delay: number;
  isInView: boolean;
}

const useCounter = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
};

const StatItem = ({ icon, value, numericValue, suffix = "", label, description, delay, isInView }: StatItemProps) => {
  const count = useCounter(numericValue || 0, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-card rounded-2xl p-8 h-full shadow-crc-sm hover:shadow-crc-lg transition-all duration-300 border border-border/50 group-hover:-translate-y-1">
        <div className="w-14 h-14 rounded-xl bg-crc-blue/10 flex items-center justify-center mb-6 group-hover:bg-crc-gold/20 transition-colors">
          <div className="text-crc-blue group-hover:text-crc-gold transition-colors">{icon}</div>
        </div>
        <div className="mb-3">
          <span className="text-4xl md:text-5xl font-bold text-foreground stat-counter">
            {numericValue ? count : value}
          </span>
          <span className="text-4xl md:text-5xl font-bold text-crc-gold">{suffix}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{label}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-crc-gold/10 to-transparent -translate-y-16 translate-x-16 rotate-45" />
        </div>
      </div>
    </motion.div>
  );
};

const stats = [
  {
    icon: <Users className="w-7 h-7" />,
    value: "300+", numericValue: 300, suffix: "+",
    label: "Clients",
    description: "Served public, private, nonprofit and academic leaders with strategies and implementation support.",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    value: "20+", numericValue: 20, suffix: "+",
    label: "Resilience Hubs",
    description: "Co-designed with community-based organizations nationwide, creating community anchors.",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    value: "25+", numericValue: 25, suffix: "+",
    label: "Years of Leadership",
    description: "Experience by our founder, Joyce Coffee, in leading resilience strategy across every major sector.",
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    value: "20+", numericValue: 20, suffix: "+",
    label: "Board Leadership",
    description: "Appointed to international and national nonprofit boards and initiatives focused on resilience and social equity.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    value: "24+", numericValue: 24, suffix: "+",
    label: "Publications & Tools",
    description: "Authored resilience-related reports, including landmark guidance for philanthropy, government, and practitioners.",
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    value: "25+", numericValue: 25, suffix: "+",
    label: "Partner Organizations",
    description: "Created partnerships with NGOs and local and small firms to best serve communities.",
  },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 wave-pattern opacity-30" />
      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-crc-gold" />
            <span className="text-crc-gold font-medium uppercase tracking-widest text-sm">By the Numbers</span>
            <div className="h-px w-12 bg-crc-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A Decade of <span className="text-crc-blue">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ten years of trailblazing climate resilience solutions, measured in communities empowered and lasting change created.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} {...stat} delay={0.1 + index * 0.1} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
