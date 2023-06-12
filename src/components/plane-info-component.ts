import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import plane from '../assets/plane.png';
import { Info } from '../types/planeInfoType';

@customElement('plane-info')
export class PlaneInfo extends LitElement {
  static styles = css`
    :host {
      --rotationAmount: 0deg;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background-color: whitesmoke;
      width: max(360px, 80%);
    }
    img {
      width: 250px;
      transform: rotate(var(--rotationAmount));
    }
    .more-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-evenly;
      width: min(80%, 360px);
    }
    .more-info div {
      display: flex;
      flex-direction: row;
      margin: 10px;
      overflow: hidden;
      border-radius: 30px;
      box-shadow: -3px 3px 3px 0px rgba(0, 0, 0, 0.3);
    }
    p {
      font-size: 1rem;
      padding: 0.3em;
      margin: 0px;
      height: max-content;
    }
    .more-info div .tag {
      flex-grow: 0;
      width: 35%;
      text-align: center;
      background-color: green;
      color: white;
    }
    .more-info div .value {
      flex-grow: 1;
      padding-left: 15px;
      background-color: white;
    }
    @media screen and (min-width: 900px) {
      .more-info div {
        margin: 0px;
      }
      p {
        font-size: 1.1rem;
        padding: 2px;
      }
    }
  `;

  @property()
  info: Info = {
    degrees: 0,
    latitude: 0,
    longitude: 0,
    velocity: 0,
    altitude: 0,
  };
  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    const img = document.querySelector('plane-info') as HTMLElement;
    this.info = JSON.parse(newValue);
    img?.style.setProperty('--rotationAmount', `${this.info.degrees}deg`);
  }
  render() {
    return html`
      <div class="info">
        <h3>N&deg; ${this.info.degrees}</h3>
        <img src=${plane} />
        <div class="more-info">
          <div>
            <p class="tag">Latitude:</p>
            <p class="value">${this.info.latitude}&deg;</p>
          </div>
          <div>
            <p class="tag">Longtude:</p>
            <p class="value">${this.info.longitude}&deg;</p>
          </div>
          <div>
            <p class="tag">Velocity:</p>
            <p class="value">${this.info.velocity} m/s</p>
          </div>
          <div>
            <p class="tag">Altitude:</p>
            <p class="value">${this.info.altitude} m</p>
          </div>
        </div>
      </div>
    `;
  }
}
