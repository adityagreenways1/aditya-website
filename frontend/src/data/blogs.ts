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
    title: "PM Surya Ghar Subsidy in Vizag: Eligibility, Amount & Process",
    description:
      "A simple guide to PM Surya Ghar subsidy benefits, eligibility, documents, and how the subsidy is credited for residential solar in Visakhapatnam.",
    category: "Solar Guide",
    image: "/img/solar-benefits.png",
    htmlFile: "/blogs/blog2.html",
  },
];