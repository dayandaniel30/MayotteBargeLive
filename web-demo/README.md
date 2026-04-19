# Transport App UI — React + Tailwind

Interface "Clean & Premium" recréée à partir de la maquette (écrans Home / MRT Schedule / Ticket).

## Aperçu rapide (aucune installation)

Ouvre directement `transport-app.html` dans un navigateur :

```bash
# depuis la racine du repo
xdg-open web-demo/transport-app.html      # Linux
open web-demo/transport-app.html          # macOS
```

La page charge React 18, Tailwind CSS et `lucide-react` via CDN, et affiche les
3 écrans côte à côte sur grand écran, ou un écran à la fois sur mobile avec
navigation `useState`.

## Intégration dans un projet React existant

Le composant réutilisable est `TransportApp.jsx`. Il attend :

- React 18+
- Tailwind CSS avec les extensions de thème ci-dessous
- `lucide-react` installé (`npm i lucide-react`)

### Extension `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      navy: { 900: "#001a4d", 800: "#002266", 700: "#002b80", 600: "#0033a0" },
      brand: { 500: "#1e63d1", 400: "#3a86ff" },
    },
    fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    boxShadow: {
      soft: "0 10px 30px -10px rgba(0, 20, 80, 0.25)",
      card: "0 20px 50px -20px rgba(0, 20, 80, 0.4)",
    },
  },
}
```

### Usage

```jsx
import TransportApp from "./TransportApp";

export default function App() {
  return <TransportApp />;
}
```

## Structure

- `HomeScreen`       — accueil, recherche, sélection Bus / MRT
- `ScheduleScreen`   — illustration MRT, trajet From/To, liste d'horaires
- `TicketScreen`     — ticket + QR, paiement Credit Card / E-Wallet, bouton Buy
- `BottomNav`        — Home / Profile / Location (icônes `lucide-react`)
- Navigation gérée via `useState` (`screen` + `schedule`)

## Note

Le projet parent est une app **Expo / React Native**. Ce dossier `web-demo/`
n'interagit pas avec l'app native : c'est une démo isolée conforme à la
demande (React + Tailwind CSS).
