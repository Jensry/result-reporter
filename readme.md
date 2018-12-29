# result-reporter

> App for reporting results

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## To generate rules
```
npm install -g fireplan
fireplan database.rules.yaml
```

## To deploy to firebase
```
npm install -g firebase-tools
npm run build
firebase login
firebase deploy
```

## To deploy to bkc firebase
```
npm run bkc-build
firebase use bkc
firebase deploy
```
