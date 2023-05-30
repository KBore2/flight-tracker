import { html, css, LitElement } from 'lit';
import plane from '../assets/plane.png';

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
      heigh: max-content;
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

  static properties = {
    //degrees: { type: Number },
    // latitude: { type: Number },
    // longitude: { type: Number },
    // velocity: { type: Number },
    // altitude: { type: Number },
    info: { type: Object },
  };

  constructor() {
    super();
    this.info = {
      degrees: 0,
      latitude: 1,
      longitude: 2,
      velocity: 3,
      altitude: 4,
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const img = document.querySelector('plane-info');

    console.log(getComputedStyle(img).getPropertyValue('--rotationAmount'));

    //console.log(name, oldValue, newValue);

    //const newInfo = JSON.parse(newValue);

    this.info = JSON.parse(newValue);

    console.log(this.info);

    img.style.setProperty('--rotationAmount', `${this.info.degrees}deg`);
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
customElements.define('plane-info', PlaneInfo);
