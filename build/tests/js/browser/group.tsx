import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

export default function testGroup(status: boolean, caption: string): any {
  const stt: string = status ? "data-ok='1'" : "";
  return html`<li ${status}><span>${caption}</span></li>`;
}
