import DemoHero from './DemoHero';
import DemoMetrics from './DemoMetrics';
import DemoBoard from './DemoBoard';
import DemoStatusChart from './DemoStatusChart';
import DemoCta from './DemoCta';

export default function DemoDashboard() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 pt-14 pb-20 md:pt-20">
      <DemoHero />
      <div className="mt-10 sm:mt-12">
        <DemoMetrics />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <DemoBoard />
        <DemoStatusChart />
      </div>
      <DemoCta />
    </section>
  );
}