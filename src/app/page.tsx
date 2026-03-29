import PlannerWizard from "@/modules/planner/PlannerWizard";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      
      {/* Hero Welcome & Flow Description */}
      <div className="bg-brand-navy pt-16 pb-20 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg className="absolute top-0 right-0 h-full w-1/2 text-white" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="50,0 100,0 100,100 0,100" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl tracking-tight mb-4">
            VR Protocols
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-brand-teal font-medium mb-12">
            Plan, track, and verify your immersive research's compliance with standardized interoperability and data-sharing frameworks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
            
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl relative mt-4 md:mt-0 pt-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 left-6 bg-brand-teal text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-lg border-4 border-brand-navy ring-2 ring-brand-teal/50">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Plan Your Project</h3>
              <p className="text-blue-100 text-sm mb-4">
                Use the interactive dashboard below to define your target pillars and select the specific VR/XR features your study will involve. As you answer, your custom compliance checklist is generated live.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-brand-teal uppercase tracking-wider">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Takes ~5 Minutes • Start Below
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl relative mt-4 md:mt-0 pt-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 left-6 bg-brand-amber text-brand-navy w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-lg border-4 border-brand-navy ring-2 ring-brand-amber/50">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conduct Research</h3>
              <p className="text-blue-100 text-sm mb-4">
                Export your finalized checklist as a <span className="text-white font-semibold underline decoration-brand-amber">Project JSON</span>, Word doc, or PDF. Save this JSON securely. Execute your study while using the exported requirements list as your guide.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-brand-amber uppercase tracking-wider">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Takes Weeks or Months
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl relative mt-4 md:mt-0 pt-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 left-6 bg-brand-green text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-lg border-4 border-brand-navy ring-2 ring-brand-green/50">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Audit & Submit</h3>
              <p className="text-blue-100 text-sm mb-4">
                When your project wraps up, navigate to the <span className="font-semibold text-white">"Conduct Audit"</span> tab above. You'll upload your saved JSON, self-report on each compliance point, and generate your final certified PDF report.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-brand-green uppercase tracking-wider">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Takes ~30 Minutes
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-8 pb-12 relative z-20">
        <PlannerWizard />
      </div>
      
    </main>
  );
}
