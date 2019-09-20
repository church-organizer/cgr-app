# Todos

- [ ] Login Maske überarbeiten, password mit hochladen (gehashed) als datei
- [ ] Startseite inhalt
- [x] Responsive sidebar per button aus und ein fahren
- [x] Suche
- [x] zeit bei advanced suche wird nicht immer angezeigt !???? warum auch immer
- [x] footer erstellen
- [x] ordner struktur nicht mehr hard codiert im Fileloader
- [x] error handling wenn es eine url nicht gibt
- [x] für die oberordner wie Teens oder Jugend automatische eine seite darstellen die nur die links zu den pages enthält (wenn man auf die Oberordner klickt)
- [x] sidebar darf keine horizontale scrollbar haben
- [x] edit page man soll ja die dateien auch bearbeiten können
- [x] advanced search zeigt nicht immer den gematcheten text an
- [ ] try and catch, überall, fehler abfangen
- [x] footer soll an der unteren kante stehen bleiben, wenn es wenig inhalt gibt
- [x] hastags als link einführen
- [ ] datum automatisch api (über directus einfacher?)
- [x] breadcrumbs bei der suche anstatt einenm Link
- [ ] mit directus vielleicht die api ablösen
- [ ] gültigkeitsdauer für die seiten einführen (über directus einfacher?)
- [ ] für die Api ein kleines Frontend bauen(Dashboard, Visuelle Darstellung der zukünftigen Einträge aus der Datenbank) mit Login

A. Vollständiges Wiki mit Edit und View
	1. Gutes Design
	2. Editor
	3. Dateien Lesen blabla
	...
	x. Undo

B. Login
	1. Editor/Admin - save as hash in file

C. Dashboard auf homepage
	1. 
## Api
### Schnittstellen für die Api
- Wiki
  - struktur zurückgeben (GET /structure)
  - einzelner eintrag (GET /:name)
  - suche in inhalt und titel (POST /search json)
  
    Beispiel json
    ```json
    {
    "searchWord": "hier der such string", 
    "filter": []
    }
    ```
  - speichern (inhalte updaten) (POST /:name json)
  
    Beispiel json
    ```json
    {
        "titel": "titel", 
        "content": "neuer inhal",
        "author": ""
    }
    ```
- authentifizieren
  - login (liefert token zurück)
  - logout
  - verify (kriegt ein token rein und verifiziert das)
- 

## für die erste version mvp
- login für bearbeitung
- advanced search umbauen
- design 
- hilfe
- schriftart
- bilder hochladen

 

### Datenbank
- benutzer + rechte
- wikipages (createdAt, updatedAt, titel, author, group, content)
- active user/token ((user 1:1 token) token werden nach login gespeichert und bei Login gelöscht, so immer nur ein user online pro account)
- 

# Installation
alle Dependencies installieren
``npm install``
# Starten
``npm start``
