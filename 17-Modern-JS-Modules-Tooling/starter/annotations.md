# 📝 Anotaciones Section 17

Estas son las primeras anotaciones hechas con README.md

## Carga de solo modulos en Parcel
```
if (module.hot) module.hot.accept();
npm install parcel -g
npx parcel index.html, parcel build index.html
``` 
parcel ya usa Babel paara convertir codigo, igual se puede definir:

- 🌐 Que navegadores deberinan ser compatibles

Si entramos a la pagina de Babel, en la parte de plugins, tendrmeos plugins y features configurables un plugin es una función de js que podemos transpilar(convertir)