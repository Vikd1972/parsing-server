/* eslint-disable no-await-in-loop */
import AvitoNotes from '../entities/avitoNotes';
import AvitoLinks from '../entities/avitoLinks';
import db from '..';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('cllc')();

type NoteOptionsType = {
  title: string;
  price: string;
  address: string;
  description: string;
  date: string;
};

type LinkOptionsType = {
  title: string;
  path: string;
};

type LinksOptionsType = {
  title: string;
  path: string;
  isCheck: boolean;
}[];

export const addAvitoNote = async (options: NoteOptionsType) => {
  const note = await db.avitoNotes.findOne({
    where: {
      title: options.title,
      address: options.address,
    },
  });

  if (note) {
    return;
  }

  const newNote = new AvitoNotes();
  newNote.title = options.title;
  newNote.price = options.price;
  newNote.address = options.address;
  newNote.description = options.description;
  newNote.date = options.date;

  log.info('newNote', newNote);
  await db.avitoNotes.save(newNote);
  log.step(0, 0, 0, 1);
};

export const addAvitoLink = async (options: LinkOptionsType) => {
  const linkCheckByTitle = await db.avitoLinks.findOne({
    where: {
      title: options.title,
    },
  });

  const linkCheckByHref = await db.avitoLinks.findOne({
    where: {
      path: options.path,
    },
  });

  if (linkCheckByTitle || linkCheckByHref) {
    return;
  }

  const newLink = new AvitoLinks();
  newLink.title = options.title;
  newLink.path = options.path;

  log.info('newLink', newLink);
  await db.avitoLinks.save(newLink);
  log.step(0, 0, 0, 1);
};

export const addAvitoLinks = async (options: LinksOptionsType) => {
  for (const item of options) {
    const newLink = new AvitoLinks();
    newLink.title = item.title;
    newLink.path = item.path;
    newLink.isCheck = item.isCheck;
    // log.info('newLink', newLink);
    await db.avitoLinks.save(newLink);
    // log.step(0, 0, 0, 1);
  }
};

export const setCheckLink = async (options: LinkOptionsType) => {
  const link = await db.avitoLinks.findOne({
    where: {
      title: options.title,
    },
  });

  if (!link) {
    return;
  }

  link.isCheck = true;

  await db.avitoLinks.save(link);
};

export const getLinks = async () => {
  const link = await db.avitoLinks.findBy({ isCheck: false });

  if (link) {
    return link;
  }
  return null;
};

export default {
  addAvitoNote,
  addAvitoLink,
  addAvitoLinks,
  setCheckLink,
  getLinks,
};
