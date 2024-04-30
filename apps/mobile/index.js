import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'
import './src/styles/global.css'

export function App() {
  const ctx = require.context('./src/app')
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
