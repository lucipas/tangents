# Tangent

An [Expo](https://expo.dev) + React Native app scaffolded by hand on Expo SDK 57
(React Native 0.86, React 19.2, TypeScript 6).

Nothing was installed — there is no `node_modules/` yet. The files below were
written directly so you can review and commit them before the first install.

## Getting started

When you're ready to install and run:

```bash
npm install
npx expo start        # then press i (iOS), a (Android), or w (web)
```

`npx expo start` also regenerates `expo-env.d.ts` and the typed-routes
definitions in `.expo/types/`.

## Project layout

```
app/                          File-based routes (expo-router)
  _layout.tsx                 Root stack + theme + providers
  (tabs)/
    _layout.tsx               Bottom tab navigator
    index.tsx                 Home tab            -> "/"
    explore.tsx               Explore tab         -> "/explore"
  details/
    [id].tsx                  Dynamic route       -> "/details/:id"
  +not-found.tsx              404 route
components/
  themed-text.tsx             <Text> wired to the theme
  themed-view.tsx             <View> wired to the theme
constants/
  theme.ts                    Colour palette + font stacks
hooks/
  use-color-scheme.ts         "light" | "dark" (never null)
  use-theme-color.ts          Palette lookup with overrides
app.json                      Expo config (name, scheme, plugins)
babel.config.js               babel-preset-expo
tsconfig.json                 Strict TS + "@/*" path alias
```

## How navigation is wired

- `expo-router` handles routing from the filesystem. `app.json` sets
  `"plugins": ["expo-router"]` and `package.json` sets
  `"main": "expo-router/entry"`.
- The root `Stack` in `app/_layout.tsx` hosts the tab group, the dynamic
  details route, and the 404 screen.
- `(tabs)/_layout.tsx` is a plain `Tabs` navigator (React Navigation under the
  hood, via expo-router) with two icons from `@expo/vector-icons`.
- Typed routes are enabled (`experiments.typedRoutes`), so `Link href` values
  are checked against the route tree once the types are generated.

## Pinned versions

Versions match the official `expo-template-default` for SDK 57, so an install
resolves a known-good dependency graph:

| package | version |
| --- | --- |
| expo | ~57.0.28 |
| expo-router | ~57.0.26 |
| react-native | 0.86.3 |
| react / react-dom | 19.2.3 |
| react-native-reanimated | 4.5.1 |
| react-native-worklets | 0.10.1 |
| typescript | ~6.0.3 |

## Adding native projects

This is a managed Expo project — there is no `android/` or `ios/` folder.
Generate them on demand with:

```bash
npx expo prebuild
```

## CI / CD — Android APK on GitHub Actions

`.github/workflows/build-apk.yml` runs on every push and pull request to
`main`, and builds a signed Android **APK** (not AAB) with EAS Build:

1. `expo/expo-github-action@v9` installs the EAS CLI and authenticates with your
   `EXPO_TOKEN`.
2. `eas build --profile preview` uploads the project to Expo's cloud builders
   and waits for completion (`eas.json` → `preview` profile sets
   `android.buildType: "apk"`).
3. `eas build:download` pulls the artifact back and `upload-artifact` attaches
   it to the run as **`android-apk`** (in `dist/`).

### One-time setup (before the first run)

1. Create an Expo access token: https://expo.dev/accounts/<you>/settings/access-tokens
2. Add it to the repo as a secret named `EXPO_TOKEN`
   (Settings → Secrets and variables → Actions).
3. Link the project to your EAS account once, locally:

   ```bash
   npm install
   npx eas init          # writes extra.eas.projectId into app.json
   ```

4. Push — the next commit to `main` (or PR) produces the APK. The first
   Android build also auto-generates the signing keystore in your EAS account.

Notes:

- Run `paths-ignore: ['**.md']` — doc-only commits don't burn build minutes.
- `concurrency.cancel-in-progress` cancels a build on the same branch when a
  newer commit lands.
- Builds happen on EAS's servers, so build *minutes* are counted against your
  Expo account (the free tier covers light usage). Build logs and the APK are
  also available in the EAS dashboard:
  https://expo.dev/accounts/<you>/projects/tangent/builds
- Change the profile to `production` (which outputs an AAB) when you're ready
  to ship to the Play Store, or run the workflow manually.

## Notes

- App icons and splash images are intentionally omitted so `app.json` never
  points at a missing asset. Drop files into `assets/` and add `icon`,
  `splash`, etc. to `app.json` when you have them.
- `expo-env.d.ts` is git-ignored (Expo regenerates it) but is kept in
  `tsconfig.json`'s `include` so a fresh checkout type-checks after the first
  `expo start`.
