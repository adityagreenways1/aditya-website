export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  htmlFile: string;   // ✅ NEW FIELD
  heroStyle?: "legacy" | "new"; // "new" = shared hero (breadcrumbs/badge/serif title); default "legacy" = original per-blog header
  author?: string;
  date?: string;
  readTime?: string;
};

export const blogs: Blog[] = [
  {
    slug: "solar-vizag",
    title: "Best Solar Company in Vizag",
    description: "Complete guide to solar installation in Visakhapatnam, benefits, and choosing the right provider.",
    category: "Solar Guide",
    image: "/img/solar-maintance.png",
    htmlFile: "/blogs/blog1.html",  // ✅ your file
  },
  {
    slug: "pm-surya-ghar-subsidy-vizag",
    title: "PM Surya Ghar Subsidy in Vizag:",
    description:
      "A simple guide to PM Surya Ghar subsidy benefits, eligibility, documents, and how the subsidy is credited for residential solar in Visakhapatnam.",
    category: "Solar Guide",
    image: "/img/solar-benefits.png",
    htmlFile: "/blogs/blog2.html",
  },
  {
    slug: "questions-to-ask-solar-company-visakhapatnam",
    title: "10 Questions to Ask Before Hiring Any Solar Company in Visakhapatnam?",
    description:
      "Before you spend ₹1 lakh or more on solar in Vizag, ask these 10 questions. A consumer protection checklist that exposes unqualified vendors and helps you choose a trustworthy solar company.",
    category: "Consumer Guide",
    image: "/img/blog3.png",
    htmlFile: "/blogs/blog3.html",
  },
  {
    slug: "on-grid-off-grid-hybrid-solar-visakhapatnam",
    title: "On-Grid vs Off-Grid vs Hybrid Solar in Visakhapatnam 2026",
    description:
      "Not sure which solar system is right for your Vizag home? Compare on-grid, off-grid, and hybrid solar — costs, pros, cons, subsidy eligibility, and a clear recommendation for most Visakhapatnam homeowners.",
    category: "Solar Buyer's Guide",
    image: "/img/blog4.png",
    htmlFile: "/blogs/blog4.html",
  },
  {
    slug: "solar-panel-maintenance-visakhapatnam",
    title: "Solar Panel Maintenance in Visakhapatnam.",
    description:
      "Salt air, humidity, dust, and cyclones make Visakhapatnam's coast tough on solar panels. Learn the exact cleaning schedule, AMC costs, warranty rules, and DIY checklist to protect your solar investment and output.",
    category: "Maintenance Guide",
    image: "/img/Blog5.png",
    htmlFile: "/blogs/blog5.html",
    heroStyle: "new",
    author: "Aditya Greenways Team",
    date: "July 13, 2026",
    readTime: "12 min read",
  },
  {
    slug: "net-metering-visakhapatnam-explained",
    title: "Net Metering in Visakhapatnam Explained: How Your Solar Bill Credit Actually Works",
    description:
      "Confused about net metering? Learn exactly how the bi-directional meter, billing cycle, and unit credits work for rooftop solar in Visakhapatnam — with a real ₹ billing example and the APEPDCL process.",
    category: "Solar Economics",
    image: "/img/blog6.png",
    htmlFile: "/blogs/blog6.html",
    heroStyle: "new",
    author: "Aditya Greenways Team",
    date: "July 28, 2026",
    readTime: "11 min read",
  },
  {
    slug: "roof-suitability-solar-visakhapatnam",
    title: "Is Your Roof Actually Right for Solar? A Visakhapatnam Homeowner's Practical Assessment Guide",
    description:
      "Before you get quotes, check whether your roof can actually support solar. A practical, no-nonsense guide to roof types, shading, orientation, and structural load for Visakhapatnam homes.",
    category: "Buyer's Guide",
    image: "/img/Blog7.png",
    htmlFile: "/blogs/blog7.html",
    heroStyle: "new",
    author: "Aditya Greenways Team",
    date: "August 10, 2026",
    readTime: "10 min read",
  },
  {
    slug: "solar-roi-payback-visakhapatnam",
    title: "Solar ROI in Visakhapatnam: How Many Years to Actually Recover Your Investment",
    description:
      "A real, year-by-year payback breakdown for rooftop solar in Visakhapatnam — what you actually pay after subsidy, how monthly savings add up, and what changes the payback period.",
    category: "Solar Economics",
    image: "/img/Blog8.png",
    htmlFile: "/blogs/blog8.html",
    heroStyle: "new",
    author: "Aditya Greenways Team",
    date: "August 24, 2026",
    readTime: "11 min read",
  },
];