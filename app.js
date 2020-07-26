const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk')

function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}

yargs
    .command({
        command: 'list',
        describe: 'List all note--title',
        handler: () => {
            console.log(chalk.bgBlue('List all notes'));
            let notes = loadDatas('datas/notes.json');
            for (let i=0; i < notes.length; i++) {
                console.log(chalk.blue(notes[i].title));
            }
        }
    })
    .command({
        command: 'add',
        describe: 'Add a note',
        builder: {
            title: {
                describe: "Add note's title",
                demandOption: true,
                type: "string"
            },
            body: {
                describe: "Add note",
                demandOption: true,
                type: "number"
            }
        },
        handler: (argv) => {
            console.log(chalk.bgBlue("Add note in file"));
            let notes = loadDatas('datas/notes.json');
            let exist;
            for (let i = 0; i<notes.length; i++) {
                if (notes[i].title.includes(argv.title) == false) {
                    exist = false;
                }
                else {
                    exist = true;
                    break;
                }
            };
            if (exist == false) {
                notes.push({"title" : argv.title, "body" : argv.body});
                fs.writeFile('datas/notes.json', JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    console.log(chalk.green("New note Create"));
                });
            }
            else {
                console.log(chalk.red(`the ${argv.title} note already exists!`))
            }
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: "Add the title of the note to delete",
                demandOption: true,
                type: "string"
            }
        },
        handler: (argv) => {
            console.log("Remove note in file");
            let notes = loadDatas('datas/notes.json');
            let exist;
            let noteToDelete;
            for (let i = 0; i<notes.length; i++) {
                if (notes[i].title.includes(argv.title) == false) {
                    exist = false;
                }
                else {
                    exist = true;
                    noteToDelete = i;
                    break;
                }
            };

            if (exist == false) {
                console.log(chalk.red(`the ${argv.title} note does not exist!`))

            }
            else {
                notes.splice(noteToDelete, 1);
                fs.writeFile('datas/notes.json', JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    console.log(chalk.green(`the ${argv.title} note has been deleted`));
                });
            }
        }
    })
    .command({
        command: "read",
        describe: 'Display a note',
        builder: {
            title: {
                describe: "Add the title of the note to display",
                demandOption: true,
                type: "string"
            }
        },
        handler: (argv) => {
            console.log(chalk.bgBlue("Display note in file"));
            let notes = loadDatas('datas/notes.json');
            let exist;
            let noteToDisplay;
            for (let i = 0; i<notes.length; i++) {
                if (notes[i].title.includes(argv.title) == false) {
                    exist = false;
                }
                else {
                    exist = true;
                    noteToDisplay = i;
                    break;
                }
            };
            if (exist == false) {
                console.log(chalk.red(`the ${argv.title} note does not exist!`))

            }
            else {
                fs.writeFile('datas/notes.json', JSON.stringify(notes), (err) => {
                    if (err) throw err;
                    console.log(chalk.green(`${notes[noteToDisplay].title}: ${notes[noteToDisplay].body}`));
                });
            }
        }
    }).argv
