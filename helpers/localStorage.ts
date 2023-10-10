export function saveToLocalStorage(data: Array<any>): void {
  const datajson = JSON.stringify(data);
  localStorage.setItem("wishlist", datajson);
}

export function getFromLocalStorage(): Array<any> {
  const localStor = localStorage.getItem("wishlist");
  const wishlist = localStor ? JSON.parse(localStor) : new Array();
  return wishlist;
}
