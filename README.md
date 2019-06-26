# OFERendererPC

## Beschreibung

ILIAS-Seiten-Plugin für die (reine) Darstellung von [OFE](https://office.freeit.de/de/ofe/index.html)-Formeln (primär in Lernmodulen).

Es handelt sich um ein »Legacy-Plugin«, da der ursprüngliche OFE aktuell nicht mehr gepflegt wird.

## Installation

Das Plugin MUSS in ein Verzeichnis names `OFERendererPC` (unterhalb von `Customizing/global/plugins/Services/COPage/PageComponent/`) ausgecheckt werden,  *nicht* in `Ofe`.

D.h. ausgehend vom Wurzelverzeichnis der ILIAS-Installation:

```bash
cd Customizing/global/plugins/Services/COPage/PageComponent/
mkdir OFERendererPC
cd OFERendererPC
git clone https://github.com/TIK-NFL/Ofe.git .
```
