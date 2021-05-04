import * as yargs from 'yargs';
import {Note} from './note';
import {Collection} from './collection';

const spawn = require('child_process').spawn;

/**
 * @brief Command that allow us to add a note from a user into his note collection
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    colour: {
      describe: 'Note colour',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { user: string; title: string; body: string; colour: string; }) {
    if(typeof argv.user === 'string'){
      if(typeof argv.title === 'string'){
        if(typeof argv.body === 'string'){
          if(typeof argv.colour === 'string'){
            const newNote = new Note(argv.title, argv.body, argv.colour);
            let output: string = '';
            let ls = spawn('ls');
            ls.stdout.on('data', (data: any) => output += data);
            let split = output.split(/\s+/);
            let index = split.findIndex((temp) => temp === argv.user);
            const aux = new Collection(argv.user);
            if (index === -1) {
              spawn('mkdir', [`${argv.user}`]);
            }
            aux.addNote(newNote);
          }
        }
      } 
    }  
  },
});

/**
 * @brief Command that allow us to list all titles of a collection
 */
yargs.command({
  command: 'list',
  describe: 'List all titles of the note colecction of a particular user',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { user: string; }) {
    if (typeof argv.user === 'string') {
      const temp = new Collection(argv.user);
      temp.titles();
    }
  },
});

/**
 * @brief Command that allow us to read a specified note
 */
yargs.command({
  command: 'read',
  describe: 'Read a particular note of the user specified',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { user: string; title: string; }) {
    if(typeof argv.user === 'string'){
      if(typeof argv.title === 'string'){
        const temp = new Collection(argv.user);
        temp.readNote(argv.title);
      }
    }
  },
});

/**
 * @brief Command that allow us to remove a note
 */
yargs.command({
  command: 'remove',
  describe: 'Removes a note of the user',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv: { user: string; title: string; }) {
    if(typeof argv.user === 'string'){
      if(typeof argv.title === 'string'){
        const temp = new Collection(argv.user);
        temp.removeNote(argv.title);
      }
    }
  },
});

/**
 * @brief Pase function that allow to works correctly from command line
 */
yargs.parse();