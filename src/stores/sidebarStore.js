import { atom } from 'nanostores';


export const sidebarStore = atom(false);

export const openSideBar = () => {
  sidebarStore.set(true);
};

export const closeSideBar = () => {
  sidebarStore.set(false);
};