import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import clientsPartnersImg from "@/assets/clients-partners.jpg";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isFoundingYear?: boolean;
}

const timelineEvents: TimelineEvent[] = [
  { year: "2016", title: "Bellagio Blueprint for Urban Resilience", description: "Convened global leaders in finance, insurance, and credit ratings at the Rockefeller Foundation's Bellagio Center, the first of three Center convenings CRC facilitated to produce the Blueprint for Action to Finance Urban Resilience, helping catalyze resilience as an investable priority.", isFoundingYear: true },
  { year: "2016", title: "NSF Urban Resilience to Extremes Network", description: "Served as a practitioner expert for the National Science Foundation's Urban Resilience to Extremes network, bridging academic research and real-world climate risk decision-making.", isFoundingYear: true },
  { year: "2016", title: "Climate Week NYC Adaptation Leadership", description: "Organized one of the earliest Climate Week NYC events focused explicitly on climate adaptation and resilience, elevating the field at a moment when mitigation dominated the agenda.", isFoundingYear: true },
  { year: "2017", title: "National Nonprofit Resilience Partnerships", description: "Launched sustained, multi-year partnerships with national nonprofits to embed climate resilience into housing, community development, and public sector capacity building including with Enterprise Community Partners, co-authoring Safer And Stronger Cities: Strategies For Advocating For Policy." },
  { year: "2017", title: "National Philanthropy", description: "Published the first national stocktakes of the climate resilience field, mapping its growth, gaps, and investment opportunities in a rapidly evolving sector and initiating a ten year bi-annual stocktake." },
  { year: "2017", title: "Resilient by Design Replication", description: "Helped translate the success of Rebuild by Design into Resilient by Design in the Bay Area, advancing community-driven design solutions for climate adaptation." },
  { year: "2018", title: "Agricultural Resilience Investment Screen", description: "Developed an agricultural resilience investment screening tool to help global investors identify climate-smart opportunities aligned with long-term risk reduction." },
  { year: "2018", title: "Real Estate Climate Risk Integration", description: "Partnered with national real estate leaders to integrate climate risk analysis and resilience strategy into investment, asset management, and portfolio decision-making." },
  { year: "2018", title: "LA SAFE Climate Migration Initiative", description: "Contributed resilience finance expertise to Louisiana's LA SAFE initiative, helping shape one of the nation's first climate migration and community adaptation programs." },
  { year: "2019", title: "Paying for Resilience", description: "Authored Paying for Resilience: How to Finance America's Climate-Changed Future, reframing adaptation as a solvable finance challenge and catalyzing national dialogue." },
  { year: "2019", title: "USDN Resilience Finance Partnership", description: "Partnered with the Urban Sustainability Directors Network to equip cities with practical resilience finance tools, including holistic cost-benefit frameworks and implementation guidance." },
  { year: "2019", title: "ULI Local Government", description: "Led Urban Land Institute resilience panels in Miami Beach, guiding local government leaders on climate-resilient land use and development strategies." },
  { year: "2020", title: "National Real Estate Lobby", description: "Created the first comprehensive sustainability and resilience strategy for the nation's largest real estate trade association." },
  { year: "2020", title: "Harvard Executive Education", description: "Commenced multi-year teaching climate resilience and risk integration at Harvard's real estate executive education program, shaping industry leaders' approach to climate risk." },
  { year: "2020", title: "Wharton/MIT Coastal Resilience", description: "Authored a comparative Coastal Blueprint: A Tale of Two Cities demonstrating how cities can learn from each other to accelerate adaptation." },
  { year: "2021", title: "American Flood Coalition Advisory", description: "Began advising the American Flood Coalition, advancing bipartisan flood resilience policy at the federal and state levels." },
  { year: "2021", title: "Governor's Climate Resilience Playbook", description: "Authored the Governor's Climate Resilience Playbook, launching a multi-year partnership with the U.S. Climate Alliance to support state-level action." },
  { year: "2021", title: "Telesto Strategies Board Leadership", description: "Joined the board of Telesto Strategies, strengthening cross-sector resilience governance and strategic advisory leadership." },
  { year: "2022", title: "Equitable Resilience Builder", description: "Co-developed the EPA Equitable Resilience Builder to help local governments integrate equity into hazard mitigation and climate adaptation planning." },
  { year: "2022", title: "NOAA Steps to Resilience", description: "Launched Ready to Fund Resilience with NOAA Steps to Resilience and the American Society of Adaptation Professionals to help communities move from planning to finance-ready projects." },
  { year: "2022", title: "Environmental Defense Fund", description: "Identified large-scale capital pathways for climate adaptation in Louisiana for the Restore the Mississippi River Delta Coalition." },
  { year: "2023", title: "Extreme Heat Behavioral Health Research", description: "Published trailblazing research with the National Weather Service on the behavioral health dimensions of extreme heat risk." },
  { year: "2023", title: "Louisiana Statewide Resilience Partnership", description: "Partnered with Louisiana leaders and CPEX to embed resilience into statewide planning and policy reform." },
  { year: "2023", title: "Household Resilience Finance Guidance", description: "Developed household-level resilience finance guidance for the nation's largest mortgage institution, launching a multi-year collaboration." },
  { year: "2024", title: "EPA Community Change Technical Assistance", description: "Led technical assistance for half of the nation's EPA Community Change Equitable Resilience projects, supporting implementation in dozens of communities, CRC's 10th contract with EPA." },
  { year: "2024", title: "Transportation Research Board Climate Migration", description: "Contributed to a national Transportation Research Board initiative on climate migration and mobility strategy via WSP." },
  { year: "2024", title: "Coastal States Organization - Great Lakes", description: "Advised the Coastal States Organization on Great Lakes climate resilience and regional coordination." },
  { year: "2025", title: "Public Health & Extreme Weather Resources", description: "Created extreme weather resilience resources for the nation's largest public health association, strengthening health-centered adaptation." },
  { year: "2025", title: "Enterprise Affordable Housing Resilience Academies", description: "Continued serving as subject matter expert for Enterprise's Affordable Housing Resilience Academies, building capacity across the municipal, private and Tribal affordable housing sector." },
  { year: "2025", title: "Community Buy-In Resilience Planning", description: "Advanced community-driven resilience planning approaches that build political and public buy-in for long-term adaptation." },
  { year: "2026", title: "Tribal-State Climate Resilience Framework", description: "Instigating the nation's first Tribal-State Climate Resilience Framework, advancing sovereign partnership and cross-jurisdictional coordination.", isFoundingYear: true },
  { year: "2026", title: "County Climate Receiving Community Strategy", description: "Leading the nation's first county-level climate resilience receiving community strategy, positioning local governments to plan for climate-driven population shifts.", isFoundingYear: true },
  { year: "2026", title: "Resilience Intelligence Advantage (RIA)", description: "Launching the Resilience Intelligence Advantage, a GovTech platform empowering small and mid-sized cities with actionable climate risk insights.", isFoundingYear: true },
];

const INITIAL_VISIBLE = 6;

const TimelineItem = ({
  event,
  index,
  isInView
}: {
  event: TimelineEvent;
  index: number;
  isInView: boolean;
}) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * Math.min(index, 5) }}
      className={`relative flex items-center ${isEven ? "justify-end md:pr-[52%]" : "md:pl-[52%]"} mb-6`}
    >
      <div className={`relative bg-card rounded-2xl p-6 shadow-crc-sm hover:shadow-crc-md transition-shadow border ${event.isFoundingYear ? "border-crc-gold" : "border-border/50"} max-w-lg w-full`}>
        <div className={`absolute -top-4 ${isEven ? "right-6" : "left-6"} px-4 py-1 rounded-full text-sm font-bold ${event.isFoundingYear ? "bg-crc-gold text-crc-blue-dark" : "bg-crc-blue text-primary-foreground"}`}>
          {event.year}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-foreground mt-2 mb-3">{event.title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{event.description}</p>

        <div className={`hidden md:block absolute top-1/2 ${isEven ? "right-0 translate-x-full" : "left-0 -translate-x-full"} w-[calc(4%-0.75rem)] h-0.5 ${event.isFoundingYear ? "bg-crc-gold" : "bg-crc-blue/30"}`} />
      </div>

      <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 ${event.isFoundingYear ? "bg-crc-gold border-crc-gold-light" : "bg-crc-blue border-crc-blue-light"}`} />
    </motion.div>
  );
};

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? timelineEvents : timelineEvents.slice(0, INITIAL_VISIBLE);

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-crc-gold" />
            <span className="text-crc-gold font-medium uppercase tracking-widest text-sm">
              Milestone Timeline
            </span>
            <div className="h-px w-12 bg-crc-gold" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Journey of <span className="text-crc-blue">Impact</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-crc-gold via-crc-blue to-crc-gold -translate-x-1/2" />

          <div className="relative">
            {visibleEvents.map((event, index) => (
              <TimelineItem key={`${event.year}-${event.title}`} event={event} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Show All / Show Less Button */}
        <div className="flex justify-center mt-12">
          {!showAll ? (
            <Button onClick={() => setShowAll(true)} variant="outline" size="lg" className="border-crc-blue text-crc-blue hover:bg-crc-blue hover:text-primary-foreground">
              Show All Milestones
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowAll(false)} variant="outline" size="lg" className="border-crc-blue text-crc-blue hover:bg-crc-blue hover:text-primary-foreground">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Show Less
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
