// Import your images here (choose any thumbnail you like)
import salesThumb from "@/app/assets/img/SD.png";
import marketingThumb from "@/app/assets/img/MD.png";
import hrThumb from "@/app/assets/img/hr.png";
import businessThumb from "@/app/assets/img/BD.png";
import inventoryThumb from "@/app/assets/img/IM.png";
import ExecutiveThumb from "@/app/assets/img/Executive.png";
import web from "@/app/assets/img/web.png";
import e from "@/app/assets/img/e.png";





import excelThumb from "@/app/assets/img/profile2.jpg";

// Your categories
export const categories = [
  "Projects",
  //"Marketing",
 // "Executive Support",
  //"Business Development",
  //"Dashboards & Analytics",
  //"Graph & web Designs",
];

// Your projects for the Gallery
export const projects = [
  // =============== DASHBOARDS =============== //
  {
    id: 100,
    title: "Sales Performance",
    category:  "Projects",
    imageUrl: salesThumb,
    description: "Interactive sales dashboard with KPIs, revenue charts, and lead tracking.",
    livePath: "/Projects/sales-dashboards",   // matches your folder!
  },
  {
    id: 101,
    title: "Marketing Strategy",
    category:  "Projects",
    imageUrl: marketingThumb,
    description: "Marketing performance dashboard with campaigns, reach, and engagement.",
    livePath: "/Projects/marketing-dashboard",
  },
  {
    id: 102,
    title: "HR Dashboard",
    category:   "Projects",
    imageUrl: hrThumb,
    description: "HR analytics dashboard including hiring funnel and employee stats.",
    livePath: "/Projects/HR-dashboard",
  },
  {
    id: 103,
    title: "Stock Management",
    category:   "Projects",
    imageUrl: inventoryThumb,
    description: "Inventory and stock management dashboard with alerts and stock levels.",
livePath: "/Projects/Stock-dashboard/Stock-dashboard",  },

{
    id: 200,
    title: "Business Development ",
    category:   "Projects",
    imageUrl: businessThumb, // reuse any thumbnail; swap later if you add bdThumb
    description:
      "End‑to‑end business development system: SWOT, ICP, Value Proposition, Go‑To‑Market, KPIs, and a 90‑day roadmap.",
    livePath: "/Projects/Bussines-Dev",
  },

{
    id: 210,
    title: "Executive Support",
    category:   "Projects",
    imageUrl: ExecutiveThumb, // use any thumbnail you like
    description:
      "C‑suite support systems: calendar orchestration, inbox triage, meeting pipelines, travel logistics, and KPI reporting.",
    livePath: "/Projects/Executive",
  },
  {
    id: 210,
    title: "Web Developer",
    category:   "Projects",
    imageUrl:web , 
    description:
      "C‑suite support systems: calendar orchestration, inbox triage, meeting pipelines, travel logistics, and KPI reporting.",
    livePath: "/Projects/Developer",
  },
  {
    id: 210,
    title: "Database & Excel",
    category:   "Projects",
    imageUrl:e , 
    description:
      "C‑suite support systems: calendar orchestration, inbox triage, meeting pipelines, travel logistics, and KPI reporting.",
    livePath: "/Projects/Sheet",
  },




];