export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  htmlFile: string;   // ✅ NEW FIELD
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
];