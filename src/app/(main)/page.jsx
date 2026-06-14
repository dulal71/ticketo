import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

export default async function HomePage() {
const stats = {
  totalEvents: 450,
  totalAttendees: 128500, 
  totalOrgs: 85,
};

  return (
    <div>
      <Hero></Hero>
      <Statistics stats={stats}></Statistics>
   <Testimonials></Testimonials>
    </div>
  );
}

