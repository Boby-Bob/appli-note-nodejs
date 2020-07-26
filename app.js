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
            console.log(chalk.blue('List all note--title'));
            let notes = loadDatas('datas/notes.json');
            for (let i=0; i < notes.length; i++) {
                console.log(notes[i].title);
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
            console.log("Add note in file");
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
                    console.log("New note Create");
                });
            }
            else {
                console.log(`the ${argv.title} note already exists!`)
            }
        }
    }).argv
