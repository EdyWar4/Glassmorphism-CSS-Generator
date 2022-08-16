export class generator {
  constructor(id, containerCode) {
      this.containerCode = containerCode;
      this.box = document.querySelector(`#${id}`);
      localStorage.clear();
      localStorage.setItem('opacidad', 0.20);
      localStorage.setItem('rgba', 'rgba(255, 255, 255, 0.5)');
      this.css = window.getComputedStyle(this.box);
  }

  propiedades(value) {
      this.box.style['backdrop-filter'] = value;
      this.box.style['-webkit-backdrop-filter'] = value;
  }

  e(id) {
      return [document.querySelector(`#${id}`), document.querySelector(`#${id}`).nextElementSibling];
  }

  show(input, info) {
      input.addEventListener('mouseover', () => {
          info.textContent = `${input.value}${input.getAttribute('data-unit')}`;
          info.style['visibility'] = 'visible';
      });
      input.addEventListener('mouseout', () => {
          info.style['visibility'] = 'hidden';
      });
  }

  update(input, info) {
      info.textContent = `${input.value}${input.getAttribute('data-unit')}`;
  }

  convertRgba(opacity) {
      const rgb = window.getComputedStyle(this.box)['background-color'];
      let rgba = rgb.replace(/(rgb)/g, 'rgba').replace(/\)/g, `, ${opacity})`);
      localStorage.setItem('rgba', rgba);
      this.box.style['background-color'] =  rgba;
  }
  
  color(id) {
      let [input] = this.e(id);
      input.addEventListener('input', () => {
              document.querySelectorAll(`#${id}`)[0].setAttribute('value', input.value.toUpperCase());
              this.box.style['background-color'] = input.value;
              this.convertRgba(localStorage.getItem('opacidad'));
              this.saveCode();
          });
  }

  opacidad(id) {
      let [input, info] = this.e(id);
      this.show(input, info);
      input.addEventListener('input', () => {
          let opacity = (input.value / 100);
          opacity = parseFloat(opacity).toFixed(2);
          let rgba = localStorage.getItem('rgba');
          rgba = rgba.replace(/(\d\.\d\d\))|(\d\.\d\))|(\s\d\))/g, `${opacity})`);
          localStorage.setItem('opacidad', opacity);
          localStorage.setItem('rgba', rgba);
          this.box.style['background-color'] =  rgba;
          this.update(input, info);
          this.saveCode();
      });
  }

  difuminado(id) {
      let [input, info] = this.e(id);
      this.show(input, info);
      input.addEventListener('input', () => {
          let value = `blur(${input.value}${input.getAttribute('data-unit')})`;
          this.propiedades(value);
          localStorage.setItem('difuminado', value);
          this.update(input, info);
          this.saveCode();
      });
  }
  
  contraste(id) {
      let [input, info] = this.e(id);
      this.show(input, info);
      input.addEventListener('input', () => {
          let value = `contrast(${input.value}${input.getAttribute('data-unit')})`;
          this.propiedades(value);
          localStorage.setItem('contraste', value);
          this.update(input, info);
          this.saveCode();
      });
  }

  brillo(id) {
      let [input, info] = this.e(id);
      this.show(input, info);
      input.addEventListener('input', () => {
          let value = `brightness(${input.value}${input.getAttribute('data-unit')})`;
          this.propiedades(value);
          localStorage.setItem('brillo', value);
          this.update(input, info);
          this.saveCode();
      });
  }

  saturacion(id) {
      let [input, info] = this.e(id);
      this.show(input, info);
      input.addEventListener('input', () => {
          let value = `saturate(${input.value}${input.getAttribute('data-unit')})`;
          this.propiedades(value);
          localStorage.setItem('saturacion', value);
          this.update(input, info);
          this.saveCode();
      });
  }    

  tamaño(id) {
    let [input, info] = this.e(id);
    this.show(input, info);
    input.setAttribute('value', this.css['width'].replace('px', ''));
    input.addEventListener('input', () => {
        this.box.style['width'] = `${input.value}${input.getAttribute('data-unit')}`;
        this.box.style['height'] = `${input.value}${input.getAttribute('data-unit')}`;
        this.update(input, info);
        });
    }

    borde(id) {
    let [input, info] = this.e(id);
    this.show(input, info);
    input.setAttribute('value', this.css['border-radius'].replace('%', ''));
    input.addEventListener('input', () => {
        this.box.style['border-radius'] = `${input.value}${input.getAttribute('data-unit')}`;
        this.update(input, info);
        });
    }

    saveCode() {
    let codeCss = [];
    if(localStorage.getItem('rgba') !== null) codeCss.push     (`background-color: ${localStorage.getItem('rgba')}`);
    if(localStorage.getItem('difuminado') !== null) codeCss.push(`backdrop-filter: ${localStorage.getItem('difuminado')}`);
    if(localStorage.getItem('contraste') !== null) codeCss.push(`backdrop-filter: ${localStorage.getItem('contraste')}`);
    if(localStorage.getItem('brillo') !== null) codeCss.push(`backdrop-filter: ${localStorage.getItem('brillo')}`);
    if(localStorage.getItem('saturacion') !== null) codeCss.push(`backdrop-filter: ${localStorage.getItem('saturacion')}`);
    document.querySelector(`#${this.containerCode}`).textContent = codeCss.join(";\n") + ';';
    }
}