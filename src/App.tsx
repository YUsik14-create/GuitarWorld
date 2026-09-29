import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HeroSection } from './components/HeroSection';
import { GuitarCatalog } from './components/GuitarCatalog';
import { GuitarDetailPage } from './components/GuitarDetailPage';
import { GuitarComparison } from './components/GuitarComparison';
import { GuitarAdvisorQuiz } from './components/GuitarAdvisorQuiz';
import { GuitarAnatomyVisualizer } from './components/GuitarAnatomyVisualizer';
import { PickupsAndElectronics } from './components/PickupsAndElectronics';
import { EffectsAndPedalboard } from './components/EffectsAndPedalboard';
import { AmplifiersView } from './components/AmplifiersView';
import { BrandsView } from './components/BrandsView';
import { GenresView } from './components/GenresView';
import { GlossaryView } from './components/GlossaryView';
import { GuidesView } from './components/GuidesView';
import { InteractiveToolsView } from './components/InteractiveToolsView';
import { PriceAndBudgetView } from './components/PriceAndBudgetView';
import { HistoryTimelineView } from './components/HistoryTimelineView';
import { ProfileView } from './components/ProfileView';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 transition-colors">
      <Navbar />
      <GlobalSearchModal />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <GuitarCatalog />
          </>
        )}
        {activePage === 'guitars' && <GuitarCatalog />}
        {activePage === 'guitar-detail' && <GuitarDetailPage />}
        {activePage === 'comparison' && <GuitarComparison />}
        {activePage === 'quiz' && <GuitarAdvisorQuiz />}
        {activePage === 'anatomy' && <GuitarAnatomyVisualizer />}
        {activePage === 'pickups' && <PickupsAndElectronics />}
        {activePage === 'effects' && <EffectsAndPedalboard />}
        {activePage === 'amplifiers' && <AmplifiersView />}
        {activePage === 'brands' && <BrandsView />}
        {activePage === 'genres' && <GenresView />}
        {activePage === 'glossary' && <GlossaryView />}
        {activePage === 'guides' && <GuidesView />}
        {activePage === 'tools' && <InteractiveToolsView />}
        {activePage === 'prices' && <PriceAndBudgetView />}
        {activePage === 'history' && <HistoryTimelineView />}
        {activePage === 'profile' && <ProfileView />}
        {activePage === 'admin' && <AdminPanelModal />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
