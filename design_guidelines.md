# Design Guidelines - Application Barge de Mayotte

## Architecture Decisions

### Authentication
**No Authentication Required**
- L'application est un service d'information publique pour les horaires de barge
- Les données sont consultées en temps réel sans besoin de compte utilisateur
- **Inclure un écran Paramètres** avec:
  - Sélection de langue (Français par défaut)
  - Notifications pour les alertes de service
  - Préférences d'affichage de la carte
  - Favoris de trajet (stockés localement)

### Navigation Architecture
**Tab Navigation avec 3 onglets:**
1. **Carte** (Home) - Vue principale avec carte interactive
2. **Horaires** - Liste des prochains départs et recherche
3. **Paramètres** - Configuration et préférences

Position: Tab bar standard en bas de l'écran

## Screen Specifications

### 1. Écran Carte (Home)
**Purpose:** Visualiser les terminaux de barge et le trajet sur une carte interactive

**Layout:**
- **Header:** Transparent avec titre "Barge de Mayotte"
  - Left: Aucun bouton
  - Right: Bouton "Infos" (icône info-circle) pour afficher les alertes de service
- **Main Content:**
  - Carte interactive plein écran (react-native-maps avec style transit/topographique)
  - Marqueurs pour:
    - Terminal Dzaoudzi (Petite-Terre) - Quai Issoufali
    - Terminal Mamoudzou (Grande-Terre) - Quai Colas
  - Ligne de trajet animée entre les deux terminaux
  - Position GPS de la barge en temps réel (si disponible)
- **Floating Elements:**
  - **Barre de recherche verte** en bas (inspirée de la référence):
    - Texte placeholder: "On va où ?"
    - Hauteur: 56px
    - Border radius: 28px
    - Drop shadow subtile (shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.15, shadowRadius: 8)
    - Position: bottom inset = tabBarHeight + Spacing.xl
  - **Bandeau d'alerte orange** (si incident/retard):
    - Position: top inset = headerHeight + Spacing.lg
    - Hauteur: 48px
    - Texte: Ex. "Service perturbé - Retards de 15 min"
    - Icône alert-circle à gauche

**Safe Area Insets:**
- Top: headerHeight + Spacing.xl
- Bottom: tabBarHeight + Spacing.xl

### 2. Écran Horaires
**Purpose:** Consulter les prochains départs et horaires détaillés

**Layout:**
- **Header:** Standard avec titre "Horaires"
  - Left: Aucun bouton
  - Right: Bouton filtre (icône sliders) pour filtrer par terminal
  - Barre de recherche intégrée dans le header (optionnel)
- **Main Content:**
  - ScrollView avec liste des prochains départs
  - Chaque carte d'horaire affiche:
    - Terminal de départ → Terminal d'arrivée
    - Heure de départ (grande typographie)
    - Statut: "À l'heure" (vert) / "Retardé X min" (orange) / "Annulé" (rouge)
    - Durée du trajet: "15-20 min"
    - Icône de bateau
  - Section "Horaires standards":
    - "En journée: toutes les 30 min"
    - "En soirée: toutes les heures"
    - "Premier départ: 5h30"
    - "Dernier départ: 00h30 (semaine) / 3h00 (week-end)"

**Safe Area Insets:**
- Top: Spacing.xl (header non-transparent)
- Bottom: tabBarHeight + Spacing.xl

### 3. Écran Paramètres
**Purpose:** Configuration de l'application

**Layout:**
- **Header:** Standard avec titre "Paramètres"
- **Main Content:**
  - Form scrollable avec sections:
    - **Notifications:**
      - Toggle "Alertes de service"
      - Toggle "Retards importants (>10 min)"
    - **Affichage:**
      - Sélecteur de langue (Français/English)
      - Toggle "Thème sombre"
    - **Favoris:**
      - Toggle "Dzaoudzi → Mamoudzou"
      - Toggle "Mamoudzou → Dzaoudzi"
    - **À propos:**
      - Version de l'application
      - Liens: Contact STM, Mentions légales

**Safe Area Insets:**
- Top: Spacing.xl
- Bottom: tabBarHeight + Spacing.xl

## Design System

### Color Palette
**Primary:**
- Vert Barge: #2ECC71 (barre de recherche, statut "À l'heure")
- Vert Foncé: #27AE60 (accents, boutons pressés)

**Status:**
- Orange Alerte: #F39C12 (retards, bandeau d'alerte)
- Rouge Annulation: #E74C3C
- Bleu Info: #3498DB

**Neutral:**
- Background: #F5F5F5
- Card Background: #FFFFFF
- Text Primary: #2C3E50
- Text Secondary: #7F8C8D
- Border: #E0E0E0

**Map:**
- Water: #A8D5E2 (style topographique)
- Land: #F0E6D2
- Routes: #D4C5A9

### Typography
**Primary Font:** System (SF Pro pour iOS, Roboto pour Android)

**Sizes:**
- H1 (Titres principaux): 28px, Bold
- H2 (Sous-titres): 20px, Semibold
- H3 (Horaires): 32px, Bold (heure de départ)
- Body: 16px, Regular
- Caption: 14px, Regular
- Small: 12px, Regular

### Visual Design
**Icons:**
- Utiliser Feather icons de @expo/vector-icons
- Taille standard: 24px
- Couleur: Text Secondary par défaut

**Cards (Horaires):**
- Background: #FFFFFF
- Border radius: 12px
- Padding: Spacing.lg
- Subtle shadow: shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 4
- Margin bottom: Spacing.md

**Barre de recherche (élément distinctif):**
- Background: #2ECC71
- Text color: #FFFFFF
- Placeholder opacity: 0.7
- Icon: search (Feather) à gauche, blanc
- Feedback tactile: slight scale (0.98) on press

**Bandeau d'alerte:**
- Background: #F39C12
- Text color: #FFFFFF
- Icon: alert-circle (Feather)
- Font: Semibold 14px

**Floating Action Button (si besoin):**
- Position: bottom-right
- Background: #2ECC71
- Shadow: shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2

### Spacing
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- xxl: 32px

### Assets Requis
**Icônes et illustrations:**
1. **Icon de barge** (SVG/PNG) - illustration stylisée du bateau pour les cartes d'horaires
2. **Marqueurs de carte** (2 versions):
   - Terminal Dzaoudzi (icône personnalisée avec ancre ou quai)
   - Terminal Mamoudzou (icône personnalisée)
3. **Style de carte personnalisé** - configuration JSON pour react-native-maps avec style topographique/transit (couleurs eau/terre comme dans la référence)

**Pas besoin de:**
- Avatars utilisateur (pas d'authentification)
- Logos de réseaux sociaux
- Emojis

### Interaction Design
**Feedback visuel:**
- Tous les éléments touchables doivent avoir un effet de pression
- Cartes d'horaires: scale légèrement (0.97) et subtle opacity (0.9) au press
- Barre de recherche: scale (0.98) et darkening du vert
- Boutons header: opacity 0.6 au press
- Tab bar: animation de changement d'onglet avec fade

**Transitions:**
- Navigation entre onglets: cross-fade 200ms
- Apparition du bandeau d'alerte: slide from top 300ms
- Ouverture des détails d'horaire: modal slide up 250ms

### Accessibility
- Taille minimale des éléments touchables: 44x44px
- Contraste texte/fond: minimum WCAG AA (4.5:1)
- Labels VoiceOver pour tous les boutons et icônes
- Annonces VoiceOver pour les changements de statut
- Support du texte dynamique (Dynamic Type iOS)
- Navigation clavier possible (Android TV/tablettes)