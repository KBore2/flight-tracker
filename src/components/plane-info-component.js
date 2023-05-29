import { html, css, LitElement } from 'lit';
import plane from '../assets/plane.png';

export class PlaneInfo extends LitElement {
  static styles = css`
    :host {
      --rotationAmount: 20deg;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      width: 360px;
      transform: rotate(var(--rotationAmount));
    }
  `;

  static properties = {
    name: { type: String },
    degrees: { type: Number },
  };

  constructor() {
    super();
    this.name = 'Somebody';
    this.degrees = 5;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const img = document.querySelector('plane-info');

    console.log(getComputedStyle(img).getPropertyValue('--rotationAmount'));

    console.log(name, oldValue, newValue);

    this.degrees = parseFloat(newValue);

    img.style.setProperty('--rotationAmount', `${newValue}deg`);
  }

  render() {
    return html`
      <div>
        <h3>N&deg; ${this.degrees}</h3>
        <img src=${plane} />
      </div>
    `;
  }
}
customElements.define('plane-info', PlaneInfo);
