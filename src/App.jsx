import { useState, useEffect } from 'react';
import './index.css';
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import WhoSetupScreen from './screens/WhoSetupScreen';
import GuardianNameScreen from './screens/GuardianNameScreen';
import PersonalizationScreen from './screens/PersonalizationScreen';
import ConcernsScreen from './screens/ConcernsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import VoiceRecordScreen from './screens/VoiceRecordScreen';
import DashboardScreen from './screens/DashboardScreen';
import ActiveCallScreen from './screens/ActiveCallScreen';
import FamilyInviteScreen from './screens/FamilyInviteScreen';
import SettingsScreen from './screens/SettingsScreen';

const INITIAL_STATE = {
  user: null,
  guardianSetup: {
    whoFor: [],
    relationship: '',
    customName: '',
    nickname: '',
    catchphrase: '',
    talkingStyle: '',
    concerns: [],
  },
  subscription: 'free',
  voiceId: null,
  familyMembers: [],
  recentCalls: [],
};

function loadState() {
  try {
    const saved = localStorage.getItem('familyvoice_state');
    if (saved) return { ...INITIAL_STATE, ...JSON.parse(saved) };
  } catch {}
  return INITIAL_STATE;
}

function saveState(state) {
  try {
    localStorage.setItem('familyvoice_state', JSON.stringify(state));
  } catch {}
}

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [appState, setAppState] = useState(loadState);

  useEffect(() => {
    saveState(appState);
  }, [appState]);

  useEffect(() => {
    if (appState.user && appState.voiceId) {
      setScreen('dashboard');
    }
  }, []);

  function updateState(updates) {
    setAppState(prev => ({ ...prev, ...updates }));
  }

  function navigate(to) {
    setScreen(to);
  }

  const screens = {
    splash: <SplashScreen navigate={navigate} />,
    auth: <AuthScreen navigate={navigate} appState={appState} updateState={updateState} />,
    whoSetup: <WhoSetupScreen navigate={navigate} appState={appState} updateState={updateState} />,
    guardianName: <GuardianNameScreen navigate={navigate} appState={appState} updateState={updateState} />,
    personalization: <PersonalizationScreen navigate={navigate} appState={appState} updateState={updateState} />,
    concerns: <ConcernsScreen navigate={navigate} appState={appState} updateState={updateState} />,
    onboarding: <OnboardingScreen navigate={navigate} />,
    subscription: <SubscriptionScreen navigate={navigate} appState={appState} updateState={updateState} />,
    voiceRecord: <VoiceRecordScreen navigate={navigate} appState={appState} updateState={updateState} />,
    dashboard: <DashboardScreen navigate={navigate} appState={appState} updateState={updateState} />,
    activeCall: <ActiveCallScreen navigate={navigate} appState={appState} updateState={updateState} />,
    familyInvite: <FamilyInviteScreen navigate={navigate} appState={appState} updateState={updateState} />,
    settings: <SettingsScreen navigate={navigate} appState={appState} updateState={updateState} />,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e5e7eb', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ width: '390px', minHeight: '100vh', background: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: '100vw' }}>
        {screens[screen] || screens.splash}
      </div>
    </div>
  );
}
