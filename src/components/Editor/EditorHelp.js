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
                    <Markdown source={this.props.text}/>
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

    render() {
        return (
            <Dialog open={this.props.open}
                    maxWidth="md"
                    onBackdropClick={this.props.onClose}
                    onClose={this.props.onClose}>
                <DialogTitle>Deine Hilfe</DialogTitle>
                <DialogContent>
                    {this.getHelpForHeader()}
                    {this.getHelpForLists()}
                    {this.getHelpForTables()}
                    {this.getHelpForText()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color={"primary"}>Schließen</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditorHelp;
