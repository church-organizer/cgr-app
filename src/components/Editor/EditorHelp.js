import React, {Component} from 'react';
import {
    DialogContent,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
    Typography, ExpansionPanel
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Markdown from "../Page/Markdown";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";

class EditorHelpEntry extends Component {
    render() {
        return (
            <ExpansionPanel expanded={this.props.isSelected} onChange={() => this.props.select(this.props.key)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography>{this.props.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Markdown disableChangeImageLink source={this.props.text}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>);
    }
}

class EditorHelp extends Component {
    state = {
        openHelpCategory: []
    };

    /**
     * Opens another Category
     * if the selected is equal to the clicked Category, it closes the category
     * @param category
     */
    openOtherCategory(category) {
        if (this.state.openHelpCategory.includes(category)) {
            let list = this.state.openHelpCategory;
            this.setState({openHelpCategory: list.filter(elem => elem !== category)});
        } else {
            const list = this.state.openHelpCategory;
            list.push(category);
            this.setState({openHelpCategory: list});
        }

    }

    isSelected(key) {
        return this.state.openHelpCategory.includes(key);
    }

    getHelpForText() {
        const key = "text-edit";
        const mdContent = `## Text Bearbeiten
---

#### Text Dick darstellen\n
Man umschließt den Text den Man dicker darstellen will mit zwei '*'.\n
\`**dick**\`\n
Dargestellt wird das so: **Das hier sieht wichtig aus**\n

#### Text kursiv darstellen\n
Hier umschließt man den Text mit einem '*'\n
Alternativ kann man auch einen Unterstrich '_' dazu nehmen.\n
\`*kursiv*\`\n
\`_oderso_\`\n
Dargestellt wird das dann so: *Ich sin schräg...*\n

#### Text durchstreichen\n
Diesmal wird der Text mit zwei Tilden '~' umschlossen.
> Das Tilde Zeichen kann man mit der Kombination 'Alt-Gr und +' schreiben.\n
\`~~durchgestrichen~~\`\n
Das sieht dann so aus: ~~Beispiel~~


`;
        return (
            <EditorHelpEntry title={"Texte Bearbeiten"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    getHelpForHeader() {
        const key = "header";
        const mdContent = `
## Überschriften
---
Man kann die verschiedenen Überschriften einfach mit einem Hashtag ('#') oder mehreren verändern.\n
Das ganze kann man mit bis zu 5 Hashtags machen.\n
\`\`\`\n# Überschrift 1
## Überschrift 2
\`\`\`
# Mit einem '#'\n
## Mit zwei '#'
### und so weiter
#### hier sind es 4mal #
##### und jetzt 5
`;
        return (
            <EditorHelpEntry title={"Überschriften"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    getHelpForHighlights() {
        const key = "highlights";
        const mdContent = `## Highlights
---
Um besondere Stellen von Texten besonders hervorzuheben gibt es 2 Möglichkeiten

### Grüne Highlights
Um grüne Hightlights darzustellen braucht man nur ein 'größer' Zeichen '>'\n
> Bei Windows findet man das Zeichen mit 'Shift + <'\n
Diese sehen dann so aus:\n
> Ich bin Grün
---
### Blaue Highlights
Für blaue Highlights braucht man entweder ein Backtick odern 3 Backticks für mehrere Zeilen.\n
Das Backtick ist ein schräger Strich über Buchstaben der die Betonung z.B. in der franz. Sprache zeigt.\n
> Bei den meisten Tastaturen findet man die Backticks mit 'Shift und ' und danach Leertaste drücken'\n
\`Ich bin Blau\`
\`\`\`
ich bin ein 
mehrzeiler
\`\`\`

`;
        return (
            <EditorHelpEntry title={"Texte hervorheben"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    getHelpForLists() {
        const key = "lists";
        const mdContent = `## Listen
---
Es gibt 3 verschiedene Listen.
Eine geordnete und eine ungeordnete List und eine Checkliste.\n
### Eine geordnete Liste
Die geordnete List besteht aus einer Zahl, einem Punkt und danach der Inhalt.\n
\`1. Punkt 1\`\n
Das ganze sieht dann so aus:\n
1. Punkt 1
2. Punkt 2
3. Punkt 3

### Eine ungeordnete Liste
Eine ungeordnete Liste besteht einfach nur aus einem Bindestrich und einem Leerzeichen.
\`- Stichpunkt\`\n
Danach kann direkt der Inhalt kommen, hier ein Beispiel dazu:\n
- Das ist wichtig
- und das auch
- genau wie dieser Punkt

### Checklisten
Eine Checklist wird durch Checkboxen dargestellt\n
Dazu gehört zu erst ein Bindestrich, dann ein Leerzeichen und dann eckige Klamemrn.\n
Eine offene Checkbox enthält zwischen den eckigen Klammern ein Leerzeichen\n
Eine 'angekreuzte Checkbox' enthält zwischen den eckigen Klammern ein 'x'\n
\`\`\`
- [ ] Zu erledigen
- [x] bereits fertig
\`\`\`
- [ ] Zu erledigen
- [x] bereits fertig
`;
        return (
            <EditorHelpEntry title={"Listen"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);

    }

    getHelpForTables() {
        const key = "tables";
        const mdContent = `## Tabellen
---
Man kann auch Tabellen darstellen.
Es ist allerdings immer etwas komplizierter

### TL;DR:

Kopfzeile:\n
\`| Spalte 1 | Spalte 2 |\`\n
Nach Kopfzeile => Trennreihe\n
\`| - | - |\`\n
Danach der Inhalt\n
\`| Inhalt für eine Spalte | Noch mehr Inhalt |\`
 
### Das Zeichen
Die Spalten werden durch 'Pipes' dargestellet. Das ist einfach ein '|'.
> Unter Windows kann man das Zeichen mit der Kombination 'Alt-Gr und <' erstellen. Das '<' ist das Zeichen neben dem 'y'.

### Kopfzeile
Die Namen der Spalten schreibt man dann zwischen die 'Pipes', immer mit einem Leerzeichen Abstand.
Die Kopfzeile einer Tabelle könnte also so aussehen:\n
\`| Spalte 1 | Spalte 2 |\`

### Trennzeile
Nach der Kopfzeile fügt man eine leere Zeile ein. Der Inhalt besteht nur aus einem Bindestrich. 
Allerdings muss man auch hier so viele Spalten ergänzen wie es Spalten gibt.\n
\`| - | - |\`

### Inhalt
Danach kann man den Inhalt der Tabelle füllen:
Für eine Zeile schreibt man dann:

\`| Inhalt für eine Spalte | Noch mehr Inhalt |\`

Das kann man natürlich so oft wiederholen, wie man Zeilen hat.

### Ergebins
Das Ergbenis würde dann so aussehen:\n
| Spalte 1 | Spalte 2 |
| - | - |
| Inhalt für eine Spalte | Noch mehr Inhalt |
`;
        return (
            <EditorHelpEntry title={"Tabllen"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    getHelpForImages() {
        const key = "images";
        const mdContent = `## Bilder
### Bilder hochladen
Um Bilder hochzuladen gibt es den 'Insert Image' Button in der oberen Leiste beim Editor
Klickt man darauf, öffnet sich ein Fenster und man kann ein Bild auswählen welches man hochladen will.
Bestätigt man das, wird ein Textausschnitt dem Text hinzugefügt.\n
Dieser Ausschnitt zeigt wo im Text das Bild dargestellt wird. 
Dieser Ausschnitt sieht so aus:\n
\` ![Bild](derNameDesBildes.png) \`

In die eckigen Klammern kann man einen Titel für das Bild schreiben. 
Dieser wird dargestellt, wenn das Bild nicht geladen werden kann

Man kann auch bereits verwendete Bilder nochmal nutzen, 
dafür muss man nur den Namen des Bilder in die runden Klammern schreiben .\n
Eine Oberfläche um alle Bilder anzugucken die bereits Hochgeladen wurden gibt es noch nicht. Ist aber in Plannung.
`;


        return (
            <EditorHelpEntry title={"Bilder"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    getHelpForEditor() {
        const key = "editor";
        const mdContent = `## Editor
### Basics
Der Editor ist ein einfacher Markdown Editor. 
Das heißt der Inhalt der dargestellt wird, wird mittels Markdown dargestellt und strukturiert.

Die Darstellung wurde teils angepasst um für unseren Kontext zu passen.

### Funktionen
Es können Bilder, Tabellen, Listen angezeigt werden. 
> Neue Bilder werden erst hochgeladen wenn man den Artikel speichert.

Man kann den Text auch durch kleine Formatierungen auch unterschiedlich darstellen.
Für die Basis Elemente gibt es im Editor auch kleine Buttons die zur Hilfe dienen.

### Ansichten
Es gibt verschiedene Ansichten.
> Side by Side und der Vollbild-Modus ist auf mobilen Geräten nicht verfügbar\n

#### Nur der Editor
Hier kann man den Text bearbeiten und es gibt eine kleine Darstellung des Geschriebenen.

#### Side by Side
Es gibt den Editor und eine Vorschau auf der rechten Seite des Geschriebenen. 
Das ganze ist in Vollbild und kann durch drücken von 'F11' oder die Vollbildtaste in der Editorleiste verlassen werden.
Neue Bilder werden hier noch nicht angezeigt. Erst wenn der Artikel gespeichert wurde.

#### Nur Darstellung 
Bei der Darstellung kann man den Inhalt nicht bearbeiten. 
Diese Ansicht dient als Hilfe bei der Darstellung. Man sieht wie das Ergebniss nachher aussieht.

#### Vollbild
Vollbild wird bei der Side by Side Darstellung automatisch aktiviert.
Bei den anderen Ansichten kann man den Vollbild wechseln.


`;
        return (
            <EditorHelpEntry title={"Editor"}
                             text={mdContent}
                             key={key}
                             isSelected={this.isSelected(key)}
                             select={() => this.openOtherCategory(key)}/>);
    }

    render() {
        return (
            <Dialog open={this.props.open}
                    maxWidth="md"
                    onBackdropClick={this.props.onClose}
                    onClose={this.props.onClose}>
                <DialogTitle>Deine Hilfe</DialogTitle>
                <DialogContent>
                    {this.getHelpForEditor()}
                    {this.getHelpForText()}
                    {this.getHelpForHeader()}
                    {this.getHelpForLists()}
                    {this.getHelpForHighlights()}
                    {this.getHelpForImages()}
                    {this.getHelpForTables()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color={"primary"}>Schließen</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditorHelp;
